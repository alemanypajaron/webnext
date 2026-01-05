# 🗄️ Configuración de Supabase

## 📋 1. Variables de Entorno

### **Archivo `.env.local` (Local Development)**

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# Tu Project URL de Supabase
# Ejemplo: https://abcdefghijklmnopqrst.supabase.co
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here

# Tu Publishable (anon) API Key
# Es la key pública, segura para el frontend
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ IMPORTANTE:**
- El archivo `.env.local` NO se sube a GitHub (está en .gitignore)
- Las variables con prefijo `NEXT_PUBLIC_` están disponibles en el navegador
- Usa la **anon key** (no la service_role key) para el frontend

---

## ☁️ 2. Configurar en Vercel

### **Paso a Paso:**

1. **Ve a tu proyecto en Vercel:**
   - https://vercel.com/dashboard
   - Selecciona tu proyecto `webnext`

2. **Ve a Settings:**
   - Click en "Settings" (arriba)
   
3. **Abre Environment Variables:**
   - En el menú lateral izquierdo: **"Environment Variables"**

4. **Añade las 2 variables:**

   **Variable 1:**
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Tu Project URL (https://xxx.supabase.co)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

   **Variable 2:**
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Tu Publishable API Key (eyJhbGc...)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

5. **Redesplegar (si ya está desplegado):**
   - Ve a "Deployments"
   - Click en el último deployment
   - Click en "⋯" (tres puntos)
   - Click en "Redeploy"
   - Marca "Use existing Build Cache"
   - Click "Redeploy"

---

## 🔐 Dónde Encontrar tus Credenciales en Supabase

1. **Ve a tu proyecto:** https://supabase.com/dashboard
2. **Click en "Settings"** (icono engranaje abajo a la izquierda)
3. **Click en "API"**
4. **Copia:**
   - **Project URL:** En "Project URL" (https://xxx.supabase.co)
   - **anon public key:** En "Project API keys" → `anon` `public`

---

## 📊 Tablas Creadas

### **contactos**
```sql
- id: UUID (PK)
- nombre: VARCHAR(255)
- email: VARCHAR(255)
- telefono: VARCHAR(50)
- mensaje: TEXT
- created_at: TIMESTAMP
- leido: BOOLEAN
- respondido: BOOLEAN
```

### **presupuestos**
```sql
- id: UUID (PK)
- nombre: VARCHAR(255)
- email: VARCHAR(255)
- telefono: VARCHAR(50)
- tipo_proyecto: VARCHAR(100)
- presupuesto_estimado: VARCHAR(50)
- ubicacion: VARCHAR(255)
- fecha_inicio_estimada: DATE
- descripcion: TEXT
- acepta_privacidad: BOOLEAN
- created_at: TIMESTAMP
- leido: BOOLEAN
- respondido: BOOLEAN
- estado: VARCHAR(50)
```

### **newsletter** (opcional)
```sql
- id: UUID (PK)
- email: VARCHAR(255) UNIQUE
- nombre: VARCHAR(255)
- activo: BOOLEAN
- created_at: TIMESTAMP
- confirmado: BOOLEAN
```

---

## 🔒 Seguridad (Row Level Security)

✅ **RLS habilitado** en todas las tablas

✅ **Políticas configuradas:**
- Frontend puede **INSERT** (crear nuevos registros)
- Solo admins pueden **SELECT** (leer registros)
- Usa `anon` key para el frontend (seguro)

---

## 🧪 Testing en Local

1. **Crea `.env.local`** con tus credenciales
2. **Reinicia el servidor:** `npm run dev`
3. **Rellena formularios** en:
   - http://localhost:3000/contacto
   - http://localhost:3000/presupuesto
4. **Verifica en Supabase:**
   - Table Editor → contactos / presupuestos

---

## 📧 Ver los Datos

### **Opción 1: Supabase Dashboard**
- Ve a "Table Editor"
- Click en "contactos" o "presupuestos"
- Verás todos los registros

### **Opción 2: SQL Editor**
```sql
-- Ver últimos 10 contactos
SELECT * FROM contactos ORDER BY created_at DESC LIMIT 10;

-- Ver últimos 10 presupuestos
SELECT * FROM presupuestos ORDER BY created_at DESC LIMIT 10;

-- Estadísticas
SELECT * FROM estadisticas_formularios;
```

---

## 🚀 Próximos Pasos

Después de configurar las variables:

1. ✅ Ejecutar schemas SQL en Supabase (ver `/supabase/README.md`)
   - Primero: `/supabase/supabase-schema.sql` (formularios)
   - Segundo: `/supabase/supabase-schema-proyectos-blog.sql` (proyectos y blog)
2. ✅ Instalar `@supabase/supabase-js`
3. ✅ Cliente de Supabase (`src/lib/supabase.ts`)
4. ✅ Acciones del servidor (`src/app/actions/forms.ts`)
5. ⏳ Conectar formularios de contacto y presupuesto
6. ⏳ Testing local
7. ⏳ Deploy a Vercel

---

**✨ Archivo creado:** `SUPABASE_CONFIG.md`  
**📁 Referencia rápida** para toda la configuración de Supabase

