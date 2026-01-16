-- =====================================================
-- Migración: Agregar campo seo_noindex a blog_articulos
-- Fecha: Enero 2026
-- Propósito: Control granular de indexación SEO para cada artículo
-- =====================================================

-- Agregar columna seo_noindex (por defecto false = indexar)
ALTER TABLE blog_articulos 
ADD COLUMN IF NOT EXISTS seo_noindex BOOLEAN DEFAULT FALSE;

-- Comentario explicativo
COMMENT ON COLUMN blog_articulos.seo_noindex IS 
'Control SEO: si es TRUE, el artículo tendrá noindex,follow. Usar para contenido no estratégico, thin content, o páginas legales del blog.';

-- Crear índice para filtrar en sitemap
CREATE INDEX IF NOT EXISTS idx_blog_seo_noindex ON blog_articulos(seo_noindex);

-- =====================================================
-- Ejemplos de uso:
-- =====================================================

-- Marcar un artículo específico como noindex:
-- UPDATE blog_articulos SET seo_noindex = TRUE WHERE slug = 'articulo-no-estrategico';

-- Ver todos los artículos marcados como noindex:
-- SELECT titulo, slug, seo_noindex FROM blog_articulos WHERE seo_noindex = TRUE;

-- Marcar múltiples artículos por categoría (ejemplo):
-- UPDATE blog_articulos 
-- SET seo_noindex = TRUE 
-- WHERE categoria_id = (SELECT id FROM categorias_blog WHERE slug = 'noticias');
