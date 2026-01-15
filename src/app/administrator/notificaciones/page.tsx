import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import PushNotificationSettings from '@/components/admin/PushNotificationSettings';

export default async function NotificacionesPage() {
  // Verificar autenticación
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    redirect('/administrator/login');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Notificaciones Push
        </h1>
        <p className="text-gray-600">
          Configura las notificaciones push para recibir alertas en tiempo real cuando lleguen nuevos contactos o presupuestos
        </p>
      </div>

      {/* Panel de configuración */}
      <PushNotificationSettings />

      {/* Información adicional */}
      <div className="mt-8 space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            ¿Cómo funcionan las notificaciones?
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Recibirás notificaciones <strong>incluso con la app cerrada</strong> o el móvil bloqueado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Puedes activar notificaciones en <strong>múltiples dispositivos</strong> (móvil, tablet, PC)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Las notificaciones aparecen como en cualquier app: con <strong>sonido, vibración y badge</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Al hacer clic en la notificación, se abre la app directamente en el contenido relevante</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Qué notificaciones recibirás
          </h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">📧</span>
              <span><strong>Nuevos contactos:</strong> Cuando alguien envíe el formulario de contacto</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">💼</span>
              <span><strong>Nuevos presupuestos:</strong> Cuando soliciten un presupuesto</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">📰</span>
              <span><strong>Nuevas suscripciones:</strong> Cuando alguien se suscriba al newsletter</span>
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Importante
          </h3>
          <ul className="space-y-2 text-sm text-orange-800">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Debes <strong>mantener la sesión iniciada</strong> en al menos un dispositivo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Si desactivas las notificaciones, <strong>dejarás de recibirlas en ese dispositivo</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Las notificaciones son <strong>100% gratuitas</strong> y no consumen datos móviles</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
