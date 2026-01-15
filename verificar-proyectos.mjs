/**
 * Script de verificación pre-subida
 * 
 * Verifica que todos los datos están correctos antes de subir a Supabase:
 * - Archivos JSON válidos
 * - Imágenes existen físicamente
 * - Datos completos y correctos
 * - No hay slugs duplicados
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATOS_DIR = path.join(__dirname, 'datos_proyectos_enriquecidos');

async function verificarProyecto(nombreArchivo) {
  const rutaArchivo = path.join(DATOS_DIR, nombreArchivo);
  const contenido = await fs.readFile(rutaArchivo, 'utf-8');
  const proyecto = JSON.parse(contenido);
  
  const errores = [];
  const advertencias = [];
  
  // Verificar campos requeridos
  const camposRequeridos = [
    'titulo', 'slug', 'descripcion_corta', 'descripcion_completa',
    'ubicacion', 'ano', 'superficie', 'presupuesto', 'duracion',
    'servicios', 'estado', 'imagen_principal', 'cliente'
  ];
  
  for (const campo of camposRequeridos) {
    if (!proyecto[campo]) {
      errores.push(`Falta campo requerido: ${campo}`);
    }
  }
  
  // Verificar servicios es array
  if (!Array.isArray(proyecto.servicios) || proyecto.servicios.length === 0) {
    errores.push('servicios debe ser un array no vacío');
  }
  
  // Verificar año es número válido
  if (typeof proyecto.ano !== 'number' || proyecto.ano < 2000 || proyecto.ano > 2030) {
    errores.push(`Año inválido: ${proyecto.ano}`);
  }
  
  // Verificar que tiene imágenes
  if (!proyecto.imagenes || !Array.isArray(proyecto.imagenes) || proyecto.imagenes.length === 0) {
    errores.push('El proyecto no tiene imágenes');
  }
  
  // Verificar que las imágenes existen físicamente
  let imagenesValidas = 0;
  let imagenesFaltantes = 0;
  
  if (proyecto.imagenes) {
    for (const imagen of proyecto.imagenes) {
      const rutaImagen = path.join(__dirname, imagen.ruta);
      try {
        await fs.access(rutaImagen);
        imagenesValidas++;
      } catch {
        imagenesFaltantes++;
        advertencias.push(`Imagen no encontrada: ${imagen.nombre}`);
      }
    }
  }
  
  // Verificar longitud de descripciones
  if (proyecto.descripcion_corta && proyecto.descripcion_corta.length < 50) {
    advertencias.push('descripcion_corta es muy corta (< 50 caracteres)');
  }
  
  if (proyecto.descripcion_completa && proyecto.descripcion_completa.length < 200) {
    advertencias.push('descripcion_completa es muy corta (< 200 caracteres)');
  }
  
  // Verificar slug válido
  if (proyecto.slug && !/^[a-z0-9-]+$/.test(proyecto.slug)) {
    errores.push(`Slug inválido: ${proyecto.slug} (solo minúsculas, números y guiones)`);
  }
  
  return {
    slug: proyecto.slug,
    titulo: proyecto.titulo,
    errores,
    advertencias,
    imagenesTotal: proyecto.imagenes?.length || 0,
    imagenesValidas,
    imagenesFaltantes
  };
}

async function main() {
  console.log('🔍 Verificando proyectos antes de subir...\n');
  console.log('='.repeat(60));
  
  try {
    const archivos = await fs.readdir(DATOS_DIR);
    const archivosProyectos = archivos
      .filter(f => f.endsWith('.json') && !f.startsWith('_'))
      .sort();
    
    console.log(`📂 Encontrados ${archivosProyectos.length} proyectos para verificar\n`);
    
    const resultados = [];
    const slugs = new Set();
    const slugsDuplicados = new Set();
    
    for (const archivo of archivosProyectos) {
      try {
        const resultado = await verificarProyecto(archivo);
        resultados.push(resultado);
        
        // Verificar duplicados de slug
        if (slugs.has(resultado.slug)) {
          slugsDuplicados.add(resultado.slug);
        }
        slugs.add(resultado.slug);
        
        // Mostrar resultado
        const icono = resultado.errores.length > 0 ? '❌' : 
                     resultado.advertencias.length > 0 ? '⚠️' : '✅';
        
        console.log(`${icono} ${resultado.titulo}`);
        console.log(`   Slug: ${resultado.slug}`);
        console.log(`   Imágenes: ${resultado.imagenesValidas}/${resultado.imagenesTotal} válidas`);
        
        if (resultado.errores.length > 0) {
          resultado.errores.forEach(error => {
            console.log(`   ❌ ${error}`);
          });
        }
        
        if (resultado.advertencias.length > 0) {
          resultado.advertencias.forEach(adv => {
            console.log(`   ⚠️  ${adv}`);
          });
        }
        
        console.log('');
        
      } catch (error) {
        console.error(`❌ Error procesando ${archivo}:`, error.message);
        console.log('');
      }
    }
    
    // Resumen final
    console.log('='.repeat(60));
    console.log('📊 RESUMEN DE VERIFICACIÓN');
    console.log('='.repeat(60));
    
    const proyectosConErrores = resultados.filter(r => r.errores.length > 0);
    const proyectosConAdvertencias = resultados.filter(r => r.advertencias.length > 0 && r.errores.length === 0);
    const proyectosOk = resultados.filter(r => r.errores.length === 0 && r.advertencias.length === 0);
    
    console.log(`✅ Proyectos sin problemas: ${proyectosOk.length}`);
    console.log(`⚠️  Proyectos con advertencias: ${proyectosConAdvertencias.length}`);
    console.log(`❌ Proyectos con errores: ${proyectosConErrores.length}`);
    
    if (slugsDuplicados.size > 0) {
      console.log(`\n❌ SLUGS DUPLICADOS ENCONTRADOS:`);
      slugsDuplicados.forEach(slug => {
        console.log(`   - ${slug}`);
      });
    }
    
    // Estadísticas de imágenes
    const totalImagenes = resultados.reduce((sum, r) => sum + r.imagenesTotal, 0);
    const totalValidas = resultados.reduce((sum, r) => sum + r.imagenesValidas, 0);
    const totalFaltantes = resultados.reduce((sum, r) => sum + r.imagenesFaltantes, 0);
    
    console.log(`\n📸 Imágenes:`);
    console.log(`   Total: ${totalImagenes}`);
    console.log(`   Válidas: ${totalValidas}`);
    console.log(`   Faltantes: ${totalFaltantes}`);
    
    console.log('\n' + '='.repeat(60));
    
    if (proyectosConErrores.length > 0) {
      console.log('❌ HAY ERRORES QUE DEBEN CORREGIRSE ANTES DE SUBIR');
      console.log('\nProyectos con errores:');
      proyectosConErrores.forEach(p => {
        console.log(`   - ${p.titulo} (${p.errores.length} errores)`);
      });
    } else if (slugsDuplicados.size > 0) {
      console.log('❌ HAY SLUGS DUPLICADOS QUE DEBEN CORREGIRSE');
    } else {
      console.log('✅ TODO LISTO PARA SUBIR A SUPABASE');
      console.log('\nPara subir los proyectos ejecuta:');
      console.log('   node subir-proyectos-supabase.mjs');
    }
    
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  }
}

main().catch(console.error);
