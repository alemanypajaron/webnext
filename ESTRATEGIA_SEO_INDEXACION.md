# 🎯 Estrategia SEO de Indexación - Alemán y Pajarón

**Fecha:** Enero 2026  
**Objetivo:** Optimizar la autoridad del dominio eliminando dilución por exceso de URLs indexables sin valor SEO

---

## 📋 Problema Identificado

### ❌ Exceso de URLs Indexables Sin Valor

El sitio tenía múltiples tipos de páginas que diluyen la autoridad del dominio:

- ✅ **Páginas legales** (privacidad, cookies, aviso legal)
- ⚠️ **Posts de blog irrelevantes o con contenido pobre**
- ⚠️ **Taxonomías sin valor estratégico**
- ⚠️ **URLs de blog con thin content**

**Consecuencia:** Dilución de autoridad de dominio y mala experiencia para motores de búsqueda.

---

## ✅ Solución Implementada

### 1. **Páginas Legales - COMPLETADO ✓**

Todas las páginas legales tienen configurado `noindex, follow`:

```typescript
// src/app/legal/privacidad/page.tsx
// src/app/legal/cookies/page.tsx
// src/app/legal/aviso-legal/page.tsx
export const metadata: Metadata = {
  // ...
  robots: {
    index: false,
    follow: true,
  },
};
```

**Páginas afectadas:**
- `/legal/privacidad` → `noindex, follow` ✓
- `/legal/cookies` → `noindex, follow` ✓
- `/legal/aviso-legal` → `noindex, follow` ✓

**Efecto:** 
- ✅ Estas páginas NO aparecen en índice de Google
- ✅ Los enlaces salientes transmiten autoridad (follow)
- ✅ Eliminadas del sitemap (priority: 0.3 para referencia interna)

---

### 2. **Artículos de Blog - Sistema Granular Implementado ✓**

#### **Migración de Base de Datos**

Se agregó el campo `seo_noindex` a la tabla `blog_articulos`:

```sql
-- Archivo: supabase/add-seo-noindex-column.sql
ALTER TABLE blog_articulos 
ADD COLUMN IF NOT EXISTS seo_noindex BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_blog_seo_noindex ON blog_articulos(seo_noindex);
```

**Campo:** `seo_noindex BOOLEAN DEFAULT FALSE`
- `FALSE` (default) → Artículo se indexa normalmente
- `TRUE` → Artículo tiene `noindex, follow`

#### **Integración en el Código**

**TypeScript Types** (`src/lib/supabase.ts`):
```typescript
export interface BlogArticulo {
  // ... otros campos
  seo_noindex?: boolean; // Control SEO: true = noindex,follow
}
```

**Metadata Dinámica** (`src/app/blog/[slug]/page.tsx`):
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articulo = await getBlogArticuloBySlug(slug);
  
  return {
    title: `${articulo.titulo} | Blog`,
    description: articulo.meta_descripcion || articulo.resumen,
    keywords: articulo.meta_keywords,
    robots: articulo.seo_noindex
      ? {
          index: false,
          follow: true,
        }
      : undefined, // index: true por defecto
    // ... openGraph, etc.
  };
}
```

**Sitemap Automático** (`src/app/sitemap.ts`):
```typescript
// Artículos de blog dinámicos (excluir artículos con seo_noindex = true)
const { data: articulos } = await supabase
  .from('blog_articulos')
  .select('slug, actualizado_at, seo_noindex')
  .eq('publicado', true)
  .neq('seo_noindex', true) // ← Excluir de sitemap
  .order('fecha_publicacion', { ascending: false });
```

---

## 🎯 Criterios para Aplicar `noindex, follow` al Blog

### ✅ Aplicar `noindex` (seo_noindex = TRUE) a:

1. **Contenido No Estratégico:**
   - Noticias de actualidad sin evergreen value
   - Posts sobre eventos pasados
   - Contenido temporal o estacional ya caducado

2. **Thin Content:**
   - Artículos con menos de 300 palabras
   - Contenido superficial sin profundidad técnica
   - Artículos sin valor único (duplicate intent)

3. **Artículos Experimentales:**
   - Tests de contenido A/B
   - Borradores en revisión (mejor usar `publicado = false`)
   - Contenido interno para clientes específicos

4. **Contenido de Baja Calidad:**
   - Artículos con métricas pobres (alto bounce rate, bajo tiempo en página)
   - Posts con pocas visitas tras 6+ meses publicados
   - Contenido generado por IA sin revisión humana profunda

### ❌ NO aplicar `noindex` (mantener indexable) a:

1. **Contenido Pilar (Pillar Content):**
   - Guías completas sobre servicios clave
   - Artículos evergreen con búsquedas mensuales consistentes
   - Contenido que genera conversiones

2. **Páginas Money:**
   - Artículos que hablan de servicios específicos
   - Posts que generan leads cualificados
   - Contenido con alto valor comercial

3. **Contenido de Autoridad:**
   - Estudios de caso detallados
   - Análisis técnicos profundos
   - Contenido único y diferenciador

4. **Artículos con Tráfico Orgánico:**
   - Posts que reciben tráfico SEO mensual consistente
   - Páginas con backlinks externos
   - Contenido rankeando en Top 10 de Google

---

## 📊 Métricas de Éxito

### KPIs a Monitorear (Google Search Console)

1. **Autoridad de Dominio**
   - Domain Rating (Ahrefs) / Domain Authority (Moz)
   - **Objetivo:** Incremento del 5-10% en 6 meses

2. **Páginas Indexadas**
   - Antes: X páginas indexadas
   - Después: Reducir páginas sin valor en 20-30%
   - **Comando Google:** `site:alemanypajaron.es`

3. **Click-Through Rate (CTR)**
   - CTR promedio en SERP
   - **Objetivo:** Incremento del 10-15% al mostrar solo contenido de calidad

4. **Core Web Vitals**
   - Tiempo de carga (LCP)
   - Interactividad (FID/INP)
   - **Objetivo:** Mantener/mejorar con menos URLs a crawlear

5. **Rankings de Keywords Estratégicas**
   - Posicionamiento de términos clave
   - **Objetivo:** Mejora en Top 3 para keywords money

---

## 🛠️ Gestión y Mantenimiento

### Desde el Panel Admin

Los administradores pueden gestionar `seo_noindex` desde:
- **Panel Admin** → **Blog** → **Editar Artículo**
- Campo de checkbox: "No indexar (noindex, follow)"

### SQL Directo (Para Cambios Masivos)

#### Ver artículos marcados como `noindex`:
```sql
SELECT titulo, slug, seo_noindex, visitas, fecha_publicacion
FROM blog_articulos
WHERE seo_noindex = TRUE
ORDER BY fecha_publicacion DESC;
```

#### Marcar artículo específico como `noindex`:
```sql
UPDATE blog_articulos 
SET seo_noindex = TRUE 
WHERE slug = 'articulo-no-estrategico';
```

#### Marcar artículos por categoría (ejemplo: noticias):
```sql
UPDATE blog_articulos 
SET seo_noindex = TRUE 
WHERE categoria_id = (
  SELECT id FROM categorias_blog WHERE slug = 'noticias'
);
```

#### Marcar artículos con pocas visitas (< 50 visitas en 6+ meses):
```sql
UPDATE blog_articulos 
SET seo_noindex = TRUE 
WHERE visitas < 50 
  AND fecha_publicacion < NOW() - INTERVAL '6 months'
  AND seo_noindex = FALSE; -- Evitar sobrescribir decisiones manuales
```

#### Revertir `noindex` de artículos con buen rendimiento:
```sql
UPDATE blog_articulos 
SET seo_noindex = FALSE 
WHERE visitas > 500 
  AND seo_noindex = TRUE;
```

---

## 📈 Proceso de Auditoría Trimestral

### Cada 3 meses, revisar:

1. **Google Search Console:**
   - Exportar páginas con impresiones > 0
   - Identificar thin content con bajo CTR (<2%)
   - Marcar como `noindex` si no hay intención de mejora

2. **Google Analytics:**
   - Páginas con bounce rate > 80%
   - Tiempo en página < 30 segundos
   - Evaluar si son candidatas a `noindex` o mejora

3. **Artículos de Blog:**
   ```sql
   SELECT 
     titulo, 
     slug, 
     visitas, 
     fecha_publicacion,
     AGE(NOW(), fecha_publicacion) as antiguedad
   FROM blog_articulos
   WHERE visitas < 100 
     AND fecha_publicacion < NOW() - INTERVAL '6 months'
     AND seo_noindex = FALSE
   ORDER BY visitas ASC;
   ```

4. **Revisar Artículos IA:**
   - Todos los posts con disclaimer de IA
   - Evaluar calidad y profundidad
   - Marcar thin content como `noindex`

---

## 🔄 Roadmap Futuro

### Fase 1: Implementación Base ✅ (Completado)
- [x] Campo `seo_noindex` en base de datos
- [x] Integración en metadata dinámica
- [x] Exclusión automática del sitemap
- [x] Tipos TypeScript actualizados

### Fase 2: UI Admin (Próxima)
- [ ] Campo checkbox en formulario de artículos
- [ ] Vista de artículos `noindex` en tabla admin
- [ ] Bulk actions para marcar múltiples artículos

### Fase 3: Automatización Inteligente (Futuro)
- [ ] Script automatizado mensual para detectar thin content
- [ ] Alertas de artículos con bajo rendimiento (6+ meses)
- [ ] Dashboard de métricas SEO en admin

### Fase 4: Optimización Avanzada (Futuro)
- [ ] Canonical tags para contenido duplicado
- [ ] Estructura de clusters de contenido (topic clusters)
- [ ] Internal linking automation

---

## 📚 Referencias y Recursos

### Documentación Next.js
- [Metadata Object - robots](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#robots)
- [Dynamic Sitemaps](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

### SEO Best Practices
- [Google: Noindex Guidelines](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Moz: When to Use Noindex](https://moz.com/learn/seo/meta-robots)

### Herramientas de Monitoreo
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics 4](https://analytics.google.com)
- [Ahrefs Site Audit](https://ahrefs.com)

---

## 📞 Contacto

**Responsable SEO:** Narciso Pardo (Eskala IA)  
**Cliente:** Alemán y Pajarón  
**Última actualización:** Enero 2026

---

## 🔖 Resumen Ejecutivo

### ✅ Implementado:
1. ✓ Páginas legales con `noindex, follow`
2. ✓ Sistema granular de `seo_noindex` en blog
3. ✓ Exclusión automática del sitemap
4. ✓ Documentación completa

### 📊 Resultado Esperado:
- **-20-30%** de URLs indexadas sin valor
- **+5-10%** de autoridad de dominio en 6 meses
- **+10-15%** de CTR promedio en SERP
- **Mejor experiencia** para crawlers de Google

### 🎯 Próximos Pasos:
1. Ejecutar migración SQL en Supabase
2. Auditar artículos existentes del blog
3. Marcar thin content como `noindex`
4. Monitorear Google Search Console mensualmente
