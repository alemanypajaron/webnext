-- =====================================================
-- Crear políticas para el bucket "proyectos-images"
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

-- Primero eliminamos las políticas si existen
DROP POLICY IF EXISTS "Lectura pública de imágenes de proyectos" ON storage.objects;
DROP POLICY IF EXISTS "Usuarios autenticados pueden subir imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar imágenes" ON storage.objects;

-- Política 1: Permitir lectura pública de todas las imágenes
CREATE POLICY "Lectura pública de imágenes de proyectos"
ON storage.objects FOR SELECT
USING (bucket_id = 'proyectos-images');

-- Política 2: Permitir subida de imágenes (usuarios autenticados o service_role)
CREATE POLICY "Usuarios autenticados pueden subir imágenes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'proyectos-images');

-- Política 3: Permitir actualización de imágenes
CREATE POLICY "Usuarios autenticados pueden actualizar imágenes"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'proyectos-images')
WITH CHECK (bucket_id = 'proyectos-images');

-- Política 4: Permitir eliminación de imágenes
CREATE POLICY "Usuarios autenticados pueden eliminar imágenes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'proyectos-images');

-- Verificar las políticas creadas
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%proyectos-images%';
