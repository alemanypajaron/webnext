import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase (anon) para operaciones públicas
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { articuloId, slug } = await request.json();

    if (!articuloId && !slug) {
      return NextResponse.json(
        { error: 'Se requiere articuloId o slug' },
        { status: 400 }
      );
    }

    // Incrementar visitas usando la función PostgreSQL
    const { error } = await supabase.rpc('incrementar_visitas_articulo', {
      articulo_id: articuloId
    });

    if (error) {
      console.error('Error al incrementar visitas:', error);
      return NextResponse.json(
        { error: 'Error al incrementar visitas' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error general:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

