-- =====================================================
-- NUEVAS TABLAS: Proyectos y Blog
-- Ejecutar SOLO ESTE SQL en Supabase SQL Editor
-- (Las tablas de contactos, presupuestos, newsletter ya están)
-- =====================================================

-- =====================================================
-- Tabla: proyectos
-- Portfolio de proyectos realizados
-- =====================================================
CREATE TABLE IF NOT EXISTS proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  descripcion_corta TEXT NOT NULL,
  descripcion_completa TEXT NOT NULL,
  ubicacion VARCHAR(255) NOT NULL,
  ano INTEGER NOT NULL,
  superficie VARCHAR(50),
  presupuesto VARCHAR(50),
  duracion VARCHAR(50),
  servicios TEXT[], -- Array de servicios: ['Dirección de Obra', 'Licencias']
  estado VARCHAR(50) DEFAULT 'completado', -- completado, en_curso, pausado
  imagen_principal TEXT NOT NULL,
  cliente VARCHAR(255),
  destacado BOOLEAN DEFAULT FALSE,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  publicado BOOLEAN DEFAULT TRUE
);

-- Índices para proyectos
CREATE INDEX IF NOT EXISTS idx_proyectos_slug ON proyectos(slug);
CREATE INDEX IF NOT EXISTS idx_proyectos_publicado ON proyectos(publicado);
CREATE INDEX IF NOT EXISTS idx_proyectos_destacado ON proyectos(destacado);
CREATE INDEX IF NOT EXISTS idx_proyectos_orden ON proyectos(orden);
CREATE INDEX IF NOT EXISTS idx_proyectos_ano ON proyectos(ano DESC);

-- =====================================================
-- Tabla: imagenes_proyectos
-- Galería de imágenes para cada proyecto
-- =====================================================
CREATE TABLE IF NOT EXISTS imagenes_proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  proyecto_id UUID REFERENCES proyectos(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  descripcion TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Índices para imágenes
CREATE INDEX IF NOT EXISTS idx_imagenes_proyecto_id ON imagenes_proyectos(proyecto_id);
CREATE INDEX IF NOT EXISTS idx_imagenes_orden ON imagenes_proyectos(orden);

-- =====================================================
-- Tabla: categorias_blog
-- Categorías para organizar artículos
-- =====================================================
CREATE TABLE IF NOT EXISTS categorias_blog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT,
  color VARCHAR(20) DEFAULT '#F9B513',
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Índices para categorías
CREATE INDEX IF NOT EXISTS idx_categorias_slug ON categorias_blog(slug);
CREATE INDEX IF NOT EXISTS idx_categorias_orden ON categorias_blog(orden);

-- =====================================================
-- Tabla: blog_articulos
-- Artículos del blog
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_articulos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  resumen TEXT NOT NULL,
  contenido TEXT NOT NULL,
  autor VARCHAR(100) DEFAULT 'Alemán y Pajarón',
  imagen_destacada TEXT NOT NULL,
  categoria_id UUID REFERENCES categorias_blog(id) ON DELETE SET NULL,
  fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  actualizado_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  publicado BOOLEAN DEFAULT TRUE,
  destacado BOOLEAN DEFAULT FALSE,
  visitas INTEGER DEFAULT 0,
  tiempo_lectura INTEGER DEFAULT 5, -- minutos
  tags TEXT[], -- Array de tags: ['reforma', 'murcia', 'licencias']
  meta_descripcion TEXT,
  meta_keywords TEXT[]
);

-- Índices para blog
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_articulos(slug);
CREATE INDEX IF NOT EXISTS idx_blog_publicado ON blog_articulos(publicado);
CREATE INDEX IF NOT EXISTS idx_blog_destacado ON blog_articulos(destacado);
CREATE INDEX IF NOT EXISTS idx_blog_fecha ON blog_articulos(fecha_publicacion DESC);
CREATE INDEX IF NOT EXISTS idx_blog_categoria ON blog_articulos(categoria_id);

-- =====================================================
-- Row Level Security (RLS) - SOLO para nuevas tablas
-- =====================================================

-- Habilitar RLS
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagenes_proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articulos ENABLE ROW LEVEL SECURITY;

-- Políticas para PROYECTOS (Lectura pública de publicados)
CREATE POLICY "Permitir leer proyectos publicados"
  ON proyectos FOR SELECT
  USING (publicado = true);

-- Políticas para IMÁGENES DE PROYECTOS (Lectura pública)
CREATE POLICY "Permitir leer imágenes de proyectos"
  ON imagenes_proyectos FOR SELECT
  TO anon, authenticated
  USING (true);

-- Políticas para CATEGORÍAS BLOG (Lectura pública)
CREATE POLICY "Permitir leer categorías"
  ON categorias_blog FOR SELECT
  TO anon, authenticated
  USING (true);

-- Políticas para BLOG (Lectura pública de publicados)
CREATE POLICY "Permitir leer artículos publicados"
  ON blog_articulos FOR SELECT
  USING (publicado = true);

-- =====================================================
-- DATOS DE EJEMPLO - Categorías Blog
-- =====================================================
INSERT INTO categorias_blog (nombre, slug, descripcion, color, orden) VALUES
('Reformas', 'reformas', 'Artículos sobre reformas integrales y parciales', '#F9B513', 1),
('Licencias', 'licencias', 'Información sobre licencias y permisos', '#0A2230', 2),
('Consejos', 'consejos', 'Consejos y recomendaciones para tu obra', '#E0A410', 3),
('Normativa', 'normativa', 'Actualizaciones sobre normativa de construcción', '#0F2D3F', 4)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- DATOS DE EJEMPLO - Proyecto 1
-- =====================================================
INSERT INTO proyectos (
  titulo,
  slug,
  descripcion_corta,
  descripcion_completa,
  ubicacion,
  ano,
  superficie,
  presupuesto,
  duracion,
  servicios,
  estado,
  imagen_principal,
  cliente,
  destacado,
  orden,
  publicado
) VALUES (
  'Reforma Integral Vivienda Centro Murcia',
  'reforma-integral-centro-murcia',
  'Reforma completa de vivienda de 120m² en el centro histórico de Murcia. Proyecto integral que incluye redistribución de espacios, actualización de instalaciones y mejora de eficiencia energética.',
  '<h2>Descripción del Proyecto</h2>
<p>Este proyecto consistió en la reforma integral de una vivienda de 120m² ubicada en el corazón del casco histórico de Murcia. El objetivo principal era modernizar completamente el espacio, respetando el carácter arquitectónico del edificio protegido.</p>

<h3>Trabajos Realizados</h3>
<ul>
<li><strong>Redistribución total:</strong> Eliminación de tabiques para crear espacios más amplios y luminosos</li>
<li><strong>Instalaciones nuevas:</strong> Renovación completa de electricidad, fontanería y climatización</li>
<li><strong>Mejora energética:</strong> Aislamiento térmico y acústico, ventanas de doble acristalamiento</li>
<li><strong>Cocina integral:</strong> Diseño personalizado con mobiliario a medida</li>
<li><strong>Baños completos:</strong> Reforma de 2 baños con materiales de alta calidad</li>
<li><strong>Suelos:</strong> Instalación de parquet de roble natural</li>
</ul>

<h3>Retos del Proyecto</h3>
<p>Al tratarse de un edificio protegido en el centro histórico, fue necesario obtener licencias especiales y respetar ciertos elementos arquitectónicos originales. Nuestro equipo gestionó todos los permisos necesarios y coordinó con Patrimonio para garantizar el cumplimiento normativo.</p>

<h3>Resultado Final</h3>
<p>El resultado es una vivienda moderna, eficiente y luminosa que respeta el carácter histórico del edificio. Los propietarios ahora disfrutan de un espacio completamente renovado que combina confort contemporáneo con el encanto del casco antiguo murciano.</p>',
  'Centro Histórico, Murcia',
  2023,
  '120 m²',
  '80.000€ - 100.000€',
  '6 meses',
  ARRAY['Dirección de Obra', 'Licencias y Permisos', 'Reforma Integral', 'Diseño de Espacios'],
  'completado',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80',
  'Privado',
  true,
  1,
  true
) ON CONFLICT (slug) DO NOTHING;

-- Imágenes para el proyecto 1
INSERT INTO imagenes_proyectos (proyecto_id, url, alt_text, descripcion, orden)
SELECT 
  p.id,
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80',
  'Vista general salón reforma Murcia',
  'Salón principal tras la reforma con diseño moderno',
  1
FROM proyectos p WHERE p.slug = 'reforma-integral-centro-murcia'
ON CONFLICT DO NOTHING;

INSERT INTO imagenes_proyectos (proyecto_id, url, alt_text, descripcion, orden)
SELECT 
  p.id,
  'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=2000&q=80',
  'Cocina reforma integral Murcia',
  'Cocina equipada con electrodomésticos de alta gama',
  2
FROM proyectos p WHERE p.slug = 'reforma-integral-centro-murcia'
ON CONFLICT DO NOTHING;

INSERT INTO imagenes_proyectos (proyecto_id, url, alt_text, descripcion, orden)
SELECT 
  p.id,
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2000&q=80',
  'Baño principal reforma Murcia',
  'Baño completo con ducha de obra y materiales premium',
  3
FROM proyectos p WHERE p.slug = 'reforma-integral-centro-murcia'
ON CONFLICT DO NOTHING;

-- =====================================================
-- DATOS DE EJEMPLO - Artículo Blog 1
-- =====================================================
INSERT INTO blog_articulos (
  titulo,
  slug,
  resumen,
  contenido,
  autor,
  imagen_destacada,
  categoria_id,
  publicado,
  destacado,
  tiempo_lectura,
  tags,
  meta_descripcion,
  meta_keywords
) VALUES (
  'Guía Completa: Licencias Necesarias para Reformar tu Vivienda en Murcia',
  'licencias-necesarias-reforma-vivienda-murcia',
  'Descubre qué licencias y permisos necesitas para llevar a cabo tu reforma en Murcia. Te explicamos paso a paso todo el proceso administrativo.',
  '<h2>¿Qué licencias necesito para reformar mi vivienda en Murcia?</h2>
<p>Una de las preguntas más frecuentes que recibimos en nuestro estudio es: <strong>"¿Necesito licencia para mi reforma?"</strong> La respuesta depende del tipo de obra que vayas a realizar.</p>

<h3>1. Obras que NO requieren licencia (Comunicación Previa)</h3>
<p>Algunas obras menores solo necesitan una comunicación previa al Ayuntamiento:</p>
<ul>
<li>Pintura y decoración interior</li>
<li>Cambio de suelos sin afectar estructura</li>
<li>Instalación de aire acondicionado (sin unidad exterior visible)</li>
<li>Sustitución de sanitarios sin modificar instalaciones</li>
</ul>

<h3>2. Obras que SÍ requieren Licencia Municipal</h3>
<p>Estas obras necesitan una licencia de obra menor o mayor:</p>
<ul>
<li><strong>Licencia de Obra Menor:</strong>
  <ul>
    <li>Reforma de baños o cocinas</li>
    <li>Cambio de ventanas exteriores</li>
    <li>Instalación de aire acondicionado con unidad exterior</li>
    <li>Obras de tabiquería interior</li>
  </ul>
</li>
<li><strong>Licencia de Obra Mayor:</strong>
  <ul>
    <li>Reformas integrales</li>
    <li>Modificación de estructura</li>
    <li>Ampliaciones</li>
    <li>Cambio de uso</li>
    <li>Obras que afecten a fachada</li>
  </ul>
</li>
</ul>

<h3>3. Documentación Necesaria</h3>
<p>Para tramitar la licencia necesitarás:</p>
<ul>
<li>Proyecto técnico firmado por arquitecto/arquitecto técnico</li>
<li>Presupuesto de obra</li>
<li>Certificado del Colegio Profesional</li>
<li>Escrituras de propiedad</li>
<li>Nota simple registral</li>
<li>IBI del inmueble</li>
</ul>

<h3>4. Plazos y Costes</h3>
<p><strong>Plazo de resolución:</strong> Entre 1 y 3 meses dependiendo del tipo de licencia.</p>
<p><strong>Costes:</strong> El ICIO (Impuesto sobre Construcciones) es aproximadamente el 4% del presupuesto de obra en Murcia.</p>

<h3>5. Consecuencias de no tener licencia</h3>
<p>Realizar obras sin licencia puede conllevar:</p>
<ul>
<li>Multas económicas importantes</li>
<li>Orden de paralización de obra</li>
<li>Demolición de lo construido</li>
<li>Problemas en futuras ventas del inmueble</li>
</ul>

<h2>¿Necesitas ayuda con las licencias?</h2>
<p>En Alemán y Pajarón nos encargamos de toda la gestión de licencias y permisos para tu reforma. <a href="/contacto">Contacta con nosotros</a> y te asesoraremos sin compromiso.</p>',
  'Iván Alemán',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80',
  (SELECT id FROM categorias_blog WHERE slug = 'licencias' LIMIT 1),
  true,
  true,
  8,
  ARRAY['licencias', 'permisos', 'reforma', 'murcia', 'ayuntamiento'],
  'Guía completa sobre licencias necesarias para reformas en Murcia. Todo lo que debes saber sobre permisos, plazos y costes.',
  ARRAY['licencia obra Murcia', 'permisos reforma', 'licencia municipal', 'ICIO Murcia', 'reforma sin licencia']
) ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- Función: Actualizar updated_at automáticamente
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_proyectos_updated_at
  BEFORE UPDATE ON proyectos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_updated_at
  BEFORE UPDATE ON blog_articulos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Comentarios en las tablas
-- =====================================================
COMMENT ON TABLE proyectos IS 'Portfolio de proyectos realizados';
COMMENT ON TABLE imagenes_proyectos IS 'Galería de imágenes para cada proyecto';
COMMENT ON TABLE categorias_blog IS 'Categorías para organizar artículos del blog';
COMMENT ON TABLE blog_articulos IS 'Artículos del blog';

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================

