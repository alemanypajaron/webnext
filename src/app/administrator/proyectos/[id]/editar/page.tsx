import { createClient } from '@/lib/supabase-server';
import { redirect, notFound } from 'next/navigation';
import ProyectoForm from '@/components/admin/ProyectoForm';

interface Props {
  params: { id: string };
}

export default async function EditarProyectoPage({ params }: Props) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/administrator/login');
  }

  // Obtener el proyecto
  const { data: proyecto, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !proyecto) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Editar Proyecto
        </h1>
        <p className="text-gray-600">
          Modifica los campos que desees actualizar
        </p>
      </div>

      <ProyectoForm 
        proyecto={{
          id: proyecto.id,
          titulo: proyecto.titulo,
          slug: proyecto.slug,
          descripcion_corta: proyecto.descripcion_corta,
          descripcion_completa: proyecto.descripcion_completa,
          ubicacion: proyecto.ubicacion,
          ano: proyecto.ano,
          superficie: proyecto.superficie,
          presupuesto: proyecto.presupuesto,
          duracion: proyecto.duracion,
          servicios: proyecto.servicios || [],
          estado: proyecto.estado,
          imagen_principal: proyecto.imagen_principal,
          cliente: proyecto.cliente,
          publicado: proyecto.publicado,
          destacado: proyecto.destacado,
          meta_descripcion: proyecto.meta_descripcion || '',
          meta_keywords: proyecto.meta_keywords || [],
        }}
      />
    </div>
  );
}

