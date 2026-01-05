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

# Tu Service Role Key (SOLO PARA ADMIN - NUNCA EN FRONTEND)
# Esta key bypasea Row Level Security y permite operaciones admin
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# API Key de TinyMCE (editor de blog)
NEXT_PUBLIC_TINYMCE_API_KEY=your-tinymce-api-key-here
```

**⚠️ IMPORTANTE:**
- El archivo `.env.local` NO se sube a GitHub (está en .gitignore)
- Las variables con prefijo `NEXT_PUBLIC_` están disponibles en el navegador
- La **anon key** es pública y segura para el frontend
- La **service_role key** es PRIVADA y solo se usa en el servidor (panel admin)
- La **TinyMCE API key** es necesaria para el editor de blog

📖 **Ayuda para crear este archivo:** Ver [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md)

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

4. **Añade las 4 variables:**

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

   **Variable 3 (NUEVA - PARA PANEL ADMIN):**
   - **Key:** `SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** Tu Service Role Key (eyJhbGc... - **NO ES LA MISMA QUE ANON**)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"
   - ⚠️ **IMPORTANTE**: Esta key bypasea RLS y permite operaciones admin

   **Variable 4 (NUEVA - PARA EDITOR TINYMCE):**
   - **Key:** `NEXT_PUBLIC_TINYMCE_API_KEY`
   - **Value:** Tu TinyMCE API Key (obtener en https://www.tiny.cloud)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

📖 **Ayuda con TinyMCE:** Ver [`CONFIGURAR_TINYMCE_VERCEL.md`](CONFIGURAR_TINYMCE_VERCEL.md)

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
   - **service_role key:** En "Project API keys" → `service_role` `secret` (⚠️ **SOLO PARA BACKEND**)

**⚠️ IMPORTANTE: Service Role Key**
- La `service_role` key **bypasea Row Level Security**
- Solo se usa en el servidor (nunca en el frontend)
- Permite operaciones admin sin restricciones
- Mantenla segura y nunca la expongas en el código del navegador
- En el proyecto se usa en `src/lib/supabase-admin.ts` para operaciones del panel admin

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

## 🚀 Estado Actual del Proyecto

✅ **Sistema Completamente Funcional:**

1. ✅ Schemas SQL ejecutados en Supabase (ver `/supabase/README.md`)
   - ✅ `/supabase/supabase-schema.sql` (formularios)
   - ✅ `/supabase/supabase-schema-proyectos-blog.sql` (proyectos y blog)
   - ✅ `/supabase/fix-rls-policies.sql` (políticas admin)
   - ✅ `/supabase/fix-trigger-blog.sql` (trigger actualizado_at)
   - ✅ `/supabase/politicas-storage-definitivas.sql` (storage imágenes)
2. ✅ Cliente de Supabase instalado y configurado
   - ✅ `src/lib/supabase.ts` (cliente público)
   - ✅ `src/lib/supabase-server.ts` (cliente con auth)
   - ✅ `src/lib/supabase-admin.ts` (cliente admin con Service Role)
3. ✅ Acciones del servidor (`src/app/actions/`)
   - ✅ `forms.ts` (contacto, presupuesto, newsletter)
   - ✅ `admin.ts` (CRUD completo admin)
   - ✅ `auth.ts` (autenticación admin)
4. ✅ Formularios conectados y funcionales
   - ✅ Contacto → tabla `contactos`
   - ✅ Presupuesto → tabla `presupuestos`
   - ✅ Newsletter → tabla `newsletter`
5. ✅ Panel de Administración (`/administrator`)
   - ✅ Login con Supabase Auth
   - ✅ Gestión de contactos
   - ✅ Gestión de presupuestos
   - ✅ CMS de blog con TinyMCE
   - ✅ Gestión de proyectos
   - ✅ Gestor de imágenes (Supabase Storage)
6. ✅ Blog dinámico con:
   - ✅ Artículos desde Supabase
   - ✅ Contador de visitas
   - ✅ Editor TinyMCE profesional
   - ✅ Gestión de imágenes
7. ✅ Deploy en Vercel con todas las variables configuradas

---

**✨ Archivo creado:** `SUPABASE_CONFIG.md`  
**📁 Referencia rápida** para toda la configuración de Supabase

