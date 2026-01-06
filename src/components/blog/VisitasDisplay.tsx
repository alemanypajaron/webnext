'use client';

import { useEffect, useState } from 'react';

interface VisitasDisplayProps {
  articuloId: string;
  visitasIniciales: number;
}

export default function VisitasDisplay({ articuloId, visitasIniciales }: VisitasDisplayProps) {
  const [visitas, setVisitas] = useState(visitasIniciales);

  useEffect(() => {
    // Actualizar visitas cada 5 segundos
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/blog/visitas?articuloId=${articuloId}`, {
          cache: 'no-store',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.visitas !== undefined) {
            setVisitas(data.visitas);
          }
        }
      } catch (error) {
        // Silenciosamente fallar
        console.error('Error al obtener visitas:', error);
      }
    }, 5000); // Cada 5 segundos

    return () => clearInterval(interval);
  }, [articuloId]);

  if (visitas === 0) return null;

  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="mr-2"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {visitas} visitas
    </div>
  );
}

