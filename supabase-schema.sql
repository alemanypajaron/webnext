-- Schema para Alemán y Pajarón Web
-- Ejecutar este SQL en Supabase SQL Editor

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
-- IMPORTANTE: Permite insertar desde el frontend
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuestos ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Políticas para CONTACTOS
-- Permitir INSERT desde el frontend (con anon key)
CREATE POLICY "Permitir insertar contactos públicamente"
  ON contactos FOR INSERT
  TO anon
  WITH CHECK (true);

-- Solo admins pueden leer (necesitarías service_role key)
CREATE POLICY "Solo admins pueden leer contactos"
  ON contactos FOR SELECT
  USING (auth.role() = 'service_role');

-- Políticas para PRESUPUESTOS
CREATE POLICY "Permitir insertar presupuestos públicamente"
  ON presupuestos FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Solo admins pueden leer presupuestos"
  ON presupuestos FOR SELECT
  USING (auth.role() = 'service_role');

-- Políticas para NEWSLETTER
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

