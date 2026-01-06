'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { deleteBlogArticulo, updateBlogArticulo } from '@/app/actions/admin';

interface BlogArticulo {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  imagen_destacada: string;
  autor: string;
  fecha_publicacion: string;
  publicado: boolean;
  destacado: boolean;
  visitas: number;
  categoria: {
    nombre: string;
    color: string;
  };
}

export default function BlogArticulosTable({ articulos }: { articulos: BlogArticulo[] }) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleTogglePublicado = async (id: string, currentPublicado: boolean) => {
    setProcessingId(id);
    try {
      await updateBlogArticulo(id, { publicado: !currentPublicado });
      toast.success(currentPublicado ? 'Artículo despublicado' : 'Artículo publicado');
      router.refresh();
    } catch (error) {
      toast.error('Error al actualizar el artículo');
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleDestacado = async (id: string, currentDestacado: boolean) => {
    setProcessingId(id);
    try {
      await updateBlogArticulo(id, { destacado: !currentDestacado });
      toast.success(currentDestacado ? 'Quitado de destacados' : 'Marcado como destacado');
      router.refresh();
    } catch (error) {
      toast.error('Error al actualizar el artículo');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar "${titulo}"?`)) {
      return;
    }

    setProcessingId(id);
    try {
      await deleteBlogArticulo(id);
      toast.success('Artículo eliminado correctamente');
      router.refresh();
    } catch (error) {
      toast.error('Error al eliminar el artículo');
    } finally {
      setProcessingId(null);
    }
  };

  if (articulos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mx-auto text-gray-400 mb-4"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <p className="text-gray-500 text-lg mb-4">No hay artículos todavía</p>
        <Link
          href="/administrator/blog/nuevo"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Crear Primer Artículo</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Artículo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Autor & Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articulos.map((articulo) => (
              <tr
                key={articulo.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Artículo (Imagen + Título) */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={articulo.imagen_destacada}
                        alt={articulo.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="max-w-md">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {articulo.titulo}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                        {articulo.resumen}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Autor & Fecha */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{articulo.autor}</div>
                  <div className="text-xs text-gray-500">{formatDate(articulo.fecha_publicacion)}</div>
                </td>

                {/* Categoría */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${articulo.categoria.color}20`, color: articulo.categoria.color }}
                  >
                    {articulo.categoria.nombre}
                  </span>
                </td>

                {/* Stats */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{articulo.visitas}</span>
                  </div>
                </td>

                {/* Estado */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        articulo.publicado
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {articulo.publicado ? 'Publicado' : 'Borrador'}
                    </span>
                    {articulo.destacado && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⭐ Destacado
                      </span>
                    )}
                  </div>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {/* Ver en el sitio */}
                    <Link
                      href={`/blog/${articulo.slug}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-900"
                      title="Ver en el sitio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </Link>

                    {/* Editar */}
                    <Link
                      href={`/administrator/blog/${articulo.id}/editar`}
                      className="text-accent hover:text-accent-dark"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>

                    {/* Toggle Publicado */}
                    <button
                      onClick={() => handleTogglePublicado(articulo.id, articulo.publicado)}
                      disabled={processingId === articulo.id}
                      className={`${
                        articulo.publicado ? 'text-green-600 hover:text-green-900' : 'text-gray-400 hover:text-gray-600'
                      } disabled:opacity-50`}
                      title={articulo.publicado ? 'Despublicar' : 'Publicar'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={articulo.publicado ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </button>

                    {/* Toggle Destacado */}
                    <button
                      onClick={() => handleToggleDestacado(articulo.id, articulo.destacado)}
                      disabled={processingId === articulo.id}
                      className={`${
                        articulo.destacado ? 'text-yellow-600 hover:text-yellow-800' : 'text-gray-400 hover:text-gray-600'
                      } disabled:opacity-50`}
                      title={articulo.destacado ? 'Quitar de destacados' : 'Marcar como destacado'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={articulo.destacado ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => handleDelete(articulo.id, articulo.titulo)}
                      disabled={processingId === articulo.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


