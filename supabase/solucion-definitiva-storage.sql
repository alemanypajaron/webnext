-- =====================================================
-- SOLUCIÓN DEFINITIVA: Bucket público SIN políticas
-- =====================================================
-- Esto hace el bucket completamente público
-- Sin necesidad de políticas RLS
-- =====================================================

-- 1. Hacer el bucket público
UPDATE storage.buckets 
SET public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
WHERE id = 'blog-images';

-- 2. Verificar que es público
SELECT id, name, public, file_size_limit
FROM storage.buckets 
WHERE id = 'blog-images';

-- =====================================================
-- RESULTADO ESPERADO:
-- =====================================================
-- id: blog-images
-- name: blog-images
-- public: true  ← DEBE SER TRUE
-- file_size_limit: 5242880
-- =====================================================

-- =====================================================
-- DESPUÉS DE EJECUTAR:
-- =====================================================
-- ✅ El bucket será completamente público
-- ✅ NO necesita políticas RLS
-- ✅ Cualquiera puede VER (necesario para blog)
-- ✅ El código puede SUBIR/ELIMINAR (ya protegido por middleware)
-- =====================================================

-- =====================================================
-- PROBAR QUE FUNCIONA:
-- =====================================================
-- Pega esta URL en tu navegador (reemplaza con tu dominio):
-- https://oiodalyigicywiffimhd.supabase.co/storage/v1/object/public/blog-images/ruta_diferente_navidades_murcia.png
--
-- Si ves la imagen = ✅ Funciona
-- Si da error = ❌ El bucket NO es público
-- =====================================================


