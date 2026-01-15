-- Verificar que el presupuesto se guardó y el trigger se ejecutó
-- Ejecutar este script en Supabase SQL Editor

-- 1. Ver el último presupuesto insertado
SELECT 
  '📋 Último presupuesto' as info,
  id,
  nombre,
  email,
  created_at,
  EXTRACT(EPOCH FROM (NOW() - created_at)) as segundos_desde_creacion
FROM presupuestos
ORDER BY created_at DESC
LIMIT 1;

-- 2. Verificar que el trigger existe y está activo
SELECT 
  '🔔 Trigger de presupuestos' as info,
  trigger_name,
  event_manipulation,
  action_statement,
  action_timing
FROM information_schema.triggers
WHERE event_object_table = 'presupuestos'
  AND trigger_name = 'trigger_notify_new_presupuesto';

-- 3. Verificar subscriptions activas
SELECT 
  '📱 Subscriptions activas' as info,
  COUNT(*) as total,
  MAX(created_at) as ultima_subscription
FROM admin_push_subscriptions;

-- 4. Ver detalles de la subscription (endpoint corto para privacidad)
SELECT 
  '🔍 Detalle de subscription' as info,
  id,
  LEFT(endpoint, 50) || '...' as endpoint_preview,
  created_at
FROM admin_push_subscriptions
ORDER BY created_at DESC
LIMIT 1;

-- 5. Verificar que pg_net está habilitado (necesario para el trigger)
SELECT 
  '🌐 Estado de pg_net' as info,
  CASE WHEN EXISTS (
    SELECT FROM pg_extension WHERE extname = 'pg_net'
  ) THEN '✅ Habilitado' ELSE '❌ NO HABILITADO' END as estado;
