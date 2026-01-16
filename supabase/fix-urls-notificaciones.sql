-- =====================================================
-- ACTUALIZAR URLS EN TRIGGERS DE NOTIFICACIONES PUSH
-- =====================================================
-- Este script corrige las URLs de /admin a /administrator

-- Actualizar función principal
CREATE OR REPLACE FUNCTION send_push_notification(
  notification_title TEXT,
  notification_body TEXT,
  notification_url TEXT DEFAULT '/administrator',
  notification_tag TEXT DEFAULT 'default',
  extra_data JSONB DEFAULT '{}'::JSONB
)
RETURNS VOID AS $$
DECLARE
  payload JSONB;
BEGIN
  -- Construir el payload de la notificación
  payload := jsonb_build_object(
    'title', notification_title,
    'body', notification_body,
    'icon', '/icon-192x192.png',
    'badge', '/icon-72x72.png',
    'tag', notification_tag,
    'requireInteraction', true,
    'data', jsonb_build_object(
      'url', notification_url
    ) || extra_data
  );

  -- Llamar a la Edge Function usando pg_net
  PERFORM net.http_post(
    url := 'https://otodqkylgicywiffimhd.supabase.co/functions/v1/send-push-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90b2Rxa3lsZ2ljeXdpZmZpbWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MTQyNTIsImV4cCI6MjA4MzE5MDI1Mn0.v_9D5AljQQ6bWqJ91xoiEyi1Yw7pzxjxlOZS95sXQZs'
    ),
    body := payload
  );

  RAISE NOTICE '✅ Notificación push enviada: %', notification_title;

EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING '⚠️ Error al enviar notificación push: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Actualizar función de contactos
CREATE OR REPLACE FUNCTION notify_new_contacto()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM send_push_notification(
    '📧 Nuevo Contacto',
    'Mensaje de ' || NEW.nombre || CASE 
      WHEN NEW.telefono IS NOT NULL THEN ' (' || NEW.telefono || ')'
      ELSE ''
    END,
    '/administrator',
    'contacto-' || NEW.id::TEXT,
    jsonb_build_object(
      'contacto_id', NEW.id,
      'tipo', 'contacto',
      'nombre', NEW.nombre,
      'email', NEW.email
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Actualizar función de presupuestos
CREATE OR REPLACE FUNCTION notify_new_presupuesto()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM send_push_notification(
    '💼 Nueva Solicitud de Presupuesto',
    NEW.tipo_proyecto || ' - ' || NEW.nombre || CASE 
      WHEN NEW.telefono IS NOT NULL THEN ' (' || NEW.telefono || ')'
      ELSE ''
    END,
    '/administrator/presupuestos',
    'presupuesto-' || NEW.id::TEXT,
    jsonb_build_object(
      'presupuesto_id', NEW.id,
      'tipo', 'presupuesto',
      'nombre', NEW.nombre,
      'email', NEW.email,
      'tipo_proyecto', NEW.tipo_proyecto
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Actualizar función de newsletter
CREATE OR REPLACE FUNCTION notify_new_newsletter()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM send_push_notification(
    '📰 Nueva Suscripción al Newsletter',
    NEW.email || CASE 
      WHEN NEW.nombre IS NOT NULL THEN ' (' || NEW.nombre || ')'
      ELSE ''
    END,
    '/administrator',
    'newsletter-' || NEW.id::TEXT,
    jsonb_build_object(
      'newsletter_id', NEW.id,
      'tipo', 'newsletter',
      'email', NEW.email
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Verificar cambios
SELECT 'Funciones actualizadas correctamente' as resultado;
