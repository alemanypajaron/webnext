import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase (anon) para operaciones públicas
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: Obtener número de visitas de un artículo
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const articuloId = searchParams.get('articuloId');

    if (!articuloId) {
      return NextResponse.json(
        { error: 'Se requiere articuloId' },
        { status: 400 }
      );
    }

    // Obtener visitas del artículo
    const { data, error } = await supabase
      .from('blog_articulos')
      .select('visitas')
      .eq('id', articuloId)
      .single();

    if (error) {
      console.error('Error al obtener visitas:', error);
      return NextResponse.json(
        { error: 'Error al obtener visitas' },
        { status: 500 }
      );
    }

    return NextResponse.json({ visitas: data?.visitas || 0 }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error general:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST: Incrementar visitas de un artículo
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

