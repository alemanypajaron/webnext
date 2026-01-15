/**
 * Script para enriquecer descripciones de proyectos con análisis visual de imágenes
 * 
 * Este script lee las imágenes de cada proyecto y genera descripciones 
 * más detalladas basadas en lo que se ve en las fotos.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATOS_DIR = path.join(__dirname, 'datos_proyectos_generados');
const OUTPUT_DIR = path.join(__dirname, 'datos_proyectos_enriquecidos');

// Análisis manual basado en las imágenes vistas
const analisisManual = {
  'floridablanca-2024': {
    caracteristicas: [
      'Armarios empotrados con puertas correderas en tonos grises',
      'Iluminación LED integrada de diseño moderno',
      'Suelos de tarima flotante en tonos naturales',
      'Baño completo con ducha de obra con azulejos tipo metro en gris',
      'Espejo retroiluminado con iluminación LED perimetral',
      'Mueble de baño suspendido con lavabo sobre encimera',
      'Grifería monomando de diseño contemporáneo',
      'Mampara de cristal transparente con perfil cromado',
      'Paredes lisas pintadas en blanco y tonos neutros'
    ],
    espacios: ['dormitorio', 'baño', 'zona de almacenaje'],
    estilo: 'contemporáneo_minimalista',
    calidad: 'alta',
    descripcion_adicional: 'El proyecto destaca por la calidad de los acabados, con especial atención al diseño del baño que combina azulejos tipo metro en tonos grises con elementos de iluminación LED integrados. Los armarios empotrados a medida optimizan el espacio de almacenamiento.'
  },
  'clinica-estetica-la-flota-2024': {
    caracteristicas: [
      'Espacio diáfano con cerramiento decorativo tipo celosía',
      'Suelos de tarima flotante en tonos naturales',
      'Instalaciones especializadas para equipamiento médico-estético',
      'Iluminación empotrada en falso techo',
      'Normativa específica de sanidad cumplida',
      'Acabados profesionales de fácil limpieza'
    ],
    espacios: ['sala de espera', 'cabinas de tratamiento', 'recepción'],
    estilo: 'profesional_minimalista',
    calidad: 'alta',
    descripcion_adicional: 'Local adaptado específicamente para clínica estética, con acabados que cumplen normativa sanitaria y diseño que transmite profesionalidad y confort a los clientes.'
  },
  'correos-2024': {
    caracteristicas: [
      'Revestimiento de madera con lamas verticales retroiluminadas',
      'Iluminación LED indirecta de ambiente',
      'Suelos de tarima flotante',
      'Diseño de entrada moderno con buzón integrado',
      'Acabados de alta calidad en madera natural'
    ],
    espacios: ['recibidor', 'distribuidor'],
    estilo: 'moderno_elegante',
    calidad: 'premium',
    descripcion_adicional: 'Reforma que destaca por el impresionante revestimiento de madera con iluminación LED integrada en el recibidor, creando un efecto visual espectacular y acogedor.'
  },
  'bernales-2023': {
    caracteristicas: [
      'Armarios empotrados a medida en acabado lacado blanco',
      'Carpintería de aluminio con ventanas practicables',
      'Suelos de tarima flotante en tonos claros',
      'Iluminación empotrada LED en falso techo',
      'Distribución optimizada para maximizar el espacio',
      'Acabados lisos en paredes y techos'
    ],
    espacios: ['dormitorio', 'zona de almacenaje'],
    estilo: 'contemporáneo_luminoso',
    calidad: 'alta',
    descripcion_adicional: 'Proyecto que maximiza el aprovechamiento del espacio con armarios empotrados de suelo a techo en acabado lacado blanco, creando una atmósfera luminosa y ordenada.'
  },
  'la-fama-2021': {
    caracteristicas: [
      'Mueble de baño con encimera de madera natural maciza',
      'Lavabo sobre encimera de diseño contemporáneo',
      'Espejo decorativo de gran formato con marco metálico',
      'Revestimiento cerámico en tonos beige y tierra',
      'Grifería cromada monomando de alta calidad',
      'Suelos de tarima flotante que continúan desde la vivienda',
      'Iluminación natural mediante ventana con contraventanas'
    ],
    espacios: ['baño', 'aseo'],
    estilo: 'natural_cálido',
    calidad: 'premium',
    descripcion_adicional: 'Baño que destaca por la integración de elementos naturales como la encimera de madera maciza, combinada con cerámicas en tonos tierra que aportan calidez y elegancia al espacio.'
  },
  'vistabella-2025': {
    caracteristicas: [
      'Escalera volada con estructura metálica y peldaños de madera',
      'Diseño minimalista y funcional',
      'Barandilla de metal lacado en gris claro',
      'Suelos de tarima flotante de alta calidad',
      'Aprovechamiento de doble altura',
      'Iluminación natural cenital'
    ],
    espacios: ['escalera', 'distribuidor', 'doble altura'],
    estilo: 'industrial_moderno',
    calidad: 'alta',
    descripcion_adicional: 'Proyecto que incluye una impresionante escalera volada de diseño contemporáneo, con estructura metálica y peldaños de madera que aportan ligereza visual y conectan los diferentes niveles de la vivienda.'
  },
  'el-palmar-2023': {
    caracteristicas: [
      'Baño con revestimiento cerámico tipo metro en negro',
      'Espejo con iluminación LED perimetral',
      'Mueble de baño suspendido con cajones',
      'Lavabo integrado en encimera',
      'Grifería cromada empotrada en pared',
      'Estor enrollable opaco para privacidad',
      'Combinación elegante de negro y blanco'
    ],
    espacios: ['baño'],
    estilo: 'moderno_elegante',
    calidad: 'alta',
    descripcion_adicional: 'Baño con diseño elegante y atemporal que utiliza azulejos tipo metro en negro combinados con sanitarios y acabados en blanco, creando un contraste sofisticado y moderno.'
  },
  'lousteau-2018': {
    caracteristicas: [
      'Baño completo con revestimiento efecto cemento pulido',
      'Mampara de cristal con vidrio serigrafiado decorativo',
      'Ducha de obra con plato integrado',
      'Grifería cromada empotrada de diseño moderno',
      'Inodoro suspendido con cisterna empotrada',
      'Ventilación decorativa con persianas venecianas',
      'Acabados en tonos grises y blancos'
    ],
    espacios: ['baño'],
    estilo: 'industrial_moderno',
    calidad: 'alta',
    descripcion_adicional: 'Reforma de baño con estilo industrial-moderno que destaca por los revestimientos efecto cemento pulido y la mampara de cristal con diseño serigrafiado, creando un espacio contemporáneo y elegante.'
  },
  'same-wave-2019': {
    caracteristicas: [
      'Local comercial con diseño corporativo personalizado',
      'Mural decorativo de gran formato en pared principal',
      'Zona de espera con sofás modulares negros',
      'Mesa de trabajo en tonos mostaza',
      'Falso techo registrable con iluminación empotrada',
      'Suelos técnicos de alta resistencia',
      'Mobiliario modular adaptable'
    ],
    espacios: ['recepción', 'sala de espera', 'zona de trabajo'],
    estilo: 'corporativo_moderno',
    calidad: 'alta',
    descripcion_adicional: 'Local comercial con diseño corporativo que incluye elementos personalizados como murales decorativos de gran formato, combinando funcionalidad profesional con un ambiente acogedor y moderno.'
  },
  'san-juan-2016': {
    caracteristicas: [
      'Armarios empotrados de suelo a techo lacados en blanco',
      'Distribución diáfana optimizada',
      'Cocina integrada con encimera de madera',
      'Suelos de tarima flotante',
      'Domótica integrada con controles digitales',
      'Iluminación LED empotrada',
      'Acabados minimalistas en blanco'
    ],
    espacios: ['salón-cocina', 'zona de almacenaje'],
    estilo: 'minimalista_funcional',
    calidad: 'media-alta',
    descripcion_adicional: 'Reforma integral con enfoque minimalista que maximiza el aprovechamiento del espacio mediante armarios empotrados y una distribución diáfana que integra cocina y salón de manera fluida.'
  },
  'santa-eulalia-2023': {
    caracteristicas: [
      'Suelos de tarima flotante en tonos claros',
      'Carpintería de aluminio con corredera de gran formato',
      'Acabados en construcción de alta calidad',
      'Espacios amplios y luminosos',
      'Distribución moderna y funcional',
      'Preparación para instalaciones completas'
    ],
    espacios: ['salón', 'distribuidor'],
    estilo: 'contemporáneo_luminoso',
    calidad: 'alta',
    descripcion_adicional: 'Proyecto que destaca por la calidad de los materiales y acabados, con suelos de tarima flotante en tonos claros y carpintería de aluminio de grandes dimensiones que aportan luminosidad al espacio.'
  },
  'santa-marta-2018': {
    caracteristicas: [
      'Dormitorio con cabecero retroiluminado LED horizontal',
      'Iluminación LED indirecta en todo el cabecero',
      'Suelos de tarima flotante en tonos cálidos',
      'Mesitas de noche suspendidas',
      'Paredes pintadas en tonos neutros',
      'Persiana motorizada',
      'Diseño cálido y acogedor'
    ],
    espacios: ['dormitorio'],
    estilo: 'contemporáneo_cálido',
    calidad: 'alta',
    descripcion_adicional: 'Dormitorio que destaca por su espectacular cabecero con iluminación LED horizontal integrada, creando un ambiente cálido y sofisticado que combina funcionalidad con diseño contemporáneo.'
  },
  'soriano-2017': {
    caracteristicas: [
      'Local comercial totalmente diáfano',
      'Falso techo registrable con iluminación LED empotrada',
      'Suelos vinílicos imitación madera en tonos grises',
      'Paredes lisas pintadas en blanco',
      'Instalaciones vistas organizadas',
      'Climatización mediante split empotrado',
      'Zócalo perimetral moderno'
    ],
    espacios: ['local comercial', 'espacio diáfano'],
    estilo: 'comercial_funcional',
    calidad: 'media-alta',
    descripcion_adicional: 'Local comercial reformado con enfoque funcional, que ofrece un espacio diáfano totalmente adaptable con acabados modernos y instalaciones preparadas para cualquier tipo de negocio.'
  }
};

async function enriquecerProyecto(nombreArchivo) {
  const rutaOriginal = path.join(DATOS_DIR, nombreArchivo);
  const contenido = await fs.readFile(rutaOriginal, 'utf-8');
  const proyecto = JSON.parse(contenido);
  
  const slug = proyecto.slug;
  const analisis = analisisManual[slug];
  
  if (!analisis) {
    console.log(`   ℹ️  No hay análisis manual para ${slug}`);
    return proyecto;
  }
  
  console.log(`   🎨 Enriqueciendo ${slug} con análisis visual...`);
  
  // Enriquecer descripción completa con detalles específicos
  let descripcionMejorada = proyecto.descripcion_completa;
  
  // Insertar antes del último h3 (Resultado Final)
  const insertPoint = descripcionMejorada.lastIndexOf('<h3>Resultado Final</h3>');
  
  let detallesVisuales = `<h3>Detalles y Acabados</h3>\n`;
  detallesVisuales += `<p>${analisis.descripcion_adicional}</p>\n`;
  detallesVisuales += `<p>Elementos destacados del proyecto:</p>\n<ul>\n`;
  
  analisis.caracteristicas.forEach(carac => {
    detallesVisuales += `<li>${carac}</li>\n`;
  });
  
  detallesVisuales += `</ul>\n\n`;
  
  descripcionMejorada = descripcionMejorada.slice(0, insertPoint) + 
                        detallesVisuales + 
                        descripcionMejorada.slice(insertPoint);
  
  proyecto.descripcion_completa = descripcionMejorada;
  
  // Añadir metadatos de análisis
  proyecto.analisis_visual = {
    espacios: analisis.espacios,
    estilo: analisis.estilo,
    calidad: analisis.calidad,
    fecha_analisis: new Date().toISOString()
  };
  
  return proyecto;
}

async function main() {
  console.log('🎨 Enriqueciendo proyectos con análisis visual...\n');
  
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const archivos = await fs.readdir(DATOS_DIR);
  const archivosProyectos = archivos.filter(f => 
    f.endsWith('.json') && !f.startsWith('_')
  );
  
  const proyectosEnriquecidos = [];
  
  for (const archivo of archivosProyectos) {
    try {
      const proyecto = await enriquecerProyecto(archivo);
      proyectosEnriquecidos.push(proyecto);
      
      // Guardar proyecto enriquecido
      const rutaSalida = path.join(OUTPUT_DIR, archivo);
      await fs.writeFile(
        rutaSalida,
        JSON.stringify(proyecto, null, 2),
        'utf-8'
      );
      
      console.log(`   ✅ ${archivo}`);
    } catch (error) {
      console.error(`   ❌ Error en ${archivo}:`, error.message);
    }
  }
  
  // Guardar todos los proyectos enriquecidos
  await fs.writeFile(
    path.join(OUTPUT_DIR, '_todos_proyectos_enriquecidos.json'),
    JSON.stringify(proyectosEnriquecidos, null, 2),
    'utf-8'
  );
  
  console.log('\n✨ Proceso completado');
  console.log(`📁 Proyectos enriquecidos guardados en: ${OUTPUT_DIR}`);
}

main().catch(console.error);
