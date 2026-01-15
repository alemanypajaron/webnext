-- =====================================================
-- SOLUCIÓN DEFINITIVA: Políticas RLS para acceso público
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

-- Eliminar todas las políticas existentes de proyectos
DROP POLICY IF EXISTS "Lectura pública de proyectos" ON proyectos;
DROP POLICY IF EXISTS "Service role acceso completo proyectos" ON proyectos;
DROP POLICY IF EXISTS "Autenticados pueden insertar proyectos" ON proyectos;
DROP POLICY IF EXISTS "Autenticados pueden actualizar proyectos" ON proyectos;
DROP POLICY IF EXISTS "Autenticados pueden eliminar proyectos" ON proyectos;

-- Eliminar todas las políticas existentes de imagenes_proyectos
DROP POLICY IF EXISTS "Lectura pública de imágenes proyectos" ON imagenes_proyectos;
DROP POLICY IF EXISTS "Service role acceso completo imágenes proyectos" ON imagenes_proyectos;
DROP POLICY IF EXISTS "Autenticados pueden insertar imágenes proyectos" ON imagenes_proyectos;
DROP POLICY IF EXISTS "Autenticados pueden actualizar imágenes proyectos" ON imagenes_proyectos;
DROP POLICY IF EXISTS "Autenticados pueden eliminar imágenes proyectos" ON imagenes_proyectos;

-- ========================================
-- PROYECTOS - Nuevas políticas
-- ========================================

-- 1. Lectura pública para TODOS (anon + authenticated)
CREATE POLICY "public_read_proyectos"
ON proyectos FOR SELECT
USING (publicado = true);

-- 2. Service role acceso completo
CREATE POLICY "service_all_proyectos"
ON proyectos FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Usuarios autenticados pueden INSERT
CREATE POLICY "auth_insert_proyectos"
ON proyectos FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. Usuarios autenticados pueden UPDATE
CREATE POLICY "auth_update_proyectos"
ON proyectos FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Usuarios autenticados pueden DELETE
CREATE POLICY "auth_delete_proyectos"
ON proyectos FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- IMAGENES_PROYECTOS - Nuevas políticas
-- ========================================

-- 1. Lectura pública para TODOS
CREATE POLICY "public_read_imagenes"
ON imagenes_proyectos FOR SELECT
USING (true);

-- 2. Service role acceso completo
CREATE POLICY "service_all_imagenes"
ON imagenes_proyectos FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Usuarios autenticados pueden INSERT
CREATE POLICY "auth_insert_imagenes"
ON imagenes_proyectos FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. Usuarios autenticados pueden UPDATE
CREATE POLICY "auth_update_imagenes"
ON imagenes_proyectos FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Usuarios autenticados pueden DELETE
CREATE POLICY "auth_delete_imagenes"
ON imagenes_proyectos FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- Verificar que se crearon correctamente
-- ========================================
SELECT 
  tablename,
  policyname,
  roles::text[],
  cmd
FROM pg_policies 
WHERE tablename IN ('proyectos', 'imagenes_proyectos')
ORDER BY tablename, policyname;
