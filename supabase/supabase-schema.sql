-- =====================================================
-- Schema COMPLETO para Alemán y Pajarón Web
-- Ejecutar este SQL en Supabase SQL Editor
-- =====================================================
-- Incluye:
-- - Proyectos (portfolio)
-- - Blog (artículos)
-- - Formularios (contacto, presupuestos, newsletter)
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
-- Tabla: contactos
-- Para formulario de contacto
-- =====================================================
CREATE TABLE IF NOT EXISTS contactos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  mensaje TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  leido BOOLEAN DEFAULT FALSE,
  respondido BOOLEAN DEFAULT FALSE
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_contactos_created_at ON contactos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contactos_leido ON contactos(leido);
CREATE INDEX IF NOT EXISTS idx_contactos_email ON contactos(email);

-- =====================================================
-- Tabla: presupuestos
-- Para solicitudes de presupuesto
-- =====================================================
CREATE TABLE IF NOT EXISTS presupuestos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  tipo_proyecto VARCHAR(100) NOT NULL,
  presupuesto_estimado VARCHAR(50),
  ubicacion VARCHAR(255),
  fecha_inicio_estimada DATE,
  descripcion TEXT NOT NULL,
  acepta_privacidad BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  leido BOOLEAN DEFAULT FALSE,
  respondido BOOLEAN DEFAULT FALSE,
  estado VARCHAR(50) DEFAULT 'pendiente' -- pendiente, en_proceso, enviado, rechazado
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_presupuestos_created_at ON presupuestos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_presupuestos_estado ON presupuestos(estado);
CREATE INDEX IF NOT EXISTS idx_presupuestos_email ON presupuestos(email);
CREATE INDEX IF NOT EXISTS idx_presupuestos_tipo ON presupuestos(tipo_proyecto);

-- =====================================================
-- Tabla: newsletter (opcional para futuro)
-- =====================================================
CREATE TABLE IF NOT EXISTS newsletter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  confirmado BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_activo ON newsletter(activo);

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagenes_proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuestos ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Políticas para PROYECTOS (Lectura pública)
-- =====================================================

-- Permitir leer proyectos publicados
CREATE POLICY "Permitir leer proyectos publicados"
  ON proyectos FOR SELECT
  USING (publicado = true);

-- Solo admins pueden insertar/actualizar/eliminar
CREATE POLICY "Solo admins pueden gestionar proyectos"
  ON proyectos FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- Políticas para IMÁGENES DE PROYECTOS (Lectura pública)
-- =====================================================

CREATE POLICY "Permitir leer imágenes de proyectos"
  ON imagenes_proyectos FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Solo admins pueden gestionar imágenes"
  ON imagenes_proyectos FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- Políticas para CATEGORÍAS BLOG (Lectura pública)
-- =====================================================

CREATE POLICY "Permitir leer categorías"
  ON categorias_blog FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Solo admins pueden gestionar categorías"
  ON categorias_blog FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- Políticas para BLOG (Lectura pública)
-- =====================================================

CREATE POLICY "Permitir leer artículos publicados"
  ON blog_articulos FOR SELECT
  USING (publicado = true);

CREATE POLICY "Solo admins pueden gestionar artículos"
  ON blog_articulos FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- Políticas para CONTACTOS (Inserción pública)
-- =====================================================

CREATE POLICY "Permitir insertar contactos públicamente"
  ON contactos FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Solo admins pueden leer contactos"
  ON contactos FOR SELECT
  USING (auth.role() = 'service_role');

-- =====================================================
-- Políticas para PRESUPUESTOS (Inserción pública)
-- =====================================================

CREATE POLICY "Permitir insertar presupuestos públicamente"
  ON presupuestos FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Solo admins pueden leer presupuestos"
  ON presupuestos FOR SELECT
  USING (auth.role() = 'service_role');

-- =====================================================
-- Políticas para NEWSLETTER (Inserción pública)
-- =====================================================

CREATE POLICY "Permitir suscribirse a newsletter públicamente"
  ON newsletter FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Solo admins pueden leer newsletter"
  ON newsletter FOR SELECT
  USING (auth.role() = 'service_role');

-- =====================================================
-- Vista para estadísticas (opcional)
-- =====================================================
CREATE OR REPLACE VIEW estadisticas_formularios AS
SELECT
  (SELECT COUNT(*) FROM contactos) as total_contactos,
  (SELECT COUNT(*) FROM contactos WHERE created_at > NOW() - INTERVAL '30 days') as contactos_mes,
  (SELECT COUNT(*) FROM presupuestos) as total_presupuestos,
  (SELECT COUNT(*) FROM presupuestos WHERE created_at > NOW() - INTERVAL '30 days') as presupuestos_mes,
  (SELECT COUNT(*) FROM presupuestos WHERE estado = 'pendiente') as presupuestos_pendientes;

-- =====================================================
-- Comentarios en las tablas
-- =====================================================
COMMENT ON TABLE contactos IS 'Formulario de contacto de la web';
COMMENT ON TABLE presupuestos IS 'Solicitudes de presupuesto';
COMMENT ON TABLE newsletter IS 'Suscriptores al newsletter';

