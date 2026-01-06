-- =====================================================
-- FUNCIÓN PARA INCREMENTAR VISITAS DE ARTÍCULOS
-- =====================================================
-- Esta función permite incrementar el contador de visitas
-- de forma segura y sin necesidad de permisos especiales
-- =====================================================

-- Crear o reemplazar la función
CREATE OR REPLACE FUNCTION incrementar_visitas_articulo(articulo_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Ejecuta con permisos del creador
AS $$
BEGIN
  UPDATE blog_articulos
  SET visitas = COALESCE(visitas, 0) + 1,
      actualizado_at = NOW()
  WHERE id = articulo_id;
END;
$$;

-- Dar permisos de ejecución a usuarios anónimos
GRANT EXECUTE ON FUNCTION incrementar_visitas_articulo(UUID) TO anon;
GRANT EXECUTE ON FUNCTION incrementar_visitas_articulo(UUID) TO authenticated;

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- Para probar la función, ejecuta:
-- SELECT incrementar_visitas_articulo('id-del-articulo');
--
-- Para ver las visitas de un artículo:
-- SELECT titulo, visitas FROM blog_articulos WHERE id = 'id-del-articulo';
-- =====================================================

-- =====================================================
-- NOTA IMPORTANTE
-- =====================================================
-- Esta función usa SECURITY DEFINER, lo que significa que
-- se ejecuta con los permisos del usuario que la creó.
-- Esto permite que usuarios anónimos (visitantes del sitio)
-- puedan incrementar el contador sin tener permisos de
-- UPDATE en la tabla blog_articulos.
-- =====================================================


