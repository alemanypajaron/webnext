-- =====================================================
-- Crear bucket "imagenes" en Supabase Storage
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

-- Crear el bucket "imagenes" (público)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'imagenes',
  'imagenes',
  true,
  52428800, -- 50MB en bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Crear políticas de acceso para el bucket
-- Política 1: Permitir lectura pública de todas las imágenes
CREATE POLICY IF NOT EXISTS "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'imagenes');

-- Política 2: Permitir subida de imágenes (requiere autenticación o service_role)
CREATE POLICY IF NOT EXISTS "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'imagenes');

-- Política 3: Permitir actualización de imágenes
CREATE POLICY IF NOT EXISTS "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'imagenes')
WITH CHECK (bucket_id = 'imagenes');

-- Política 4: Permitir eliminación de imágenes
CREATE POLICY IF NOT EXISTS "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'imagenes');

-- Verificar que el bucket se creó correctamente
SELECT * FROM storage.buckets WHERE name = 'imagenes';
