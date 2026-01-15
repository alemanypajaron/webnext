-- =====================================================
-- Verificar y mostrar políticas del bucket proyectos-images
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

-- Ver todas las políticas del storage para proyectos-images
SELECT 
  policyname,
  cmd as "command",
  roles,
  qual as "using_expression",
  with_check as "with_check_expression"
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%proyectos%'
ORDER BY policyname;

-- Ver información del bucket
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE name = 'proyectos-images';
