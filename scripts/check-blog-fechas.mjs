#!/usr/bin/env node
/**
 * Script para consultar las fechas de los artículos del blog en Supabase.
 * Usa variables de .env.local (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
 *
 * Ejecutar: node --env-file=.env.local scripts/check-blog-fechas.mjs
 * O en PowerShell: node --env-file=.env.local scripts/check-blog-fechas.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Cargar .env.local si existe (variables locales tienen prioridad)
function loadEnvLocal() {
  const envPath = join(process.cwd(), '.env.local');
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        process.env[key] = value;
      }
    }
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('❌ Faltan variables. Crea .env.local con:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL=...');
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY=...');
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  const { data, error } = await supabase
    .from('blog_articulos')
    .select('id, titulo, slug, fecha_publicacion, actualizado_at, publicado')
    .order('fecha_publicacion', { ascending: false });

  if (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }

  console.log('\n📅 FECHAS ARTÍCULOS BLOG (Supabase)\n');
  console.log('─'.repeat(90));

  if (!data?.length) {
    console.log('No hay artículos en el blog.');
    return;
  }

  for (const a of data) {
    const pub = a.fecha_publicacion ? new Date(a.fecha_publicacion).toLocaleString('es-ES') : '-';
    const act = a.actualizado_at ? new Date(a.actualizado_at).toLocaleString('es-ES') : '-';
    const vis = a.publicado ? '✅' : '⏸️';
    console.log(`${vis} ${a.titulo?.slice(0, 45).padEnd(46)} | Publicación: ${pub} | Actualizado: ${act}`);
  }

  console.log('─'.repeat(90));
  console.log(`Total: ${data.length} artículo(s)\n`);

  // Artículos con fecha 16 de enero (cualquier año)
  const hoy = new Date();
  const del16Enero = data.filter((a) => {
    if (!a.fecha_publicacion) return false;
    const d = new Date(a.fecha_publicacion);
    return d.getDate() === 16 && d.getMonth() === 0;
  });
  console.log(`📌 Con fecha de publicación 16 de enero: ${del16Enero.length} artículo(s)`);
  if (del16Enero.length > 0) {
    del16Enero.forEach((a) => {
      const pub = new Date(a.fecha_publicacion).toLocaleDateString('es-ES');
      console.log(`   - ${a.titulo?.slice(0, 50)} | ${pub}`);
    });
  }

  // Artículos con fecha de publicación futura (aún no llegaron)
  const futuros = data.filter((a) => {
    if (!a.fecha_publicacion) return false;
    return new Date(a.fecha_publicacion) > hoy;
  });
  console.log(`\n📅 Con fecha de publicación futura (aún no publicados): ${futuros.length} artículo(s)`);
  if (futuros.length > 0) {
    futuros.forEach((a) => {
      const pub = new Date(a.fecha_publicacion).toLocaleDateString('es-ES');
      console.log(`   - ${a.titulo?.slice(0, 50)} | ${pub}`);
    });
  }
  console.log('');
}

main();
