'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Imagen {
  name: string;
  url: string;
  size: number;
  createdAt: string;
  lastModified: string;
}

interface MultimediaGalleryProps {
  imagenes: Imagen[];
}

export default function MultimediaGallery({
  imagenes: imagenesIniciales,
}: MultimediaGalleryProps) {
  const [imagenes, setImagenes] = useState<Imagen[]>(imagenesIniciales);
  const [seleccionadas, setSeleccionadas] = useState<Set<string>>(new Set());
  const [subiendo, setSubiendo] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [imagenModal, setImagenModal] = useState<Imagen | null>(null);
  const [vistaGrid, setVistaGrid] = useState<'grid' | 'list'>('grid');

  // Seleccionar/deseleccionar imagen
  const toggleSeleccion = (nombre: string) => {
    const nuevaSeleccion = new Set(seleccionadas);
    if (nuevaSeleccion.has(nombre)) {
      nuevaSeleccion.delete(nombre);
    } else {
      nuevaSeleccion.add(nombre);
    }
    setSeleccionadas(nuevaSeleccion);
  };

  // Seleccionar todas
  const seleccionarTodas = () => {
    if (seleccionadas.size === imagenes.length) {
      setSeleccionadas(new Set());
    } else {
      setSeleccionadas(new Set(imagenes.map((img) => img.name)));
    }
  };

  // Subir múltiples imágenes
  const handleSubirImagenes = async (files: FileList) => {
    setSubiendo(true);

    try {
      const promesas = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/blog/imagenes', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error(`Error al subir ${file.name}`);
        return await res.json();
      });

      const resultados = await Promise.all(promesas);
      
      // Añadir nuevas imágenes al estado
      const nuevasImagenes: Imagen[] = resultados.map((r) => ({
        name: r.filename,
        url: r.url,
        size: 0, // El tamaño se obtendrá en el próximo refresh
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      }));
      
      setImagenes([...nuevasImagenes, ...imagenes]);
      
      toast.success(`${files.length} imágenes subidas correctamente`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al subir algunas imágenes');
    } finally {
      setSubiendo(false);
    }
  };

  // Eliminar imágenes seleccionadas
  const eliminarSeleccionadas = async () => {
    if (seleccionadas.size === 0) {
      toast.error('No hay imágenes seleccionadas');
      return;
    }

    if (
      !confirm(
        `¿Eliminar ${seleccionadas.size} imagen(es)? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    setEliminando(true);

    try {
      const promesas = Array.from(seleccionadas).map(async (nombre) => {
        const res = await fetch(
          `/api/blog/imagenes?nombre=${encodeURIComponent(nombre)}`,
          {
            method: 'DELETE',
          }
        );

        if (!res.ok) throw new Error(`Error al eliminar ${nombre}`);
      });

      await Promise.all(promesas);
      
      // Actualizar estado eliminando las imágenes del array
      setImagenes(imagenes.filter((img) => !seleccionadas.has(img.name)));
      setSeleccionadas(new Set());
      
      toast.success(`${seleccionadas.size} imagen(es) eliminada(s)`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar algunas imágenes');
    } finally {
      setEliminando(false);
    }
  };

  // Copiar URL
  const copiarURL = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copiada al portapapeles');
  };

  // Formatear tamaño
  const formatearTamano = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Toolbar */}
      <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Subir imágenes */}
          <label className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleSubirImagenes(e.target.files);
                }
              }}
              disabled={subiendo}
            />
            {subiendo ? 'Subiendo...' : '📤 Subir Imágenes'}
          </label>

          {/* Eliminar seleccionadas */}
          <button
            onClick={eliminarSeleccionadas}
            disabled={seleccionadas.size === 0 || eliminando}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {eliminando
              ? 'Eliminando...'
              : `🗑️ Eliminar (${seleccionadas.size})`}
          </button>

          {/* Seleccionar todas */}
          <button
            onClick={seleccionarTodas}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {seleccionadas.size === imagenes.length
              ? '❌ Deseleccionar todas'
              : '☑️ Seleccionar todas'}
          </button>
        </div>

        {/* Vista */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVistaGrid('grid')}
            className={`p-2 rounded ${
              vistaGrid === 'grid'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            title="Vista en cuadrícula"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setVistaGrid('list')}
            className={`p-2 rounded ${
              vistaGrid === 'list'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            title="Vista en lista"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Galería */}
      {imagenes.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg">No hay imágenes en la galería</p>
          <p className="text-sm mt-2">Sube tu primera imagen</p>
        </div>
      ) : vistaGrid === 'grid' ? (
        // Vista Grid
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {imagenes.map((imagen) => (
            <div
              key={imagen.name}
              className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                seleccionadas.has(imagen.name)
                  ? 'border-primary shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={seleccionadas.has(imagen.name)}
                  onChange={() => toggleSeleccion(imagen.name)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              {/* Imagen */}
              <div
                className="aspect-square relative bg-gray-100"
                onClick={() => setImagenModal(imagen)}
              >
                <Image
                  src={imagen.url}
                  alt={imagen.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>

              {/* Info */}
              <div className="p-2 bg-white">
                <p
                  className="text-xs text-gray-700 truncate font-medium"
                  title={imagen.name}
                >
                  {imagen.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatearTamano(imagen.size)}
                </p>
              </div>

              {/* Acciones hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copiarURL(imagen.url);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                  title="Copiar URL"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagenModal(imagen);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                  title="Ver detalles"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Vista Lista
        <div className="divide-y">
          {imagenes.map((imagen) => (
            <div
              key={imagen.name}
              className={`p-4 flex items-center gap-4 hover:bg-gray-50 ${
                seleccionadas.has(imagen.name) ? 'bg-blue-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={seleccionadas.has(imagen.name)}
                onChange={() => toggleSeleccion(imagen.name)}
                className="w-5 h-5"
              />
              <div className="w-16 h-16 relative bg-gray-100 rounded">
                <Image
                  src={imagen.url}
                  alt={imagen.name}
                  fill
                  className="object-cover rounded"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {imagen.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatearTamano(imagen.size)} •{' '}
                  {new Date(imagen.createdAt).toLocaleDateString('es-ES')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copiarURL(imagen.url)}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Copiar URL
                </button>
                <button
                  onClick={() => setImagenModal(imagen)}
                  className="px-3 py-1 text-sm bg-primary text-white hover:bg-primary-dark rounded"
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalles */}
      {imagenModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setImagenModal(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Detalles de la imagen</h3>
              <button
                onClick={() => setImagenModal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="relative w-full aspect-video mb-4 bg-gray-100 rounded">
                <Image
                  src={imagenModal.url}
                  alt={imagenModal.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Nombre:</span>{' '}
                  {imagenModal.name}
                </div>
                <div>
                  <span className="font-semibold">Tamaño:</span>{' '}
                  {formatearTamano(imagenModal.size)}
                </div>
                <div>
                  <span className="font-semibold">Subida:</span>{' '}
                  {new Date(imagenModal.createdAt).toLocaleString('es-ES')}
                </div>
                <div>
                  <span className="font-semibold">URL:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={imagenModal.url}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded text-sm"
                    />
                    <button
                      onClick={() => copiarURL(imagenModal.url)}
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

