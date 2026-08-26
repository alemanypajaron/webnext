# Auditoría SEO (histórica)

> **Histórico (7 enero 2026).** Varios hallazgos de esta auditoría (titles cortos, OG faltante) ya se corrigieron.  
> **Vigente:** [`ESTRATEGIA_SEO_INDEXACION.md`](ESTRATEGIA_SEO_INDEXACION.md) — Murcia + radio 50 km, titles sin marca duplicada, hub de servicios.

**Dominio:** https://www.alemanypajaron.es

---

## ✅ Aspectos PERFECTOS (No tocar)

### 1. **Configuración Base** ✅
- ✅ `metadataBase`: Configurado correctamente
- ✅ `locale`: `es_ES` correcto
- ✅ Favicon: Todos los formatos configurados
- ✅ Manifest.json: Correcto para PWA
- ✅ Robots.txt: Bloqueando `/administrator/` correctamente
- ✅ Sitemap.xml: Dinámico, incluye blog y proyectos

### 2. **Páginas de Servicios (Detalle)** ✅
- ✅ `/servicios/direccion-obra` - PERFECTO
- ✅ `/servicios/reformas-integrales` - PERFECTO
- ✅ `/servicios/gestion-proyectos` - PERFECTO
- ✅ `/servicios/licencias-permisos` - PERFECTO
- ✅ Todas tienen: canonical URL, OpenGraph, keywords, descriptions largas

### 3. **Structured Data** ✅
- ✅ LocalBusiness JSON-LD
- ✅ BreadcrumbList JSON-LD
- ✅ Service JSON-LD
- ✅ WebSite JSON-LD

### 4. **Páginas Dinámicas** ✅
- ✅ `/blog/[slug]` - Metadata dinámica correcta
- ✅ `/proyectos/[slug]` - Metadata dinámica correcta
- ✅ ISR configurado (60s blog, 3600s proyectos)

---

## ⚠️ PROBLEMAS DETECTADOS (A Corregir)

### 🔴 CRÍTICOS

#### 1. **Títulos Demasiado Cortos en Páginas Principales**
❌ **PROBLEMA:** Títulos sin keywords ni contexto

| Página | Título Actual | Problema |
|--------|---------------|----------|
| `/contacto` | "Contacto" | Falta "Murcia", keywords, contexto |
| `/presupuesto` | "Solicitar Presupuesto" | Falta "Murcia", keywords |
| `/blog` | "Blog" | Falta keywords, contexto |
| `/proyectos` | "Proyectos" | Falta keywords, contexto |

✅ **SOLUCIÓN:** Títulos descriptivos con keywords y localización

#### 2. **Descripciones Meta Pobres**
❌ **PROBLEMA:** Descripciones genéricas sin llamada a la acción

| Página | Descripción Actual | Problema |
|--------|-------------------|----------|
| `/contacto` | "Contacta con Alemán y Pajarón..." | Muy básica, falta CTA |
| `/presupuesto` | "Solicita un presupuesto..." | Sin keywords específicos |
| `/blog` | "Blog de arquitectura técnica..." | Genérica |
| `/proyectos` | "Portfolio de proyectos..." | Sin keywords específicos |

#### 3. **Faltan Keywords en Páginas Principales**
❌ **PROBLEMA:** Solo tienen keywords: home, layout, servicios (índice), direccion-obra

✅ **SOLUCIÓN:** Añadir keywords a TODAS las páginas

#### 4. **Faltan OpenGraph en Páginas Principales**
❌ **PROBLEMA:** Solo tienen OpenGraph completo las páginas de servicios individuales

✅ **SOLUCIÓN:** Añadir OpenGraph a contacto, presupuesto, blog (índice), proyectos (índice)

---

### 🟡 MEJORAS RECOMENDADAS

#### 5. **Páginas de Servicios Restantes** (4 páginas sin revisar)
- ⚠️ `/servicios/asesoramiento-tecnico`
- ⚠️ `/servicios/diseno-espacios`
- ⚠️ `/servicios/reforma-bano`
- ⚠️ `/servicios/reforma-cocina`

**Acción:** Revisar y aplicar mismo estándar que las otras

#### 6. **Alt Text en Imágenes**
⚠️ **RECOMENDACIÓN:** Revisar que todas las imágenes tengan `alt` descriptivo con keywords

#### 7. **Títulos H1 Únicos**
⚠️ **RECOMENDACIÓN:** Verificar que cada página tiene UN SOLO H1 con keyword principal

#### 8. **Canonical URLs Relativos vs Absolutos**
⚠️ **INCONSISTENCIA:** Algunas páginas usan URLs absolutas, otras relativas en canonical

**Recomendación:** Usar SIEMPRE URLs absolutas

---

## 📋 PLAN DE CORRECCIONES

### Prioridad 1: Páginas Principales
1. ✅ `/contacto` - Mejorar título, descripción, keywords, OpenGraph
2. ✅ `/presupuesto` - Mejorar título, descripción, keywords, OpenGraph
3. ✅ `/blog` - Mejorar título, descripción, keywords, OpenGraph
4. ✅ `/proyectos` - Mejorar título, descripción, keywords, OpenGraph

### Prioridad 2: Páginas de Servicios Faltantes
5. ✅ `/servicios/asesoramiento-tecnico`
6. ✅ `/servicios/diseno-espacios`
7. ✅ `/servicios/reforma-bano`
8. ✅ `/servicios/reforma-cocina`

### Prioridad 3: Validación Final
9. ✅ Verificar estructura de headings
10. ✅ Comprobar alt text en imágenes principales
11. ✅ Validar canonical URLs (todas absolutas)

---

## 🎯 KEYWORDS OBJETIVO POR PÁGINA

### Principales
- **Home:** gestión obras murcia, dirección obra murcia, técnicos edificación murcia
- **Contacto:** contacto arquitectos murcia, técnicos edificación murcia contacto
- **Presupuesto:** presupuesto obras murcia, presupuesto reforma murcia
- **Blog:** blog arquitectura murcia, blog construcción murcia
- **Proyectos:** proyectos arquitectura murcia, portfolio obras murcia

---

## 📊 MÉTRICAS SEO ACTUALES

### Buenas Prácticas Implementadas ✅
- ✅ URLs limpias y semánticas (slugs)
- ✅ HTTPS configurado
- ✅ Sitemap XML dinámico
- ✅ Robots.txt configurado
- ✅ Structured Data (JSON-LD)
- ✅ Favicon en todos los formatos
- ✅ Manifest.json para PWA
- ✅ Responsive design
- ✅ Loading optimizado (next/image)
- ✅ Canonical URLs
- ✅ ISR para contenido dinámico

### Por Mejorar ⚠️
- ⚠️ Títulos y descripciones de páginas principales
- ⚠️ Keywords en todas las páginas
- ⚠️ OpenGraph completo en todas las páginas
- ⚠️ Uniformidad en canonical URLs (absolutos)

---

## 🚀 ESTADO FINAL ESPERADO

Después de las correcciones:
- ✅ **100% de páginas** con metadata completa
- ✅ **100% de páginas** con OpenGraph y Twitter Cards
- ✅ **100% de páginas** con canonical URL absoluta
- ✅ **100% de páginas** con keywords específicas
- ✅ **Títulos optimizados** (50-60 caracteres)
- ✅ **Descripciones optimizadas** (150-160 caracteres)
- ✅ **Estructura de headings** validada
- ✅ **Alt text** en todas las imágenes principales

---

**Auditoría realizada por:** AI Assistant  
**Próxima revisión:** Después de implementar correcciones

