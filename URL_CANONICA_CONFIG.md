# ✅ Configuración de URL Canónica - Alemán y Pajarón

## 🌐 **URL CANÓNICA OFICIAL**

```
https://www.alemanypajaron.es
```

**IMPORTANTE:** Siempre con `www.` al principio.

---

## 📋 **CONFIGURACIÓN ACTUAL EN EL CÓDIGO**

### ✅ **1. Layout Principal (`src/app/layout.tsx`)**
```typescript
metadataBase: new URL('https://www.alemanypajaron.es')
```

### ✅ **2. Structured Data (`src/lib/structuredData.ts`)**
```typescript
export const SITE_URL = 'https://www.alemanypajaron.es';
```

### ✅ **3. Sitemap (`src/app/sitemap.ts`)**
Usa `SITE_URL` para todas las URLs:
- `${SITE_URL}/`
- `${SITE_URL}/servicios`
- `${SITE_URL}/proyectos`
- etc.

### ✅ **4. Robots.txt (`src/app/robots.ts`)**
```typescript
sitemap: `${SITE_URL}/sitemap.xml`
host: SITE_URL
```

### ✅ **5. Manifests PWA**
- `public/manifest.json` → `"start_url": "/"`
- `public/manifest-admin.json` → `"start_url": "/administrator"`

(Usan rutas relativas, funcionan con cualquier dominio)

---

## 🔄 **REDIRECCIONES CONFIGURADAS EN VERCEL**

### **Dominio Principal (Canónico)**
```
✅ www.alemanypajaron.es → Sitio principal (indexado por Google)
```

### **Redirección Automática (Sin www)**
```
❌ alemanypajaron.es → 🔄 www.alemanypajaron.es (308 Permanente)
```

### **Dominio Vercel**
```
❌ webnext-one.vercel.app → 🔄 www.alemanypajaron.es (307 Temporal)
```

---

## 🔍 **VERIFICACIÓN SEO**

### **Google Search Console**
- URL canónica configurada: `https://www.alemanypajaron.es`
- Todas las páginas apuntan a `www.alemanypajaron.es`

### **Sitemap.xml**
```
https://www.alemanypajaron.es/sitemap.xml
```

Todas las URLs en el sitemap incluyen `www.`

### **Robots.txt**
```
https://www.alemanypajaron.es/robots.txt
```

```
User-agent: *
Allow: /
Disallow: /administrator/
Disallow: /administrator/*

Sitemap: https://www.alemanypajaron.es/sitemap.xml
Host: https://www.alemanypajaron.es
```

---

## 📊 **RESULTADO FINAL**

✅ **URL Canónica:** `https://www.alemanypajaron.es`
✅ **Todas las referencias en el código:** Con `www.`
✅ **Redirecciones configuradas:** Sin `www.` → Con `www.`
✅ **SEO optimizado:** Google indexa solo `www.alemanypajaron.es`

---

## ⚠️ **IMPORTANTE PARA EL FUTURO**

**SIEMPRE usar:**
```
https://www.alemanypajaron.es
```

**NUNCA usar:**
```
https://alemanypajaron.es  ❌ (sin www)
```

---

## 🔧 **DÓNDE ESTÁ DEFINIDA LA URL CANÓNICA**

El archivo principal que define la URL canónica es:

```
src/lib/structuredData.ts
```

```typescript
export const SITE_URL = 'https://www.alemanypajaron.es';
```

Este valor se usa en:
- Sitemap
- Robots.txt
- Structured Data (Schema.org)
- Open Graph
- Canonical URLs

---

## ✅ **ESTADO: TODO CORRECTO**

No se requiere ningún cambio. La configuración actual ya usa **www.alemanypajaron.es** como URL canónica en todos los archivos del proyecto.

---

**Última verificación:** 16 de enero de 2026
**Estado:** ✅ Configuración correcta y completa
