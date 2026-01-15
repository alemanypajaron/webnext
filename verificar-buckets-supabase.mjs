/**
 * Script para verificar buckets en Supabase Storage
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    return null;
  }
}

const env = await cargarEnv();
if (!env) process.exit(1);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Verificando buckets en Supabase Storage...\n');

// Listar buckets
const { data: buckets, error } = await supabase.storage.listBuckets();

if (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

console.log(`📂 Buckets encontrados: ${buckets.length}\n`);

if (buckets.length === 0) {
  console.log('⚠️  No hay buckets creados en Supabase Storage');
  console.log('\nNecesitas crear el bucket "imagenes" en:');
  console.log('Dashboard → Storage → New Bucket → nombre: "imagenes" (público)');
} else {
  buckets.forEach(bucket => {
    console.log(`📁 ${bucket.name}`);
    console.log(`   ID: ${bucket.id}`);
    console.log(`   Público: ${bucket.public ? 'Sí' : 'No'}`);
    console.log(`   Creado: ${new Date(bucket.created_at).toLocaleString()}`);
    console.log('');
  });
  
  // Verificar si existe el bucket "imagenes"
  const bucketImagenes = buckets.find(b => b.name === 'imagenes');
  
  if (bucketImagenes) {
    console.log('✅ El bucket "imagenes" existe');
    console.log(`   Público: ${bucketImagenes.public ? 'Sí ✅' : 'No ⚠️ (debería ser público)'}`);
    
    // Listar archivos en el bucket
    console.log('\n📸 Listando archivos en el bucket "imagenes"...');
    const { data: files, error: errorFiles } = await supabase.storage
      .from('imagenes')
      .list('', { limit: 10 });
    
    if (errorFiles) {
      console.error('❌ Error listando archivos:', errorFiles.message);
    } else {
      console.log(`   Archivos/carpetas encontrados: ${files.length}`);
      files.forEach(file => {
        console.log(`   - ${file.name}`);
      });
    }
  } else {
    console.log('❌ El bucket "imagenes" NO existe');
    console.log('\nNecesitas crearlo en:');
    console.log('Dashboard → Storage → New Bucket → nombre: "imagenes" (público)');
  }
}
