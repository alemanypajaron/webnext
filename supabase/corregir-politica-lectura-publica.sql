-- =====================================================
-- Verificar y corregir políticas RLS para lectura pública
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

-- Ver las políticas actuales
SELECT 
  schemaname,
  tablename,
  policyname,
  roles,
  cmd,
  qual as "using_clause"
FROM pg_policies 
WHERE tablename = 'proyectos'
ORDER BY policyname;

-- Si la política de lectura pública no funciona, recrearla
DROP POLICY IF EXISTS "Lectura pública de proyectos" ON proyectos;

-- Crear política que permita a TODOS (incluyendo anónimos) leer proyectos publicados
CREATE POLICY "Lectura pública de proyectos"
ON proyectos FOR SELECT
TO anon, authenticated
USING (publicado = true);

-- Verificar que se creó correctamente
SELECT policyname, roles 
FROM pg_policies 
WHERE tablename = 'proyectos' 
AND policyname = 'Lectura pública de proyectos';
