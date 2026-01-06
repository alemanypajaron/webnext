import { getSupabaseAdmin } from '@/lib/supabase-admin';
import MultimediaGallery from '@/components/admin/MultimediaGallery';

export const metadata = {
  title: 'Gestor Multimedia',
};

export default async function MultimediaPage() {
  const supabase = getSupabaseAdmin();

  console.log('[MULTIMEDIA PAGE] Cargando página de multimedia');

  // Obtener todas las imágenes del bucket
  const { data: files, error } = await supabase.storage
    .from('blog-images')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error) {
    console.error('[MULTIMEDIA PAGE] Error al obtener imágenes:', error);
  } else {
    console.log(`[MULTIMEDIA PAGE] Encontrados ${files?.length || 0} archivos`);
  }

  // Obtener URLs públicas para cada imagen
  const imagenes = files?.map((file) => {
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(file.name);

    console.log(`[MULTIMEDIA PAGE] Imagen: ${file.name}, tamaño: ${file.metadata?.size || 0} bytes`);

    return {
      name: file.name,
      url: data.publicUrl,
      size: file.metadata?.size || 0,
      createdAt: file.created_at,
      lastModified: file.updated_at,
    };
  }) || [];

  console.log(`[MULTIMEDIA PAGE] Total imágenes cargadas: ${imagenes.length}`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Gestor Multimedia</h1>
            <p className="text-gray-600 mt-1">
              Gestiona todas las imágenes subidas a Supabase Storage
            </p>
          </div>
        </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Imágenes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {imagenes.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Espacio Usado</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {(
                  imagenes.reduce((sum, img) => sum + img.size, 0) /
                  1024 /
                  1024
                ).toFixed(2)}{' '}
                MB
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Límite de Bucket</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                100 MB <span className="text-sm text-gray-500">/ 1 GB</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

        {/* Galería */}
        <MultimediaGallery imagenes={imagenes} />
      </div>
    </div>
  );
}

