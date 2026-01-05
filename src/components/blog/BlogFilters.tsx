'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogArticulo, CategoríaBlog } from '@/lib/supabase';

interface BlogFiltersProps {
  articulos: BlogArticulo[];
  categorias: CategoríaBlog[];
}

type SortOption = 'recientes' | 'antiguos' | 'populares';

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogFilters({ articulos, categorias }: BlogFiltersProps) {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [ordenamiento, setOrdenamiento] = useState<SortOption>('recientes');

  // Filtrar y ordenar artículos
  const articulosFiltrados = useMemo(() => {
    let resultado = [...articulos];

    // Filtrar por categoría
    if (categoriaActiva) {
      resultado = resultado.filter(
        (art) => art.categoria?.id === categoriaActiva
      );
    }

    // Ordenar
    resultado.sort((a, b) => {
      switch (ordenamiento) {
        case 'recientes':
          return new Date(b.fecha_publicacion || b.created_at!).getTime() - 
                 new Date(a.fecha_publicacion || a.created_at!).getTime();
        case 'antiguos':
          return new Date(a.fecha_publicacion || a.created_at!).getTime() - 
                 new Date(b.fecha_publicacion || b.created_at!).getTime();
        case 'populares':
          return (b.visitas || 0) - (a.visitas || 0);
        default:
          return 0;
      }
    });

    return resultado;
  }, [articulos, categoriaActiva, ordenamiento]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Contenido principal */}
      <div className="flex-1">
        {/* Filtros de categorías (horizontal) */}
        {categorias.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setCategoriaActiva(null)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                categoriaActiva === null
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos los artículos
            </button>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  categoriaActiva === categoria.id
                    ? 'shadow-lg scale-105'
                    : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor:
                    categoriaActiva === categoria.id
                      ? categoria.color
                      : `${categoria.color}20`,
                  color:
                    categoriaActiva === categoria.id
                      ? '#ffffff'
                      : categoria.color || '#F9B513',
                  border: `2px solid ${categoria.color}`,
                }}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        )}

        {/* Contador de resultados */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {articulosFiltrados.length}{' '}
            {articulosFiltrados.length === 1 ? 'artículo' : 'artículos'}
            {categoriaActiva && (
              <span className="text-accent ml-1">
                en{' '}
                {categorias.find((c) => c.id === categoriaActiva)?.nombre}
              </span>
            )}
          </p>
        </div>

        {/* Grid de artículos */}
        {articulosFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mx-auto mb-4 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p className="text-xl text-gray-600 mb-2">No se encontraron artículos</p>
            <p className="text-gray-500">Prueba con otra categoría o filtro</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articulosFiltrados.map((articulo) => (
              <Link
                key={articulo.id}
                href={`/blog/${articulo.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Imagen destacada */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={articulo.imagen_destacada}
                    alt={articulo.titulo}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

                  {/* Categoría */}
                  {articulo.categoria && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary shadow-md">
                        {articulo.categoria.nombre}
                      </span>
                    </div>
                  )}

                  {/* Badge destacado */}
                  {articulo.destacado && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-accent"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-xs font-semibold text-primary">
                          Destacado
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {articulo.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {articulo.resumen}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {formatearFecha(
                        articulo.fecha_publicacion || articulo.created_at!
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {articulo.tiempo_lectura || 5} min
                    </div>
                    {articulo.visitas && articulo.visitas > 0 && (
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        {articulo.visitas}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar derecho con filtros */}
      <aside className="lg:w-80 space-y-6">
        {/* Ordenar por */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-heading font-bold text-primary mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Ordenar por
          </h3>
          <div className="space-y-2">
            {[
              { value: 'recientes', label: 'Más recientes', icon: '🆕' },
              { value: 'antiguos', label: 'Más antiguos', icon: '📅' },
              { value: 'populares', label: 'Más populares', icon: '🔥' },
            ].map((opcion) => (
              <button
                key={opcion.value}
                onClick={() => setOrdenamiento(opcion.value as SortOption)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  ordenamiento === opcion.value
                    ? 'bg-accent text-primary font-semibold shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{opcion.icon}</span>
                <span>{opcion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categorías (sidebar) */}
        {categorias.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              Categorías
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setCategoriaActiva(null)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  categoriaActiva === null
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Todas ({articulos.length})
              </button>
              {categorias.map((categoria) => {
                const count = articulos.filter(
                  (art) => art.categoria?.id === categoria.id
                ).length;
                return (
                  <button
                    key={categoria.id}
                    onClick={() => setCategoriaActiva(categoria.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center justify-between ${
                      categoriaActiva === categoria.id
                        ? 'font-semibold shadow-md'
                        : 'hover:shadow-sm'
                    }`}
                    style={{
                      backgroundColor:
                        categoriaActiva === categoria.id
                          ? categoria.color
                          : `${categoria.color}10`,
                      color:
                        categoriaActiva === categoria.id
                          ? '#ffffff'
                          : categoria.color || '#F9B513',
                    }}
                  >
                    <span>{categoria.nombre}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        categoriaActiva === categoria.id
                          ? 'bg-white/20'
                          : 'bg-white/40'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-6 shadow-lg text-white">
          <h3 className="text-lg font-heading font-bold mb-2">
            ¿Necesitas ayuda con tu proyecto?
          </h3>
          <p className="text-sm text-white/90 mb-4">
            Contacta con nosotros y te ayudaremos con tu reforma en Murcia
          </p>
          <Link
            href="/contacto"
            className="block w-full text-center px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all"
          >
            Contactar
          </Link>
        </div>
      </aside>
    </div>
  );
}

