# Estrategia SEO vigente — Alemán y Pajarón

**Última actualización:** 26 agosto 2026  
**Dominio:** https://www.alemanypajaron.es  
**Documento vivo:** este archivo manda sobre auditorías de enero 2026.

---

## Objetivo de negocio

Ser la referencia de **dirección de obra, licencias y reformas** en **Murcia capital + radio de ~50 km**.  
Quien busca la marca ya llega a la web. El SEO debe captar demanda no de marca en ese radio.

---

## Geografía (qué hacer y qué no)

| Zona | Tratamiento SEO |
|------|-----------------|
| Murcia capital + pedanías (El Palmar, La Alberca, Beniaján, Torreagüera, Guadalupe, Sangonera…) | Una sola plaza: **Murcia**. Se nombran en copy, **nunca** como URL. Mismo Ayuntamiento. |
| Anillo (Alcantarilla, Molina de Segura, Las Torres de Cotillas, Santomera, Beniel) | Copy + schema `areaServed` + ficha de Google. **Sin landing por pueblo** salvo Molina, y solo cuando haya proyecto o trámite propio. |
| 25–50 km (Alhama, Archena, Fortuna…) | Cobertura (“pregunta si encaja”). Sin URLs. |
| Cartagena / costa | Otro mercado. No ahora. |

**Prohibido:** `reforma-bano-beniajan`, `licencia-el-palmar` y similares. Son doorway pages con volumen nulo.

### Dónde está implementado

- Texto corto: `COBERTURA_CORTA` en `src/lib/structuredData.ts` + componente `src/components/seo/AreaServicio.tsx`
- Texto completo + mapa 50 km: `/contacto#donde-trabajamos` (`MurciaMap` zoom 9 + círculo 50 km)
- Money pages: home, dirección de obra, licencias, reformas integrales, reforma baño, asesoramiento, hub `/servicios`
- JSON-LD `areaServed`: Murcia, Alcantarilla, Molina de Segura, Las Torres de Cotillas, Santomera, Beniel, Región de Murcia

### Fuera de la web (imprescindible)

1. Google Business Profile con **zona de servicio** = esos municipios (no solo “Murcia”).
2. Reseñas que nombren el pueblo (“reforma en El Palmar”).
3. Campo `ubicacion` de proyectos con pedanía o municipio real.

---

## Tipología de servicio (prioridad)

No multiplicar geografía × catálogo. Primero pocas money pages; el resto se mantiene, no se expande.

### Potenciar (8 URLs)

1. `/` — plaza Murcia + marca en el title
2. `/servicios` — hub (generales + baño, local, licencia de apertura)
3. `/servicios/direccion-obra`
4. `/servicios/licencias-permisos` (Ayuntamiento Murcia vs Molina/Alcantarilla)
5. `/servicios/reformas-integrales`
6. `/servicios/reforma-bano`
7. `/servicios/asesoramiento-tecnico`
8. `/contacto` — NAP + cobertura 50 km

### Apoyo (enlazar, no clonar)

- `/servicios/cambio-banera-ducha`
- `/servicios/reforma-local-comercial-murcia`
- `/servicios/licencia-bar` (licencia de actividad)

### No expandir

Reformas/licencias de veterinaria, farmacia, clínica estética, gimnasio, peluquería: se quedan publicadas, **sin hijas por pueblo**.

### Molina

Única URL de municipio prevista, **más adelante**: `/zonas/molina-de-segura`  
Solo si hay trámite del Ayuntamiento de Molina + un proyecto real. No crear `/servicios/reforma-bano-molina`.

---

## Titles

El layout usa `template: '%s | Alemán y Pajarón'`.  
Las páginas hijas **no** deben llevar `| Alemán y Pajarón` en `metadata.title` (evita marca duplicada en Google).

La home no hereda el template: usa `title.absolute` con la marca **una vez**:

`Gestión de Obras y Proyectos en Murcia | Alemán y Pajarón`

Open Graph puede llevar marca; no usa el template.

---

## Indexación

### Legales — `noindex, follow`

- `/legal/privacidad`
- `/legal/cookies`
- `/legal/aviso-legal`

Siguen en el sitemap XML con prioridad 0.3 (inconsistencia conocida). Preferible sacarlas del sitemap en un siguiente pase.

### Blog — `seo_noindex`

Campo `blog_articulos.seo_noindex` (default `false`).  
Si es `true`: `noindex, follow` y **fuera del sitemap**.

**Marcar noindex:** thin content (<300 palabras), actualidad caducada, posts IA sin revisión, <50 visitas en 6+ meses sin plan de mejora.  
**No marcar:** pilares, money content, posts con tráfico o backlinks.

UI: Admin → Blog → checkbox “No indexar en Google”.

Migración: `supabase/add-seo-noindex-column.sql`

### Admin

`/administrator/` bloqueado en `robots.ts`. Meta noindex en el layout admin.

---

## Sitemap

`src/app/sitemap.ts` incluye:

- Home, nosotros, contacto, presupuesto
- Hub + landings de servicios (incluidas `cambio-banera-ducha` y `reforma-local-comercial-murcia`)
- Blog (publicados, fecha ≤ ahora, `seo_noindex` ≠ true)
- Proyectos
- Legales (ver nota arriba)

HTML: `/sitemap-html`

---

## Schema

`src/lib/structuredData.ts`

- `ProfessionalService` + `areaServed` del anillo
- `Service` en landings
- `WebSite`, `BreadcrumbList`

Pendiente: `FAQPage` (hay FAQ visible sin schema), `Article` en blog.

---

## Enlazado interno

- Header/footer: 6 servicios generales
- Hub `/servicios`: esos 6 + bloque “más demandados” (baño, local, licencia)
- Pares licencia ↔ reforma del mismo vertical
- `AreaServicio` enlaza a `/contacto#donde-trabajamos`

---

## Queries SQL útiles (blog)

```sql
SELECT titulo, slug, seo_noindex, visitas, fecha_publicacion
FROM blog_articulos
WHERE seo_noindex = TRUE
ORDER BY fecha_publicacion DESC;
```

Candidatos a noindex:

```sql
SELECT titulo, slug, visitas, fecha_publicacion
FROM blog_articulos
WHERE visitas < 100
  AND fecha_publicacion < NOW() - INTERVAL '6 months'
  AND seo_noindex = FALSE
ORDER BY visitas ASC;
```

---

## Fuera de alcance de la web (siguiente)

- [ ] Ficha Google: zona de servicio 50 km
- [ ] Reseñas con municipio/pedanía
- [ ] Sacar legales del sitemap XML
- [ ] FAQ schema y Article schema
- [ ] Landing Molina solo con caso real
- [ ] Medir en GSC queries no de marca (no solo “Alemán y Pajarón”)

---

## Documentación relacionada

| Archivo | Rol |
|---------|-----|
| `PLAN_MEJORAS_SEO_COMPLETO.md` | Checklist y pendientes |
| `RESUMEN_MEJORAS_SEO_IMPLEMENTADAS.md` | Historial de cambios |
| `INSTRUCCIONES_SEO_DEPLOYMENT.md` | Activar `seo_noindex` en Supabase |
| `SERVICIOS_ESPECIALIZADOS.md` | Catálogo de landings |
| Auditorías de enero 2026 | Históricas; no contradicen este archivo |
