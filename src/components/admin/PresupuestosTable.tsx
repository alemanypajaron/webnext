'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { Presupuesto } from '@/lib/supabase';
import { updatePresupuesto, deletePresupuesto } from '@/app/actions/admin';

export default function PresupuestosTable({ presupuestos }: { presupuestos: Presupuesto[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailsPresupuesto, setDetailsPresupuesto] = useState<Presupuesto | null>(null);
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

  const handleChangeEstado = async (id: string, nuevoEstado: string) => {
    try {
      await updatePresupuesto(id, { estado: nuevoEstado });
      toast.success('Estado actualizado correctamente');
      router.refresh();
    } catch (error) {
      toast.error('Error al actualizar el estado');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este presupuesto?')) {
      return;
    }

    try {
      await deletePresupuesto(id);
      toast.success('Presupuesto eliminado correctamente');
      router.refresh();
    } catch (error) {
      toast.error('Error al eliminar el presupuesto');
    }
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_proceso: 'bg-blue-100 text-blue-800',
      enviado: 'bg-green-100 text-green-800',
      aceptado: 'bg-emerald-100 text-emerald-800',
      rechazado: 'bg-red-100 text-red-800',
    };
    const nombres = {
      pendiente: 'Pendiente',
      en_proceso: 'En Proceso',
      enviado: 'Enviado',
      aceptado: 'Aceptado',
      rechazado: 'Rechazado',
    };
    return { clase: badges[estado as keyof typeof badges], nombre: nombres[estado as keyof typeof nombres] };
  };

  if (presupuestos.length === 0) {
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <p className="text-gray-500 text-lg">No hay solicitudes de presupuesto todavía</p>
      </div>
    );
  }

  // Modal de detalles
  const DetailsModal = ({ presupuesto }: { presupuesto: Presupuesto }) => {
    const estadoBadge = getEstadoBadge(presupuesto.estado || 'pendiente');
    
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-in fade-in duration-200"
        onClick={() => setDetailsPresupuesto(null)}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary">Detalles del Presupuesto</h3>
            <button
              onClick={() => setDetailsPresupuesto(null)}
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
            {/* Información del Cliente */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-primary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Información del Cliente
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nombre</p>
                  <p className="text-base font-medium text-gray-900">{presupuesto.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-base text-gray-900">
                    <a href={`mailto:${presupuesto.email}`} className="hover:text-accent transition-colors">
                      {presupuesto.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                  <p className="text-base text-gray-900">
                    <a href={`tel:${presupuesto.telefono}`} className="hover:text-accent transition-colors">
                      {presupuesto.telefono}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Fecha de Solicitud</p>
                  <p className="text-base text-gray-900">{formatDate(presupuesto.created_at!)}</p>
                </div>
              </div>
            </div>

            {/* Información del Proyecto */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-primary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
                Información del Proyecto
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tipo de Proyecto</p>
                  <p className="text-base font-medium text-gray-900">{presupuesto.tipo_proyecto}</p>
                </div>
                {presupuesto.ubicacion && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Ubicación</p>
                    <p className="text-base text-gray-900 flex items-center">
                      📍 {presupuesto.ubicacion}
                    </p>
                  </div>
                )}
                {presupuesto.presupuesto_estimado && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Presupuesto Estimado</p>
                    <p className="text-base text-gray-900 flex items-center">
                      💰 {presupuesto.presupuesto_estimado}
                    </p>
                  </div>
                )}
                {presupuesto.fecha_inicio_estimada && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Fecha de Inicio Estimada</p>
                    <p className="text-base text-gray-900 flex items-center">
                      📅 {new Date(presupuesto.fecha_inicio_estimada).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Descripción Completa */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-primary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Descripción del Proyecto
              </h4>
              <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                {presupuesto.descripcion}
              </p>
            </div>

            {/* Estado */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-primary mb-3">Estado Actual</h4>
              <div className="flex items-center gap-3">
                <select
                  value={presupuesto.estado || 'pendiente'}
                  onChange={(e) => {
                    handleChangeEstado(presupuesto.id!, e.target.value);
                  }}
                  className={`text-sm rounded-full px-4 py-2 font-medium border-0 focus:ring-2 focus:ring-accent cursor-pointer ${estadoBadge.clase}`}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="enviado">Enviado</option>
                  <option value="aceptado">Aceptado</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer con acciones */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => {
                if (confirm('¿Estás seguro de que deseas eliminar este presupuesto?')) {
                  handleDelete(presupuesto.id!);
                  setDetailsPresupuesto(null);
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
            <button
              onClick={() => setDetailsPresupuesto(null)}
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
      {detailsPresupuesto && <DetailsModal presupuesto={detailsPresupuesto} />}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                  Fecha
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Cliente
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-52">
                  Proyecto
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Estado
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {presupuestos.map((presupuesto) => {
                const estadoBadge = getEstadoBadge(presupuesto.estado || 'pendiente');
                return (
                  <tr
                    key={presupuesto.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-500">
                      {new Date(presupuesto.created_at!).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                      <div className="text-[10px] text-gray-400">
                        {new Date(presupuesto.created_at!).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs font-medium text-gray-900 truncate max-w-[180px]">
                        {presupuesto.nombre}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate max-w-[180px]">
                        {presupuesto.email}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {presupuesto.telefono}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs text-gray-900 font-medium truncate max-w-[200px]">
                        {presupuesto.tipo_proyecto}
                      </div>
                      {presupuesto.ubicacion && (
                        <div className="text-[11px] text-gray-500 truncate max-w-[200px]">
                          📍 {presupuesto.ubicacion}
                        </div>
                      )}
                      {presupuesto.presupuesto_estimado && (
                        <div className="text-[11px] text-gray-500">
                          💰 {presupuesto.presupuesto_estimado}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <select
                        value={presupuesto.estado || 'pendiente'}
                        onChange={(e) => handleChangeEstado(presupuesto.id!, e.target.value)}
                        className={`text-[11px] rounded-full px-2.5 py-1 font-medium border-0 focus:ring-2 focus:ring-accent cursor-pointer ${estadoBadge.clase} w-full`}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="enviado">Enviado</option>
                        <option value="aceptado">Aceptado</option>
                        <option value="rechazado">Rechazado</option>
                      </select>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setDetailsPresupuesto(presupuesto)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(presupuesto.id!)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

