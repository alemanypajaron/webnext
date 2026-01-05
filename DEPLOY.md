# 🚀 Guía de Deploy - Alemán y Pajarón

**Deploy automático con GitHub + Vercel**

---

## 📊 Estado Actual

✅ **Proyecto en producción**  
🌐 **URL:** https://webnext-one.vercel.app  
📦 **Repo:** https://github.com/alemanypajaron/webnext  
⚡ **Deploy:** Automático en cada push  

---

## 🔄 Workflow Completo

### 1️⃣ Desarrollo Local

```bash
# Hacer cambios en el código
# Editar archivos en src/

# Ver cambios en vivo
npm run dev  # http://localhost:3000
```

### 2️⃣ Commit Local

```bash
# Añadir cambios al staging
git add .

# O añadir archivos específicos
git add src/app/page.tsx

# Commit con mensaje descriptivo
git commit -m "feat: nuevo cambio en home"

# Tipos de commit recomendados:
# feat:     Nueva funcionalidad
# fix:      Corrección de bug
# content:  Cambio de contenido/texto
# style:    Cambios de diseño/CSS
# refactor: Refactorización de código
# docs:     Cambios en documentación
# chore:    Tareas de mantenimiento
```

### 3️⃣ Push a GitHub

```bash
# Push a la rama main
git push origin main

# O simplemente
git push
```

### 4️⃣ Deploy Automático en Vercel

**Vercel detecta el push automáticamente:**

```
🔄 Vercel detecta cambio en GitHub
⬇️  Clona código del repositorio
📦 Ejecuta npm install
🏗️  Ejecuta npm run build (~45s)
✅ Deploy a producción
🌐 URL actualizada
📧 Email de confirmación (si configurado)
```

**Tiempo total:** ~1-2 minutos

---

## 🖥️ Dashboard de Vercel

### Acceder al Dashboard

1. **URL:** https://vercel.com
2. **Login:** Con tu cuenta de GitHub
3. **Proyecto:** `webnext`

### Lo que puedes ver:

#### 📊 **Overview**
- Estado del último deploy (Success/Building/Failed)
- URL de producción
- Commits recientes
- Métricas de tráfico

#### 🚀 **Deployments**
Historial de todos los deploys:
```
✅ feat: nuevo footer        2m 15s   Production
✅ fix: corregir enlace      1m 48s   Production  
❌ test: prueba              0m 32s   Failed
```

#### 📝 **Logs**
- **Build Logs:** Ver proceso de construcción
- **Runtime Logs:** Errores en tiempo real
- **Function Logs:** API Routes (si las hay)

#### 📈 **Analytics** (Gratis)
- Visitas por país
- Dispositivos
- Páginas más vistas
- Core Web Vitals

#### ⚙️ **Settings**
- **Domains:** Configurar dominio personalizado
- **Environment Variables:** Variables de entorno
- **Git Integration:** Configurar auto-deploy
- **Build & Output:** Configuración de build

---

## 🌐 URLs del Proyecto

### Producción
```
https://webnext-one.vercel.app
```
☝️ URL principal donde acceden los usuarios

### Alternativas (mismo sitio)
```
https://webnext-git-main-ivan-alemans-projects.vercel.app
https://webnext-6i1yn4k14-ivan-alemans-projects.vercel.app
```

### Preview por Branch
Si creas una branch nueva:
```
https://webnext-git-feature-nombre.vercel.app
```
☝️ Cada branch tiene su propia URL para testing

---

## 🔍 Monitorear Deploys

### Ver Estado en Tiempo Real

**En la Terminal:**
```bash
# Después de git push, ir a:
https://vercel.com/tu-usuario/webnext
```

**Estados posibles:**
- 🟡 **Building** - Deploy en progreso
- ✅ **Ready** - Deploy exitoso
- ❌ **Failed** - Deploy falló (ver logs)

### Ver Logs de Build

```
Vercel Dashboard → Tu proyecto → Deployments → Click en el deploy
→ Pestaña "Build Logs"
```

**Ejemplo de build exitoso:**
```
✓ Compiled successfully in 8.6s
✓ Running TypeScript ...
✓ Generating static pages (21/21)
✓ Finalizing page optimization ...
✓ Deployment ready
```

### Ver Errores en Producción

```
Vercel Dashboard → Tu proyecto → Logs → Runtime Logs
```

Filtrar por:
- **Errors:** Solo errores
- **Warnings:** Advertencias
- **Info:** Información general

---

## 🐛 Troubleshooting

### Deploy Falla

**Síntomas:**
- ❌ Estado "Failed" en Vercel
- Email de "Deployment failed"

**Solución:**
1. Ir a **Build Logs** en Vercel
2. Buscar el error (en rojo)
3. Arreglarlo localmente
4. Commit + Push de nuevo

**Errores comunes:**

```typescript
// ❌ Error de TypeScript
Type 'string' is not assignable to type 'number'

// Solución: Arreglar el tipo en el código
```

```bash
# ❌ Dependencia faltante
Module not found: Can't resolve 'nombre-paquete'

# Solución:
npm install nombre-paquete
git add package.json package-lock.json
git commit -m "chore: añadir dependencia faltante"
git push
```

### Build Exitoso pero Web No Carga

**Síntomas:**
- ✅ Build Success
- ❌ La web da error al abrirla

**Solución:**
1. Ir a **Runtime Logs** en Vercel
2. Buscar errores de ejecución
3. Revisar errores de:
   - Imágenes que no existen
   - Links rotos
   - Props incorrectos

### Deploy Muy Lento

**Normal:** 45-60 segundos  
**Lento:** +3 minutos

**Posibles causas:**
- Muchas dependencias nuevas
- Primera instalación de `node_modules`
- Problema temporal de Vercel

**Solución:**
- Esperar (suele resolverse solo)
- Cancelar y hacer push de nuevo

---

## ⚡ Optimizaciones de Deploy

### Cache de Dependencias

Vercel cachea `node_modules` automáticamente.

**Si necesitas limpiar el cache:**
```
Vercel Dashboard → Settings → Build & Development Settings
→ "Clear Build Cache" → Deploy again
```

### Variables de Entorno

**Añadir en Vercel:**
```
Settings → Environment Variables → Add

Variable: GOOGLE_VERIFICATION_CODE
Value: tu_codigo_aqui
Environment: Production, Preview, Development
```

**Usar en el código:**
```typescript
const code = process.env.GOOGLE_VERIFICATION_CODE
```

**Importante:** Después de añadir variables de entorno, hacer redeploy:
```
Deployments → Latest → ⋯ → Redeploy
```

---

## 🎯 Configuración de Dominio Personalizado

### Añadir alemanypajaron.es

**En Vercel:**
```
1. Settings → Domains
2. Add Domain: alemanypajaron.es
3. Vercel te da los DNS records:
   
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
```

**En tu proveedor de dominio:**
```
1. Ir al panel DNS
2. Añadir los records que Vercel te indicó
3. Esperar propagación (1-48h, normalmente 5 min)
4. ✅ Tu dominio apuntará a Vercel
```

**SSL:**
- Vercel configura HTTPS automáticamente (gratis)
- No necesitas hacer nada más

---

## 📧 Notificaciones

### Email de Deploy

**Configurar en Vercel:**
```
Settings → Notifications
→ Marcar: "Deployment Succeeded"
→ Marcar: "Deployment Failed"
```

Recibirás email cada vez que:
- ✅ Deploy sea exitoso
- ❌ Deploy falle (para actuar rápido)

### Slack/Discord (Opcional)

También puedes recibir notificaciones en:
- Slack
- Discord
- Webhook custom

---

## 🔐 Seguridad

### Personal Access Token

**Gestión de tokens:**

⚠️ **IMPORTANTE:**
- Nunca compartir tokens de acceso
- Revocar y crear uno nuevo si se compromete
- Guardarlo en lugar seguro (gestor de contraseñas)
- NO subirlos a GitHub

**Crear nuevo token:**
```
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Seleccionar scope: repo (full control)
4. Generate token
5. Copiar y guardar en lugar seguro
```

**Revocar token:**
```
1. GitHub → Settings → Developer settings → Personal access tokens
2. Buscar tu token
3. Click "Revoke"
```

### Variables de Entorno Sensibles

**Nunca** subir a GitHub:
- API Keys
- Passwords
- Tokens
- Secrets

**Usar variables de entorno:**
- En local: `.env.local` (añadir a `.gitignore`)
- En Vercel: Settings → Environment Variables

---

## 📊 Métricas & Analytics

### Core Web Vitals

**Ver en Vercel:**
```
Speed Insights → Enable (gratis)
```

**Métricas:**
- **LCP:** Largest Contentful Paint (<2.5s)
- **FID:** First Input Delay (<100ms)
- **CLS:** Cumulative Layout Shift (<0.1)

### Web Analytics

**Activar en Vercel:**
```
Analytics → Enable (gratis)
```

**Verás:**
- Visitantes únicos
- Páginas vistas
- Países de origen
- Dispositivos (móvil/desktop)
- Páginas más populares

---

## 🆘 Comandos Útiles

### Deploy Manual (si falla el automático)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Rollback (Volver a versión anterior)

```
Vercel Dashboard → Deployments
→ Buscar el deploy anterior que funcionaba
→ Click ⋯ → "Promote to Production"
```

---

## 📞 Soporte

### Si algo no funciona:

1. **Revisar Build Logs** en Vercel
2. **Revisar Runtime Logs** en Vercel
3. **Probar localmente:** `npm run dev`
4. **Contactar:** ivan@alemanypajaron.es

---

## ✅ Checklist Pre-Deploy

Antes de hacer push importante:

```bash
# ✅ Probar localmente
npm run dev

# ✅ Verificar que compile sin errores
npm run build

# ✅ Revisar linter
npm run lint

# ✅ Commit descriptivo
git commit -m "feat: descripción clara del cambio"

# ✅ Push
git push

# ✅ Monitorear en Vercel
# Ir al dashboard y ver que el deploy sea exitoso
```

---

**📅 Última actualización:** Enero 2026  
**🚀 Deploy automático activo**  
**✅ Proyecto en producción**

