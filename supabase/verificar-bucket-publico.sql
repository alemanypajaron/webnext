-- =====================================================
-- VERIFICAR SI EL BUCKET ES PÚBLICO
-- =====================================================

-- Ver configuración actual del bucket
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  avif_autodetection
FROM storage.buckets 
WHERE id = 'blog-images';

-- Ver políticas actuales (si hay alguna)
SELECT 
  id,
  name,
  bucket_id,
  definition
FROM storage.policies 
WHERE bucket_id = 'blog-images';

-- =====================================================
-- INTERPRETAR RESULTADOS:
-- =====================================================
-- Si "public" = false → El bucket NO es público (problema)
-- Si "public" = true → El bucket SÍ es público (correcto)
-- Si hay políticas listadas → Pueden estar bloqueando el acceso
-- =====================================================


