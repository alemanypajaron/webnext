#!/usr/bin/env node
/**
 * Escalona las fechas de los 6 artículos (de los 7 del 16/1) cada 3 semanas.
 * 1 se queda en 16/1, los otros 6: 6 feb, 27 feb, 20 mar, 10 abr, 1 may, 22 may
 * Usa SUPABASE_SERVICE_ROLE_KEY de .env.local
 * Obtiene los slugs dinámicamente de los artículos con fecha 16/1.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

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
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('❌ Faltan variables en .env.local (SUPABASE_SERVICE_ROLE_KEY o ANON_KEY)');
  process.exit(1);
}

const supabase = createClient(url, key);

// Fechas: 1 en 16/1, 6 escalonados cada 3 semanas
const FECHAS = [
  '2026-01-16T20:59:32.000Z',
  '2026-02-06T10:00:00.000Z',
  '2026-02-27T10:00:00.000Z',
  '2026-03-20T10:00:00.000Z',
  '2026-04-10T10:00:00.000Z',
  '2026-05-01T10:00:00.000Z',
  '2026-05-22T10:00:00.000Z',
];

async function main() {
  console.log('\n📅 Escalonando fechas de los 7 artículos del 16 de enero...\n');

  const { data: articulos, error: err } = await supabase
    .from('blog_articulos')
    .select('id, slug, titulo, fecha_publicacion');

  if (err) {
    console.error('❌ Error al obtener artículos:', err.message);
    process.exit(1);
  }

  // Orden deseado: Farmacia (16/1), Veterinaria, Bar, Peluquería, Clínica Estética, Centro Médico, Gimnasio
  const ORDEN_TITULOS = ['farmacia', 'veterinaria', 'bar', 'peluquería', 'estética', 'centro médico', 'gimnasio'];
  const ordenar = (a, b) => {
    const idxA = ORDEN_TITULOS.findIndex((k) => (a.titulo || '').toLowerCase().includes(k));
    const idxB = ORDEN_TITULOS.findIndex((k) => (b.titulo || '').toLowerCase().includes(k));
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  };

  const todos = (articulos || []).filter((a) => {
    const t = (a.titulo || '').toLowerCase();
    return ORDEN_TITULOS.some((k) => t.includes(k));
  }).sort(ordenar);

  if (todos.length < 7) {
    console.log(`⚠️ Encontrados ${todos.length} artículos guía (esperados 7). Continuando...\n`);
  }

  for (let i = 0; i < Math.min(todos.length, FECHAS.length); i++) {
    const art = todos[i];
    const fecha = FECHAS[i];
    const { data, error } = await supabase
      .from('blog_articulos')
      .update({ fecha_publicacion: fecha })
      .eq('id', art.id)
      .select('titulo, fecha_publicacion');

    if (error) {
      console.error(`❌ ${art.slug}:`, error.message);
      continue;
    }
    const row = Array.isArray(data) ? data[0] : data;
    const d = new Date(fecha).toLocaleDateString('es-ES');
    console.log(`✅ ${row?.titulo?.slice(0, 45) || art.slug}... → ${d}`);
  }

  console.log('\n✅ Hecho. Los artículos con fecha futura se publicarán automáticamente al llegar su fecha.\n');
}

main();
