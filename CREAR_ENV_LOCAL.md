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
# IMPORTANTE: Usa la key "anon" / "public", NO la "service_role"
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### **3. Rellena los valores**

Después del `=` de cada variable, pega tu valor (sin espacios, sin comillas):

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnopqrst.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwNTgwMjcsImV4cCI6MTk2MTYzNDAyN30.Xxxxxxxxxxxxxxxxxxxxxxxxxx
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
4. **NO uses** la que dice "service_role" (es privada)
5. Copia el token completo (empieza con `eyJhbGc...`)

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

