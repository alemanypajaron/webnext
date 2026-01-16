-- =====================================================
-- TRIGGERS PARA ENVIAR NOTIFICACIONES PUSH
-- =====================================================
-- Estos triggers detectan cuando llega un nuevo contacto,
-- presupuesto o suscripción al newsletter y envían una
-- notificación push al administrador automáticamente

-- =====================================================
-- FUNCIÓN: Enviar notificación push genérica
-- =====================================================
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

  -- Llamar a la Edge Function de forma asíncrona usando pg_net
  -- NOTA: pg_net debe estar habilitado en Supabase
  PERFORM net.http_post(
    url := current_setting('app.supabase_url') || '/functions/v1/send-push-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key')
    ),
    body := payload
  );

  RAISE NOTICE '✅ Notificación push enviada: %', notification_title;

EXCEPTION
  WHEN OTHERS THEN
    -- Si falla, solo registrar el error pero no interrumpir el insert
    RAISE WARNING '⚠️ Error al enviar notificación push: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- TRIGGER 1: Nuevo Contacto
-- =====================================================
CREATE OR REPLACE FUNCTION notify_new_contacto()
RETURNS TRIGGER AS $$
BEGIN
  -- Enviar notificación push
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

-- Eliminar trigger anterior si existe
DROP TRIGGER IF EXISTS trigger_notify_new_contacto ON contactos;

-- Crear trigger
CREATE TRIGGER trigger_notify_new_contacto
  AFTER INSERT ON contactos
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contacto();

-- =====================================================
-- TRIGGER 2: Nuevo Presupuesto
-- =====================================================
CREATE OR REPLACE FUNCTION notify_new_presupuesto()
RETURNS TRIGGER AS $$
BEGIN
  -- Enviar notificación push
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

-- Eliminar trigger anterior si existe
DROP TRIGGER IF EXISTS trigger_notify_new_presupuesto ON presupuestos;

-- Crear trigger
CREATE TRIGGER trigger_notify_new_presupuesto
  AFTER INSERT ON presupuestos
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_presupuesto();

-- =====================================================
-- TRIGGER 3: Nueva Suscripción al Newsletter
-- =====================================================
CREATE OR REPLACE FUNCTION notify_new_newsletter()
RETURNS TRIGGER AS $$
BEGIN
  -- Enviar notificación push (menos prioritaria)
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

-- Eliminar trigger anterior si existe
DROP TRIGGER IF EXISTS trigger_notify_new_newsletter ON newsletter;

-- Crear trigger
CREATE TRIGGER trigger_notify_new_newsletter
  AFTER INSERT ON newsletter
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_newsletter();

-- =====================================================
-- CONFIGURACIÓN DE VARIABLES DE ENTORNO
-- =====================================================
-- IMPORTANTE: Debes configurar estas variables en Supabase
-- Dashboard > Project Settings > Database > Custom settings

-- Para configurar las variables, ejecuta en el SQL Editor:
/*
ALTER DATABASE postgres SET app.supabase_url = 'https://TU-PROYECTO.supabase.co';
ALTER DATABASE postgres SET app.supabase_service_role_key = 'TU-SERVICE-ROLE-KEY';
*/

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Triggers de notificaciones push configurados:';
  RAISE NOTICE '   - trigger_notify_new_contacto → contactos';
  RAISE NOTICE '   - trigger_notify_new_presupuesto → presupuestos';
  RAISE NOTICE '   - trigger_notify_new_newsletter → newsletter';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️ IMPORTANTE: Debes configurar las variables de entorno:';
  RAISE NOTICE '   ALTER DATABASE postgres SET app.supabase_url = ''https://TU-PROYECTO.supabase.co'';';
  RAISE NOTICE '   ALTER DATABASE postgres SET app.supabase_service_role_key = ''TU-SERVICE-ROLE-KEY'';';
END $$;

-- Ver todos los triggers creados
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name LIKE 'trigger_notify_%'
ORDER BY event_object_table, trigger_name;
