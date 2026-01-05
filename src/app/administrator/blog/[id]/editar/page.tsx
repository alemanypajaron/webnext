import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { redirect, notFound } from 'next/navigation';
import BlogArticuloForm from '@/components/admin/BlogArticuloForm';
import { createClient } from '@/lib/supabase-server';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarBlogArticuloPage({ params }: Props) {
  const { id } = await params;
  
  // Verificar autenticación usando el cliente con cookies
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    redirect('/administrator/login');
  }

  // Usar cliente admin para leer datos (bypasea RLS)
  const supabase = getSupabaseAdmin();

  // Obtener el artículo
  const { data: articulo, error } = await supabase
    .from('blog_articulos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !articulo) {
    notFound();
  }

  // Obtener categorías
  const { data: categorias } = await supabase
    .from('categorias_blog')
    .select('*')
    .order('nombre', { ascending: true });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Editar Artículo
        </h1>
        <p className="text-gray-600">
          Modifica los campos que desees actualizar
        </p>
      </div>

      <BlogArticuloForm 
        categorias={categorias || []} 
        articulo={{
          id: articulo.id,
          titulo: articulo.titulo,
          slug: articulo.slug,
          resumen: articulo.resumen,
          contenido: articulo.contenido,
          autor: articulo.autor,
          imagen_destacada: articulo.imagen_destacada,
          categoria_id: articulo.categoria_id,
          publicado: articulo.publicado,
          destacado: articulo.destacado,
          tags: articulo.tags || [],
          meta_descripcion: articulo.meta_descripcion || '',
          meta_keywords: articulo.meta_keywords || [],
        }}
      />
    </div>
  );
}
