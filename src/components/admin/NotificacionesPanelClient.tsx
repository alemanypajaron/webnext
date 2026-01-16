'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { Contacto, Presupuesto } from '@/lib/supabase';

interface NotificacionesPanelClientProps {
  contactos: Contacto[];
  presupuestos: Presupuesto[];
}

export default function NotificacionesPanelClient({
  contactos,
  presupuestos,
}: NotificacionesPanelClientProps) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const totalPendientes = contactos.length + presupuestos.length;

  const marcarContactoLeido = async (id: string) => {
    setProcessingId(id);
    try {
      const { error } = await supabase
        .from('contactos')
        .update({ leido: true })
        .eq('id', id);

      if (error) throw error;

      toast.success('Marcado como leído');
      router.refresh();
    } catch (error) {
      toast.error('Error al marcar como leído');
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  const marcarPresupuestoLeido = async (id: string) => {
    setProcessingId(id);
    try {
      const { error } = await supabase
        .from('presupuestos')
        .update({ leido: true })
        .eq('id', id);

      if (error) throw error;

      toast.success('Marcado como leído');
      router.refresh();
    } catch (error) {
      toast.error('Error al marcar como leído');
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  if (totalPendientes === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Todo al día!
        </h2>
        <p className="text-gray-600 mb-8">
          No tienes notificaciones pendientes
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push('/administrator')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Ver Contactos
          </button>
          <button
            onClick={() => router.push('/administrator/presupuestos')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Ver Presupuestos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Pendientes</p>
              <p className="text-4xl font-bold">{totalPendientes}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Contactos</p>
              <p className="text-3xl font-bold text-blue-600">{contactos.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-600"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Presupuestos</p>
              <p className="text-3xl font-bold text-purple-600">{presupuestos.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-purple-600"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Contactos */}
      {contactos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Contactos Pendientes ({contactos.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {contactos.map((contacto) => (
              <div
                key={contacto.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900">{contacto.nombre}</h3>
                      <span className="text-xs text-gray-500">
                        {formatFecha(contacto.created_at!)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{contacto.email}</p>
                    {contacto.telefono && (
                      <p className="text-sm text-gray-600 mb-2">📞 {contacto.telefono}</p>
                    )}
                    <p className="text-gray-700 line-clamp-2">{contacto.mensaje}</p>
                  </div>
                  <button
                    onClick={() => marcarContactoLeido(contacto.id!)}
                    disabled={processingId === contacto.id}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 text-sm font-medium whitespace-nowrap"
                  >
                    {processingId === contacto.id ? '...' : 'Marcar leído'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Presupuestos */}
      {presupuestos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
            <h2 className="text-lg font-bold text-purple-900 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Presupuestos Pendientes ({presupuestos.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {presupuestos.map((presupuesto) => (
              <div
                key={presupuesto.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900">{presupuesto.nombre}</h3>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                        {presupuesto.tipo_proyecto}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatFecha(presupuesto.created_at!)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{presupuesto.email}</p>
                    {presupuesto.telefono && (
                      <p className="text-sm text-gray-600 mb-2">📞 {presupuesto.telefono}</p>
                    )}
                    <p className="text-gray-700 line-clamp-2">{presupuesto.descripcion}</p>
                  </div>
                  <button
                    onClick={() => marcarPresupuestoLeido(presupuesto.id!)}
                    disabled={processingId === presupuesto.id}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition disabled:opacity-50 text-sm font-medium whitespace-nowrap"
                  >
                    {processingId === presupuesto.id ? '...' : 'Marcar leído'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
