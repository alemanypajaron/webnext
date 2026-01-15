/**
 * Script para subir proyectos a Supabase
 * 
 * Este script:
 * 1. Lee los proyectos generados del directorio datos_proyectos_generados
 * 2. Sube las imágenes físicas al storage de Supabase (bucket: imagenes)
 * 3. Crea los registros de proyectos en la base de datos
 * 4. Crea los registros de imágenes asociadas a cada proyecto
 * 
 * Uso: node subir-proyectos-supabase.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATOS_DIR = path.join(__dirname, 'datos_proyectos_enriquecidos');
const IMAGENES_BASE_DIR = path.join(__dirname, 'imagenes_proyectos');

// Leer variables de entorno del archivo .env.local
async function cargarEnv() {
  try {
    const envContent = await fs.readFile(path.join(__dirname, '.env.local'), 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    return env;
  } catch (error) {
    console.error('❌ Error leyendo .env.local:', error.message);
    console.error('Por favor, asegúrate de que el archivo .env.local existe en el directorio raíz');
    return null;
  }
}

const env = await cargarEnv();
if (!env) process.exit(1);

// Configurar cliente de Supabase con privilegios de administrador
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL');
  console.error('Por favor, añade SUPABASE_SERVICE_ROLE_KEY al archivo .env.local');
  console.error('Puedes encontrarlo en: Supabase Dashboard → Settings → API → service_role key');
  process.exit(1);
}

// Advertir si estamos usando la clave anon en lugar de la service_role
if (!env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️  ADVERTENCIA: Usando ANON_KEY en lugar de SERVICE_ROLE_KEY');
  console.warn('   Para evitar problemas de permisos, añade SUPABASE_SERVICE_ROLE_KEY a .env.local\n');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Verificar conexión con Supabase
async function verificarConexion() {
  try {
    const { data, error } = await supabase
      .from('proyectos')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    console.log('✅ Conexión con Supabase establecida correctamente\n');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con Supabase:', error.message);
    return false;
  }
}

// Subir imagen a Supabase Storage
async function subirImagen(rutaLocal, rutaStorage) {
  try {
    // Leer el archivo
    const archivoBuffer = await fs.readFile(rutaLocal);
    
    // Determinar el tipo MIME
    const ext = path.extname(rutaLocal).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp'
    };
    const contentType = mimeTypes[ext] || 'image/jpeg';
    
    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from('proyectos-images')
      .upload(rutaStorage, archivoBuffer, {
        contentType,
        upsert: true // Sobrescribir si ya existe
      });
    
    if (error) {
      // Si el error es que ya existe, no es un problema crítico
      if (error.message.includes('already exists')) {
        console.log(`   ℹ️  Imagen ya existe: ${rutaStorage}`);
        return true;
      }
      // Mostrar error detallado
      console.error(`   ❌ Error subiendo ${rutaStorage}:`);
      console.error(`      Mensaje: ${error.message}`);
      console.error(`      Código: ${error.statusCode || 'N/A'}`);
      console.error(`      Detalles:`, JSON.stringify(error, null, 2));
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error(`   ❌ Error subiendo ${rutaStorage}:`, error.message);
    if (error.statusCode) {
      console.error(`      Status: ${error.statusCode}`);
    }
    return false;
  }
}

// Obtener URL pública de una imagen en storage
function obtenerUrlPublica(rutaStorage) {
  const { data } = supabase.storage
    .from('proyectos-images')
    .getPublicUrl(rutaStorage);
  
  return data.publicUrl;
}

// Verificar si un proyecto ya existe por slug
async function proyectoExiste(slug) {
  const { data, error } = await supabase
    .from('proyectos')
    .select('id')
    .eq('slug', slug)
    .single();
  
  return data !== null;
}

// Subir un proyecto completo
async function subirProyecto(proyectoData) {
  const { titulo, slug } = proyectoData;
  
  console.log(`\n📦 Procesando: ${titulo}`);
  console.log(`   🔗 Slug: ${slug}`);
  
  // Verificar si ya existe
  const existe = await proyectoExiste(slug);
  if (existe) {
    console.log(`   ⚠️  El proyecto ya existe en la base de datos. Omitiendo...`);
    return { success: false, reason: 'already_exists' };
  }
  
  try {
    // 1. Subir imágenes al storage
    console.log(`   📸 Subiendo ${proyectoData.imagenes.length} imágenes...`);
    
    const imagenesSubidas = [];
    let imagenPrincipalUrl = null;
    
    for (let i = 0; i < proyectoData.imagenes.length; i++) {
      const imagen = proyectoData.imagenes[i];
      const rutaLocal = path.join(__dirname, imagen.ruta);
      
      // Crear ruta en storage: proyectos/slug/nombre-imagen.jpg
      const nombreImagen = imagen.nombre;
      const rutaStorage = `proyectos/${slug}/${nombreImagen}`;
      
      // Verificar que el archivo existe
      try {
        await fs.access(rutaLocal);
      } catch {
        console.log(`   ⚠️  Archivo no encontrado: ${rutaLocal}`);
        continue;
      }
      
      const subida = await subirImagen(rutaLocal, rutaStorage);
      
      if (subida) {
        const urlPublica = obtenerUrlPublica(rutaStorage);
        imagenesSubidas.push({
          url: urlPublica,
          orden: i + 1,
          alt_text: `${titulo} - Imagen ${i + 1}`,
          descripcion: null
        });
        
        // La primera imagen es la principal
        if (i === 0) {
          imagenPrincipalUrl = urlPublica;
        }
      }
    }
    
    if (imagenesSubidas.length === 0) {
      console.log(`   ❌ No se pudo subir ninguna imagen`);
      return { success: false, reason: 'no_images' };
    }
    
    console.log(`   ✅ ${imagenesSubidas.length} imágenes subidas correctamente`);
    
    // 2. Crear el registro del proyecto
    console.log(`   💾 Creando registro en base de datos...`);
    
    const proyectoInsert = {
      titulo: proyectoData.titulo,
      slug: proyectoData.slug,
      descripcion_corta: proyectoData.descripcion_corta,
      descripcion_completa: proyectoData.descripcion_completa,
      ubicacion: proyectoData.ubicacion,
      ano: proyectoData.ano,
      superficie: proyectoData.superficie || '100 m²',
      presupuesto: proyectoData.presupuesto || '60.000€ - 80.000€',
      duracion: proyectoData.duracion || '4 meses',
      servicios: proyectoData.servicios || [],
      estado: proyectoData.estado || 'completado',
      imagen_principal: imagenPrincipalUrl,
      cliente: proyectoData.cliente || 'Privado',
      destacado: proyectoData.destacado || false,
      publicado: proyectoData.publicado !== false, // Por defecto true
      orden: 0
    };
    
    const { data: proyectoCreado, error: errorProyecto } = await supabase
      .from('proyectos')
      .insert(proyectoInsert)
      .select()
      .single();
    
    if (errorProyecto) {
      console.error(`   ❌ Error creando proyecto:`, errorProyecto.message);
      return { success: false, reason: 'database_error', error: errorProyecto };
    }
    
    console.log(`   ✅ Proyecto creado con ID: ${proyectoCreado.id}`);
    
    // 3. Crear registros de imágenes
    console.log(`   🖼️  Registrando imágenes en base de datos...`);
    
    const imagenesInsert = imagenesSubidas.map(img => ({
      proyecto_id: proyectoCreado.id,
      url: img.url,
      alt_text: img.alt_text,
      descripcion: img.descripcion,
      orden: img.orden
    }));
    
    const { error: errorImagenes } = await supabase
      .from('imagenes_proyectos')
      .insert(imagenesInsert);
    
    if (errorImagenes) {
      console.error(`   ⚠️  Error registrando imágenes:`, errorImagenes.message);
      // No es crítico, el proyecto ya está creado
    } else {
      console.log(`   ✅ ${imagenesInsert.length} imágenes registradas`);
    }
    
    console.log(`   ✨ Proyecto completado exitosamente`);
    
    return { 
      success: true, 
      proyectoId: proyectoCreado.id,
      slug: proyectoCreado.slug,
      imagenesCount: imagenesSubidas.length
    };
    
  } catch (error) {
    console.error(`   ❌ Error inesperado:`, error.message);
    return { success: false, reason: 'unexpected_error', error };
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando subida de proyectos a Supabase\n');
  console.log('='.repeat(60));
  
  // Verificar conexión
  const conexionOk = await verificarConexion();
  if (!conexionOk) {
    console.error('❌ No se pudo establecer conexión con Supabase');
    process.exit(1);
  }
  
  // Leer archivos de proyectos
  const archivos = await fs.readdir(DATOS_DIR);
  const archivosProyectos = archivos
    .filter(f => f.endsWith('.json') && !f.startsWith('_'))
    .sort();
  
  console.log(`📂 Encontrados ${archivosProyectos.length} proyectos para subir\n`);
  console.log('='.repeat(60));
  
  const resultados = {
    exitosos: [],
    omitidos: [],
    fallidos: []
  };
  
  // Procesar cada proyecto
  for (const archivo of archivosProyectos) {
    try {
      const rutaArchivo = path.join(DATOS_DIR, archivo);
      const contenido = await fs.readFile(rutaArchivo, 'utf-8');
      const proyectoData = JSON.parse(contenido);
      
      const resultado = await subirProyecto(proyectoData);
      
      if (resultado.success) {
        resultados.exitosos.push({
          slug: resultado.slug,
          imagenesCount: resultado.imagenesCount
        });
      } else if (resultado.reason === 'already_exists') {
        resultados.omitidos.push(proyectoData.slug);
      } else {
        resultados.fallidos.push({
          slug: proyectoData.slug,
          reason: resultado.reason,
          error: resultado.error?.message
        });
      }
      
    } catch (error) {
      console.error(`\n❌ Error procesando ${archivo}:`, error.message);
      resultados.fallidos.push({
        archivo,
        reason: 'file_error',
        error: error.message
      });
    }
  }
  
  // Resumen final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE LA SUBIDA');
  console.log('='.repeat(60));
  console.log(`✅ Proyectos subidos exitosamente: ${resultados.exitosos.length}`);
  console.log(`⏭️  Proyectos omitidos (ya existían): ${resultados.omitidos.length}`);
  console.log(`❌ Proyectos con errores: ${resultados.fallidos.length}`);
  
  if (resultados.exitosos.length > 0) {
    console.log('\n✅ Proyectos subidos:');
    resultados.exitosos.forEach(p => {
      console.log(`   - ${p.slug} (${p.imagenesCount} imágenes)`);
    });
  }
  
  if (resultados.omitidos.length > 0) {
    console.log('\n⏭️  Proyectos omitidos:');
    resultados.omitidos.forEach(slug => {
      console.log(`   - ${slug}`);
    });
  }
  
  if (resultados.fallidos.length > 0) {
    console.log('\n❌ Proyectos con errores:');
    resultados.fallidos.forEach(p => {
      console.log(`   - ${p.slug || p.archivo}: ${p.reason}`);
      if (p.error) {
        console.log(`     Error: ${p.error}`);
      }
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ Proceso completado');
  console.log('='.repeat(60));
  
  // Guardar log de resultados
  const logPath = path.join(__dirname, 'log-subida-proyectos.json');
  await fs.writeFile(
    logPath,
    JSON.stringify({
      fecha: new Date().toISOString(),
      resultados
    }, null, 2),
    'utf-8'
  );
  
  console.log(`\n📄 Log guardado en: log-subida-proyectos.json`);
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
