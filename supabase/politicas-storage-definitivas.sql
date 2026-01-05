-- =====================================================
-- POLÍTICAS DEFINITIVAS PARA SUPABASE STORAGE
-- Bucket: blog-images
-- =====================================================
-- 
-- EJECUTAR EN: SQL Editor de Supabase
-- https://supabase.com/dashboard/project/otodqkylgicywiffimhd/sql/new
--
-- PROBLEMA: El bucket está "público" pero eso solo permite LEER.
-- Para SUBIR archivos se necesitan políticas de INSERT.
-- =====================================================

-- =====================================================
-- PASO 1: Política para SUBIR imágenes (INSERT)
-- Solo usuarios autenticados pueden subir
-- =====================================================
CREATE POLICY "Usuarios autenticados pueden subir imagenes"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- =====================================================
-- PASO 2: Política para VER/LISTAR imágenes (SELECT)
-- Todos pueden ver las imágenes (público)
-- =====================================================
CREATE POLICY "Cualquiera puede ver imagenes del blog"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- =====================================================
-- PASO 3: Política para ELIMINAR imágenes (DELETE)
-- Solo usuarios autenticados pueden eliminar
-- =====================================================
CREATE POLICY "Usuarios autenticados pueden eliminar imagenes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

-- =====================================================
-- PASO 4: Política para ACTUALIZAR imágenes (UPDATE)
-- Solo usuarios autenticados pueden actualizar
-- =====================================================
CREATE POLICY "Usuarios autenticados pueden actualizar imagenes"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- Después de ejecutar, deberías ver 4 políticas en:
-- Storage > Policies > blog-images
--
-- 1. Usuarios autenticados pueden subir imagenes (INSERT)
-- 2. Cualquiera puede ver imagenes del blog (SELECT)
-- 3. Usuarios autenticados pueden eliminar imagenes (DELETE)
-- 4. Usuarios autenticados pueden actualizar imagenes (UPDATE)
-- =====================================================

