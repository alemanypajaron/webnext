'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import RichTextEditor from './RichTextEditor';
import { createBlogArticulo, updateBlogArticulo } from '@/app/actions/admin';

interface Categoria {
  id: string;
  nombre: string;
  color: string;
}

interface BlogArticuloFormProps {
  categorias: Categoria[];
  articulo?: {
    id: string;
    titulo: string;
    slug: string;
    resumen: string;
    contenido: string;
    autor: string;
    imagen_destacada: string;
    categoria_id: string;
    publicado: boolean;
    destacado: boolean;
    tags: string[];
    meta_descripcion?: string;
    meta_keywords?: string[];
  };
}

export default function BlogArticuloForm({ categorias, articulo }: BlogArticuloFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: articulo?.titulo || '',
    slug: articulo?.slug || '',
    resumen: articulo?.resumen || '',
    contenido: articulo?.contenido || '',
    autor: articulo?.autor || 'Alemán y Pajarón',
    imagen_destacada: articulo?.imagen_destacada || '',
    categoria_id: articulo?.categoria_id || '',
    publicado: articulo?.publicado ?? false,
    destacado: articulo?.destacado ?? false,
    tags: articulo?.tags?.join(', ') || '',
    meta_descripcion: articulo?.meta_descripcion || '',
    meta_keywords: articulo?.meta_keywords?.join(', ') || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Auto-generar slug desde el título
      if (name === 'titulo' && !articulo) {
        const slug = value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        setFormData((prev) => ({ ...prev, slug }));
      }
    }
  };

  const handleContentChange = (html: string) => {
    setFormData((prev) => ({ ...prev, contenido: html }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validaciones
      if (!formData.titulo.trim()) {
        toast.error('El título es obligatorio');
        setLoading(false);
        return;
      }
      if (!formData.slug.trim()) {
        toast.error('El slug es obligatorio');
        setLoading(false);
        return;
      }
      if (!formData.resumen.trim()) {
        toast.error('El resumen es obligatorio');
        setLoading(false);
        return;
      }
      if (!formData.contenido.trim() || formData.contenido === '<p></p>') {
        toast.error('El contenido es obligatorio');
        setLoading(false);
        return;
      }
      if (!formData.imagen_destacada.trim()) {
        toast.error('La imagen destacada es obligatoria');
        setLoading(false);
        return;
      }
      if (!formData.categoria_id) {
        toast.error('Selecciona una categoría');
        setLoading(false);
        return;
      }

      // Preparar datos
      const data = {
        titulo: formData.titulo.trim(),
        slug: formData.slug.trim(),
        resumen: formData.resumen.trim(),
        contenido: formData.contenido,
        autor: formData.autor.trim(),
        imagen_destacada: formData.imagen_destacada.trim(),
        categoria_id: formData.categoria_id,
        publicado: formData.publicado,
        destacado: formData.destacado,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        meta_descripcion: formData.meta_descripcion.trim() || undefined,
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()).filter(Boolean) : undefined,
      };

      if (articulo) {
        // Actualizar
        await updateBlogArticulo(articulo.id, data);
        toast.success('Artículo actualizado correctamente');
      } else {
        // Crear
        await createBlogArticulo(data);
        toast.success('Artículo creado correctamente');
      }

      router.push('/administrator/blog');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar el artículo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información básica */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-heading font-bold text-primary mb-4">
          Información Básica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Título */}
          <div className="md:col-span-2">
            <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="Ej: Licencias necesarias para reformar tu vivienda en Murcia"
            />
          </div>

          {/* Slug */}
          <div className="md:col-span-2">
            <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-mono text-sm"
              placeholder="licencias-necesarias-reforma-vivienda-murcia"
            />
            <p className="text-xs text-gray-500 mt-1">
              La URL será: /blog/{formData.slug || 'tu-slug'}
            </p>
          </div>

          {/* Autor */}
          <div>
            <label htmlFor="autor" className="block text-sm font-semibold text-gray-700 mb-2">
              Autor *
            </label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="categoria_id" className="block text-sm font-semibold text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              id="categoria_id"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Resumen */}
          <div className="md:col-span-2">
            <label htmlFor="resumen" className="block text-sm font-semibold text-gray-700 mb-2">
              Resumen *
            </label>
            <textarea
              id="resumen"
              name="resumen"
              value={formData.resumen}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
              placeholder="Breve descripción del artículo (aparecerá en las tarjetas del blog)"
            />
          </div>

          {/* Imagen destacada */}
          <div className="md:col-span-2">
            <label htmlFor="imagen_destacada" className="block text-sm font-semibold text-gray-700 mb-2">
              URL Imagen Destacada *
            </label>
            <input
              type="url"
              id="imagen_destacada"
              name="imagen_destacada"
              value={formData.imagen_destacada}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="https://images.unsplash.com/photo-..."
            />
            {formData.imagen_destacada && (
              <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={formData.imagen_destacada}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-heading font-bold text-primary mb-4">
          Contenido del Artículo *
        </h2>
        <RichTextEditor
          content={formData.contenido}
          onChange={handleContentChange}
          placeholder="Escribe el contenido completo del artículo aquí..."
        />
      </div>

      {/* Opciones de publicación */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-heading font-bold text-primary mb-4">
          Opciones de Publicación
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="publicado"
              name="publicado"
              checked={formData.publicado}
              onChange={handleChange}
              className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
            />
            <label htmlFor="publicado" className="ml-3 text-sm font-medium text-gray-700">
              Publicar artículo (visible en el blog público)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="destacado"
              name="destacado"
              checked={formData.destacado}
              onChange={handleChange}
              className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
            />
            <label htmlFor="destacado" className="ml-3 text-sm font-medium text-gray-700">
              Marcar como destacado (aparecerá en la home)
            </label>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-heading font-bold text-primary mb-4">
          Tags y Etiquetas
        </h2>
        <div>
          <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
            Tags (separados por comas)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="reforma, murcia, licencias, permisos"
          />
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-heading font-bold text-primary mb-4">
          SEO & Metadatos
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="meta_descripcion" className="block text-sm font-semibold text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              id="meta_descripcion"
              name="meta_descripcion"
              value={formData.meta_descripcion}
              onChange={handleChange}
              rows={2}
              maxLength={160}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
              placeholder="Descripción para Google (max 160 caracteres)"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.meta_descripcion.length}/160 caracteres
            </p>
          </div>
          <div>
            <label htmlFor="meta_keywords" className="block text-sm font-semibold text-gray-700 mb-2">
              Meta Keywords (separadas por comas)
            </label>
            <input
              type="text"
              id="meta_keywords"
              name="meta_keywords"
              value={formData.meta_keywords}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="palabras, clave, seo"
            />
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <Link
          href="/administrator/blog"
          className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all font-medium"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? 'Guardando...' : articulo ? 'Actualizar Artículo' : 'Crear Artículo'}
        </button>
      </div>
    </form>
  );
}

