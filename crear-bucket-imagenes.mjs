/**
 * Script para crear el bucket "imagenes" en Supabase Storage
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

if (!env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ ERROR: Se necesita SUPABASE_SERVICE_ROLE_KEY para crear buckets');
  console.error('\nEncuéntrala en: Supabase Dashboard → Settings → API → service_role key');
  console.error('Añádela a tu archivo .env.local como:');
  console.error('SUPABASE_SERVICE_ROLE_KEY=tu-clave-aqui');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('🚀 Creando bucket "imagenes" en Supabase Storage...\n');

// Crear el bucket
const { data, error } = await supabase.storage.createBucket('imagenes', {
  public: true,
  fileSizeLimit: 52428800, // 50MB
  allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
});

if (error) {
  if (error.message.includes('already exists')) {
    console.log('ℹ️  El bucket "imagenes" ya existe');
  } else {
    console.error('❌ Error creando bucket:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Bucket "imagenes" creado exitosamente');
  console.log('   Nombre: imagenes');
  console.log('   Público: Sí');
  console.log('   Tamaño máximo: 50MB por archivo');
  console.log('   Tipos permitidos: JPEG, JPG, PNG, WEBP');
}

console.log('\n✨ Listo para subir proyectos');
console.log('Ejecuta ahora: node subir-proyectos-supabase.mjs');
