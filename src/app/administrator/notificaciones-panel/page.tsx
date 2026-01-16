import { createClient } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { redirect } from 'next/navigation';
import NotificacionesPanelClient from '@/components/admin/NotificacionesPanelClient';
import BannerGestionNotificaciones from '@/components/admin/BannerGestionNotificaciones';

export default async function NotificacionesPanelPage() {
  // Verificar autenticación
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    redirect('/administrator/login');
  }

  // Usar cliente admin para leer datos
  const supabase = getSupabaseAdmin();

  // Obtener contactos no leídos
  const { data: contactos, error: contactosError } = await supabase
    .from('contactos')
    .select('*')
    .eq('leido', false)
    .order('created_at', { ascending: false });

  // Obtener presupuestos no leídos
  const { data: presupuestos, error: presupuestosError } = await supabase
    .from('presupuestos')
    .select('*')
    .eq('leido', false)
    .order('created_at', { ascending: false });

  if (contactosError || presupuestosError) {
    console.error('Error fetching notifications:', contactosError || presupuestosError);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner de gestión PRIMERO */}
      <BannerGestionNotificaciones />

      {/* Título de la sección */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          📬 Notificaciones Pendientes
        </h1>
        <p className="text-gray-600">
          Consulta los contactos y presupuestos que aún no has revisado
        </p>
      </div>

      <NotificacionesPanelClient 
        contactos={contactos || []} 
        presupuestos={presupuestos || []}
      />
    </div>
  );
}
