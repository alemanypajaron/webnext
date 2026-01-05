-- =====================================================
-- POLÍTICAS DE SEGURIDAD PARA BUCKET: blog-images
-- =====================================================
-- Este script configura las políticas RLS para el bucket
-- de imágenes del blog en Supabase Storage
-- =====================================================

-- IMPORTANTE: Ejecutar DESPUÉS de crear el bucket "blog-images"

-- =====================================================
-- 1. POLÍTICA: Lectura Pública (SELECT)
-- =====================================================
-- Permite que cualquier persona pueda ver/descargar las imágenes
-- Necesario para que las imágenes se muestren en el blog público
-- =====================================================

CREATE POLICY "Permitir lectura publica"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- =====================================================
-- 2. POLÍTICA: Subida Autenticada (INSERT)
-- =====================================================
-- Solo usuarios autenticados (admin) pueden subir imágenes
-- Protege contra uploads no autorizados
-- =====================================================

CREATE POLICY "Permitir subida autenticados"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' AND
  auth.role() = 'authenticated'
);

-- =====================================================
-- 3. POLÍTICA: Eliminación Autenticada (DELETE)
-- =====================================================
-- Solo usuarios autenticados (admin) pueden eliminar imágenes
-- Protege contra borrados no autorizados
-- =====================================================

CREATE POLICY "Permitir borrado autenticados"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images' AND
  auth.role() = 'authenticated'
);

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- Para verificar que las políticas se crearon correctamente:
-- SELECT * FROM storage.policies WHERE bucket_id = 'blog-images';
-- =====================================================

-- =====================================================
-- RESULTADO ESPERADO
-- =====================================================
-- ✅ 3 políticas creadas
-- ✅ Lectura: Pública (todos pueden ver)
-- ✅ Subida: Solo admin autenticado
-- ✅ Eliminación: Solo admin autenticado
-- =====================================================

