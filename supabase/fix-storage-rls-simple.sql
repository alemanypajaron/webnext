-- =====================================================
-- SOLUCIÓN SIMPLE: Desactivar RLS en el bucket
-- =====================================================
-- Si las políticas no funcionan, la solución más simple
-- es desactivar RLS completamente para el bucket
-- =====================================================

-- IMPORTANTE: Esto hace el bucket COMPLETAMENTE PÚBLICO
-- Cualquiera puede subir, ver y eliminar archivos
-- Solo úsalo para desarrollo/testing

-- Para desactivar RLS, ejecuta esto en SQL Editor:
-- (No hay forma de hacerlo con políticas, debe ser desde la UI)

-- Ve a: Storage > blog-images > Settings
-- Marca: "Disable RLS"

-- =====================================================
-- ALTERNATIVA: Políticas más permisivas
-- =====================================================

-- Primero, eliminar todas las políticas existentes
DELETE FROM storage.policies WHERE bucket_id = 'blog-images';

-- Política 1: Lectura pública (cualquiera puede ver)
INSERT INTO storage.policies (id, bucket_id, name, definition, check)
VALUES (
  'public-read-policy',
  'blog-images',
  'Public Read Access',
  '(bucket_id = ''blog-images'')',
  NULL
);

-- Política 2: Subida pública (TEMPORALMENTE para testing)
INSERT INTO storage.policies (id, bucket_id, name, definition, check)
VALUES (
  'public-upload-policy',
  'blog-images',  
  'Public Upload Access',
  NULL,
  '(bucket_id = ''blog-images'')'
);

-- Política 3: Actualización pública
INSERT INTO storage.policies (id, bucket_id, name, definition, check)
VALUES (
  'public-update-policy',
  'blog-images',
  'Public Update Access', 
  '(bucket_id = ''blog-images'')',
  '(bucket_id = ''blog-images'')'
);

-- Política 4: Eliminación pública
INSERT INTO storage.policies (id, bucket_id, name, definition, check)
VALUES (
  'public-delete-policy',
  'blog-images',
  'Public Delete Access',
  '(bucket_id = ''blog-images'')',
  NULL
);

-- =====================================================
-- VERIFICAR
-- =====================================================
SELECT * FROM storage.policies WHERE bucket_id = 'blog-images';


