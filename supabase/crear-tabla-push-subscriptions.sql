-- =====================================================
-- TABLA PARA ALMACENAR PUSH SUBSCRIPTIONS DEL ADMIN
-- =====================================================
-- Esta tabla guarda las subscriptions de notificaciones push
-- del administrador para enviarle alertas cuando lleguen
-- nuevos contactos o presupuestos

-- Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS admin_push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas por endpoint
CREATE INDEX IF NOT EXISTS idx_admin_push_subscriptions_endpoint 
ON admin_push_subscriptions(endpoint);

-- Crear índice para búsquedas por fecha de actualización
CREATE INDEX IF NOT EXISTS idx_admin_push_subscriptions_updated_at 
ON admin_push_subscriptions(updated_at DESC);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_admin_push_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS trigger_update_admin_push_subscriptions_updated_at 
ON admin_push_subscriptions;

CREATE TRIGGER trigger_update_admin_push_subscriptions_updated_at
BEFORE UPDATE ON admin_push_subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_admin_push_subscriptions_updated_at();

-- =====================================================
-- POLÍTICAS RLS (Row Level Security)
-- =====================================================
-- Como esta tabla es solo para el admin, no necesita RLS estricto
-- pero la habilitamos por seguridad

ALTER TABLE admin_push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Política: Permitir insertar subscriptions (necesario para el hook)
DROP POLICY IF EXISTS "allow_insert_admin_push_subscriptions" ON admin_push_subscriptions;
CREATE POLICY "allow_insert_admin_push_subscriptions"
ON admin_push_subscriptions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política: Permitir actualizar subscriptions (para renovar tokens)
DROP POLICY IF EXISTS "allow_update_admin_push_subscriptions" ON admin_push_subscriptions;
CREATE POLICY "allow_update_admin_push_subscriptions"
ON admin_push_subscriptions
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Política: Permitir eliminar subscriptions (para desuscribirse)
DROP POLICY IF EXISTS "allow_delete_admin_push_subscriptions" ON admin_push_subscriptions;
CREATE POLICY "allow_delete_admin_push_subscriptions"
ON admin_push_subscriptions
FOR DELETE
TO anon, authenticated
USING (true);

-- Política: Permitir leer subscriptions (necesario para Edge Functions)
DROP POLICY IF EXISTS "allow_select_admin_push_subscriptions" ON admin_push_subscriptions;
CREATE POLICY "allow_select_admin_push_subscriptions"
ON admin_push_subscriptions
FOR SELECT
TO anon, authenticated
USING (true);

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- Verificar que la tabla se creó correctamente
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'admin_push_subscriptions'
  ) THEN
    RAISE NOTICE '✅ Tabla admin_push_subscriptions creada correctamente';
  ELSE
    RAISE EXCEPTION '❌ Error: La tabla admin_push_subscriptions no se creó';
  END IF;
END $$;

-- Mostrar estructura de la tabla
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'admin_push_subscriptions'
ORDER BY ordinal_position;

-- Mostrar políticas RLS
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'admin_push_subscriptions';
