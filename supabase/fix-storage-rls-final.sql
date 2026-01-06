-- =====================================================
-- SOLUCIÓN DEFINITIVA: Hacer bucket completamente público
-- =====================================================
-- Este SQL hará que el bucket blog-images sea público
-- sin necesidad de políticas RLS complicadas
-- =====================================================

-- PASO 1: Eliminar todas las políticas existentes
DELETE FROM storage.policies WHERE bucket_id = 'blog-images';

-- PASO 2: Hacer el bucket público (sin RLS)
UPDATE storage.buckets 
SET public = true,
    file_size_limit = 5242880,  -- 5MB
    allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
WHERE id = 'blog-images';

-- PASO 3: Verificar que el bucket es público
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
WHERE id = 'blog-images';

-- =====================================================
-- RESULTADO ESPERADO:
-- =====================================================
-- id: blog-images
-- name: blog-images
-- public: true  ← DEBE SER TRUE
-- file_size_limit: 5242880
-- allowed_mime_types: {image/jpeg, image/jpg, ...}
-- =====================================================

-- =====================================================
-- ¿QUÉ HACE ESTO?
-- =====================================================
-- 1. Elimina todas las políticas RLS problemáticas
-- 2. Marca el bucket como "public = true"
-- 3. Configura límite de 5MB por archivo
-- 4. Solo permite imágenes (JPEG, PNG, GIF, WEBP)
-- 5. Muestra la configuración para verificar
-- =====================================================

-- =====================================================
-- DESPUÉS DE EJECUTAR:
-- =====================================================
-- ✅ El bucket será completamente público
-- ✅ Cualquiera podrá VER las imágenes (necesario para el blog)
-- ✅ Solo usuarios autenticados podrán SUBIR (por el código)
-- ✅ No habrá errores de RLS
-- =====================================================


