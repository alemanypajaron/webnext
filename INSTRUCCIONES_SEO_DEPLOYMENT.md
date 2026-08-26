# Instrucciones SEO — indexación y deploy

> **Estrategia vigente (26 agosto 2026):** [`ESTRATEGIA_SEO_INDEXACION.md`](ESTRATEGIA_SEO_INDEXACION.md).  
> Este archivo cubre solo activar `seo_noindex` en producción. La cobertura de 50 km ya está en código (no requiere SQL).

## ✅ CAMBIOS IMPLEMENTADOS

Hemos implementado un sistema completo de control de indexación SEO para eliminar la dilución de autoridad del dominio.

---

## 🚀 PASOS PARA ACTIVAR EN PRODUCCIÓN

### 1️⃣ Ejecutar Migración SQL en Supabase

**Ve a:** Supabase Dashboard → SQL Editor → New Query

**Ejecuta el archivo:** `supabase/add-seo-noindex-column.sql`

```sql
-- Copia y pega el contenido completo del archivo
ALTER TABLE blog_articulos 
ADD COLUMN IF NOT EXISTS seo_noindex BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN blog_articulos.seo_noindex IS 
'Control SEO: si es TRUE, el artículo tendrá noindex,follow. Usar para contenido no estratégico, thin content, o páginas legales del blog.';

CREATE INDEX IF NOT EXISTS idx_blog_seo_noindex ON blog_articulos(seo_noindex);
```

**✓ Verificar:**
```sql
-- Debe retornar la nueva columna
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'blog_articulos' AND column_name = 'seo_noindex';
```

---

### 2️⃣ Desplegar Cambios en Vercel

Los cambios de código ya están listos. Solo necesitas hacer push:

```bash
git add .
git commit -m "feat(seo): Sistema de noindex granular para blog y páginas legales"
git push origin main
```

Vercel desplegará automáticamente en: https://webnext-one.vercel.app

---

### 3️⃣ Auditar y Marcar Artículos No Estratégicos

#### Opción A: Desde el Panel Admin (Recomendado)

1. Ve a: https://webnext-one.vercel.app/administrator/blog
2. Edita cada artículo no estratégico
3. Marca el checkbox: **"🚫 No indexar en Google (noindex, follow)"**
4. Guarda

#### Opción B: SQL Masivo (Para cambios rápidos)

**Ejemplo: Marcar artículos con pocas visitas**
```sql
-- Marcar artículos con menos de 50 visitas en 6+ meses
UPDATE blog_articulos 
SET seo_noindex = TRUE 
WHERE visitas < 50 
  AND fecha_publicacion < NOW() - INTERVAL '6 months'
  AND seo_noindex = FALSE;
```

**Ver cuántos artículos se marcarían:**
```sql
SELECT COUNT(*), AVG(visitas), MIN(visitas), MAX(visitas)
FROM blog_articulos
WHERE visitas < 50 
  AND fecha_publicacion < NOW() - INTERVAL '6 months'
  AND seo_noindex = FALSE;
```

---

## 📊 QUÉ SE HA IMPLEMENTADO

### ✅ 1. Páginas Legales (YA FUNCIONANDO)

Las siguientes páginas **ya tienen** `noindex, follow`:
- `/legal/privacidad`
- `/legal/cookies`
- `/legal/aviso-legal`

**Efecto:**
- ❌ No aparecen en Google Search
- ✅ Los enlaces internos transmiten autoridad (follow)
- ⚠️ Siguen en el sitemap XML (prioridad 0.3). Pendiente sacarlas.

---

### ✅ 2. Sistema Granular para Blog (NUEVO)

#### Base de Datos
- **Campo nuevo:** `seo_noindex` (BOOLEAN, default FALSE)
- **Índice:** Para queries rápidas en sitemap
- **Comentario:** Documentación en la BD

#### Código TypeScript
- **Tipos actualizados:** `BlogArticulo` interface con `seo_noindex`
- **Metadata dinámica:** Respeta el campo en cada artículo
- **Sitemap automático:** Excluye artículos con `noindex`

#### Panel Admin
- **Checkbox visual:** En formulario de crear/editar artículo
- **Explicación clara:** Tooltip con cuándo usarlo
- **Estilo destacado:** Fondo amarillo para llamar atención

---

## 🎯 CRITERIOS: ¿Cuándo aplicar noindex?

### ✅ SÍ marcar como noindex:
- ❌ Contenido < 300 palabras (thin content)
- ❌ Artículos con < 50 visitas en 6+ meses
- ❌ Noticias caducadas o temporales
- ❌ Contenido experimental o tests
- ❌ Posts sin revisión humana (solo IA)

### ❌ NO marcar como noindex:
- ✅ Guías completas (pillar content)
- ✅ Artículos que generan leads
- ✅ Contenido con tráfico orgánico consistente
- ✅ Posts rankeando en Top 10 de Google
- ✅ Páginas con backlinks externos

---

## 📈 MONITOREO

### Google Search Console (Mensual)

1. **Verificar reducción de URLs indexadas:**
   ```
   site:alemanypajaron.es
   ```
   - **Antes:** X páginas
   - **Objetivo:** -20-30% de páginas sin valor

2. **Monitorear CTR:**
   - Ir a: GSC → Rendimiento → CTR promedio
   - **Objetivo:** +10-15% al mostrar solo contenido de calidad

3. **Exportar páginas con bajo rendimiento:**
   - GSC → Rendimiento → Páginas
   - Filtrar: CTR < 2%, Impresiones > 100
   - Evaluar si marcar como `noindex`

### Google Analytics (Trimestral)

```sql
-- Query para identificar candidatos a noindex
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

---

## 📚 DOCUMENTACIÓN COMPLETA

Lee el documento completo: **`ESTRATEGIA_SEO_INDEXACION.md`**

Incluye:
- ✅ Estrategia detallada
- ✅ Queries SQL útiles
- ✅ Roadmap futuro
- ✅ KPIs a monitorear
- ✅ Referencias y recursos

---

## 🔧 TROUBLESHOOTING

### Error: "column seo_noindex does not exist"
**Solución:** Ejecutar la migración SQL (Paso 1)

### El checkbox no aparece en el admin
**Solución:** Hacer hard refresh (Ctrl+Shift+R) o limpiar caché

### Artículo sigue apareciendo en Google
**Solución:** Google tarda 1-4 semanas en reindexar. Puedes forzar con:
- Google Search Console → Inspección de URLs → Solicitar indexación

### Sitemap muestra artículos con noindex
**Solución:** Verificar en `/sitemap.xml` - debe estar excluidos automáticamente

---

## 📞 SOPORTE

**Implementado por:** Narciso Pardo (Eskala IA)  
**Cliente:** Alemán y Pajarón  
**Fecha:** Enero 2026

**Próximos pasos:**
1. Confirmar columna `seo_noindex` en Supabase
2. Auditar artículos y marcar thin content
3. Configurar zona de servicio 50 km en Google Business Profile
4. Monitorear GSC (queries no de marca)
