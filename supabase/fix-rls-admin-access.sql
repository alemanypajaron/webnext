-- =====================================================
-- FIX: Acceso de Admin a Proyectos y Blog
-- =====================================================
-- Ejecutar este SQL en Supabase SQL Editor si no ves
-- los artículos o proyectos en el panel de administración
-- =====================================================

-- =====================================================
-- BLOG ARTÍCULOS: Acceso completo para admin
-- =====================================================

-- Eliminar políticas antiguas conflictivas
DROP POLICY IF EXISTS "Solo admins pueden gestionar artículos" ON blog_articulos;
DROP POLICY IF EXISTS "Usuarios autenticados pueden gestionar artículos" ON blog_articulos;

-- Política para usuarios autenticados (admin): acceso total
CREATE POLICY "Admin puede gestionar artículos"
  ON blog_articulos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para público: solo leer artículos publicados
DROP POLICY IF EXISTS "Cualquiera puede ver artículos publicados" ON blog_articulos;
CREATE POLICY "Público puede ver artículos publicados"
  ON blog_articulos FOR SELECT
  TO anon
  USING (publicado = true);

-- Política para actualizar contador de visitas (público)
DROP POLICY IF EXISTS "Permitir actualizar visitas en artículos" ON blog_articulos;
CREATE POLICY "Público puede actualizar visitas"
  ON blog_articulos FOR UPDATE
  TO anon
  USING (publicado = true)
  WITH CHECK (publicado = true);

-- =====================================================
-- PROYECTOS: Acceso completo para admin
-- =====================================================

-- Eliminar políticas antiguas conflictivas
DROP POLICY IF EXISTS "Solo admins pueden gestionar proyectos" ON proyectos;
DROP POLICY IF EXISTS "Permitir gestionar proyectos a autenticados" ON proyectos;

-- Política para usuarios autenticados (admin): acceso total
CREATE POLICY "Admin puede gestionar proyectos"
  ON proyectos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para público: solo leer proyectos publicados
DROP POLICY IF EXISTS "Cualquiera puede ver proyectos publicados" ON proyectos;
CREATE POLICY "Público puede ver proyectos publicados"
  ON proyectos FOR SELECT
  TO anon
  USING (publicado = true);

-- =====================================================
-- IMÁGENES DE PROYECTOS: Acceso completo para admin
-- =====================================================

-- Eliminar políticas antiguas conflictivas
DROP POLICY IF EXISTS "Solo admins pueden gestionar imágenes" ON imagenes_proyectos;
DROP POLICY IF EXISTS "Permitir gestionar imágenes de proyectos a autenticados" ON imagenes_proyectos;

-- Política para usuarios autenticados (admin): acceso total
CREATE POLICY "Admin puede gestionar imágenes de proyectos"
  ON imagenes_proyectos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para público: solo leer imágenes de proyectos publicados
DROP POLICY IF EXISTS "Cualquiera puede ver imágenes de proyectos" ON imagenes_proyectos;
CREATE POLICY "Público puede ver imágenes de proyectos publicados"
  ON imagenes_proyectos FOR SELECT
  TO anon
  USING (
    proyecto_id IN (
      SELECT id FROM proyectos WHERE publicado = true
    )
  );

-- =====================================================
-- CATEGORÍAS BLOG: Acceso completo para admin
-- =====================================================

-- Eliminar políticas antiguas conflictivas
DROP POLICY IF EXISTS "Solo admins pueden gestionar categorías" ON categorias_blog;
DROP POLICY IF EXISTS "Permitir gestionar categorías de blog a autenticados" ON categorias_blog;

-- Política para usuarios autenticados (admin): acceso total
CREATE POLICY "Admin puede gestionar categorías"
  ON categorias_blog FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para público: leer todas las categorías
DROP POLICY IF EXISTS "Cualquiera puede ver categorías" ON categorias_blog;
CREATE POLICY "Público puede ver categorías"
  ON categorias_blog FOR SELECT
  TO anon
  USING (true);

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- Ejecuta estas queries después de aplicar el SQL
-- para verificar que todo funciona:

-- Ver políticas de blog_articulos:
-- SELECT * FROM pg_policies WHERE tablename = 'blog_articulos';

-- Ver políticas de proyectos:
-- SELECT * FROM pg_policies WHERE tablename = 'proyectos';

-- Contar artículos (debe mostrar todos):
-- SELECT COUNT(*) FROM blog_articulos;

-- Contar proyectos (debe mostrar todos):
-- SELECT COUNT(*) FROM proyectos;

-- =====================================================
-- RESULTADO ESPERADO
-- =====================================================
-- ✅ Admin puede ver TODOS los artículos (publicados y borradores)
-- ✅ Admin puede ver TODOS los proyectos (publicados y borradores)
-- ✅ Público solo ve contenido publicado
-- ✅ Público puede actualizar contador de visitas en blog
-- =====================================================


