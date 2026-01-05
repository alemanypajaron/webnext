import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import BlogArticuloForm from '@/components/admin/BlogArticuloForm';

export default async function NuevoBlogArticuloPage() {
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/administrator/login');
  }

  // Obtener categorías para el selector
  const { data: categorias } = await supabase
    .from('categorias_blog')
    .select('*')
    .order('nombre', { ascending: true });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Crear Nuevo Artículo
        </h1>
        <p className="text-gray-600">
          Completa todos los campos para publicar un nuevo artículo en el blog
        </p>
      </div>

      <BlogArticuloForm categorias={categorias || []} />
    </div>
  );
}

