-- =====================================================
-- Verificar estado de publicación de los proyectos
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =====================================================

-- Ver todos los proyectos y su estado de publicación
SELECT 
  id,
  titulo,
  slug,
  publicado,
  destacado,
  created_at
FROM proyectos
ORDER BY created_at DESC;

-- Contar proyectos por estado
SELECT 
  publicado,
  COUNT(*) as cantidad
FROM proyectos
GROUP BY publicado;
