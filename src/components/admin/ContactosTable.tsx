'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { Contacto } from '@/lib/supabase';
import { updateContacto, deleteContacto } from '@/app/actions/admin';

export default function ContactosTable({ contactos }: { contactos: Contacto[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailsContacto, setDetailsContacto] = useState<Contacto | null>(null);
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

  // Modal de detalles
  const DetailsModal = ({ contacto }: { contacto: Contacto }) => {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-in fade-in duration-200"
        onClick={() => setDetailsContacto(null)}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary">Detalles del Contacto</h3>
            <button
              onClick={() => setDetailsContacto(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Información del Contacto */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-primary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Información del Contacto
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nombre</p>
                  <p className="text-base font-medium text-gray-900">{contacto.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-base text-gray-900">
                    <a href={`mailto:${contacto.email}`} className="hover:text-accent transition-colors">
                      {contacto.email}
                    </a>
                  </p>
                </div>
                {contacto.telefono && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                    <p className="text-base text-gray-900">
                      <a href={`tel:${contacto.telefono}`} className="hover:text-accent transition-colors">
                        {contacto.telefono}
                      </a>
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Fecha de Contacto</p>
                  <p className="text-base text-gray-900">{formatDate(contacto.created_at!)}</p>
                </div>
              </div>
            </div>

            {/* Mensaje Completo */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-primary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Mensaje
              </h4>
              <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                {contacto.mensaje}
              </p>
            </div>

            {/* Estado */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-primary mb-3">Estado</h4>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    contacto.leido
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {contacto.leido ? '✓ Leído' : '○ No leído'}
                </span>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    contacto.respondido
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {contacto.respondido ? '✓ Respondido' : '⏳ Pendiente de respuesta'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer con acciones */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  handleToggleLeido(contacto.id!, contacto.leido!);
                }}
                className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                  contacto.leido
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {contacto.leido ? 'Marcar no leído' : 'Marcar leído'}
              </button>
              <button
                onClick={() => {
                  handleToggleRespondido(contacto.id!, contacto.respondido!);
                }}
                className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                  contacto.respondido
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {contacto.respondido ? 'Marcar no respondido' : 'Marcar respondido'}
              </button>
              <button
                onClick={() => {
                  if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
                    handleDelete(contacto.id!);
                    setDetailsContacto(null);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Eliminar
              </button>
            </div>
            <button
              onClick={() => setDetailsContacto(null)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Modal de detalles */}
      {detailsContacto && <DetailsModal contacto={detailsContacto} />}
      
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
                  <td className="px-6 py-4 max-w-md">
                    <div className="text-sm text-gray-900 truncate">
                      {contacto.mensaje.substring(0, 80)}
                      {contacto.mensaje.length > 80 && '...'}
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
                        onClick={() => setDetailsContacto(contacto)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Ver detalles"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleToggleLeido(contacto.id!, contacto.leido!)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title={contacto.leido ? 'Marcar como no leído' : 'Marcar como leído'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleToggleRespondido(contacto.id!, contacto.respondido!)}
                        className="text-green-600 hover:text-green-900 transition-colors"
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
                        className="text-red-600 hover:text-red-900 transition-colors"
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
    </>
  );
}


