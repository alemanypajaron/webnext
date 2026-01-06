# 🔐 Configuración del Panel de Administración

## 📋 **RESUMEN:**

Este documento explica cómo configurar y acceder al panel de administración de Alemán y Pajarón.

---

## 🚀 **1. CREAR EL PRIMER USUARIO ADMINISTRADOR**

### **Opción A: Desde Supabase Dashboard (RECOMENDADO)**

1. **Abre tu Dashboard de Supabase:**
   ```
   https://supabase.com/dashboard
   ```

2. **Selecciona tu proyecto** (alemanypajaron)

3. **Ve a "Authentication" → "Users"** (menú lateral izquierdo)

4. **Click en "Add user" → "Create new user"**

5. **Rellena los datos:**
   ```
   Email: admin@alemanypajaron.es
   Password: [tu contraseña segura]
   ```

6. **IMPORTANTE:** Marca la casilla **"Auto Confirm User"** ✅

7. **Click en "Create user"**

---

### **Opción B: Desde SQL Editor (AVANZADO)**

Si prefieres crear el usuario directamente con SQL:

1. **Abre "SQL Editor"** en Supabase

2. **Ejecuta este SQL:**

```sql
-- Reemplaza con tu email y contraseña
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@alemanypajaron.es', -- ⬅️ TU EMAIL
  crypt('TuContraseñaSegura123!', gen_salt('bf')), -- ⬅️ TU CONTRASEÑA
  NOW(),
  NULL,
  '',
  NULL,
  '',
  NULL,
  '',
  '',
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{}',
  NULL,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL
);
```

---

## 🔑 **2. ACCEDER AL PANEL DE ADMINISTRACIÓN**

### **URL de Acceso:**

```
Producción: https://www.alemanypajaron.es/administrator/login
Local: http://localhost:3000/administrator/login
```

### **Credenciales:**

```
Email: admin@alemanypajaron.es
Password: [la contraseña que configuraste]
```

---

## 🎯 **3. FUNCIONALIDADES DISPONIBLES**

### **📊 Gestión de Contactos** (`/administrator`)

✅ Ver todos los mensajes de contacto recibidos  
✅ Dashboard con estadísticas (total, pendientes, respondidos)  
✅ Marcar como leído/no leído  
✅ Marcar como respondido/pendiente  
✅ Eliminar contactos  
✅ Ver mensaje completo  

**Estados:**
- 🔵 **Leído** / ⚪ **No leído**
- 🟢 **Respondido** / 🟡 **Pendiente**

---

### **📋 Gestión de Presupuestos** (`/administrator/presupuestos`)

✅ Ver todas las solicitudes de presupuesto  
✅ Dashboard con 4 estadísticas (total, pendientes, en proceso, enviados)  
✅ Ver información completa del cliente y proyecto  
✅ Cambiar estado del presupuesto  
✅ Eliminar presupuestos  

**Estados:**
- 🟡 **Pendiente**: Recién recibido, sin revisar
- 🔵 **En Proceso**: Trabajando en el presupuesto
- 🟢 **Enviado**: Presupuesto enviado al cliente
- 🔴 **Rechazado**: Proyecto rechazado o cancelado

---

### **📝 CMS de Blog** (`/administrator/blog`)

✅ **FUNCIONAL - Editor TinyMCE Profesional:**  
- ✅ Crear nuevos artículos
- ✅ Editar artículos existentes
- ✅ Eliminar artículos
- ✅ **Editor TinyMCE** con menús completos (File, Edit, View, Insert, Format, Tools, Table, Help)
- ✅ **Gestor de imágenes integrado:**
  - Subir imágenes a Supabase Storage
  - Seleccionar de galería existente
  - Drag & drop
  - Preview en tiempo real
- ✅ Gestión de categorías
- ✅ Marcar como destacado
- ✅ **Editar fecha de publicación**
- ✅ Tags y etiquetas
- ✅ Imagen destacada con selector visual
- ✅ Vista previa del artículo
- ✅ Contador de visitas

**Estados:**
- ⭐ **Destacado**: Aparece en la home y listados principales
- 📅 **Fecha de publicación**: Editable manualmente
- 👁️ **Visitas**: Contador automático
- 📂 **Categoría**: Asignación visual

---

### **🏗️ Gestión de Proyectos** (`/administrator/proyectos`)

✅ **FUNCIONAL:**  
- ✅ Ver todos los proyectos
- ✅ Crear nuevos proyectos
- ✅ Editar proyectos existentes
- ✅ Eliminar proyectos
- ✅ Marcar como destacado
- ✅ Galería de imágenes múltiple
- ✅ Información completa:
  - Título y slug
  - Descripción larga y corta
  - Ubicación
  - Presupuesto
  - Superficie
  - Duración
  - Cliente
  - Estado (completado/en curso)
- ✅ Servicios asociados al proyecto
- ✅ Imagen destacada

**Estados:**
- ⭐ **Destacado**: Aparece en la home
- ✅ **Completado**: Proyecto finalizado
- 🔄 **En Curso**: Proyecto en ejecución

---

### **📧 Gestión de Newsletter** (`/administrator/newsletter`)

✅ **VISUALIZACIÓN:**  
- ✅ Ver todos los suscriptores
- ✅ Email y nombre de cada suscriptor
- ✅ Fecha de suscripción
- ✅ Estado (activo/inactivo)
- ✅ Estado de confirmación

⏳ **PRÓXIMAMENTE:**
- Envío masivo de newsletters
- Exportar lista de suscriptores
- Gestionar bajas
- Segmentación de suscriptores

---

## 🔐 **4. SEGURIDAD**

### **Protección Implementada:**

✅ **Middleware de autenticación**: Solo usuarios autenticados pueden acceder  
✅ **Row Level Security (RLS)**: Los contactos y presupuestos solo son visibles para admins  
✅ **Sesiones seguras**: Cookies HTTP-only con Supabase  
✅ **Sin indexación**: `robots.txt` evita que Google indexe `/administrator`  
✅ **Logout seguro**: Cierra sesión y limpia cookies correctamente  

### **Mejores Prácticas:**

1. **Usa contraseñas fuertes** (mínimo 12 caracteres, mayúsculas, minúsculas, números, símbolos)
2. **No compartas las credenciales** de administrador
3. **Cambia la contraseña periódicamente** (cada 3-6 meses)
4. **Cierra sesión** después de terminar de trabajar
5. **No uses WiFi público** para acceder al panel admin

---

## 🛠️ **5. SOLUCIÓN DE PROBLEMAS**

### **❌ "No puedo iniciar sesión"**

**Posibles causas:**
1. Email o contraseña incorrectos
2. Usuario no confirmado en Supabase
3. Variables de entorno mal configuradas en Vercel

**Solución:**
- Verifica el email en Supabase Dashboard → Authentication → Users
- Asegúrate de que el usuario tenga `email_confirmed_at` con fecha (no NULL)
- Verifica las variables de entorno en Vercel:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
  NEXT_PUBLIC_TINYMCE_API_KEY=hzc5ul...
  ```

**⚠️ IMPORTANTE sobre Service Role Key:**
- La `SUPABASE_SERVICE_ROLE_KEY` es **CRÍTICA** para el funcionamiento del panel admin
- Esta key bypasea Row Level Security y permite operaciones de admin
- Debe estar configurada en Vercel para que el panel funcione correctamente
- **NUNCA** expongas esta key en el código del frontend
- Se usa únicamente en Server Actions y API Routes del servidor

📖 **Más info:** Ver [`SUPABASE_CONFIG.md`](SUPABASE_CONFIG.md) y [`CONFIGURAR_TINYMCE_VERCEL.md`](CONFIGURAR_TINYMCE_VERCEL.md)

---

### **❌ "Redirige siempre a /administrator/login"**

**Causa:** El middleware no detecta la sesión correctamente.

**Solución:**
1. Limpia las cookies del navegador
2. Intenta en ventana de incógnito
3. Redeploy en Vercel sin caché:
   ```
   Vercel Dashboard → Deployments → ... → Redeploy
   ```

---

### **❌ "No veo los contactos/presupuestos"**

**Causa:** Problema con las políticas RLS de Supabase.

**Solución:**
1. Ve a Supabase Dashboard → Table Editor → `contactos`
2. Click en "RLS" (arriba)
3. Verifica que exista la política "Solo admins pueden leer contactos"
4. Si no existe, ejecuta el SQL del archivo `/supabase/supabase-schema.sql`

---

## 📞 **6. SOPORTE**

Si tienes problemas para configurar el panel de administración, verifica:

1. ✅ Usuario creado en Supabase
2. ✅ Email confirmado (`email_confirmed_at` no NULL)
3. ✅ Variables de entorno configuradas en Vercel
4. ✅ Último deploy exitoso en Vercel
5. ✅ SQL schemas ejecutados correctamente

---

## 🎉 **¡LISTO!**

Ahora puedes acceder al panel de administración y gestionar los contactos y presupuestos de tu web.

**🔗 Acceso directo:**  
https://www.alemanypajaron.es/administrator/login

---

**📝 Última actualización:** Enero 2026  
**✍️ Autor:** Alemán y Pajarón Web Team

