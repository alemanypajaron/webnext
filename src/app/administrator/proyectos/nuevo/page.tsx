import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import ProyectoForm from '@/components/admin/ProyectoForm';

export default async function NuevoProyectoPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/administrator/login');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Crear Nuevo Proyecto
        </h1>
        <p className="text-gray-600">
          Completa todos los campos para añadir un nuevo proyecto al portfolio
        </p>
      </div>

      <ProyectoForm />
    </div>
  );
}

