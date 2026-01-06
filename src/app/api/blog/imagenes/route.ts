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
    console.log('[GET] Listando imágenes del bucket:', BUCKET_NAME);
    const supabase = getSupabaseAdmin();
    
    const { data: files, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) {
      console.error('[GET] Error listando imágenes:', error);
      return NextResponse.json(
        { error: 'Error al listar imágenes' },
        { status: 500 }
      );
    }

    console.log(`[GET] Encontrados ${files?.length || 0} archivos en total`);

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

        console.log(`[GET] Archivo: ${file.name}, tamaño: ${file.metadata?.size || 0} bytes`);

        return {
          nombre: file.name,
          url: data.publicUrl,
          tamano: file.metadata?.size || 0,
          fecha: file.created_at || new Date().toISOString(),
          actualizado: file.updated_at || file.created_at || new Date().toISOString(),
        };
      });

    console.log(`[GET] Devolviendo ${imagenesConUrl.length} imágenes válidas`);

    return NextResponse.json({ imagenes: imagenesConUrl });
  } catch (error: any) {
    console.error('[GET] Error inesperado al listar imágenes:', error);
    console.error('[GET] Stack trace:', error.stack);
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
      console.error('[UPLOAD] No se proporcionó archivo');
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }

    console.log(`[UPLOAD] Iniciando subida: ${file.name}, tipo: ${file.type}, tamaño: ${file.size} bytes`);

    // Validar nombre de archivo
    if (!file.name || file.name.trim().length === 0) {
      console.error('[UPLOAD] Nombre de archivo vacío');
      return NextResponse.json(
        { error: 'El archivo debe tener un nombre válido' },
        { status: 400 }
      );
    }

    // Validar que sea una imagen (por tipo MIME y extensión)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(file.type) || !fileExtension || !validExtensions.includes(fileExtension)) {
      console.error(`[UPLOAD] Tipo de archivo no válido: ${file.type}, extensión: ${fileExtension}`);
      return NextResponse.json(
        { error: `El archivo debe ser una imagen válida (JPG, PNG, GIF, WEBP). Recibido: ${file.type}` },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      console.error(`[UPLOAD] Archivo demasiado grande: ${sizeMB}MB (máx: 5MB)`);
      return NextResponse.json(
        { error: `La imagen es demasiado grande (${sizeMB}MB). Máximo: 5MB` },
        { status: 400 }
      );
    }

    // Crear un nombre de archivo único y sanitizado
    const timestamp = Date.now();
    
    // Obtener extensión del archivo
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    
    // Obtener nombre base sin extensión
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    
    // Remover caracteres especiales, tildes, espacios
    let sanitizedName = baseName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Quitar tildes
      .replace(/[^a-zA-Z0-9._-]/g, '-') // Reemplazar caracteres especiales por guiones
      .replace(/--+/g, '-') // Evitar guiones múltiples
      .replace(/^-+|-+$/g, '') // Quitar guiones al inicio y final
      .toLowerCase();
    
    // Limitar longitud del nombre (máximo 50 caracteres sin timestamp ni extensión)
    // Supabase Storage tiene un límite de ~100 caracteres para nombres de archivo
    const maxLength = 50;
    if (sanitizedName.length > maxLength) {
      sanitizedName = sanitizedName.substring(0, maxLength);
      console.log(`[UPLOAD] Nombre acortado de ${baseName.length} a ${maxLength} caracteres`);
    }
    
    // Si el nombre quedó vacío después de la sanitización, usar un nombre genérico
    if (!sanitizedName || sanitizedName.length === 0) {
      sanitizedName = 'image';
      console.log('[UPLOAD] Nombre vacío después de sanitización, usando "image"');
    }
    
    const filename = `${timestamp}-${sanitizedName}.${extension}`;

    console.log(`[UPLOAD] Nombre original: "${file.name}" (${file.name.length} chars)`);
    console.log(`[UPLOAD] Nombre final: "${filename}" (${filename.length} chars)`);

    // Convertir el archivo a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    console.log(`[UPLOAD] ArrayBuffer creado: ${arrayBuffer.byteLength} bytes`);

    // Verificar si ya existe un archivo con ese nombre
    const { data: existingFile } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        search: filename,
      });

    if (existingFile && existingFile.length > 0) {
      console.warn(`[UPLOAD] El archivo ${filename} ya existe, se sobrescribirá`);
    }

    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, arrayBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true, // Permitir sobrescribir si existe
      });

    if (error) {
      console.error('[UPLOAD] Error de Supabase Storage:', error);
      console.error('[UPLOAD] Detalles del error:', JSON.stringify(error, null, 2));
      
      // Mensajes de error más específicos
      let errorMessage = error.message;
      if (error.message.includes('row-level security')) {
        errorMessage = 'Error de permisos. Contacta con el administrador.';
      } else if (error.message.includes('size')) {
        errorMessage = 'El archivo es demasiado grande para Supabase Storage.';
      } else if (error.message.includes('duplicate')) {
        errorMessage = 'Ya existe un archivo con ese nombre.';
      }
      
      return NextResponse.json(
        { error: `Error al subir la imagen: ${errorMessage}` },
        { status: 500 }
      );
    }

    console.log('[UPLOAD] Subida exitosa a Supabase:', data);

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    console.log(`[UPLOAD] URL pública generada: ${publicUrlData.publicUrl}`);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      filename,
      message: 'Imagen subida correctamente',
    });
  } catch (error: any) {
    console.error('[UPLOAD] Error inesperado:', error);
    console.error('[UPLOAD] Stack trace:', error.stack);
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
