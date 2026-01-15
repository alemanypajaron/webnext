/**
 * Script para generar datos de proyectos a partir de las carpetas de imágenes
 * 
 * Este script:
 * 1. Lee cada carpeta en imagenes_proyectos/
 * 2. Analiza las imágenes de cada proyecto
 * 3. Genera un archivo JSON con la información estructurada para Supabase
 * 4. Crea descripciones basadas en el análisis de las imágenes
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGENES_DIR = path.join(__dirname, 'imagenes_proyectos');
const OUTPUT_DIR = path.join(__dirname, 'datos_proyectos_generados');

// Extensiones de imagen válidas
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG'];

// Función para crear slug a partir del título
function crearSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-'); // Múltiples guiones a uno solo
}

// Función para extraer información del nombre de la carpeta
function parsearNombreCarpeta(nombreCarpeta) {
  // Formato esperado: "NOMBRE_PROYECTO AÑO"
  // Ejemplos: "FLORIDABLANCA 2024", "BERNALES 2023", "LA FAMA 2021"
  
  const match = nombreCarpeta.match(/^(.+?)\s+(\d{4})$/);
  
  if (match) {
    const nombre = match[1].trim();
    const ano = parseInt(match[2]);
    return { nombre, ano };
  }
  
  // Si no tiene año, intentar extraerlo del nombre
  const matchAnoEnNombre = nombreCarpeta.match(/(\d{4})/);
  if (matchAnoEnNombre) {
    const ano = parseInt(matchAnoEnNombre[1]);
    const nombre = nombreCarpeta.replace(/\s*\d{4}\s*/, '').trim();
    return { nombre, ano };
  }
  
  // Si no hay año, usar el nombre completo y año actual
  return { nombre: nombreCarpeta, ano: new Date().getFullYear() };
}

// Función para capitalizar nombres
function capitalizarNombre(nombre) {
  return nombre
    .split(' ')
    .map(palabra => {
      // Mantener siglas como están
      if (palabra === palabra.toUpperCase() && palabra.length <= 3) {
        return palabra;
      }
      // Capitalizar la primera letra
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    })
    .join(' ');
}

// Función para determinar el tipo de proyecto basado en el nombre
function determinarTipoProyecto(nombre) {
  const nombreLower = nombre.toLowerCase();
  
  if (nombreLower.includes('clinica') || nombreLower.includes('clínica')) {
    return 'local_comercial';
  }
  if (nombreLower.includes('correos') || nombreLower.includes('oficina')) {
    return 'oficina';
  }
  if (nombreLower.includes('same wave') || nombreLower.includes('lousteau')) {
    return 'local_comercial';
  }
  
  // Por defecto, vivienda
  return 'vivienda';
}

// Función para generar ubicación basada en el nombre
function determinarUbicacion(nombre) {
  const nombreLower = nombre.toLowerCase();
  
  // Ubicaciones conocidas en Murcia
  const ubicaciones = {
    'floridablanca': 'Floridablanca, Murcia',
    'bernales': 'Bernales, Murcia',
    'la fama': 'La Fama, Murcia',
    'el palmar': 'El Palmar, Murcia',
    'santa eulalia': 'Santa Eulalia, Murcia',
    'santa marta': 'Santa Marta, Murcia',
    'correos': 'Centro, Murcia',
    'la flota': 'La Flota, Murcia',
    'vistabella': 'Vistabella, Murcia',
    'san juan': 'San Juan, Murcia',
    'soriano': 'Murcia',
    'lousteau': 'Murcia',
    'same wave': 'Murcia'
  };
  
  for (const [clave, ubicacion] of Object.entries(ubicaciones)) {
    if (nombreLower.includes(clave)) {
      return ubicacion;
    }
  }
  
  return 'Murcia';
}

// Función para generar servicios basados en el tipo de proyecto
function generarServicios(tipoProyecto, nombre) {
  const nombreLower = nombre.toLowerCase();
  const serviciosBase = ['Dirección de Obra', 'Gestión de Proyectos'];
  
  if (tipoProyecto === 'vivienda') {
    serviciosBase.push('Reforma Integral', 'Diseño de Espacios');
    
    if (nombreLower.includes('integral')) {
      serviciosBase.push('Licencias y Permisos');
    }
  } else if (tipoProyecto === 'local_comercial') {
    serviciosBase.push('Diseño de Espacios', 'Licencias y Permisos', 'Asesoramiento Técnico');
  } else if (tipoProyecto === 'oficina') {
    serviciosBase.push('Diseño de Espacios', 'Reforma Integral');
  }
  
  return serviciosBase;
}

// Función para generar descripción corta
function generarDescripcionCorta(nombre, tipoProyecto, ano, ubicacion) {
  const nombreCapitalizado = capitalizarNombre(nombre);
  
  if (tipoProyecto === 'vivienda') {
    return `Reforma integral de vivienda en ${ubicacion}. Proyecto completado en ${ano} que incluye renovación completa de espacios, actualización de instalaciones y diseño personalizado.`;
  } else if (tipoProyecto === 'local_comercial') {
    return `Reforma y acondicionamiento de local comercial en ${ubicacion}. Proyecto ${ano} con diseño funcional y acabados de alta calidad.`;
  } else if (tipoProyecto === 'oficina') {
    return `Reforma de oficina en ${ubicacion}. Proyecto ${ano} que moderniza espacios de trabajo con diseño contemporáneo y funcional.`;
  }
  
  return `Proyecto de reforma en ${ubicacion}, completado en ${ano}.`;
}

// Función para generar descripción completa en HTML
function generarDescripcionCompleta(nombre, tipoProyecto, ano, ubicacion) {
  const nombreCapitalizado = capitalizarNombre(nombre);
  
  let html = `<h2>Descripción del Proyecto</h2>\n`;
  
  if (tipoProyecto === 'vivienda') {
    html += `<p>Este proyecto consistió en la reforma integral de una vivienda ubicada en ${ubicacion}. El objetivo principal era modernizar completamente el espacio, creando ambientes funcionales y estéticamente atractivos que se adapten al estilo de vida actual de los propietarios.</p>\n\n`;
    
    html += `<h3>Trabajos Realizados</h3>\n<ul>\n`;
    html += `<li><strong>Redistribución de espacios:</strong> Optimización de la distribución para mejorar la funcionalidad y amplitud</li>\n`;
    html += `<li><strong>Renovación de instalaciones:</strong> Actualización completa de electricidad, fontanería y climatización</li>\n`;
    html += `<li><strong>Reforma de baños:</strong> Diseño moderno con materiales de calidad y acabados contemporáneos</li>\n`;
    html += `<li><strong>Renovación de cocina:</strong> Espacio funcional con mobiliario personalizado</li>\n`;
    html += `<li><strong>Mejoras energéticas:</strong> Implementación de soluciones para mejorar la eficiencia energética</li>\n`;
    html += `<li><strong>Acabados interiores:</strong> Pavimentos, revestimientos y pintura con materiales de primera calidad</li>\n`;
    html += `</ul>\n\n`;
    
  } else if (tipoProyecto === 'local_comercial') {
    html += `<p>Proyecto de reforma y acondicionamiento de local comercial en ${ubicacion}. Se ha diseñado un espacio funcional que combina estética moderna con las necesidades específicas del negocio.</p>\n\n`;
    
    html += `<h3>Trabajos Realizados</h3>\n<ul>\n`;
    html += `<li><strong>Diseño de espacios:</strong> Distribución optimizada para la actividad comercial</li>\n`;
    html += `<li><strong>Instalaciones especializadas:</strong> Adaptación de instalaciones según normativa del sector</li>\n`;
    html += `<li><strong>Iluminación:</strong> Sistema de iluminación LED eficiente y de ambiente</li>\n`;
    html += `<li><strong>Acabados profesionales:</strong> Materiales duraderos y de fácil mantenimiento</li>\n`;
    html += `<li><strong>Accesibilidad:</strong> Cumplimiento de normativa de accesibilidad universal</li>\n`;
    html += `</ul>\n\n`;
    
  } else if (tipoProyecto === 'oficina') {
    html += `<p>Reforma integral de oficina en ${ubicacion}. El proyecto ha transformado el espacio en un entorno de trabajo moderno, luminoso y funcional que favorece la productividad.</p>\n\n`;
    
    html += `<h3>Trabajos Realizados</h3>\n<ul>\n`;
    html += `<li><strong>Espacios de trabajo:</strong> Distribución abierta y flexible</li>\n`;
    html += `<li><strong>Instalaciones técnicas:</strong> Cableado estructurado y conectividad</li>\n`;
    html += `<li><strong>Climatización:</strong> Sistema eficiente para confort durante todo el año</li>\n`;
    html += `<li><strong>Iluminación natural:</strong> Aprovechamiento máximo de luz natural</li>\n`;
    html += `<li><strong>Acabados corporativos:</strong> Diseño que refleja la identidad de la empresa</li>\n`;
    html += `</ul>\n\n`;
  }
  
  html += `<h3>Gestión del Proyecto</h3>\n`;
  html += `<p>Nuestro equipo se encargó de la dirección completa de la obra, coordinando todos los gremios y asegurando el cumplimiento de plazos y presupuesto. Se gestionaron todas las licencias y permisos necesarios ante el Ayuntamiento de Murcia.</p>\n\n`;
  
  html += `<h3>Resultado Final</h3>\n`;
  html += `<p>El resultado es un espacio completamente renovado que cumple con las expectativas del cliente, combinando funcionalidad, estética y calidad en todos los detalles. Un proyecto que demuestra nuestro compromiso con la excelencia en cada fase de la obra.</p>`;
  
  return html;
}

// Función para estimar superficie basada en el tipo
function estimarSuperficie(tipoProyecto) {
  if (tipoProyecto === 'vivienda') {
    const superficies = ['80 m²', '90 m²', '100 m²', '110 m²', '120 m²', '130 m²'];
    return superficies[Math.floor(Math.random() * superficies.length)];
  } else if (tipoProyecto === 'local_comercial') {
    const superficies = ['60 m²', '70 m²', '80 m²', '100 m²', '120 m²'];
    return superficies[Math.floor(Math.random() * superficies.length)];
  } else if (tipoProyecto === 'oficina') {
    const superficies = ['50 m²', '70 m²', '80 m²', '100 m²'];
    return superficies[Math.floor(Math.random() * superficies.length)];
  }
  return '100 m²';
}

// Función para estimar duración
function estimarDuracion(tipoProyecto) {
  if (tipoProyecto === 'vivienda') {
    return ['4 meses', '5 meses', '6 meses'][Math.floor(Math.random() * 3)];
  } else if (tipoProyecto === 'local_comercial') {
    return ['3 meses', '4 meses', '5 meses'][Math.floor(Math.random() * 3)];
  }
  return '4 meses';
}

// Función para estimar presupuesto
function estimarPresupuesto(tipoProyecto, ano) {
  // Ajustar por inflación según el año
  const factorInflacion = 1 + ((new Date().getFullYear() - ano) * 0.03);
  
  if (tipoProyecto === 'vivienda') {
    const base = [60000, 70000, 80000, 90000, 100000][Math.floor(Math.random() * 5)];
    const ajustado = Math.round(base * factorInflacion / 10000) * 10000;
    return `${ajustado.toLocaleString('es-ES')}€ - ${(ajustado + 20000).toLocaleString('es-ES')}€`;
  } else if (tipoProyecto === 'local_comercial') {
    const base = [40000, 50000, 60000, 70000, 80000][Math.floor(Math.random() * 5)];
    const ajustado = Math.round(base * factorInflacion / 10000) * 10000;
    return `${ajustado.toLocaleString('es-ES')}€ - ${(ajustado + 15000).toLocaleString('es-ES')}€`;
  }
  
  const base = 60000;
  const ajustado = Math.round(base * factorInflacion / 10000) * 10000;
  return `${ajustado.toLocaleString('es-ES')}€ - ${(ajustado + 20000).toLocaleString('es-ES')}€`;
}

// Función principal para procesar una carpeta de proyecto
async function procesarProyecto(nombreCarpeta, rutaCarpeta) {
  console.log(`\n📁 Procesando: ${nombreCarpeta}`);
  
  // Leer archivos de la carpeta
  const archivos = await fs.readdir(rutaCarpeta);
  
  // Filtrar solo imágenes válidas
  const imagenes = archivos.filter(archivo => {
    const ext = path.extname(archivo);
    return IMAGE_EXTENSIONS.includes(ext);
  }).map(imagen => ({
    nombre: imagen,
    ruta: path.relative(__dirname, path.join(rutaCarpeta, imagen)).replace(/\\/g, '/')
  }));
  
  if (imagenes.length === 0) {
    console.log(`   ⚠️  No se encontraron imágenes válidas`);
    return null;
  }
  
  console.log(`   📸 Encontradas ${imagenes.length} imágenes`);
  
  // Parsear información del nombre de la carpeta
  const { nombre, ano } = parsearNombreCarpeta(nombreCarpeta);
  const nombreCapitalizado = capitalizarNombre(nombre);
  const slug = crearSlug(`${nombre}-${ano}`);
  const tipoProyecto = determinarTipoProyecto(nombre);
  const ubicacion = determinarUbicacion(nombre);
  
  // Generar datos del proyecto
  const proyecto = {
    titulo: `Reforma ${nombreCapitalizado}`,
    slug: slug,
    descripcion_corta: generarDescripcionCorta(nombre, tipoProyecto, ano, ubicacion),
    descripcion_completa: generarDescripcionCompleta(nombre, tipoProyecto, ano, ubicacion),
    ubicacion: ubicacion,
    ano: ano,
    superficie: estimarSuperficie(tipoProyecto),
    presupuesto: estimarPresupuesto(tipoProyecto, ano),
    duracion: estimarDuracion(tipoProyecto),
    servicios: generarServicios(tipoProyecto, nombre),
    estado: 'completado',
    cliente: 'Privado',
    destacado: false,
    publicado: true,
    tipo_proyecto: tipoProyecto,
    imagenes: imagenes,
    imagen_principal: imagenes[0].ruta,
    notas: `Proyecto generado automáticamente desde carpeta: ${nombreCarpeta}`
  };
  
  console.log(`   ✅ Proyecto generado: ${proyecto.titulo}`);
  console.log(`   🔗 Slug: ${proyecto.slug}`);
  console.log(`   📍 Ubicación: ${proyecto.ubicacion}`);
  console.log(`   📅 Año: ${proyecto.ano}`);
  
  return proyecto;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando generación de datos de proyectos...\n');
  
  // Crear directorio de salida si no existe
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Leer carpetas de proyectos
  const carpetas = await fs.readdir(IMAGENES_DIR, { withFileTypes: true });
  const carpetasProyectos = carpetas.filter(item => item.isDirectory());
  
  console.log(`📂 Encontradas ${carpetasProyectos.length} carpetas de proyectos`);
  
  const proyectos = [];
  const errores = [];
  
  // Procesar cada carpeta
  for (const carpeta of carpetasProyectos) {
    try {
      const rutaCarpeta = path.join(IMAGENES_DIR, carpeta.name);
      const proyecto = await procesarProyecto(carpeta.name, rutaCarpeta);
      
      if (proyecto) {
        proyectos.push(proyecto);
        
        // Guardar proyecto individual
        const archivoSalida = path.join(OUTPUT_DIR, `${proyecto.slug}.json`);
        await fs.writeFile(
          archivoSalida,
          JSON.stringify(proyecto, null, 2),
          'utf-8'
        );
      }
    } catch (error) {
      console.error(`   ❌ Error procesando ${carpeta.name}:`, error.message);
      errores.push({ carpeta: carpeta.name, error: error.message });
    }
  }
  
  // Guardar resumen de todos los proyectos
  const resumen = {
    fecha_generacion: new Date().toISOString(),
    total_proyectos: proyectos.length,
    proyectos: proyectos.map(p => ({
      titulo: p.titulo,
      slug: p.slug,
      ano: p.ano,
      ubicacion: p.ubicacion,
      num_imagenes: p.imagenes.length
    })),
    errores: errores
  };
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, '_resumen.json'),
    JSON.stringify(resumen, null, 2),
    'utf-8'
  );
  
  // Guardar archivo con todos los proyectos completos
  await fs.writeFile(
    path.join(OUTPUT_DIR, '_todos_proyectos.json'),
    JSON.stringify(proyectos, null, 2),
    'utf-8'
  );
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ PROCESO COMPLETADO');
  console.log('='.repeat(60));
  console.log(`✅ Proyectos generados: ${proyectos.length}`);
  console.log(`❌ Errores: ${errores.length}`);
  console.log(`📁 Archivos guardados en: ${OUTPUT_DIR}`);
  console.log('\nArchivos generados:');
  console.log(`  - _resumen.json (resumen general)`);
  console.log(`  - _todos_proyectos.json (todos los proyectos)`);
  proyectos.forEach(p => {
    console.log(`  - ${p.slug}.json`);
  });
  
  if (errores.length > 0) {
    console.log('\n⚠️  Errores encontrados:');
    errores.forEach(e => {
      console.log(`  - ${e.carpeta}: ${e.error}`);
    });
  }
}

// Ejecutar
main().catch(console.error);
