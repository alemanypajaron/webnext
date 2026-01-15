-- =====================================================
-- Crear políticas RLS para tablas proyectos e imagenes_proyectos
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

-- ====================
-- TABLA: proyectos
-- ====================

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Lectura pública de proyectos" ON proyectos;
DROP POLICY IF EXISTS "Administradores pueden insertar proyectos" ON proyectos;
DROP POLICY IF EXISTS "Administradores pueden actualizar proyectos" ON proyectos;
DROP POLICY IF EXISTS "Administradores pueden eliminar proyectos" ON proyectos;

-- Política 1: Lectura pública (todos pueden ver proyectos publicados)
CREATE POLICY "Lectura pública de proyectos"
ON proyectos FOR SELECT
USING (publicado = true);

-- Política 2: Service role puede hacer todo (bypass RLS)
CREATE POLICY "Service role acceso completo proyectos"
ON proyectos FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Política 3: Usuarios autenticados pueden insertar
CREATE POLICY "Autenticados pueden insertar proyectos"
ON proyectos FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política 4: Usuarios autenticados pueden actualizar
CREATE POLICY "Autenticados pueden actualizar proyectos"
ON proyectos FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Política 5: Usuarios autenticados pueden eliminar
CREATE POLICY "Autenticados pueden eliminar proyectos"
ON proyectos FOR DELETE
TO authenticated
USING (true);

-- ====================
-- TABLA: imagenes_proyectos
-- ====================

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Lectura pública de imágenes proyectos" ON imagenes_proyectos;
DROP POLICY IF EXISTS "Administradores pueden insertar imágenes proyectos" ON imagenes_proyectos;
DROP POLICY IF EXISTS "Administradores pueden actualizar imágenes proyectos" ON imagenes_proyectos;
DROP POLICY IF EXISTS "Administradores pueden eliminar imágenes proyectos" ON imagenes_proyectos;

-- Política 1: Lectura pública
CREATE POLICY "Lectura pública de imágenes proyectos"
ON imagenes_proyectos FOR SELECT
USING (true);

-- Política 2: Service role puede hacer todo
CREATE POLICY "Service role acceso completo imágenes proyectos"
ON imagenes_proyectos FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Política 3: Usuarios autenticados pueden insertar
CREATE POLICY "Autenticados pueden insertar imágenes proyectos"
ON imagenes_proyectos FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política 4: Usuarios autenticados pueden actualizar
CREATE POLICY "Autenticados pueden actualizar imágenes proyectos"
ON imagenes_proyectos FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Política 5: Usuarios autenticados pueden eliminar
CREATE POLICY "Autenticados pueden eliminar imágenes proyectos"
ON imagenes_proyectos FOR DELETE
TO authenticated
USING (true);

-- ====================
-- Verificar políticas
-- ====================
SELECT 
  schemaname, 
  tablename, 
  policyname,
  roles
FROM pg_policies 
WHERE tablename IN ('proyectos', 'imagenes_proyectos')
ORDER BY tablename, policyname;
