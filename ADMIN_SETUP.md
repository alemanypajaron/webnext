# 🔐 Setup del Panel de Administración

**Guía rápida para configurar y acceder al panel admin.**

---

## 🚀 Setup Inicial (Solo Primera Vez)

### **Crear el Primer Usuario Admin**

#### **Opción A: Desde Supabase Dashboard** (RECOMENDADO)

1. **Abre Supabase Dashboard:** https://supabase.com/dashboard
2. **Selecciona tu proyecto**
3. **Ve a Authentication → Users**
4. **Click en "Add user" → "Create new user"**
5. **Rellena:**
   ```
   Email: admin@alemanypajaron.es
   Password: [tu contraseña segura]
   ✅ Auto Confirm User (MARCAR)
   ```
6. **Click en "Create user"**

#### **Opción B: SQL Editor** (AVANZADO)

```sql
-- Reemplaza email y contraseña
INSERT INTO auth.users (
  instance_id, id, aud, role, email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@alemanypajaron.es',                      -- TU EMAIL
  crypt('TuContraseñaSegura123!', gen_salt('bf')), -- TU CONTRASEÑA
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW()
);
```

---

## 🔑 Acceso al Panel

### **URL:**
```
Producción: https://www.alemanypajaron.es/administrator/login
Local: http://localhost:3000/administrator/login
```

### **Credenciales:**
```
Email: admin@alemanypajaron.es
Password: [la que configuraste]
```

---

## 🎯 Funcionalidades Disponibles

**El panel admin incluye 5 secciones:**

### **1. 📊 Contactos** (`/administrator`)
- Ver mensajes del formulario de contacto
- Marcar como leído/respondido
- Eliminar contactos
- Estadísticas

### **2. 📋 Presupuestos** (`/administrator/presupuestos`)
- Ver solicitudes de presupuesto
- Cambiar estado (pendiente/en proceso/enviado/rechazado/aceptado)
- Ver info completa del proyecto
- Eliminar
- Estadísticas por estado

### **3. 📝 Blog (CMS)** (`/administrator/blog`)
- **Crear/editar/eliminar** artículos
- **Editor TinyMCE** profesional (menús completos)
- **Gestor de imágenes** integrado (Supabase Storage)
- Marcar como destacado
- Editar fecha de publicación
- Categorías y tags
- Contador de visitas

### **4. 🏗️ Proyectos** (`/administrator/proyectos`)
- Crear/editar/eliminar proyectos
- Marcar como destacado
- Galería de imágenes múltiple
- Info completa (presupuesto, ubicación, superficie, etc.)

### **5. 📧 Newsletter** (`/administrator/newsletter`)
- Ver lista de suscriptores
- Email, nombre, fecha de suscripción
- Estado (activo/inactivo)

📖 **Detalles de funcionalidades:** Ver [`CONTENIDO.md`](CONTENIDO.md) → Sección "Panel de Administración"

---

## 🔒 Seguridad Implementada

### **Protección en Múltiples Capas:**

✅ **Autenticación:** Middleware protege todas las rutas `/administrator`  
✅ **RLS (Row Level Security):** Solo admins ven datos sensibles  
✅ **Service Role Key:** Bypass RLS para operaciones admin  
✅ **Sesiones seguras:** HTTP-only cookies  
✅ **Sin indexación:** Bloqueado en `robots.txt`, meta tags, Analytics  
✅ **Sin caché público:** No archivable en Google/Wayback Machine

### **Panel Admin Completamente Oculto:**

```
❌ Google NO indexa /administrator
❌ Bots NO rastrean /administrator
❌ Analytics NO registra visitas al admin
❌ No aparece en búsquedas
❌ No aparece en cache de Google
✅ Solo accesible con autenticación
```

📖 **Más sobre seguridad:** Implementado en commit "security: Bloquear indexacion y tracking del panel admin"

---

## 🛠️ Requisitos Previos

### **1. Variables de Entorno Configuradas:**

**Local (`.env.local`):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  ← CRÍTICA
NEXT_PUBLIC_TINYMCE_API_KEY=hzc5ul...
```

**Vercel (Producción):**
- Las mismas 4 variables en Settings → Environment Variables
- **Redeploy** después de añadirlas

📖 **Guía completa:** [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md)

### **2. Schemas SQL Ejecutados:**

```sql
1. /supabase/supabase-schema.sql
2. /supabase/supabase-schema-proyectos-blog.sql
3. /supabase/fix-rls-policies.sql
4. /supabase/fix-trigger-blog.sql
5. /supabase/incrementar-visitas.sql
6. Bucket "blog-images" creado en Storage
7. /supabase/politicas-storage-definitivas.sql
```

📖 **Guía completa:** [`/supabase/README.md`](supabase/README.md)

### **3. Usuario Admin Creado:**
- Email confirmado en Supabase (`email_confirmed_at` no NULL)

---

## 🆘 Solución de Problemas

### **❌ "No puedo iniciar sesión"**

**Posibles causas:**
1. Email o contraseña incorrectos
2. Usuario no confirmado
3. Variables de entorno faltantes

**Solución:**
```
1. Verifica en Supabase: Authentication → Users → email_confirmed_at debe tener fecha
2. Verifica variables en Vercel: Settings → Environment Variables
3. Redeploy si acabas de añadir variables
4. Prueba en ventana de incógnito
```

### **❌ "Redirige siempre a /login"**

**Causa:** Middleware no detecta la sesión

**Solución:**
```
1. Limpia cookies del navegador
2. Prueba en incógnito
3. Redeploy en Vercel sin caché
```

### **❌ "No veo contactos/presupuestos"**

**Causa:** Falta `SUPABASE_SERVICE_ROLE_KEY`

**Solución:**
```
1. Verifica que la variable esté en Vercel
2. Verifica que es la service_role key (NO la anon)
3. Redeploy después de añadirla
4. Ver Runtime Logs en Vercel para errores
```

### **❌ "Editor TinyMCE no carga"**

**Causa:** Falta `NEXT_PUBLIC_TINYMCE_API_KEY` o dominio no aprobado

**Solución:**
```
1. Verifica la variable en Vercel
2. Ve a tiny.cloud → My Account → Approved Domains
3. Añade: www.alemanypajaron.es y localhost
4. Redeploy
5. Limpia caché (Ctrl + Shift + R)
```

### **❌ "No puedo subir imágenes"**

**Causa:** Bucket no creado o políticas faltantes

**Solución:**
```
1. Ve a Supabase Storage → Crear bucket "blog-images" (público)
2. Ejecutar: /supabase/politicas-storage-definitivas.sql
3. Verificar que las políticas existen en Supabase
```

---

## ✅ Checklist de Verificación

Antes de usar el panel admin, verifica:

```
✅ Usuario creado en Supabase (email confirmado)
✅ Variables de entorno en Vercel (4 total)
✅ Schemas SQL ejecutados (7 archivos)
✅ Bucket "blog-images" creado en Storage
✅ Último deploy exitoso en Vercel
✅ Puedes acceder a /administrator/login
```

---

## 📚 Documentación Relacionada

- **Variables de entorno:** [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md)
- **Schemas SQL:** [`/supabase/README.md`](supabase/README.md)
- **Configuración Supabase:** [`SUPABASE_CONFIG.md`](SUPABASE_CONFIG.md)
- **Funcionalidades del admin:** [`CONTENIDO.md`](CONTENIDO.md)
- **Deploy y monitoreo:** [`DEPLOY.md`](DEPLOY.md)
- **README principal:** [`README.md`](README.md)

---

## 🔐 Mejores Prácticas

1. **Contraseña fuerte** (mínimo 12 caracteres, mayúsculas, minúsculas, números, símbolos)
2. **No compartas credenciales** de administrador
3. **Cambia la contraseña periódicamente** (cada 3-6 meses)
4. **Cierra sesión** después de trabajar
5. **No uses WiFi público** para acceder al panel
6. **Guarda la Service Role Key** en lugar seguro (gestor de contraseñas)
7. **Nunca expongas** la Service Role Key en el frontend

---

## 🎉 ¡Listo!

**Acceso directo al panel:**  
👉 https://www.alemanypajaron.es/administrator/login

---

**📅 Última actualización:** Enero 2026  
**✅ Panel completamente funcional**  
**🔒 Bloqueado de indexación y Analytics**
