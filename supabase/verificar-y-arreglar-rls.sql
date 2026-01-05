-- =====================================================
-- VERIFICAR Y ARREGLAR RLS para Blog y Proyectos
-- =====================================================
-- Ejecutar este SQL en Supabase SQL Editor
-- https://supabase.com/dashboard/project/otodqkylgicywiffimhd/sql/new
-- =====================================================

-- =====================================================
-- PASO 1: Ver políticas actuales
-- =====================================================
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd,  -- SELECT, INSERT, UPDATE, DELETE, ALL
  roles
FROM pg_policies 
WHERE tablename IN ('blog_articulos', 'proyectos', 'contactos', 'presupuestos')
ORDER BY tablename, cmd;

-- =====================================================
-- PASO 2: Si NO aparecen políticas para INSERT/UPDATE
-- entonces ejecuta lo siguiente:
-- =====================================================

-- BLOG ARTÍCULOS: Eliminar todas las políticas antiguas
DROP POLICY IF EXISTS "Permitir leer artículos publicados" ON blog_articulos;
DROP POLICY IF EXISTS "Admin puede gestionar artículos" ON blog_articulos;
DROP POLICY IF EXISTS "Público puede ver artículos publicados" ON blog_articulos;
DROP POLICY IF EXISTS "Público puede actualizar visitas" ON blog_articulos;
DROP POLICY IF EXISTS "Usuarios autenticados pueden gestionar artículos" ON blog_articulos;

-- BLOG ARTÍCULOS: Política para Service Role (bypasea automáticamente)
-- Política para público: solo leer artículos publicados
CREATE POLICY "Público puede ver artículos publicados"
  ON blog_articulos FOR SELECT
  TO anon
  USING (publicado = true);

-- PROYECTOS: Eliminar todas las políticas antiguas
DROP POLICY IF EXISTS "Permitir leer proyectos publicados" ON proyectos;
DROP POLICY IF EXISTS "Admin puede gestionar proyectos" ON proyectos;
DROP POLICY IF EXISTS "Público puede ver proyectos publicados" ON proyectos;

-- PROYECTOS: Política para público: solo leer proyectos publicados
CREATE POLICY "Público puede ver proyectos publicados"
  ON proyectos FOR SELECT
  TO anon
  USING (publicado = true);

-- CONTACTOS: Eliminar todas las políticas
DROP POLICY IF EXISTS "Admin puede gestionar contactos" ON contactos;
DROP POLICY IF EXISTS "Permitir enviar contactos" ON contactos;

-- CONTACTOS: Política para anónimos: solo crear
CREATE POLICY "Anónimos pueden enviar contactos"
  ON contactos FOR INSERT
  TO anon
  WITH CHECK (true);

-- PRESUPUESTOS: Eliminar todas las políticas
DROP POLICY IF EXISTS "Admin puede gestionar presupuestos" ON presupuestos;
DROP POLICY IF EXISTS "Permitir enviar presupuestos" ON presupuestos;

-- PRESUPUESTOS: Política para anónimos: solo crear
CREATE POLICY "Anónimos pueden enviar presupuestos"
  ON presupuestos FOR INSERT
  TO anon
  WITH CHECK (true);

-- =====================================================
-- PASO 3: Verificar que quedaron solo estas políticas
-- =====================================================
SELECT 
  tablename, 
  policyname, 
  cmd,
  roles,
  qual  -- condición USING
FROM pg_policies 
WHERE tablename IN ('blog_articulos', 'proyectos', 'contactos', 'presupuestos')
ORDER BY tablename, cmd;

-- =====================================================
-- RESULTADO ESPERADO:
-- =====================================================
-- blog_articulos:
--   - Público puede ver artículos publicados (SELECT, anon)
--
-- proyectos:
--   - Público puede ver proyectos publicados (SELECT, anon)
--
-- contactos:
--   - Anónimos pueden enviar contactos (INSERT, anon)
--
-- presupuestos:
--   - Anónimos pueden enviar presupuestos (INSERT, anon)
--
-- =====================================================
-- IMPORTANTE:
-- =====================================================
-- El Service Role Key (usado en el admin panel) BYPASEA
-- TODAS las políticas RLS automáticamente.
--
-- Si aún falla después de esto, el problema es que
-- la SUPABASE_SERVICE_ROLE_KEY no está configurada
-- correctamente en Vercel.
-- =====================================================

