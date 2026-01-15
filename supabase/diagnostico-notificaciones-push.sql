-- =====================================================
-- SCRIPT DE DIAGNÓSTICO DE NOTIFICACIONES PUSH
-- =====================================================
-- Este script verifica que todo esté configurado correctamente

-- 1. Verificar que la tabla existe
SELECT 'admin_push_subscriptions' as tabla, 
       CASE WHEN EXISTS (
         SELECT FROM information_schema.tables 
         WHERE table_name = 'admin_push_subscriptions'
       ) THEN '✅ Existe' ELSE '❌ No existe' END as estado;

-- 2. Ver cuántas subscriptions hay registradas
SELECT 'Subscriptions registradas' as info, 
       COUNT(*) as cantidad,
       MAX(created_at) as ultima_subscription
FROM admin_push_subscriptions;

-- 3. Ver las subscriptions activas
SELECT 
  id,
  LEFT(endpoint, 50) || '...' as endpoint_preview,
  user_agent,
  created_at,
  updated_at
FROM admin_push_subscriptions
ORDER BY created_at DESC;

-- 4. Verificar triggers
SELECT 
  '✅ Triggers' as componente,
  trigger_name,
  event_object_table as tabla,
  action_timing as momento,
  event_manipulation as evento
FROM information_schema.triggers
WHERE trigger_name LIKE 'trigger_notify_%'
ORDER BY event_object_table;

-- 5. Verificar funciones
SELECT 
  '✅ Funciones' as componente,
  routine_name as funcion,
  routine_type as tipo
FROM information_schema.routines
WHERE routine_name LIKE '%notify%' OR routine_name LIKE '%push%'
ORDER BY routine_name;

-- 6. Probar inserción manual (ESTO ENVIARÁ UNA NOTIFICACIÓN DE PRUEBA)
-- DESCOMENTA LAS SIGUIENTES LÍNEAS SOLO SI QUIERES ENVIAR UNA PRUEBA:

/*
INSERT INTO contactos (nombre, email, mensaje, telefono)
VALUES ('Prueba Notificación', 'prueba@test.com', 'Este es un mensaje de prueba para verificar que las notificaciones push funcionan correctamente', '600000000');

-- Esperar un segundo y luego eliminar la prueba
DO $$
BEGIN
  PERFORM pg_sleep(1);
  DELETE FROM contactos WHERE email = 'prueba@test.com';
  RAISE NOTICE '✅ Prueba completada y contacto de prueba eliminado';
END $$;
*/

-- 7. Verificar si pg_net está habilitado
SELECT 
  '📊 Extensión pg_net' as info,
  CASE WHEN EXISTS (
    SELECT FROM pg_extension WHERE extname = 'pg_net'
  ) THEN '✅ Habilitada' ELSE '❌ No habilitada' END as estado;

-- 8. Ver logs recientes de la función pg_net (si está habilitada y tiene datos)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_extension WHERE extname = 'pg_net') THEN
    -- Si pg_net existe, intentar ver los logs
    RAISE NOTICE '✅ pg_net está habilitado - puedes ver logs en el dashboard de Supabase';
  ELSE
    RAISE NOTICE '⚠️ pg_net NO está habilitado - las notificaciones push NO funcionarán';
    RAISE NOTICE '   Para habilitarlo: Dashboard → Database → Extensions → Buscar "pg_net" → Enable';
  END IF;
END $$;
