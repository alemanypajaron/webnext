import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// GET: Listar todas las imágenes en /public/images/blog
export async function GET() {
  try {
    const blogImagesPath = join(process.cwd(), 'public', 'images', 'blog');
    
    // Crear la carpeta si no existe
    if (!existsSync(blogImagesPath)) {
      mkdirSync(blogImagesPath, { recursive: true });
      return NextResponse.json({ imagenes: [] });
    }

    // Leer todos los archivos de la carpeta
    const files = await readdir(blogImagesPath);
    
    // Filtrar solo imágenes (jpg, jpeg, png, gif, webp)
    const imagenes = files.filter(file => {
      const ext = file.toLowerCase().split('.').pop();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
    });

    // Mapear a URLs públicas
    const imagenesConUrl = imagenes.map(filename => ({
      nombre: filename,
      url: `/images/blog/${filename}`,
      fecha: new Date().toISOString(), // Podrías usar fs.stat para obtener la fecha real
    }));

    return NextResponse.json({ imagenes: imagenesConUrl });
  } catch (error) {
    console.error('Error al listar imágenes:', error);
    return NextResponse.json(
      { error: 'Error al listar imágenes' },
      { status: 500 }
    );
  }
}

// POST: Subir una nueva imagen
export async function POST(request: NextRequest) {
  try {
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

    // Convertir el archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ruta donde se guardará
    const blogImagesPath = join(process.cwd(), 'public', 'images', 'blog');
    
    // Crear la carpeta si no existe
    if (!existsSync(blogImagesPath)) {
      mkdirSync(blogImagesPath, { recursive: true });
    }

    const filepath = join(blogImagesPath, filename);

    // Guardar el archivo
    await writeFile(filepath, buffer);

    // Devolver la URL pública
    const url = `/images/blog/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename,
      message: 'Imagen subida correctamente',
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { error: 'Error al subir la imagen' },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar una imagen (opcional, por si quieres implementarlo)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'No se proporcionó el nombre del archivo' },
        { status: 400 }
      );
    }

    const filepath = join(process.cwd(), 'public', 'images', 'blog', filename);

    // Aquí podrías implementar la eliminación del archivo
    // Por seguridad, solo lo haremos si el usuario es admin (verificar sesión)

    return NextResponse.json({
      success: true,
      message: 'Funcionalidad de eliminación pendiente de implementar',
    });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la imagen' },
      { status: 500 }
    );
  }
}

