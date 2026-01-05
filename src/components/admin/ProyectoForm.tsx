'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProyecto, updateProyecto } from '@/app/actions/admin';
import toast, { Toaster } from 'react-hot-toast';

interface ProyectoFormProps {
  proyecto?: {
    id: string;
    titulo: string;
    slug: string;
    descripcion_corta: string;
    descripcion_completa: string;
    ubicacion: string;
    ano: number;
    superficie: number;
    presupuesto?: number;
    duracion?: number;
    servicios: string[];
    estado: string;
    imagen_principal: string;
    cliente?: string;
    publicado: boolean;
    destacado: boolean;
    meta_descripcion?: string;
    meta_keywords?: string[];
  };
}

export default function ProyectoForm({ proyecto }: ProyectoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados del formulario
  const [titulo, setTitulo] = useState(proyecto?.titulo || '');
  const [slug, setSlug] = useState(proyecto?.slug || '');
  const [descripcionCorta, setDescripcionCorta] = useState(proyecto?.descripcion_corta || '');
  const [descripcionCompleta, setDescripcionCompleta] = useState(proyecto?.descripcion_completa || '');
  const [ubicacion, setUbicacion] = useState(proyecto?.ubicacion || '');
  const [ano, setAno] = useState(proyecto?.ano || new Date().getFullYear());
  const [superficie, setSuperficie] = useState(proyecto?.superficie || 0);
  const [presupuesto, setPresupuesto] = useState(proyecto?.presupuesto || 0);
  const [duracion, setDuracion] = useState(proyecto?.duracion || 0);
  const [servicios, setServicios] = useState<string[]>(proyecto?.servicios || []);
  const [estado, setEstado] = useState(proyecto?.estado || 'completado');
  const [imagenPrincipal, setImagenPrincipal] = useState(proyecto?.imagen_principal || '');
  const [cliente, setCliente] = useState(proyecto?.cliente || '');
  const [publicado, setPublicado] = useState(proyecto?.publicado || false);
  const [destacado, setDestacado] = useState(proyecto?.destacado || false);
  const [metaDescripcion, setMetaDescripcion] = useState(proyecto?.meta_descripcion || '');
  const [metaKeywords, setMetaKeywords] = useState(proyecto?.meta_keywords?.join(', ') || '');

  // Auto-generar slug desde título
  const generarSlug = (texto: string) => {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTituloChange = (valor: string) => {
    setTitulo(valor);
    if (!proyecto) {
      // Solo auto-generar slug para nuevos proyectos
      setSlug(generarSlug(valor));
    }
  };

  // Servicios disponibles
  const serviciosDisponibles = [
    'Dirección de Obra',
    'Gestión de Proyectos',
    'Reformas Integrales',
    'Licencias y Permisos',
    'Asesoramiento Técnico',
    'Diseño de Espacios'
  ];

  const toggleServicio = (servicio: string) => {
    setServicios(prev =>
      prev.includes(servicio)
        ? prev.filter(s => s !== servicio)
        : [...prev, servicio]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        titulo,
        slug,
        descripcion_corta: descripcionCorta,
        descripcion_completa: descripcionCompleta,
        ubicacion,
        ano,
        superficie,
        presupuesto: presupuesto || undefined,
        duracion: duracion || undefined,
        servicios,
        estado,
        imagen_principal: imagenPrincipal,
        cliente: cliente || undefined,
        publicado,
        destacado,
        meta_descripcion: metaDescripcion || undefined,
        meta_keywords: metaKeywords ? metaKeywords.split(',').map(k => k.trim()) : undefined,
      };

      if (proyecto) {
        // Actualizar
        await updateProyecto(proyecto.id, data);
        toast.success('Proyecto actualizado correctamente');
      } else {
        // Crear
        await createProyecto(data);
        toast.success('Proyecto creado correctamente');
      }

      setTimeout(() => {
        router.push('/administrator/proyectos');
        router.refresh();
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar el proyecto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Información Básica */}
        <div>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            Información Básica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título del Proyecto *
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => handleTituloChange(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Reforma Integral Vivienda Centro Murcia"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-sm"
                placeholder="reforma-integral-centro-murcia"
              />
              <p className="text-xs text-gray-500 mt-1">
                URL: /proyectos/{slug || 'slug-del-proyecto'}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción Corta *
              </label>
              <textarea
                value={descripcionCorta}
                onChange={(e) => setDescripcionCorta(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Resumen breve del proyecto (aparece en listados)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción Completa (HTML) *
              </label>
              <textarea
                value={descripcionCompleta}
                onChange={(e) => setDescripcionCompleta(e.target.value)}
                required
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-sm"
                placeholder="<h2>Descripción del Proyecto</h2><p>Contenido detallado...</p>"
              />
              <p className="text-xs text-gray-500 mt-1">
                Puedes usar HTML para dar formato al contenido
              </p>
            </div>
          </div>
        </div>

        {/* Detalles del Proyecto */}
        <div>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            Detalles del Proyecto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Centro Histórico, Murcia"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cliente
              </label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Privado / Nombre del cliente"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Año *
              </label>
              <input
                type="number"
                value={ano}
                onChange={(e) => setAno(parseInt(e.target.value))}
                required
                min="2000"
                max="2100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Superficie (m²) *
              </label>
              <input
                type="number"
                value={superficie}
                onChange={(e) => setSuperficie(parseInt(e.target.value))}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Presupuesto (€)
              </label>
              <input
                type="number"
                value={presupuesto}
                onChange={(e) => setPresupuesto(parseInt(e.target.value))}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Opcional"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duración (meses)
              </label>
              <input
                type="number"
                value={duracion}
                onChange={(e) => setDuracion(parseInt(e.target.value))}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Opcional"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estado *
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="completado">Completado</option>
                <option value="en_proceso">En Proceso</option>
                <option value="planificacion">Planificación</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Imagen Principal (URL) *
              </label>
              <input
                type="url"
                value={imagenPrincipal}
                onChange={(e) => setImagenPrincipal(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            Servicios Realizados *
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {serviciosDisponibles.map((servicio) => (
              <label
                key={servicio}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={servicios.includes(servicio)}
                  onChange={() => toggleServicio(servicio)}
                  className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{servicio}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            SEO y Metadatos
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Descripción
              </label>
              <textarea
                value={metaDescripcion}
                onChange={(e) => setMetaDescripcion(e.target.value)}
                rows={2}
                maxLength={160}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Descripción para buscadores (máx. 160 caracteres)"
              />
              <p className="text-xs text-gray-500 mt-1">
                {metaDescripcion.length}/160 caracteres
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Palabras Clave (separadas por coma)
              </label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="reforma, murcia, vivienda, integral"
              />
            </div>
          </div>
        </div>

        {/* Opciones de Publicación */}
        <div>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            Publicación
          </h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={publicado}
                onChange={(e) => setPublicado(e.target.checked)}
                className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-semibold text-gray-900">Publicar proyecto</span>
                <p className="text-xs text-gray-500">El proyecto será visible en el sitio web</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={destacado}
                onChange={(e) => setDestacado(e.target.checked)}
                className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-semibold text-gray-900">Proyecto destacado</span>
                <p className="text-xs text-gray-500">Aparecerá en la sección destacada</p>
              </div>
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : proyecto ? 'Actualizar Proyecto' : 'Crear Proyecto'}
          </button>
        </div>
      </form>
    </>
  );
}

