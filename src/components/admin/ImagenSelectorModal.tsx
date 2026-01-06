'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Imagen {
  nombre: string;
  url: string;
  fecha: string;
}

interface ImagenSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentImage?: string;
}

export default function ImagenSelectorModal({
  isOpen,
  onClose,
  onSelect,
  currentImage,
}: ImagenSelectorModalProps) {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImage || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar imágenes al abrir el modal
  useEffect(() => {
    if (isOpen) {
      cargarImagenes();
    }
  }, [isOpen]);

  const cargarImagenes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blog/imagenes');
      const data = await response.json();
      setImagenes(data.imagenes || []);
    } catch (error) {
      console.error('Error al cargar imágenes:', error);
      toast.error('Error al cargar las imágenes');
    } finally {
      setLoading(false);
    }
  };

  const subirImagen = async (file: File) => {
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Solo se permiten imágenes (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede superar los 5MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/blog/imagenes', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al subir la imagen');
      }

      toast.success('Imagen subida correctamente');
      setSelectedImage(data.url);
      
      // Recargar la lista de imágenes
      await cargarImagenes();
    } catch (error: any) {
      console.error('Error al subir imagen:', error);
      toast.error(error.message || 'Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      subirImagen(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      subirImagen(file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleSelectAndClose = () => {
    if (selectedImage) {
      onSelect(selectedImage);
      onClose();
    } else {
      toast.error('Por favor, selecciona una imagen');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-primary">
            Gestor de Imágenes
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Zona de subida */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subir Nueva Imagen
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-300 hover:border-accent/50'
              } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              
              {uploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                  <p className="text-gray-600">Subiendo imagen...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400 mb-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-gray-700 font-medium mb-2">
                    Arrastra una imagen aquí o{' '}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-accent hover:underline"
                    >
                      selecciona un archivo
                    </button>
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG, GIF, WEBP - Máximo 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Galería de imágenes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Imágenes Disponibles ({imagenes.length})
              </label>
              <button
                onClick={cargarImagenes}
                disabled={loading}
                className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={loading ? 'animate-spin' : ''}
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Actualizar
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              </div>
            ) : imagenes.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-300 mx-auto mb-4"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-gray-500">No hay imágenes disponibles</p>
                <p className="text-sm text-gray-400 mt-1">
                  Sube tu primera imagen para comenzar
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagenes.map((imagen) => (
                  <div
                    key={imagen.nombre}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === imagen.url
                        ? 'border-accent ring-2 ring-accent/20'
                        : 'border-gray-200 hover:border-accent/50'
                    }`}
                    onClick={() => setSelectedImage(imagen.url)}
                  >
                    <div className="aspect-square relative bg-gray-100">
                      <Image
                        src={imagen.url}
                        alt={imagen.nombre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {selectedImage === imagen.url && (
                        <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                          <div className="bg-accent text-primary rounded-full p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs truncate">
                        {imagen.nombre}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-600">
            {selectedImage ? (
              <>
                <span className="font-semibold text-accent">Imagen seleccionada:</span>{' '}
                {selectedImage.split('/').pop()}
              </>
            ) : (
              'Selecciona una imagen de la galería'
            )}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSelectAndClose}
              disabled={!selectedImage}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedImage
                  ? 'bg-accent text-primary hover:bg-accent/90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Usar Imagen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


