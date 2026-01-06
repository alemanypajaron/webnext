# 📄 Cómo Crear tu Archivo `.env.local`

## 🎯 Paso a Paso

### **1. Crea un archivo llamado `.env.local`**
En la **raíz del proyecto** (al mismo nivel que `package.json`), crea un archivo nuevo llamado exactamente:
```
.env.local
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
```

### **3. Rellena los valores**

Después del `=` de cada variable, pega tu valor (sin espacios, sin comillas):

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnopqrst.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwNTgwMjcsImV4cCI6MTk2MTYzNDAyN30.Xxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NjA1ODAyNywiZXhwIjoxOTYxNjM0MDI3fQ.Yyyyyyyyyyyyyyyyyyyyyyyyyyy
NEXT_PUBLIC_TINYMCE_API_KEY=hzc5ul9u051j4hya4cc4dxrtf8gq7mzrmluchwsgptgkz15g
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
2. Crea una cuenta gratuita o inicia sesión
3. Ve a **"My Account"** → **"Dashboard"**
4. En **"Approved Domains"** añade:
   - `localhost` (para desarrollo local)
   - `www.alemanypajaron.es` (tu dominio de producción)
5. Copia tu **API Key** (empieza con letras y números)
6. Es gratuito para hasta 1,000 cargas de editor por mes

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

**Una vez creado, borra este archivo** (`CREAR_ENV_LOCAL.md`) **o mantenlo como referencia.**

