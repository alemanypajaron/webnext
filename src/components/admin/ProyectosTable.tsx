'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { deleteProyecto } from '@/app/actions/admin';

interface Proyecto {
  id: string;
  titulo: string;
  slug: string;
  ubicacion: string;
  cliente?: string;
  imagen_principal: string;
  publicado: boolean;
}

export default function ProyectosTable({ proyectos }: { proyectos: Proyecto[] }) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar "${titulo}"?`)) {
      return;
    }

    setProcessingId(id);
    try {
      await deleteProyecto(id);
      toast.success('Proyecto eliminado correctamente');
      router.refresh();
    } catch (error) {
      toast.error('Error al eliminar el proyecto');
    } finally {
      setProcessingId(null);
    }
  };

  if (proyectos.length === 0) {
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
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <p className="text-gray-500 text-lg mb-4">No hay proyectos todavía</p>
        <Link
          href="/administrator/proyectos/nuevo"
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
          <span>Crear Primer Proyecto</span>
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
                Proyecto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
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
            {proyectos.map((proyecto) => (
              <tr key={proyecto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded object-cover"
                        src={proyecto.imagen_principal || '/images/placeholder.jpg'}
                        alt={proyecto.titulo}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {proyecto.titulo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {proyecto.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{proyecto.ubicacion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{proyecto.cliente || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {proyecto.publicado ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Publicado
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Borrador
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <Link
                      href={`/proyectos/${proyecto.slug}`}
                      target="_blank"
                      className="text-primary hover:text-accent transition-colors"
                      title="Ver en el sitio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </Link>
                    <Link
                      href={`/administrator/proyectos/${proyecto.id}/editar`}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(proyecto.id, proyecto.titulo)}
                      disabled={processingId === proyecto.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
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

