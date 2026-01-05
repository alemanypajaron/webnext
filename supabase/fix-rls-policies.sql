-- =====================================================
-- CORRECCIÓN DE POLÍTICAS RLS PARA PANEL ADMIN
-- =====================================================
-- Ejecutar este SQL en Supabase SQL Editor
-- 
-- PROBLEMA:
-- Las políticas actuales solo permiten acceso a service_role
-- pero los usuarios admin autenticados necesitan acceso
--
-- SOLUCIÓN:
-- Permitir SELECT/UPDATE/DELETE a usuarios authenticated
-- =====================================================

-- =====================================================
-- CONTACTOS: Acceso completo para usuarios autenticados
-- =====================================================

-- Eliminar la política restrictiva antigua
DROP POLICY IF EXISTS "Solo admins pueden leer contactos" ON contactos;

-- Nueva política: Usuarios autenticados pueden leer contactos
CREATE POLICY "Usuarios autenticados pueden leer contactos"
  ON contactos FOR SELECT
  TO authenticated
  USING (true);

-- Permitir UPDATE a usuarios autenticados
CREATE POLICY "Usuarios autenticados pueden actualizar contactos"
  ON contactos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permitir DELETE a usuarios autenticados
CREATE POLICY "Usuarios autenticados pueden eliminar contactos"
  ON contactos FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- PRESUPUESTOS: Acceso completo para usuarios autenticados
-- =====================================================

-- Eliminar la política restrictiva antigua
DROP POLICY IF EXISTS "Solo admins pueden leer presupuestos" ON presupuestos;

-- Nueva política: Usuarios autenticados pueden leer presupuestos
CREATE POLICY "Usuarios autenticados pueden leer presupuestos"
  ON presupuestos FOR SELECT
  TO authenticated
  USING (true);

-- Permitir UPDATE a usuarios autenticados
CREATE POLICY "Usuarios autenticados pueden actualizar presupuestos"
  ON presupuestos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permitir DELETE a usuarios autenticados
CREATE POLICY "Usuarios autenticados pueden eliminar presupuestos"
  ON presupuestos FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- NEWSLETTER: Acceso completo para usuarios autenticados
-- =====================================================

-- Eliminar la política restrictiva antigua
DROP POLICY IF EXISTS "Solo admins pueden leer newsletter" ON newsletter;

-- Nueva política: Usuarios autenticados pueden leer newsletter
CREATE POLICY "Usuarios autenticados pueden leer newsletter"
  ON newsletter FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- BLOG: Permitir actualizar visitas desde el frontend
-- =====================================================

-- Eliminar políticas antiguas restrictivas si existen
DROP POLICY IF EXISTS "Solo admins pueden gestionar artículos" ON blog_articulos;

-- Usuarios autenticados pueden leer, crear, actualizar y eliminar artículos
CREATE POLICY "Usuarios autenticados pueden gestionar artículos"
  ON blog_articulos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permitir actualizar contador de visitas desde anon (para el frontend público)
CREATE POLICY "Permitir actualizar visitas en artículos"
  ON blog_articulos FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- CATEGORÍAS BLOG: Gestión para usuarios autenticados
-- =====================================================

DROP POLICY IF EXISTS "Solo admins pueden gestionar categorías" ON categorias_blog;

CREATE POLICY "Usuarios autenticados pueden gestionar categorías"
  ON categorias_blog FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- PROYECTOS: Gestión para usuarios autenticados
-- =====================================================

DROP POLICY IF EXISTS "Solo admins pueden gestionar proyectos" ON proyectos;

CREATE POLICY "Usuarios autenticados pueden gestionar proyectos"
  ON proyectos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- IMÁGENES PROYECTOS: Gestión para usuarios autenticados
-- =====================================================

DROP POLICY IF EXISTS "Solo admins pueden gestionar imágenes" ON imagenes_proyectos;

CREATE POLICY "Usuarios autenticados pueden gestionar imágenes"
  ON imagenes_proyectos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- VERIFICACIÓN: Ver todas las políticas activas
-- =====================================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =====================================================
-- RESULTADO ESPERADO:
-- =====================================================
-- Todas las tablas deben tener políticas que permitan:
-- - SELECT para 'authenticated' (usuarios logeados)
-- - UPDATE para 'authenticated'
-- - DELETE para 'authenticated'
-- - INSERT para 'anon' (formularios públicos) Y 'authenticated'
-- =====================================================

