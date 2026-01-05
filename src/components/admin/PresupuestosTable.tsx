'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { Presupuesto } from '@/lib/supabase';
import { updatePresupuesto, deletePresupuesto } from '@/app/actions/admin';

export default function PresupuestosTable({ presupuestos }: { presupuestos: Presupuesto[] }) {
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
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proyecto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
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
            {presupuestos.map((presupuesto) => {
              const estadoBadge = getEstadoBadge(presupuesto.estado || 'pendiente');
              return (
                <tr
                  key={presupuesto.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(presupuesto.created_at!)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{presupuesto.nombre}</div>
                    <div className="text-sm text-gray-500">{presupuesto.email}</div>
                    <div className="text-sm text-gray-500">{presupuesto.telefono}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">{presupuesto.tipo_proyecto}</div>
                    {presupuesto.ubicacion && (
                      <div className="text-sm text-gray-500">📍 {presupuesto.ubicacion}</div>
                    )}
                    {presupuesto.presupuesto_estimado && (
                      <div className="text-sm text-gray-500">💰 {presupuesto.presupuesto_estimado}</div>
                    )}
                    {presupuesto.fecha_inicio_estimada && (
                      <div className="text-sm text-gray-500">
                        📅 {new Date(presupuesto.fecha_inicio_estimada).toLocaleDateString('es-ES')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <div className="text-sm text-gray-900 truncate">
                      {selectedId === presupuesto.id ? presupuesto.descripcion : presupuesto.descripcion.substring(0, 100)}
                      {presupuesto.descripcion.length > 100 && (
                        <button
                          onClick={() =>
                            setSelectedId(selectedId === presupuesto.id ? null : presupuesto.id!)
                          }
                          className="text-accent hover:underline ml-1"
                        >
                          {selectedId === presupuesto.id ? 'Ver menos' : '...Ver más'}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={presupuesto.estado || 'pendiente'}
                      onChange={(e) => handleChangeEstado(presupuesto.id!, e.target.value)}
                      className={`text-sm rounded-full px-3 py-1 font-medium border-0 focus:ring-2 focus:ring-accent ${estadoBadge.clase}`}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_proceso">En Proceso</option>
                      <option value="enviado">Enviado</option>
                      <option value="aceptado">Aceptado</option>
                      <option value="rechazado">Rechazado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(presupuesto.id!)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

