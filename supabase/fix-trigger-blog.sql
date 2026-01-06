-- =====================================================
-- FIX: Trigger roto en blog_articulos
-- =====================================================
-- PROBLEMA: El trigger intenta actualizar "updated_at"
-- pero la columna se llama "actualizado_at"
-- =====================================================

-- Eliminar el trigger roto
DROP TRIGGER IF EXISTS update_blog_updated_at ON blog_articulos;

-- Crear función específica para blog (actualizado_at)
CREATE OR REPLACE FUNCTION update_actualizado_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.actualizado_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger correcto
CREATE TRIGGER update_blog_actualizado_at
  BEFORE UPDATE ON blog_articulos
  FOR EACH ROW
  EXECUTE FUNCTION update_actualizado_at_column();

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- Después de ejecutar esto, deberías poder actualizar
-- artículos sin problemas.
-- =====================================================


