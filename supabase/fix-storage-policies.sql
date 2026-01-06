-- =====================================================
-- CORREGIR POLÍTICAS RLS PARA STORAGE: blog-images
-- =====================================================
-- El problema: auth.role() = 'authenticated' no funciona
-- Solución: Usar auth.uid() IS NOT NULL
-- =====================================================

-- PASO 1: Eliminar políticas existentes
DROP POLICY IF EXISTS "Permitir lectura publica" ON storage.objects;
DROP POLICY IF EXISTS "Permitir subida autenticados" ON storage.objects;
DROP POLICY IF EXISTS "Permitir borrado autenticados" ON storage.objects;

-- PASO 2: Crear políticas corregidas

-- =====================================================
-- 1. LECTURA PÚBLICA (cualquiera puede ver)
-- =====================================================
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- =====================================================
-- 2. SUBIDA PARA USUARIOS AUTENTICADOS
-- =====================================================
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' AND 
  auth.uid() IS NOT NULL
);

-- =====================================================
-- 3. ACTUALIZACIÓN PARA USUARIOS AUTENTICADOS
-- =====================================================
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'blog-images' AND 
  auth.uid() IS NOT NULL
);

-- =====================================================
-- 4. ELIMINACIÓN PARA USUARIOS AUTENTICADOS
-- =====================================================
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images' AND 
  auth.uid() IS NOT NULL
);

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- SELECT * FROM storage.policies WHERE bucket_id = 'blog-images';
-- =====================================================


