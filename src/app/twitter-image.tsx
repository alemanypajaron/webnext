import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function TwitterImage(_req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          background: 'linear-gradient(135deg, #0A2230 0%, #050F16 100%)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>ALEMÁN Y PAJARÓN</div>
        <div style={{ marginTop: 18, fontSize: 40, fontWeight: 700, color: '#F9B513' }}>
          Arquitectura Técnica en Murcia
        </div>
        <div style={{ marginTop: 24, fontSize: 30, fontWeight: 500, opacity: 0.95, maxWidth: 980 }}>
          Dirección de obra · Gestión de proyectos · Licencias · Reformas integrales
        </div>
      </div>
    ),
    size
  );
}


