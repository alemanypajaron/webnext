'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { Contacto } from '@/lib/supabase';
import { updateContacto, deleteContacto } from '@/app/actions/admin';

export default function ContactosTable({ contactos }: { contactos: Contacto[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleToggleLeido = async (id: string, currentLeido: boolean) => {
    try {
      await updateContacto(id, { leido: !currentLeido });
      toast.success(currentLeido ? 'Marcado como no leído' : 'Marcado como leído');
      router.refresh();
    } catch (error) {
      toast.error('Error al actualizar el contacto');
    }
  };

  const handleToggleRespondido = async (id: string, currentRespondido: boolean) => {
    try {
      await updateContacto(id, { respondido: !currentRespondido });
      toast.success(currentRespondido ? 'Marcado como no respondido' : 'Marcado como respondido');
      router.refresh();
    } catch (error) {
      toast.error('Error al actualizar el contacto');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      return;
    }

    try {
      await deleteContacto(id);
      toast.success('Contacto eliminado correctamente');
      router.refresh();
    } catch (error) {
      toast.error('Error al eliminar el contacto');
    }
  };

  if (contactos.length === 0) {
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <p className="text-gray-500 text-lg">No hay contactos todavía</p>
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
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mensaje
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
            {contactos.map((contacto) => (
              <tr
                key={contacto.id}
                className={`hover:bg-gray-50 transition-colors ${!contacto.leido ? 'bg-blue-50/30' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(contacto.created_at!)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contacto.nombre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contacto.email}</div>
                  {contacto.telefono && (
                    <div className="text-sm text-gray-500">{contacto.telefono}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md truncate">
                    {selectedId === contacto.id ? contacto.mensaje : contacto.mensaje.substring(0, 100)}
                    {contacto.mensaje.length > 100 && (
                      <button
                        onClick={() =>
                          setSelectedId(selectedId === contacto.id ? null : contacto.id!)
                        }
                        className="text-accent hover:underline ml-1"
                      >
                        {selectedId === contacto.id ? 'Ver menos' : '...Ver más'}
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contacto.leido
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {contacto.leido ? 'Leído' : 'No leído'}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contacto.respondido
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {contacto.respondido ? 'Respondido' : 'Pendiente'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleToggleLeido(contacto.id!, contacto.leido!)}
                      className="text-blue-600 hover:text-blue-900"
                      title={contacto.leido ? 'Marcar como no leído' : 'Marcar como leído'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleToggleRespondido(contacto.id!, contacto.respondido!)}
                      className="text-green-600 hover:text-green-900"
                      title={
                        contacto.respondido
                          ? 'Marcar como no respondido'
                          : 'Marcar como respondido'
                      }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(contacto.id!)}
                      className="text-red-600 hover:text-red-900"
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


