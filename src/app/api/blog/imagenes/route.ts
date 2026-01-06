import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const BUCKET_NAME = 'blog-images';

// Cliente de Supabase para Storage
// Usamos la service role key para bypasear RLS en Storage
// La seguridad está garantizada por el middleware del admin panel
const getSupabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // Si no hay service key, usar la anon key (para desarrollo)
  const key = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error('Faltan variables de entorno de Supabase');
  }
  
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// GET: Listar todas las imágenes del bucket de Supabase
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    
    const { data: files, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) {
      console.error('Error listando imágenes:', error);
      return NextResponse.json(
        { error: 'Error al listar imágenes' },
        { status: 500 }
      );
    }

    // Mapear a URLs públicas
    const imagenesConUrl = (files || [])
      .filter((file) => {
        const ext = file.name.toLowerCase().split('.').pop();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
      })
      .map((file) => {
        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(file.name);

        return {
          nombre: file.name,
          url: data.publicUrl,
          fecha: file.created_at || new Date().toISOString(),
        };
      });

    return NextResponse.json({ imagenes: imagenesConUrl });
  } catch (error: any) {
    console.error('Error al listar imágenes:', error);
    return NextResponse.json(
      { error: error.message || 'Error al listar imágenes' },
      { status: 500 }
    );
  }
}

// POST: Subir una nueva imagen a Supabase Storage
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }

    // Validar que sea una imagen
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen (JPG, PNG, GIF, WEBP)' },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'La imagen no puede superar los 5MB' },
        { status: 400 }
      );
    }

    // Crear un nombre de archivo único
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const filename = `${timestamp}-${originalName}`;

    // Convertir el archivo a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, arrayBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error subiendo a Supabase:', error);
      return NextResponse.json(
        { error: `Error al subir la imagen: ${error.message}` },
        { status: 500 }
      );
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      filename,
      message: 'Imagen subida correctamente',
    });
  } catch (error: any) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { error: `Error al subir la imagen: ${error.message || 'Error desconocido'}` },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar una imagen de Supabase Storage
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || searchParams.get('nombre');

    if (!filename) {
      return NextResponse.json(
        { error: 'No se proporcionó el nombre del archivo' },
        { status: 400 }
      );
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filename]);

    if (error) {
      console.error('Error eliminando imagen:', error);
      return NextResponse.json(
        { error: `Error al eliminar la imagen: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Imagen eliminada correctamente',
    });
  } catch (error: any) {
    console.error('Error al eliminar imagen:', error);
    return NextResponse.json(
      { error: `Error al eliminar la imagen: ${error.message || 'Error desconocido'}` },
      { status: 500 }
    );
  }
}
