# 🔔 Configuración de Notificaciones Push PWA

Esta guía te explica cómo configurar las notificaciones push para recibir alertas en tiempo real cuando lleguen nuevos contactos o presupuestos, incluso con la PWA cerrada.

## 📋 Índice

1. [Generar VAPID Keys](#1-generar-vapid-keys)
2. [Configurar Variables de Entorno Local](#2-configurar-variables-de-entorno-local)
3. [Crear Tabla en Supabase](#3-crear-tabla-en-supabase)
4. [Desplegar Edge Function](#4-desplegar-edge-function)
5. [Configurar Triggers SQL](#5-configurar-triggers-sql)
6. [Configurar Variables en Supabase](#6-configurar-variables-en-supabase)
7. [Activar Notificaciones desde la PWA](#7-activar-notificaciones-desde-la-pwa)
8. [Verificar Funcionamiento](#8-verificar-funcionamiento)
9. [Solución de Problemas](#9-solución-de-problemas)

---

## 1. Generar VAPID Keys

Las VAPID keys son necesarias para autenticar las notificaciones push.

### Paso 1: Instalar web-push globalmente (si no lo tienes)

```bash
npm install -g web-push
```

### Paso 2: Generar las keys

```bash
npx web-push generate-vapid-keys
```

**Salida esperada:**

```
=======================================
Public Key:
BEl62iUYgUivxIkv69yViEuiBIa-Ib27SzV2e0m5K...
Private Key:
fwovCNWKNuVnPKZi_LjWBvqwQlwuiUPBhY5wGw...
=======================================
```

⚠️ **IMPORTANTE:** 
- Guarda estas keys de forma segura
- NO las compartas públicamente
- NO las subas a Git

---

## 2. Configurar Variables de Entorno Local

Añade las VAPID keys a tu archivo `.env.local`:

```env
# VAPID Keys para notificaciones push
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BEl62iUYgUivxIkv69yViEuiBIa-Ib27SzV2e0m5K...
VAPID_PRIVATE_KEY=fwovCNWKNuVnPKZi_LjWBvqwQlwuiUPBhY5wGw...
VAPID_SUBJECT=mailto:contacto@alemanypajaron.com
```

**Variables:**
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`: Clave pública (se usa en el cliente)
- `VAPID_PRIVATE_KEY`: Clave privada (solo servidor, ¡NO exponerla!)
- `VAPID_SUBJECT`: Email de contacto (usado para identificar la app)

---

## 3. Crear Tabla en Supabase

Ve a tu **Supabase Dashboard** → **SQL Editor** y ejecuta:

```bash
# Desde tu terminal local
cat supabase/crear-tabla-push-subscriptions.sql
```

O copia y pega el contenido del archivo `supabase/crear-tabla-push-subscriptions.sql` en el SQL Editor de Supabase.

✅ Esto creará:
- Tabla `admin_push_subscriptions`
- Políticas RLS
- Índices para búsquedas rápidas

---

## 4. Desplegar Edge Function

### Paso 1: Instalar Supabase CLI (si no lo tienes)

```bash
npm install -g supabase
```

### Paso 2: Login en Supabase

```bash
supabase login
```

### Paso 3: Linkear tu proyecto

```bash
supabase link --project-ref TU-PROYECTO-ID
```

Para obtener tu PROJECT_ID:
- Ve a **Supabase Dashboard** → **Project Settings** → **General**
- Copia el "Reference ID"

### Paso 4: Desplegar la función

```bash
supabase functions deploy send-push-notification
```

✅ **Salida esperada:**

```
Deploying send-push-notification (project ref: xxx-yyy-zzz)
✓ send-push-notification deployed successfully
```

---

## 5. Configurar Triggers SQL

Ve a **Supabase Dashboard** → **SQL Editor** y ejecuta:

```bash
# Ver el contenido del archivo
cat supabase/crear-triggers-notificaciones-push.sql
```

O copia y pega el contenido del archivo `supabase/crear-triggers-notificaciones-push.sql`.

⚠️ **ANTES de ejecutar**, necesitas configurar las variables de entorno (siguiente paso).

---

## 6. Configurar Variables en Supabase

### 6.1 Variables para Triggers SQL

Ve a **Supabase Dashboard** → **SQL Editor** y ejecuta:

```sql
ALTER DATABASE postgres SET app.supabase_url = 'https://TU-PROYECTO.supabase.co';
ALTER DATABASE postgres SET app.supabase_service_role_key = 'TU-SERVICE-ROLE-KEY';
```

**Dónde obtener estos valores:**

1. **URL de Supabase:**
   - Dashboard → Project Settings → API
   - Copia "Project URL"
   - Ejemplo: `https://abcdefghijk.supabase.co`

2. **Service Role Key:**
   - Dashboard → Project Settings → API
   - En "Project API keys" busca "service_role"
   - ⚠️ ¡Mantén esta key secreta! Tiene permisos de admin

### 6.2 Variables para Edge Function

Ve a **Supabase Dashboard** → **Edge Functions** → **send-push-notification** → **Settings** y añade:

```
VAPID_PUBLIC_KEY=BEl62iUYgUivxIkv69yViEuiBIa-Ib27SzV2e0m5K...
VAPID_PRIVATE_KEY=fwovCNWKNuVnPKZi_LjWBvqwQlwuiUPBhY5wGw...
VAPID_SUBJECT=mailto:contacto@alemanypajaron.com
```

(Usa las mismas keys generadas en el paso 1)

### 6.3 Variables en Vercel (Producción)

Si deployeas en Vercel, añade las mismas variables:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade:
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
   - `VAPID_SUBJECT`
   
⚠️ **NO añadas** `VAPID_PRIVATE_KEY` en Vercel (solo se usa en Supabase Edge Functions)

---

## 7. Activar Notificaciones desde la PWA

### Paso 1: Instala la PWA en tu móvil

1. Abre `https://alemanypajaron.com` en Chrome (Android) o Safari (iOS)
2. Toca el menú → "Añadir a pantalla de inicio"
3. La app se instalará como una app nativa

### Paso 2: Inicia sesión como Admin

1. Abre la PWA instalada
2. Ve a `/administrator/login`
3. Inicia sesión con tus credenciales

### Paso 3: Activa las notificaciones

1. En el dashboard de admin verás un panel "🔔 Notificaciones Push"
2. Haz clic en "🔔 Activar Notificaciones"
3. El navegador te pedirá permiso → **Permitir**
4. Verás el estado cambiar a "✓ Activas"

✅ ¡Listo! Ya recibirás notificaciones incluso con la app cerrada.

### 📱 Activar en múltiples dispositivos

Puedes repetir el proceso en:
- Tu móvil personal
- Tu tablet
- Tu ordenador
- Cualquier dispositivo donde instales la PWA

Cada uno recibirá notificaciones de forma independiente.

---

## 8. Verificar Funcionamiento

### Paso 1: Verifica que el Service Worker esté registrado

Abre la consola de desarrollador (F12) → Application → Service Workers

Deberías ver:
```
✅ Service Worker registrado: /service-worker.js
Status: activated and is running
```

### Paso 2: Verifica la subscription en Supabase

Ve a **Supabase Dashboard** → **Table Editor** → `admin_push_subscriptions`

Deberías ver un registro con:
- `endpoint`: URL del push service
- `p256dh`: Key de encriptación
- `auth`: Key de autenticación
- `created_at`: Fecha de registro

### Paso 3: Prueba enviando un formulario

1. Abre otra ventana en modo incógnito
2. Ve a `https://alemanypajaron.com/contacto`
3. Envía un mensaje de prueba
4. Deberías recibir una notificación push en tu dispositivo

### Paso 4: Verifica los logs de la Edge Function

Ve a **Supabase Dashboard** → **Edge Functions** → **send-push-notification** → **Logs**

Deberías ver:
```
📨 Enviando notificación push: 📧 Nuevo Contacto
📱 Enviando a 1 dispositivo(s)
✅ Notificación enviada a: https://...
✅ Notificaciones enviadas: 1/1
```

---

## 9. Solución de Problemas

### ❌ "Tu navegador no soporta notificaciones push"

**Solución:** Usa Chrome, Firefox o Edge en Android/Windows. Safari en iOS tiene soporte limitado.

### ❌ "VAPID public key no configurada"

**Solución:** Verifica que `NEXT_PUBLIC_VAPID_PUBLIC_KEY` esté en tu `.env.local` y reinicia el servidor:

```bash
npm run dev
```

### ❌ "Error al guardar la suscripción"

**Solución:** Verifica que ejecutaste el SQL para crear la tabla `admin_push_subscriptions` y las políticas RLS.

### ❌ "Las notificaciones están bloqueadas"

**Solución:** 
1. Ve a la configuración del navegador
2. Busca "Notificaciones" o "Permisos del sitio"
3. Permite notificaciones para `alemanypajaron.com`
4. Recarga la página

### ❌ "No llegan notificaciones"

**Checklist:**

1. ✅ Service Worker registrado (F12 → Application)
2. ✅ Permiso de notificaciones concedido
3. ✅ Subscription guardada en Supabase (tabla `admin_push_subscriptions`)
4. ✅ Edge Function desplegada (`supabase functions list`)
5. ✅ VAPID keys configuradas en Edge Function
6. ✅ Variables de entorno configuradas en SQL
7. ✅ Triggers SQL creados (`SELECT * FROM pg_trigger WHERE tgname LIKE 'trigger_notify_%'`)

### ❌ Error en logs: "VAPID keys no configuradas"

**Solución:** Ve a **Edge Functions** → **send-push-notification** → **Settings** y añade las 3 variables de VAPID.

### ❌ Error: "net.http_post not found"

**Solución:** Habilita la extensión `pg_net` en Supabase:

1. Ve a **Database** → **Extensions**
2. Busca "pg_net"
3. Click en "Enable"

---

## 🎉 ¡Todo Listo!

Ahora tu PWA funcionará como una app nativa:

- ✅ **Sesión persistente** (nunca se cierra)
- ✅ **Notificaciones push** (incluso con app cerrada)
- ✅ **Sin proveedores externos** (todo con Supabase)
- ✅ **Funciona en múltiples dispositivos**

### 📊 Estadísticas y Monitoreo

Puedes ver las estadísticas de notificaciones en:

```sql
-- Ver cuántos dispositivos están suscritos
SELECT COUNT(*) as dispositivos_activos FROM admin_push_subscriptions;

-- Ver el último dispositivo que se suscribió
SELECT * FROM admin_push_subscriptions ORDER BY created_at DESC LIMIT 1;

-- Ver logs de la Edge Function
-- Dashboard → Edge Functions → send-push-notification → Logs
```

---

## 🔐 Seguridad

- ✅ Las VAPID keys están protegidas
- ✅ La tabla de subscriptions tiene RLS habilitado
- ✅ Solo el admin puede suscribirse (requiere login)
- ✅ Las notificaciones solo se envían al admin
- ✅ No se expone información sensible en las notificaciones

---

## 📚 Referencias

- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [VAPID Protocol](https://tools.ietf.org/html/rfc8292)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [PWA Best Practices](https://web.dev/pwa/)

---

## 💡 Próximos Pasos (Opcional)

- [ ] Añadir notificaciones con sonido personalizado
- [ ] Agrupar notificaciones por tipo
- [ ] Añadir acciones rápidas (responder desde la notificación)
- [ ] Estadísticas de tasa de apertura de notificaciones
- [ ] Programar notificaciones (ej: resumen diario)
