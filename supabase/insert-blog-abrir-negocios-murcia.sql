-- =====================================================
-- INSERTAR 7 ARTÍCULOS BLOG: "CÓMO ABRIR [NEGOCIO] EN MURCIA"
-- Estrategia OPCIÓN C - Blog para captar tráfico sin canibalizar servicios
-- =====================================================
-- Ejecutar en: Supabase SQL Editor
-- https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new
-- =====================================================

-- Obtener ID de categoría "Licencias"
DO $$
DECLARE
  categoria_licencias_id UUID;
BEGIN
  SELECT id INTO categoria_licencias_id FROM categorias_blog WHERE slug = 'licencias';

  -- =====================================================
  -- 1. CÓMO ABRIR UN BAR O RESTAURANTE EN MURCIA
  -- =====================================================
  INSERT INTO blog_articulos (
    titulo,
    slug,
    resumen,
    contenido,
    autor,
    imagen_destacada,
    categoria_id,
    fecha_publicacion,
    publicado,
    destacado,
    tiempo_lectura,
    tags,
    meta_descripcion,
    meta_keywords
  ) VALUES (
    'Cómo Abrir un Bar o Restaurante en Murcia: Guía Completa 2026',
    'como-abrir-bar-restaurante-murcia-guia-completa-2026',
    'Guía paso a paso para abrir tu bar o restaurante en Murcia: licencias, reformas, costes, plazos y todos los trámites necesarios.',
    '<h2>Todo lo que necesitas saber para abrir tu bar o restaurante en Murcia</h2>
    
    <p>Abrir un bar o restaurante en Murcia requiere planificación, inversión y conocer todos los trámites legales. En esta guía completa te explicamos paso a paso todo lo que necesitas.</p>
    
    <h3>1. Encontrar el local perfecto</h3>
    <p>La ubicación es clave. Busca zonas con tránsito, cerca de oficinas o zonas residenciales. Verifica que el local permita la actividad hostelera en el Plan General de Ordenación Urbana (PGOU) de Murcia.</p>
    
    <h3>2. Licencia de apertura</h3>
    <p><strong>Es obligatoria</strong> y puede tardar entre 2-5 meses. Necesitas:</p>
    <ul>
      <li>Proyecto técnico firmado por arquitecto</li>
      <li>Certificado eléctrico</li>
      <li>Certificado de gas (si procede)</li>
      <li>Certificado de extracción de humos</li>
      <li>Plan de autoprotección</li>
      <li>Estudio acústico (si tienes música)</li>
    </ul>
    <p><strong>Coste estimado:</strong> 2.500€ - 5.000€ (tasas + proyecto)</p>
    
    <h3>3. Reforma del local</h3>
    <p>La reforma debe cumplir normativa de hostelería: cocina, baños, barra, climatización, extracción de humos.</p>
    <p><strong>Coste estimado:</strong> 20.000€ - 80.000€ según tamaño y acabados</p>
    
    <h3>4. Licencia sanitaria y Plan APPCC</h3>
    <p>Obligatorio para manipular alimentos. Debes presentar Plan de Análisis de Peligros y Puntos Críticos de Control.</p>
    
    <h3>5. Alta en Hacienda y Seguridad Social</h3>
    <p>Darte de alta en el IAE (epígrafe 671-672 para hostelería) y en autónomos o régimen general si tienes empleados.</p>
    
    <h3>6. Equipamiento</h3>
    <p>Mobiliario, maquinaria de cocina, vajilla, TPV. <strong>Coste:</strong> 10.000€ - 40.000€</p>
    
    <h3>Inversión total estimada</h3>
    <ul>
      <li>Bar pequeño (50m²): 40.000€ - 80.000€</li>
      <li>Bar con cocina (100m²): 80.000€ - 150.000€</li>
      <li>Restaurante (150m²+): 150.000€ - 300.000€+</li>
    </ul>
    
    <h3>Timeline completo</h3>
    <p>Desde que encuentras el local hasta la apertura: <strong>6-9 meses</strong></p>
    <ul>
      <li>Mes 1-2: Búsqueda local y firma contrato</li>
      <li>Mes 2-3: Proyecto técnico y tramitación licencia</li>
      <li>Mes 3-6: Reforma del local</li>
      <li>Mes 6-7: Equipamiento y decoración</li>
      <li>Mes 7-9: Espera aprobación licencia y apertura</li>
    </ul>
    
    <h3>¿Necesitas ayuda?</h3>
    <p>En Alemán y Pajarón te ayudamos con toda la tramitación de licencias y reforma completa del local. Más de 15 años de experiencia en Murcia.</p>
    
    <p><a href="/servicios/licencia-bar">👉 Ver servicio de Licencia Bar/Restaurante</a></p>
    <p><a href="/presupuesto">👉 Solicitar presupuesto sin compromiso</a></p>',
    'Iván Alemán',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    categoria_licencias_id,
    NOW(),
    true,
    true,
    12,
    ARRAY['abrir bar murcia', 'licencia bar', 'restaurante murcia', 'hostelería'],
    'Guía completa para abrir un bar o restaurante en Murcia en 2026: licencias, reformas, costes, plazos y todos los trámites. Inversión desde 40.000€.',
    ARRAY['abrir bar murcia', 'como abrir un bar', 'licencia bar murcia', 'abrir restaurante murcia', 'montar bar murcia']
  ) ON CONFLICT (slug) DO NOTHING;

  -- =====================================================
  -- 2. CÓMO ABRIR UNA PELUQUERÍA EN MURCIA
  -- =====================================================
  INSERT INTO blog_articulos (
    titulo,
    slug,
    resumen,
    contenido,
    autor,
    imagen_destacada,
    categoria_id,
    fecha_publicacion,
    publicado,
    destacado,
    tiempo_lectura,
    tags,
    meta_descripcion,
    meta_keywords
  ) VALUES (
    'Cómo Abrir una Peluquería en Murcia: Guía Completa 2026',
    'como-abrir-peluqueria-murcia-guia-completa-2026',
    'Todo lo que necesitas para abrir tu peluquería o barbería en Murcia: licencias, reformas, equipamiento, costes y plazos.',
    '<h2>Guía paso a paso para abrir tu peluquería en Murcia</h2>
    
    <p>Abrir una peluquería en Murcia es una inversión accesible con buena rentabilidad. Te explicamos todo el proceso.</p>
    
    <h3>1. Buscar el local adecuado</h3>
    <p>Ubicación a pie de calle, con visibilidad. Superficie mínima: 40-50m². Zonas recomendadas: centros urbanos, zonas residenciales.</p>
    
    <h3>2. Licencia de apertura</h3>
    <p>Más sencilla que hostelería. Plazo: <strong>1-3 meses</strong></p>
    <p>Necesitas:</p>
    <ul>
      <li>Proyecto técnico básico</li>
      <li>Certificado eléctrico</li>
      <li>Instalación de fontanería</li>
      <li>Ventilación adecuada</li>
    </ul>
    <p><strong>Coste licencia:</strong> 1.800€ - 2.500€</p>
    
    <h3>3. Reforma del local</h3>
    <p>Distribución: zona corte, lavacabezas, recepción, almacén.</p>
    <p><strong>Coste reforma:</strong> 12.000€ - 30.000€</p>
    
    <h3>4. Equipamiento</h3>
    <ul>
      <li>Sillones de peluquería: 300-800€/ud</li>
      <li>Lavacabezas: 400-1.000€/ud</li>
      <li>Espejos, tocadores, mobiliario: 3.000-8.000€</li>
      <li>Secadores, planchas, herramientas: 2.000-5.000€</li>
    </ul>
    <p><strong>Total equipamiento:</strong> 8.000€ - 20.000€</p>
    
    <h3>5. Tramitación sanitaria</h3>
    <p>No requiere licencia sanitaria específica, pero debes cumplir normativa higiénico-sanitaria.</p>
    
    <h3>Inversión total</h3>
    <ul>
      <li>Peluquería básica (40-50m²): 25.000€ - 40.000€</li>
      <li>Salón completo (80-100m²): 45.000€ - 70.000€</li>
      <li>Centro belleza (120m²+): 70.000€ - 120.000€</li>
    </ul>
    
    <h3>Timeline</h3>
    <p><strong>Total: 3-5 meses</strong> desde firma del local hasta apertura.</p>
    
    <h3>Te ayudamos con tu proyecto</h3>
    <p>Tramitamos tu licencia y reformamos tu salón de peluquería en Murcia.</p>
    <p><a href="/servicios/licencia-peluqueria">👉 Ver servicio Licencia Peluquería</a></p>
    <p><a href="/presupuesto">👉 Solicitar presupuesto</a></p>',
    'Iván Alemán',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    categoria_licencias_id,
    NOW(),
    true,
    false,
    8,
    ARRAY['abrir peluqueria murcia', 'licencia peluqueria', 'montar salon belleza'],
    'Guía para abrir una peluquería en Murcia: licencias, reformas, equipamiento y costes. Inversión desde 25.000€. Todo lo que necesitas saber.',
    ARRAY['abrir peluqueria murcia', 'como abrir peluqueria', 'licencia peluqueria murcia', 'montar peluqueria']
  ) ON CONFLICT (slug) DO NOTHING;

  -- =====================================================
  -- 3. CÓMO ABRIR UN GIMNASIO EN MURCIA
  -- =====================================================
  INSERT INTO blog_articulos (
    titulo,
    slug,
    resumen,
    contenido,
    autor,
    imagen_destacada,
    categoria_id,
    fecha_publicacion,
    publicado,
    destacado,
    tiempo_lectura,
    tags,
    meta_descripcion,
    meta_keywords
  ) VALUES (
    'Cómo Abrir un Gimnasio o Box en Murcia: Guía Completa 2026',
    'como-abrir-gimnasio-box-murcia-guia-completa-2026',
    'Guía completa para abrir tu gimnasio o box CrossFit en Murcia: licencias, reformas, equipamiento, inversión y plazos.',
    '<h2>Todo para abrir tu gimnasio en Murcia</h2>
    
    <p>El sector fitness está en auge. Te explicamos cómo abrir tu gimnasio o box en Murcia paso a paso.</p>
    
    <h3>1. Tipo de gimnasio</h3>
    <ul>
      <li><strong>Box/Sala pequeña (100-150m²):</strong> CrossFit, funcional, boutique</li>
      <li><strong>Gimnasio medio (250-400m²):</strong> Musculación + cardio + clases</li>
      <li><strong>Gimnasio grande (500m²+):</strong> Completo con piscina/spa</li>
    </ul>
    
    <h3>2. Licencia de apertura</h3>
    <p>Más compleja por vestuarios y duchas. <strong>Plazo: 3-5 meses</strong></p>
    <p>Requisitos:</p>
    <ul>
      <li>Proyecto técnico completo</li>
      <li>Vestuarios separados por sexo</li>
      <li>Duchas y aseos adaptados</li>
      <li>Ventilación y climatización</li>
      <li>Insonorización (si hay música)</li>
      <li>Salidas de emergencia</li>
    </ul>
    <p><strong>Coste licencia:</strong> 3.200€ - 5.500€</p>
    
    <h3>3. Reforma</h3>
    <p><strong>Coste:</strong> 30.000€ - 100.000€ según superficie y acabados</p>
    
    <h3>4. Equipamiento</h3>
    <ul>
      <li>Máquinas musculación: 15.000€ - 50.000€</li>
      <li>Cardio: 10.000€ - 30.000€</li>
      <li>Peso libre y racks: 5.000€ - 15.000€</li>
      <li>Vestuarios y taquillas: 5.000€ - 10.000€</li>
      <li>Sistema acceso y gestión: 2.000€ - 5.000€</li>
    </ul>
    <p><strong>Total equipamiento:</strong> 40.000€ - 120.000€</p>
    
    <h3>Inversión total</h3>
    <ul>
      <li>Box pequeño (100m²): 60.000€ - 100.000€</li>
      <li>Gimnasio medio (300m²): 120.000€ - 200.000€</li>
      <li>Gimnasio grande (500m²): 250.000€ - 400.000€+</li>
    </ul>
    
    <h3>Timeline: 6-9 meses</h3>
    
    <p><a href="/servicios/licencia-gimnasio">👉 Ver servicio Licencia Gimnasio</a></p>
    <p><a href="/presupuesto">👉 Solicitar presupuesto</a></p>',
    'Iván Alemán',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    categoria_licencias_id,
    NOW(),
    true,
    false,
    10,
    ARRAY['abrir gimnasio murcia', 'licencia gimnasio', 'box crossfit murcia'],
    'Cómo abrir un gimnasio o box en Murcia: licencias, reformas, equipamiento y costes. Inversión desde 60.000€. Guía completa 2026.',
    ARRAY['abrir gimnasio murcia', 'como abrir gimnasio', 'licencia gimnasio murcia', 'box crossfit murcia']
  ) ON CONFLICT (slug) DO NOTHING;

  -- =====================================================
  -- 4. CÓMO ABRIR UNA CLÍNICA ESTÉTICA EN MURCIA
  -- =====================================================
  INSERT INTO blog_articulos (
    titulo,
    slug,
    resumen,
    contenido,
    autor,
    imagen_destacada,
    categoria_id,
    fecha_publicacion,
    publicado,
    destacado,
    tiempo_lectura,
    tags,
    meta_descripcion,
    meta_keywords
  ) VALUES (
    'Cómo Abrir una Clínica Estética en Murcia: Guía Completa 2026',
    'como-abrir-clinica-estetica-murcia-guia-completa-2026',
    'Guía para abrir tu clínica de estética en Murcia: licencias, requisitos sanitarios, reforma, equipamiento e inversión necesaria.',
    '<h2>Abre tu clínica de medicina estética en Murcia</h2>
    
    <p>La medicina estética es un sector en crecimiento. Te explicamos todos los requisitos para abrir tu clínica.</p>
    
    <h3>1. Tipos de centros</h3>
    <ul>
      <li><strong>Centro de estética:</strong> Sin actos médicos</li>
      <li><strong>Clínica de medicina estética:</strong> Con médico colegiado</li>
    </ul>
    
    <h3>2. Licencia sanitaria</h3>
    <p>Si realizas actos médicos (toxina botulínica, rellenos, láser médico) <strong>necesitas autorización sanitaria de la Consejería de Salud</strong>.</p>
    <p><strong>Plazo:</strong> 3-6 meses | <strong>Coste:</strong> 2.800€ - 4.500€</p>
    
    <h3>3. Requisitos técnicos</h3>
    <ul>
      <li>Sala de espera</li>
      <li>Cabinas individuales</li>
      <li>Aseo adaptado</li>
      <li>Área esterilización</li>
      <li>Climatización y ventilación</li>
      <li>Botiquín y desfibrilador (según actividad)</li>
    </ul>
    
    <h3>4. Personal</h3>
    <p>Director médico colegiado si hay actos médicos. Esteticistas tituladas.</p>
    
    <h3>Inversión</h3>
    <ul>
      <li>Centro estética (60m²): 35.000€ - 60.000€</li>
      <li>Clínica medicina estética (100m²): 70.000€ - 120.000€</li>
    </ul>
    
    <p><a href="/servicios/licencia-clinica-estetica">👉 Licencia Clínica Estética</a></p>
    <p><a href="/presupuesto">👉 Presupuesto sin compromiso</a></p>',
    'Iván Alemán',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    categoria_licencias_id,
    NOW(),
    true,
    false,
    8,
    ARRAY['abrir clinica estetica murcia', 'licencia clinica estetica', 'medicina estetica'],
    'Guía para abrir clínica estética en Murcia: licencias, requisitos sanitarios, reforma e inversión. Desde 35.000€.',
    ARRAY['abrir clinica estetica murcia', 'licencia clinica estetica', 'centro estetica murcia']
  ) ON CONFLICT (slug) DO NOTHING;

  -- =====================================================
  -- 5. CÓMO ABRIR UNA CLÍNICA VETERINARIA EN MURCIA
  -- =====================================================
  INSERT INTO blog_articulos (
    titulo,
    slug,
    resumen,
    contenido,
    autor,
    imagen_destacada,
    categoria_id,
    fecha_publicacion,
    publicado,
    destacado,
    tiempo_lectura,
    tags,
    meta_descripcion,
    meta_keywords
  ) VALUES (
    'Cómo Abrir una Clínica Veterinaria en Murcia: Requisitos 2026',
    'como-abrir-clinica-veterinaria-murcia-requisitos-2026',
    'Guía completa para abrir tu clínica veterinaria en Murcia: licencias sanitarias, requisitos técnicos, inversión y normativa.',
    '<h2>Abre tu clínica veterinaria en Murcia</h2>
    
    <p>Abrir una clínica veterinaria requiere cumplir estricta normativa sanitaria. Te explicamos el proceso completo.</p>
    
    <h3>1. Autorización sanitaria</h3>
    <p>Obligatoria de la Consejería de Agricultura de la Región de Murcia. <strong>Plazo: 4-6 meses</strong></p>
    
    <h3>2. Requisitos técnicos</h3>
    <ul>
      <li>Sala espera</li>
      <li>Consulta</li>
      <li>Quirófano</li>
      <li>Hospitalización</li>
      <li>Rayos X (plomado)</li>
      <li>Laboratorio</li>
      <li>Almacén medicamentos</li>
      <li>Zona residuos biosanitarios</li>
    </ul>
    
    <h3>3. Personal</h3>
    <p>Veterinario colegiado como director técnico. ATV (Auxiliar Técnico Veterinario).</p>
    
    <h3>Inversión</h3>
    <ul>
      <li>Clínica básica (80m²): 60.000€ - 100.000€</li>
      <li>Clínica completa (150m²): 120.000€ - 200.000€</li>
    </ul>
    
    <p><a href="/servicios/licencia-veterinaria">👉 Licencia Clínica Veterinaria</a></p>',
    'Iván Alemán',
    'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=80',
    categoria_licencias_id,
    NOW(),
    true,
    false,
    8,
    ARRAY['abrir clinica veterinaria murcia', 'licencia veterinaria', 'centro veterinario'],
    'Cómo abrir clínica veterinaria en Murcia: licencias, requisitos sanitarios, inversión. Guía completa.',
    ARRAY['abrir clinica veterinaria murcia', 'licencia veterinaria murcia', 'centro veterinario']
  ) ON CONFLICT (slug) DO NOTHING;

  -- =====================================================
  -- 6. CÓMO ABRIR UN CENTRO MÉDICO EN MURCIA
  -- =====================================================
  INSERT INTO blog_articulos (
    titulo,
    slug,
    resumen,
    contenido,
    autor,
    imagen_destacada,
    categoria_id,
    fecha_publicacion,
    publicado,
    destacado,
    tiempo_lectura,
    tags,
    meta_descripcion,
    meta_keywords
  ) VALUES (
    'Cómo Abrir un Centro Médico o Clínica en Murcia: Guía 2026',
    'como-abrir-centro-medico-clinica-murcia-guia-2026',
    'Todo sobre cómo abrir un centro médico o clínica privada en Murcia: licencias sanitarias, requisitos, inversión y trámites.',
    '<h2>Abrir centro médico o clínica privada en Murcia</h2>
    
    <p>Los centros sanitarios privados están muy regulados. Te explicamos todos los pasos y requisitos.</p>
    
    <h3>1. Autorización sanitaria</h3>
    <p>Obligatoria de la Consejería de Salud. <strong>Proceso largo: 6-12 meses</strong></p>
    
    <h3>2. Requisitos según tipo</h3>
    <ul>
      <li><strong>Consulta individual:</strong> 1 médico, sala consulta, aseo</li>
      <li><strong>Centro policlínica:</strong> Múltiples especialidades</li>
      <li><strong>Clínica con quirófano:</strong> Quirófano, reanimación, esterilización</li>
    </ul>
    
    <h3>3. Requisitos técnicos mínimos</h3>
    <ul>
      <li>Sala espera</li>
      <li>Consultas individuales por especialidad</li>
      <li>Aseos adaptados</li>
      <li>Almacén medicamentos</li>
      <li>Residuos sanitarios</li>
      <li>Climatización</li>
      <li>Protección datos (RGPD)</li>
    </ul>
    
    <h3>4. Personal</h3>
    <p>Director médico. Médicos especialistas colegiados. Personal sanitario titulado.</p>
    
    <h3>Inversión</h3>
    <ul>
      <li>Consulta individual (40m²): 25.000€ - 50.000€</li>
      <li>Policlínica (150m²): 100.000€ - 200.000€</li>
      <li>Clínica quirúrgica (300m²+): 300.000€ - 600.000€+</li>
    </ul>
    
    <p><a href="/servicios/licencia-centro-medico">👉 Licencia Centro Médico</a></p>',
    'Iván Alemán',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    categoria_licencias_id,
    NOW(),
    true,
    false,
    10,
    ARRAY['abrir centro medico murcia', 'licencia centro medico', 'clinica privada'],
    'Guía para abrir centro médico o clínica en Murcia: licencias sanitarias, requisitos, inversión. Todo lo que necesitas.',
    ARRAY['abrir centro medico murcia', 'licencia centro medico', 'clinica privada murcia']
  ) ON CONFLICT (slug) DO NOTHING;

  -- =====================================================
  -- 7. REQUISITOS PARA ABRIR UNA FARMACIA EN MURCIA
  -- =====================================================
  INSERT INTO blog_articulos (
    titulo,
    slug,
    resumen,
    contenido,
    autor,
    imagen_destacada,
    categoria_id,
    fecha_publicacion,
    publicado,
    destacado,
    tiempo_lectura,
    tags,
    meta_descripcion,
    meta_keywords
  ) VALUES (
    'Requisitos para Abrir una Farmacia en la Región de Murcia 2026',
    'requisitos-abrir-farmacia-region-murcia-2026',
    'Guía completa sobre requisitos, licencias, inversión y proceso para abrir una oficina de farmacia en la Región de Murcia.',
    '<h2>Cómo abrir una oficina de farmacia en Murcia</h2>
    
    <p>Abrir una farmacia es el proceso más regulado. Requiere ser farmacéutico titulado y superar concurso público.</p>
    
    <h3>1. Requisitos previos</h3>
    <ul>
      <li>Ser farmacéutico colegiado</li>
      <li>No tener otra farmacia en propiedad</li>
      <li>Participar en concurso público de apertura de farmacias</li>
      <li>Cumplir requisitos de distancia y población (Ley de Ordenación Farmacéutica)</li>
    </ul>
    
    <h3>2. Proceso de apertura</h3>
    <ol>
      <li><strong>Concurso público:</strong> Consejería de Salud convoca plazas</li>
      <li><strong>Adjudicación:</strong> Por puntuación (méritos, antigüedad)</li>
      <li><strong>Autorización administrativa:</strong> 6-12 meses</li>
      <li><strong>Inspección farmacéutica:</strong> Verificación local y requisitos</li>
      <li><strong>Apertura definitiva</strong></li>
    </ol>
    
    <h3>3. Requisitos del local</h3>
    <ul>
      <li>Superficie mínima: 90m² útiles</li>
      <li>Zona atención público</li>
      <li>Laboratorio</li>
      <li>Almacén</li>
      <li>Aseo</li>
      <li>Sistema climatización</li>
      <li>Alarma y seguridad</li>
    </ul>
    
    <h3>4. Inversión</h3>
    <ul>
      <li>Reforma local: 40.000€ - 80.000€</li>
      <li>Mobiliario y estanterías: 30.000€ - 60.000€</li>
      <li>Stock inicial: 50.000€ - 100.000€</li>
      <li>Software gestión: 5.000€ - 15.000€</li>
    </ul>
    <p><strong>Total: 150.000€ - 300.000€</strong></p>
    
    <h3>Timeline: 12-18 meses</h3>
    <p>Desde concurso hasta apertura.</p>
    
    <p><a href="/servicios/licencia-farmacia">👉 Licencia y Reforma Farmacia</a></p>',
    'Iván Alemán',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=80',
    categoria_licencias_id,
    NOW(),
    true,
    false,
    10,
    ARRAY['abrir farmacia murcia', 'licencia farmacia', 'oficina farmacia'],
    'Requisitos para abrir farmacia en Murcia: licencias, concurso público, inversión. Guía completa Región de Murcia.',
    ARRAY['abrir farmacia murcia', 'requisitos farmacia', 'licencia farmacia murcia', 'oficina farmacia']
  ) ON CONFLICT (slug) DO NOTHING;

END $$;
