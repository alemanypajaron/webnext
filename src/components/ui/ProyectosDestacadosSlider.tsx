'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Proyecto } from '@/lib/supabase';

interface ProyectosDestacadosSliderProps {
  proyectos: Proyecto[];
}

export default function ProyectosDestacadosSlider({ proyectos }: ProyectosDestacadosSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!proyectos || proyectos.length === 0) return null;

  // Mostrar 3 proyectos a la vez en desktop, 1 en mobile
  const proyectosVisibles = 3;
  const maxIndex = Math.max(0, proyectos.length - proyectosVisibles);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="relative">
      {/* Header de la sección */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
            Proyectos Destacados
          </h2>
          <p className="text-gray-600">
            Nuestros trabajos más representativos en Murcia
          </p>
        </div>

        {/* Controles de navegación */}
        {proyectos.length > proyectosVisibles && (
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-3 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary transition-all shadow-md hover:shadow-lg"
              aria-label="Anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-3 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary transition-all shadow-md hover:shadow-lg"
              aria-label="Siguiente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">
        {/* Desktop: 3 columnas */}
        <div
          className="hidden md:grid grid-cols-3 gap-8 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3 + 8 / 3)}%)`,
          }}
        >
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>

        {/* Mobile: 1 columna con scroll */}
        <div className="md:hidden grid grid-cols-1 gap-6">
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      </div>

      {/* Indicadores (solo mobile) */}
      {proyectos.length > 1 && (
        <div className="md:hidden flex justify-center gap-2 mt-6">
          {proyectos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente de tarjeta de proyecto
function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <Link
      href={`/proyectos/${proyecto.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border-2 border-accent/20 hover:border-accent"
    >
      {/* Imagen con badge destacado */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={proyecto.imagen_principal}
          alt={proyecto.titulo}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        
        {/* Badge destacado */}
        <div className="absolute top-4 right-4">
          <div className="bg-accent px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-primary"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-xs font-bold text-primary">
              Destacado
            </span>
          </div>
        </div>

        {/* Año */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-white text-primary shadow-lg">
            {proyecto.ano}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-2xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
          {proyecto.titulo}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mr-1.5"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {proyecto.ubicacion}
        </div>
        
        <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">
          {proyecto.descripcion_corta}
        </p>
        
        {/* Detalles en grid */}
        {(proyecto.superficie || proyecto.duracion) && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {proyecto.superficie && (
              <div className="bg-accent/10 px-3 py-2 rounded-lg">
                <span className="text-xs text-gray-500 block">Superficie</span>
                <p className="font-bold text-primary text-sm">{proyecto.superficie}</p>
              </div>
            )}
            {proyecto.duracion && (
              <div className="bg-accent/10 px-3 py-2 rounded-lg">
                <span className="text-xs text-gray-500 block">Duración</span>
                <p className="font-bold text-primary text-sm">{proyecto.duracion}</p>
              </div>
            )}
          </div>
        )}
        
        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-accent font-bold group-hover:translate-x-2 transition-transform flex items-center gap-2">
            Ver proyecto completo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
