'use client';

import { useState } from 'react';
import { submitPresupuestoForm } from '@/app/actions/forms';
import Link from 'next/link';

export default function PresupuestoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    // Combinar nombre y apellidos
    const nombre = formData.get('nombre') as string;
    const apellidos = formData.get('apellidos') as string;
    formData.set('nombre', `${nombre} ${apellidos}`.trim());
    formData.delete('apellidos');

    try {
      const result = await submitPresupuestoForm(formData);

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // Resetear formulario
        (event.target as HTMLFormElement).reset();
        // Scroll al mensaje
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setMessage({ type: 'error', text: result.message });
        // Scroll al mensaje
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error inesperado. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12">
      {message && (
        <div
          className={`mb-8 p-5 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-start">
            {message.type === 'success' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-shrink-0 mr-3 mt-0.5"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-shrink-0 mr-3 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
            <div>
              <p className="font-medium">{message.text}</p>
              {message.type === 'success' && (
                <p className="text-sm mt-2">
                  También puedes llamarnos al{' '}
                  <a href="tel:+34650075842" className="font-semibold hover:underline">
                    650 075 842
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-2">
              Apellidos <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tipo_proyecto" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Proyecto <span className="text-red-500">*</span>
          </label>
          <select
            id="tipo_proyecto"
            name="tipo_proyecto"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Selecciona una opción</option>
            <option value="direccion-obra">Dirección de Obra</option>
            <option value="reforma-integral">Reforma Integral</option>
            <option value="licencias">Licencias y Permisos</option>
            <option value="gestion-proyectos">Gestión de Proyectos</option>
            <option value="asesoramiento">Asesoramiento Técnico</option>
            <option value="diseno-espacios">Diseño de Espacios</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación del Proyecto
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              placeholder="Murcia"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="presupuesto_estimado" className="block text-sm font-medium text-gray-700 mb-2">
              Presupuesto Estimado
            </label>
            <select
              id="presupuesto_estimado"
              name="presupuesto_estimado"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Selecciona un rango</option>
              <option value="menos-10k">Menos de 10.000€</option>
              <option value="10k-30k">10.000€ - 30.000€</option>
              <option value="30k-50k">30.000€ - 50.000€</option>
              <option value="50k-100k">50.000€ - 100.000€</option>
              <option value="mas-100k">Más de 100.000€</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="fecha_inicio_estimada" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Inicio Estimada
          </label>
          <input
            type="date"
            id="fecha_inicio_estimada"
            name="fecha_inicio_estimada"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
            Descripción del Proyecto <span className="text-red-500">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            required
            rows={6}
            placeholder="Cuéntanos sobre tu proyecto: qué necesitas, objetivos, plazos, etc."
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          ></textarea>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="acepta_privacidad"
            name="acepta_privacidad"
            value="true"
            required
            disabled={isSubmitting}
            className="mt-1 mr-3 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <label htmlFor="acepta_privacidad" className="text-sm text-gray-600">
            Acepto la{' '}
            <Link href="/legal/privacidad" className="text-accent hover:underline" target="_blank">
              política de privacidad
            </Link>{' '}
            y el tratamiento de mis datos <span className="text-red-500">*</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </>
          ) : (
            'Solicitar Presupuesto'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Te contactaremos en menos de 24 horas para discutir tu proyecto
        </p>
      </form>
    </div>
  );
}

