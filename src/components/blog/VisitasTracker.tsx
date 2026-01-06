'use client';

import { useEffect } from 'react';

interface VisitasTrackerProps {
  articuloId: string;
  slug: string;
}

export default function VisitasTracker({ articuloId, slug }: VisitasTrackerProps) {
  useEffect(() => {
    // Función para incrementar visitas
    const incrementarVisitas = async () => {
      try {
        // Verificar si ya visitó este artículo en esta sesión
        const visitadosKey = 'articulos_visitados';
        const visitados = JSON.parse(sessionStorage.getItem(visitadosKey) || '[]');
        
        // Si ya visitó este artículo en esta sesión, no incrementar
        if (visitados.includes(articuloId)) {
          return;
        }

        // Llamar al endpoint para incrementar visitas
        const response = await fetch('/api/blog/visitas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ articuloId, slug }),
        });

        if (response.ok) {
          // Marcar como visitado en esta sesión
          visitados.push(articuloId);
          sessionStorage.setItem(visitadosKey, JSON.stringify(visitados));
        }
      } catch (error) {
        // Silenciosamente fallar - no queremos interrumpir la experiencia del usuario
        console.error('Error al registrar visita:', error);
      }
    };

    // Incrementar después de 3 segundos (para evitar bots y registrar visitas "reales")
    const timer = setTimeout(incrementarVisitas, 3000);

    return () => clearTimeout(timer);
  }, [articuloId, slug]);

  // Este componente no renderiza nada
  return null;
}


