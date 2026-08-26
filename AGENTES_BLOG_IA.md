# 🤖 Agentes de IA del Blog

Guía operativa de los agentes que redactan artículos y generan imágenes para el blog de Alemán y Pajarón.

**Origen:** misma arquitectura que el blog de Furgocasa, adaptada a arquitectura, licencias, reformas y normativa en Murcia y radio 50 km.

**Última actualización:** 26 agosto 2026

Los artículos deben apoyar money pages (dirección de obra, licencias, reformas), no crear “servicio + pedanía”. Thin content o IA sin revisión profunda: marcar `seo_noindex` en el admin. Ver [`ESTRATEGIA_SEO_INDEXACION.md`](ESTRATEGIA_SEO_INDEXACION.md).

---

## 1. Qué hace el sistema

Hay **tres agentes** que se pueden usar desde el panel admin o por terminal:

| Agente | Qué genera | Dónde lo guarda |
|--------|------------|-----------------|
| **Redactor** | HTML del artículo + resumen + SEO + tiempo de lectura | Tabla `blog_articulos` |
| **Portada** | Foto horizontal WebP de cabecera | Bucket `blog-images/ai-covers/` → `imagen_destacada` |
| **Cuerpo** | 2–3 fotos ilustrando apartados H2 | Bucket `blog-images/ai-body/` + `<figure>` en `contenido` |

Flujo recomendado:

1. Crear un **borrador** solo con título y categoría.
2. **Redactar** el artículo.
3. **Generar portada**.
4. **Generar imágenes del cuerpo**.
5. Revisar en TinyMCE, ajustar y **publicar**.

---

## 2. Requisitos

### Variables de entorno

Obligatorias para los agentes:

| Variable | Uso |
|----------|-----|
| `OPENAI_API_KEY` | Todas las llamadas a texto e imagen |
| `NEXT_PUBLIC_SUPABASE_URL` | Lectura/escritura del artículo |
| `SUPABASE_SERVICE_ROLE_KEY` | Update en `blog_articulos` y upload a Storage |

Opcionales:

| Variable | Default | Uso |
|----------|---------|-----|
| `OPENAI_TEXT_MODEL` | `gpt-5.6-terra` | Texto / visión / planner. Incluye Web Search nativo |
| `OPENAI_FAST_MODEL` | `gpt-4o-mini` | Tareas rápidas |
| `OPENAI_BLOG_REDACTOR_MODEL` | = texto | Modelo del redactor |
| `OPENAI_BLOG_REDACTOR_TEMPERATURE` | `0.7` | Ignorada en GPT-5.x |
| `BLOG_COVER_TEXT_MODEL` | = texto | Prompts de portada |
| `BLOG_COVER_IMAGE_MODEL` | `gpt-image-2` | Generación de imagen |
| `BLOG_BODY_TEXT_MODEL` | = portada texto | Planner/refiner de cuerpo |
| `BLOG_BODY_IMAGE_MODEL` | = portada imagen | Imágenes de cuerpo |
| `BLOG_COVER_WEBP_QUALITY` | `85` | Calidad WebP portada |
| `BLOG_BODY_WEBP_QUALITY` | `85` | Calidad WebP cuerpo |

📖 Cómo configurarlas: [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md)

En **Vercel** hay que añadir `OPENAI_API_KEY` (Production / Preview / Development) y redesplegar. Si falta, el admin devolverá error al pulsar los botones.

### Dependencias

```json
"openai": "^4.104.0",
"sharp": "(ya existía)",
"dotenv": "^17.2.3",
"tsx": "^4.21.0"
```

Scripts en `package.json`:

```bash
npm run redact:blog
npm run generate:blog-cover
npm run generate:blog-body-images
npm run generate:blog-cover-and-body
```

### Storage

Mismo bucket público que el CMS: **`blog-images`**.

```
blog-images/
  ai-covers/{slug}-{timestamp}.webp
  ai-body/{slug}-{n}-{timestamp}.webp
  {timestamp}-{nombre}.jpg   ← subidas manuales del gestor
```

No hace falta crear un bucket nuevo. Las carpetas `ai-covers/` y `ai-body/` se crean solas al subir el primer archivo.

---

## 3. Uso en el panel admin

Rutas:

- Nuevo: `/administrator/blog/nuevo`
- Editar: `/administrator/blog/[id]/editar`

### Crear el borrador

1. Título (el slug se genera solo).
2. Categoría.
3. Deja **Publicar artículo** desmarcado.
4. Guarda. El contenido y la portada **no son obligatorios** en un borrador.
5. Te redirige a la ficha de edición.

Para **publicar** sí hacen falta contenido e imagen destacada.

### Bloque «Agentes de IA»

Aparece arriba del formulario cuando el artículo ya existe:

| Botón | Acción | Tiempo orientativo |
|-------|--------|--------------------|
| **Redactar artículo** | Reescribe `contenido`, `resumen`, `meta_descripcion`, `meta_keywords`, `tags`, `tiempo_lectura` | 1–3 min |
| **Generar portada** | Crea y asigna `imagen_destacada` | ~1 min |
| **Imágenes del cuerpo** | Inserta `<figure>` tras varios H2 | 2–4 min |

Los tres botones llaman a APIs autenticadas (sesión de admin). Si el artículo ya tiene texto, el redactor pide confirmación antes de sobrescribir.

Tras cada generación, el formulario se actualiza en pantalla. Revisa el HTML y pulsa **Actualizar artículo** si quieres guardar más cambios manuales (el agente ya ha persistido en Supabase).

---

## 4. Uso por terminal (CLI)

Ejecutar en la raíz del repo, con `.env.local` cargado.

### Redactar

```bash
npm run redact:blog -- --slug=licencias-necesarias-reforma-vivienda-murcia
npm run redact:blog -- "https://www.alemanypajaron.es/blog/tu-slug"
npm run redact:blog -- --post-id=UUID-DEL-ARTICULO
npm run redact:blog -- --slug=tu-slug --dry-run
npm run redact:blog -- --slug=tu-slug --seo-only
```

`--dry-run` no escribe en Supabase. `--seo-only` regenera solo resumen y metadatos.

### Portada

```bash
npm run generate:blog-cover -- "https://www.alemanypajaron.es/blog/tu-slug"
npm run generate:blog-cover -- --post-id=UUID
```

Siempre regenera (no reutiliza la portada anterior).

### Imágenes de cuerpo

```bash
npm run generate:blog-body-images -- "https://www.alemanypajaron.es/blog/tu-slug" --force
npm run generate:blog-body-images -- --post-id=UUID --force --max-images=3
```

Sin `--force`, si ya hay figuras `data-ai-body-image`, no sobrescribe.

### Portada + cuerpo

```bash
npm run generate:blog-cover-and-body -- "https://www.alemanypajaron.es/blog/tu-slug"
npm run generate:blog-cover-and-body -- "...url..." --force-body
npm run generate:blog-cover-and-body -- "...url..." --skip-cover
npm run generate:blog-cover-and-body -- "...url..." --skip-body
```

---

## 5. Cómo funciona cada agente

### 5.1 Redactor

Archivos:

- `src/lib/blog/blog-redactor-prompt.ts` — system prompt y pasada de refinado
- `src/lib/blog/redact-blog-article.ts` — pipeline
- `src/lib/blog/normalize-blog-html.ts` — quita H1/H2 que repiten el título
- `src/app/api/admin/blog/redact/route.ts`
- `scripts/redact-blog-article.ts`

Pipeline:

1. Carga el artículo (`blog_articulos` + categoría).
2. Redacción por Responses API (`gpt-5.6-terra`) con **Web Search nativo** (ubicación Murcia). No usa SerpAPI ni Wikipedia.
3. GPT redacta HTML (mínimo ~1.800 palabras; 6–10 H2 reales).
4. Segunda pasada de refinado, otra vez con Web Search para contrastar normativa.
5. Normaliza HTML (no repetir el título; espaciado de bloques).
6. Genera JSON SEO: `resumen`, `meta_descripcion`, `meta_keywords`.
7. Calcula `tiempo_lectura` (~200 palabras/minuto, mínimo 4).
8. `UPDATE blog_articulos`.

El prompt está escrito para Alemán y Pajarón:

- Perfil: **arquitecto técnico**, no «arquitecto» a secas.
- CTA a `/presupuesto` y `/contacto`.
- Enlaces internos a landings de licencia/reforma de la actividad (peluquería, gimnasio, bar, etc.).
- Enlaces externos preferentemente oficiales (Ayuntamiento, CARM, BOE).
- Tono profesional y cercano. No inventar plazos ni tasas. Si no hay cifra oficial, lo dice.

Campos que escribe:

| Columna | Contenido |
|---------|-----------|
| `contenido` | HTML del cuerpo (sin H1) |
| `resumen` | Hasta ~300 caracteres |
| `meta_descripcion` | 140–155 caracteres |
| `meta_keywords` | Array de keywords |
| `tags` | Primeras keywords |
| `tiempo_lectura` | Minutos |
| `actualizado_at` | Ahora |

### 5.2 Portada

Archivos:

- `src/lib/blog/generate-blog-cover.ts`
- `src/app/api/admin/blog/generate-cover/route.ts`
- `scripts/generate-blog-cover.ts`

Pipeline:

1. Carga el artículo.
2. Audita las 5 portadas recientes (visión GPT) para no repetir tropos.
3. Clasifica `scene_type`: `architecture` | `interior` | `human_experience` | `detail`.
4. Builder + refiner del prompt fotográfico.
5. `gpt-image-2` genera PNG 1536×1024.
6. `sharp` convierte a WebP.
7. Sube a `blog-images/ai-covers/`.
8. Actualiza `imagen_destacada`.

No usa referencias de vehículos (eso era de Furgocasa). Las escenas son de arquitectura, reforma, visita de obra o detalle de planos/materiales.

### 5.3 Imágenes de cuerpo

Archivos:

- `src/lib/blog/generate-blog-body-images.ts`
- `src/app/api/admin/blog/generate-body-images/route.ts`
- `scripts/generate-blog-body-images.ts`
- `scripts/generate-blog-cover-and-body.ts`

Pipeline:

1. Detecta los `<h2>` del HTML. Hacen falta **al menos 2**.
2. Planner JSON: cuántas imágenes (2–3), en qué H2, alt y pie.
3. Refiner de cada prompt.
4. Genera cada imagen, WebP, sube a `ai-body/`.
5. Limpia figuras IA anteriores e inserta:

```html
<figure data-ai-body-image="1" data-anchor="slug-del-h2">
  <img src="..." alt="..." loading="lazy" />
  <figcaption>...</figcaption>
</figure>
```

6. Guarda el HTML en `contenido`.

La operación es idempotente: `--force` o el botón del admin vuelven a generar y sustituyen las figuras anteriores.

---

## 6. APIs

Todas exigen sesión de admin (`src/lib/blog/admin-auth.ts`). `maxDuration = 300` (5 minutos).

| Método | Ruta | Body |
|--------|------|------|
| POST | `/api/admin/blog/redact` | `{ postId }` o `{ slug }` o `{ articleUrl }`, opcional `seoOnly` |
| POST | `/api/admin/blog/generate-cover` | `{ postId }` o `{ articleUrl }`, `forceRegenerate` (default true) |
| POST | `/api/admin/blog/generate-body-images` | `{ postId }` o `{ articleUrl }`, `forceRegenerate` |

URL aceptada: `https://www.alemanypajaron.es/blog/{slug}` (también `.com`).

---

## 7. Archivos del sistema

```
src/lib/openai-config.ts
src/lib/blog/
  admin-auth.ts
  blog-html-utils.ts
  blog-redactor-prompt.ts
  normalize-blog-html.ts
  redact-blog-article.ts
  generate-blog-cover.ts
  generate-blog-body-images.ts
src/app/api/admin/blog/
  redact/route.ts
  generate-cover/route.ts
  generate-body-images/route.ts
src/components/admin/BlogArticuloForm.tsx   ← botones IA
scripts/
  redact-blog-article.ts
  generate-blog-cover.ts
  generate-blog-body-images.ts
  generate-blog-cover-and-body.ts
```

---

## 8. Revisión editorial (obligatoria)

El contenido sale de un modelo. Antes de publicar:

- Comprueba datos normativos, plazos y tasas.
- Revisa enlaces externos (si hay duda, deja la home oficial).
- Ajusta el tono si hace falta.
- Mira que la portada y las fotos de cuerpo no se parezcan entre sí ni al resto del feed.
- El artículo público ya muestra el aviso de contenido generado con IA.

---

## 9. Errores frecuentes

| Síntoma | Causa / solución |
|---------|------------------|
| «Falta OPENAI_API_KEY» | Añádela a `.env.local` y **reinicia** `npm run dev`. En prod, Vercel + redeploy |
| «No autenticado» (401) | Sesión caducada. Vuelve a entrar en `/administrator/login` |
| Timeout 502/504 | La generación es larga. Reintenta o usa el script CLI en local |
| «solo tiene N secciones H2» | Redacta primero; el cuerpo necesita ≥ 2 apartados |
| Portada/cuerpo no se ven en Multimedia | Están en subcarpetas `ai-covers/` y `ai-body/`. El listado del gestor mira la raíz; las URLs del artículo sí funcionan |
| Investigación pobre | El modelo no usó Web Search o la fuente oficial no indexa bien. Revisa el HTML y contrastar BOE / Ayuntamiento |
| Modelo no disponible | Cambia `OPENAI_TEXT_MODEL` o `BLOG_COVER_IMAGE_MODEL` a uno de tu cuenta |
| Insert falla al guardar borrador | `imagen_destacada` y `contenido` son NOT NULL: el formulario envía `''` y `<p></p>` |

---

## 10. Coste y modelos

- Texto: `gpt-5.6-terra` (redacción, SEO, prompts, visión de portadas).
- Imagen: `gpt-image-2` (portada + cada foto de cuerpo).
- Un artículo completo (redacción + 1 portada + 2–3 fotos) consume varias llamadas. Conviene generar en local o en horario controlado.

GPT-5.x no admite `temperature` custom; el código ya lo contempla (`src/lib/openai-config.ts`).

---

## 11. Documentación relacionada

- Variables: [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md) (incluye SMTP Hostinger)
- Email SMTP local: [`README.md`](README.md) (sección Email SMTP Hostinger)
- Panel admin: [`ADMIN_SETUP.md`](ADMIN_SETUP.md)
- Contenido y CMS: [`CONTENIDO.md`](CONTENIDO.md)
- Storage: [`SUPABASE_CONFIG.md`](SUPABASE_CONFIG.md) y [`supabase/README.md`](supabase/README.md)
- Deploy: [`DEPLOY.md`](DEPLOY.md)
- README: [`README.md`](README.md)
