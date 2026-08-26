# 📄 Variables de Entorno - Configuración Local

**Guía completa para configurar `.env.local` y variables en Vercel**

---

## 🎯 Variables Requeridas (CMS + agentes + email local)

Tu aplicación necesita estas variables de entorno:

| Variable | Tipo | Propósito |
|----------|------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Key pública para frontend |
| `SUPABASE_SERVICE_ROLE_KEY` | **Privada** | Key admin (bypasea RLS) |
| `NEXT_PUBLIC_TINYMCE_API_KEY` | Pública | Editor de blog |
| `OPENAI_API_KEY` | **Privada** | Agentes de blog (redacción e imágenes) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | **Privada** | Servidor SMTP Hostinger (local) |
| `SMTP_USER` / `SMTP_PASS` | **Privada** | Buzón `contacto@alemanypajaron.es` |
| `MAIL_FROM_NAME` / `MAIL_FROM` / `MAIL_REPLY_TO` | **Privada** | Remitente y respuesta de los emails |

---

## 📝 PARTE 1: Desarrollo Local (`.env.local`)

### **1. Crea el archivo `.env.local`**
En la **raíz del proyecto** (al mismo nivel que `package.json`):

```bash
# Crear archivo
touch .env.local

# O crear manualmente en Windows/Mac
```

### **2. Copia y pega este contenido:**

```env
# =====================================================
# SUPABASE CONFIGURATION
# =====================================================
# Obtén estos valores en: https://supabase.com/dashboard
# Settings (⚙️) → API

# Tu Project URL de Supabase
# Ejemplo: https://abcdefghijklmnopqrst.supabase.co
NEXT_PUBLIC_SUPABASE_URL=

# Tu Publishable (anon) API Key
# Empieza con: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# Esta key es PÚBLICA y segura para el frontend
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Tu Service Role Key (PRIVADA - SOLO SERVIDOR)
# Empieza con: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# IMPORTANTE: Esta key bypasea RLS, úsala SOLO en servidor (panel admin)
# NUNCA la expongas en el frontend
SUPABASE_SERVICE_ROLE_KEY=

# =====================================================
# TINYMCE CONFIGURATION (Editor de Blog)
# =====================================================
# Obtén tu API key en: https://www.tiny.cloud/my-account/dashboard/
# Create account → Get API Key → Copy

# Tu API Key de TinyMCE
NEXT_PUBLIC_TINYMCE_API_KEY=

# =====================================================
# HOSTINGER EMAIL (SMTP, envío local)
# =====================================================
# Buzón en hPanel → Emails → Mailboxes
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contacto@alemanypajaron.es
SMTP_PASS=
MAIL_FROM_NAME=Alemán y Pajarón
MAIL_FROM=contacto@alemanypajaron.es
MAIL_REPLY_TO=contacto@alemanypajaron.es

# =====================================================
# OPENAI (agentes de blog: redacción + imágenes)
# =====================================================
# Obtén tu key en: https://platform.openai.com/api-keys
OPENAI_API_KEY=
```

### **3. Rellena los valores**

Después del `=` de cada variable, pega tu valor (sin espacios, sin comillas):

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnopqrst.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwNTgwMjcsImV4cCI6MTk2MTYzNDAyN30.Xxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NjA1ODAyNywiZXhwIjoxOTYxNjM0MDI3fQ.Yyyyyyyyyyyyyyyyyyyyyyyyyyy
NEXT_PUBLIC_TINYMCE_API_KEY=hzc5ul9u051j4hya4cc4dxrtf8gq7mzrmluchwsgptgkz15g
OPENAI_API_KEY=sk-proj-xxxxxxxx
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contacto@alemanypajaron.es
SMTP_PASS=tu-password-del-buzon
MAIL_FROM_NAME=Alemán y Pajarón
MAIL_FROM=contacto@alemanypajaron.es
MAIL_REPLY_TO=contacto@alemanypajaron.es
```

### **4. Guarda el archivo**

### **5. Reinicia el servidor**

```bash
# Si el servidor está corriendo, detenlo (Ctrl+C)
# Luego reinicia:
npm run dev
```

---

## 🔍 Dónde Obtener los Valores

### **🌐 NEXT_PUBLIC_SUPABASE_URL**

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Click en **Settings** (⚙️ abajo izquierda)
4. Click en **API**
5. Busca la sección **"Project URL"**
6. Copia la URL que se ve así: `https://xxx.supabase.co`

### **🔑 NEXT_PUBLIC_SUPABASE_ANON_KEY**

1. En la misma página (Settings → API)
2. Busca la sección **"Project API keys"**
3. Busca la key que dice **"anon"** o **"public"**
4. Copia el token completo (empieza con `eyJhbGc...`)

### **🔐 SUPABASE_SERVICE_ROLE_KEY** (NUEVA - Para Panel Admin)

1. En la misma página (Settings → API)
2. Busca la sección **"Project API keys"**
3. Busca la key que dice **"service_role"** o **"secret"**
4. Copia el token completo (empieza con `eyJhbGc...`)
5. ⚠️ **IMPORTANTE**: Esta key es PRIVADA y bypasea Row Level Security
   - Solo se usa en el servidor (nunca en el navegador)
   - Permite operaciones admin sin restricciones
   - Mantenla segura y nunca la expongas públicamente

### **📝 NEXT_PUBLIC_TINYMCE_API_KEY** (NUEVA - Para Editor de Blog)

1. Ve a: https://www.tiny.cloud
2. **Crea cuenta gratuita** o inicia sesión
3. Ve a **"My Account"** → **"Dashboard"**
4. En **"Approved Domains"** añade estos 2 dominios:
   ```
   localhost
   www.alemanypajaron.es
   ```
5. Copia tu **API Key** (ejemplo: `hzc5ul9u051j4hya4cc4dxrtf8gq7mzrmluchwsgptgkz15g`)
6. **Es gratuito:** Hasta 1,000 cargas/mes

**⚠️ IMPORTANTE:** Sin esta key, el editor mostrará "This domain is not registered"

### **🤖 OPENAI_API_KEY** (Agentes de blog)

1. Ve a: https://platform.openai.com/api-keys
2. Crea una key de proyecto (`sk-proj-...`)
3. Pégala **solo** en `.env.local` y en Vercel (nunca en el frontend)
4. Reinicia `npm run dev`

Sin esta key, el panel admin no puede redactar ni generar imágenes.

El redactor usa **Web Search nativo** de `gpt-5.6-terra` (Responses API). No hace falta SerpAPI.

📖 **Guía de agentes:** [`AGENTES_BLOG_IA.md`](AGENTES_BLOG_IA.md)

### **✉️ SMTP Hostinger (envío de emails en local)**

El dominio está en Hostinger. El envío sale del buzón `contacto@alemanypajaron.es`.

1. Entra en [hPanel](https://hpanel.hostinger.com) → **Emails → Mailboxes**
2. Crea o abre `contacto@alemanypajaron.es`
3. Copia la contraseña del buzón (o restablécela) en `SMTP_PASS`
4. Comprueba la conexión:

```bash
npm run mail:verificar
```

5. Envío de prueba:

```bash
npx tsx scripts/enviar-email.ts --to=contacto@alemanypajaron.es --subject="Prueba" --body="Hola"
```

**Servidores Hostinger:**

| Uso | Host | Puerto | Cifrado |
|-----|------|--------|---------|
| SMTP (script local) | `smtp.hostinger.com` | `587` | STARTTLS (`SMTP_SECURE=false`) |
| SMTP (Outlook, alternativa) | `smtp.hostinger.com` | `465` | SSL/TLS |
| IMAP (Outlook) | `imap.hostinger.com` | `993` | SSL/TLS |

En Outlook deja **SPA desmarcado**. Usuario = el email completo.

La plantilla HTML está en `src/lib/mail.ts` (navy `#0A2230`, dorado `#F9B513`, logo, firma y pie).

⚠️ **Nunca subas `SMTP_PASS` a GitHub.** `.env.local` ya está en `.gitignore`.

Estas variables SMTP **no son obligatorias en Vercel** mientras el envío se haga solo en local.

---

## ✅ Verificar que Funciona

Después de crear `.env.local`:

```bash
npm run dev
```

Abre: http://localhost:3000/proyectos

- ✅ **Si ves proyectos** → Configurado correctamente
- ❌ **Si ves error** → Revisa que los valores sean correctos

---

## ⚠️ IMPORTANTE

- El archivo `.env.local` **NO se sube a GitHub** (está en `.gitignore`)
- **NO compartas** este archivo con nadie (contiene tus credenciales)
- Si necesitas cambiar las credenciales, simplemente edita este archivo
- Las mismas variables deben estar en **Vercel Dashboard** para producción

---

## 📸 Ejemplo de cómo debe verse tu `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://otodqkvlgioyswifimhd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90b2Rxa3ZsZ2lveXN3aWZpbWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NTMyNjksImV4cCI6MjA1MjUyOTI2OX0.Nc49wY6gExOYVKkDup0lmoQ_NmFAaKCGYEvbPEQ-UOs
```

*(Esto es un ejemplo, usa TUS credenciales reales de Supabase)*

---

## 🆘 Problemas Comunes

### **Error: "Faltan variables de entorno"**
- Verifica que el archivo se llama exactamente `.env.local` (con el punto al inicio)
- Verifica que está en la raíz del proyecto
- Verifica que no hay espacios antes/después del `=`
- Reinicia el servidor

### **Error: "Cannot connect to Supabase"**
- Verifica que la URL es correcta (https://xxx.supabase.co)
- Verifica que la key es la correcta (empieza con eyJhbGc...)
- Verifica que usaste la key "anon", no "service_role"

---

## 🌐 PARTE 2: Configurar en Vercel (Producción)

**⚠️ Las mismas variables deben estar en Vercel para que funcione en producción (incluye `OPENAI_API_KEY` si usas los agentes).**

### **1. Acceder a Vercel Dashboard**

```
https://vercel.com/dashboard
→ Selecciona tu proyecto "webnext"
→ Click en "Settings"
→ Click en "Environment Variables"
```

### **2. Añadir las 4 Variables**

Para **cada variable**, haz click en "Add New" y completa:

**Variable 1:**
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxx.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variable 2:**
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variable 3:**
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (DIFERENTE a la anon)
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variable 4:**
```
Key: NEXT_PUBLIC_TINYMCE_API_KEY
Value: hzc5ul9u051j4hya4cc4dxrtf8gq7mzrmluchwsgptgkz15g
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variable 5:**
```
Key: OPENAI_API_KEY
Value: sk-proj-... (privada, solo servidor)
Environments: ✅ Production ✅ Preview ✅ Development
```

### **3. Redesplegar (IMPORTANTE)**

Después de añadir las variables:

```
1. Ve a "Deployments"
2. Click en los 3 puntos (⋮) del último deployment
3. Click en "Redeploy"
4. Marca "Use existing Build Cache" (opcional)
5. Click "Redeploy"
```

**⚠️ SIN REDEPLOY, las variables NO se cargan.**

---

## ✅ Verificar que Funciona

### **Local:**
```bash
npm run dev
```
- Abre: http://localhost:3000/proyectos
- ✅ Si ves proyectos → Configurado correctamente
- ❌ Si ves error → Revisa valores

### **Producción:**
```
https://www.alemanypajaron.es/administrator/blog/nuevo
```
- ✅ Editor TinyMCE carga sin errores
- ✅ Puedes crear/editar artículos
- ✅ Gestor de imágenes funciona

---

## 🔐 Seguridad

### **Variables Públicas (NEXT_PUBLIC_*):**
- ✅ Se pueden usar en el navegador
- ✅ Están en el bundle de JavaScript
- ✅ Son seguras si están diseñadas para frontend

### **Variables Privadas (sin NEXT_PUBLIC_):**
- ⚠️ **SOLO** se usan en el servidor (API Routes, Server Actions)
- ⚠️ **NUNCA** se exponen al navegador
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` bypasea RLS → **MUY SENSIBLE**

### **Reglas de Oro:**
1. ❌ **NUNCA** subas `.env.local` a GitHub (ya está en `.gitignore`)
2. ❌ **NUNCA** compartas tu Service Role Key ni `SMTP_PASS`
3. ✅ **SIEMPRE** regenera keys si se comprometen
4. ✅ Guarda las keys en un gestor de contraseñas

---

## 🆘 Problemas Comunes

### **Error: "Faltan variables de entorno"**
- ✅ Verifica que el archivo se llama exactamente `.env.local` (con el punto)
- ✅ Verifica que está en la raíz del proyecto
- ✅ Verifica que no hay espacios antes/después del `=`
- ✅ Reinicia el servidor (`npm run dev`)

### **Error: "Cannot connect to Supabase"**
- ✅ Verifica que la URL es correcta (https://xxx.supabase.co)
- ✅ Verifica que la key es la correcta (empieza con eyJhbGc...)
- ✅ Verifica que usaste la key "anon", no "service_role" para `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### **Editor TinyMCE muestra "no-api-key"**
- ✅ Verifica que añadiste `www.alemanypajaron.es` a "Approved Domains" en tiny.cloud
- ✅ Verifica que la variable está en Vercel
- ✅ Verifica que redesplegaste después de añadirla
- ✅ Limpia caché del navegador (Ctrl + Shift + R)

### **Panel admin no funciona en producción**
- ✅ Verifica que `SUPABASE_SERVICE_ROLE_KEY` está en Vercel
- ✅ Verifica que es la **service_role** key (no la anon)
- ✅ Redesplegar en Vercel
- ✅ Ver "Runtime Logs" en Vercel para errores

### **Los agentes de blog fallan (redactar / portada / cuerpo)**
- ✅ Verifica `OPENAI_API_KEY` en `.env.local` y reinicia `npm run dev`
- ✅ En Vercel: misma variable + Redeploy
- ✅ Guía: [`AGENTES_BLOG_IA.md`](AGENTES_BLOG_IA.md)

### **El email no conecta (`ECONNREFUSED` o certificado)**
- Usa puerto `587` y `SMTP_SECURE=false` (STARTTLS). El 465 a veces falla en Windows/IPv6
- `src/lib/mail.ts` fuerza IPv4 y admite la cadena TLS local (antivirus)
- Verifica usuario = email completo y contraseña del buzón en hPanel
- Prueba: `npm run mail:verificar`

---

## 📚 Documentación Relacionada

- **Supabase setup completo:** Ver [`SUPABASE_CONFIG.md`](SUPABASE_CONFIG.md)
- **Panel admin setup:** Ver [`ADMIN_SETUP.md`](ADMIN_SETUP.md)
- **Agentes de IA del blog:** Ver [`AGENTES_BLOG_IA.md`](AGENTES_BLOG_IA.md)
- **Email SMTP Hostinger:** Ver [`README.md`](README.md)
- **Deploy y CI/CD:** Ver [`DEPLOY.md`](DEPLOY.md)
- **README principal:** Ver [`README.md`](README.md)

---

**📅 Última actualización:** Agosto 2026  
**✅ Variables de entorno documentadas (incluye OpenAI y SMTP Hostinger)**  
**🔐 Seguridad implementada**

