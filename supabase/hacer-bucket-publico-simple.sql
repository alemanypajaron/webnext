-- =====================================================
-- SQL SÚPER SIMPLE: Solo hacer bucket público
-- =====================================================
-- No intenta tocar políticas, solo marca como público
-- =====================================================

-- Hacer el bucket público
UPDATE storage.buckets 
SET public = true
WHERE id = 'blog-images';

-- Verificar que funcionó
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'blog-images';

-- =====================================================
-- RESULTADO ESPERADO:
-- =====================================================
-- Deberías ver:
-- id: blog-images
-- name: blog-images  
-- public: true  ← DEBE SER TRUE
-- =====================================================

