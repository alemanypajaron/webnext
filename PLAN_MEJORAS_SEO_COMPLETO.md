# Plan de mejoras SEO — Alemán y Pajarón

**Última actualización:** 26 agosto 2026  
**Documento vivo de estrategia:** [`ESTRATEGIA_SEO_INDEXACION.md`](ESTRATEGIA_SEO_INDEXACION.md)

---

## Hecho (web)

- Control de indexación: legales `noindex, follow`; blog `seo_noindex` + exclusión sitemap
- Encabezados H1–H3 en landings de servicio (ronda enero 2026)
- Meta descriptions de páginas principales
- Titles sin marca duplicada (`template` del layout + home con `absolute`)
- Cobertura **Murcia + radio 50 km** en copy, schema `areaServed` y mapa de contacto
- Hub `/servicios` enlaza baño, local comercial y licencia de apertura
- Sitemap incluye `cambio-banera-ducha` y `reforma-local-comercial-murcia`

---

## No hacer

- Landings por pedanía (Beniaján, El Palmar, La Alberca, Torreagüera…)
- Multiplicar 29 servicios × pueblos
- Meter el nombre del pueblo en todos los H2

---

## Pendiente (prioridad)

| Ítem | Dónde | Prioridad |
|------|--------|-----------|
| Ficha Google: zona de servicio 50 km | GBP | Alta |
| Reseñas que nombren pueblo/municipio | GBP | Alta |
| Sacar legales del sitemap XML | `src/app/sitemap.ts` | Media |
| FAQ schema (`FAQPage`) | landings con FAQ | Media |
| Article schema en blog | `/blog/[slug]` | Media |
| Ubicación real en proyectos | admin `ubicacion` | Media |
| Landing Molina (solo con caso real) | `/zonas/molina-de-segura` | Baja |
| Alt de Unsplash → fotos de obra | landings | Baja |
| Medir queries no de marca | Search Console | Alta |

---

## Checklist

### On-page
- [x] Titles (sin marca duplicada)
- [x] H1 únicos
- [x] Canonical
- [x] Copy de cobertura 50 km en money pages
- [ ] FAQ schema
- [ ] Fotos propias en landings

### Técnica
- [x] HTTPS, robots, sitemap dinámico
- [x] `areaServed` anillo metropolitano
- [ ] Legales fuera del sitemap
- [ ] Core Web Vitals medidos en GSC

### Local
- [x] NAP teléfono + Murcia en web
- [x] Texto pedanías + anillo
- [ ] GBP zona de servicio
- [ ] Reseñas geolocalizadas

### Contenido
- [x] Hub interno a money pages
- [ ] Proyectos con ubicación de pedanía/municipio
- [ ] Blog en clusters que apoyen money pages (no volumen IA)

---

## Métricas (rellenar con GSC/GA4)

| Métrica | Baseline | Objetivo |
|---------|----------|----------|
| Queries no de marca (Murcia + servicios) | — | Subir posiciones 3–6 meses |
| Impresiones El Palmar / Molina / Alcantarilla | — | Aparición vía ficha + copy |
| CTR SERP | — | Mejorar titles (ya sin marca doble) |
| Thin blog indexado | — | Bajar con `seo_noindex` |
