# 🚀 Guía de Extensión - PWA Dual

## Cómo Extender la Solución Actual

Esta guía explica cómo ampliar o modificar la implementación de PWA dual según necesidades futuras.

## 📋 Casos de Uso Comunes

### 1. Añadir Más Administradores

#### Escenario
Necesitas que otra persona (socio, empleado, ayudante) acceda al panel de administración desde su móvil.

#### Solución
**No requiere cambios en el código**. Simplemente:

1. Crea credenciales en Supabase para el nuevo usuario
2. Comparte con él:
   - URL directa: `https://alemanypajaron.es/administrator/login`
   - O muéstrale el icono ⚙️ en el footer
3. Que siga las instrucciones de instalación
4. Cada admin tiene su propia instalación de la PWA en su dispositivo

```typescript
// No se necesita código adicional
// La solución actual soporta múltiples admins automáticamente
```

---

### 2. Crear Roles Diferentes (Admin, Editor, Visor)

#### Escenario
Quieres diferentes niveles de acceso:
- **Super Admin**: Acceso total
- **Editor**: Solo blog y proyectos
- **Visor**: Solo ver presupuestos

#### Solución

**Paso 1**: Añadir roles a la base de datos

```sql
-- Supabase: Añadir columna de rol
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'viewer';

-- Crear tabla de roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver su propio rol"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```

**Paso 2**: Crear hook para obtener rol

```typescript
// src/hooks/useUserRole.ts
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export type UserRole = 'super_admin' | 'editor' | 'viewer';

export function useUserRole() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      setRole(data?.role || 'viewer');
      setLoading(false);
    };

    getRole();
  }, []);

  return { role, loading };
}
```

**Paso 3**: Proteger rutas según rol

```typescript
// src/middleware.ts (actualizar)
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si no hay sesión, redirigir a login
  if (!session && req.nextUrl.pathname.startsWith('/administrator')) {
    if (req.nextUrl.pathname !== '/administrator/login') {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/administrator/login';
      return NextResponse.redirect(redirectUrl);
    }
    return res;
  }

  // Si hay sesión, verificar rol para rutas sensibles
  if (session && req.nextUrl.pathname.startsWith('/administrator')) {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    const role = roleData?.role || 'viewer';

    // Super admin puede todo
    if (role === 'super_admin') {
      return res;
    }

    // Editor no puede acceder a presupuestos ni multimedia
    if (role === 'editor') {
      if (
        req.nextUrl.pathname.includes('/presupuestos') ||
        req.nextUrl.pathname.includes('/multimedia')
      ) {
        return NextResponse.redirect(new URL('/administrator', req.url));
      }
    }

    // Viewer solo puede ver, no editar
    if (role === 'viewer') {
      if (
        req.nextUrl.pathname.includes('/nuevo') ||
        req.nextUrl.pathname.includes('/editar')
      ) {
        return NextResponse.redirect(new URL('/administrator', req.url));
      }
    }
  }

  return res;
}
```

**Paso 4**: Actualizar UI según rol

```typescript
// src/components/admin/AdminNav.tsx
import { useUserRole } from '@/hooks/useUserRole';

export default function AdminNav() {
  const { role, loading } = useUserRole();

  if (loading) return <div>Cargando...</div>;

  return (
    <nav>
      {/* Siempre visible */}
      <Link href="/administrator">Dashboard</Link>

      {/* Solo para editor y super_admin */}
      {(role === 'editor' || role === 'super_admin') && (
        <>
          <Link href="/administrator/blog">Blog</Link>
          <Link href="/administrator/proyectos">Proyectos</Link>
        </>
      )}

      {/* Solo para super_admin */}
      {role === 'super_admin' && (
        <>
          <Link href="/administrator/presupuestos">Presupuestos</Link>
          <Link href="/administrator/multimedia">Multimedia</Link>
        </>
      )}
    </nav>
  );
}
```

---

### 3. PWA Personalizada por Rol

#### Escenario
Quieres que editores y super admins tengan apps con nombres diferentes.

#### Solución

**Paso 1**: Crear manifests adicionales

```json
// public/manifest-editor.json
{
  "name": "A&P Editor",
  "short_name": "A&P Edit",
  "start_url": "/administrator?role=editor",
  "background_color": "#4F46E5",
  "theme_color": "#4F46E5",
  ...
}

// public/manifest-superadmin.json
{
  "name": "A&P Super Admin",
  "short_name": "A&P SA",
  "start_url": "/administrator?role=super_admin",
  "background_color": "#DC2626",
  "theme_color": "#DC2626",
  ...
}
```

**Paso 2**: Detectar rol y cargar manifest apropiado

```typescript
// src/app/administrator/layout.tsx
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // Esta función se ejecuta en el servidor
  // Necesitarías pasar el rol desde las cookies o headers
  
  const role = getRoleFromServerContext(); // Implementar según tu auth

  const manifestMap = {
    super_admin: '/manifest-superadmin.json',
    editor: '/manifest-editor.json',
    viewer: '/manifest-admin.json',
  };

  return {
    title: 'Panel de Administración',
    manifest: manifestMap[role] || '/manifest-admin.json',
    // ... resto de metadata
  };
}
```

---

### 4. Diferentes Páginas de Inicio según Rol

#### Escenario
- Super Admin → Dashboard completo
- Editor → Directo a blog/proyectos
- Viewer → Solo lista de presupuestos

#### Solución

```typescript
// src/app/administrator/page.tsx
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/administrator/login');
  }

  // Obtener rol
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single();

  const role = roleData?.role || 'viewer';

  // Redirigir según rol
  if (role === 'editor') {
    redirect('/administrator/blog');
  }

  if (role === 'viewer') {
    redirect('/administrator/presupuestos');
  }

  // Super admin ve el dashboard completo
  return <SuperAdminDashboard />;
}
```

---

### 5. Notificaciones Push (Futuro)

#### Escenario
Quieres enviar notificaciones push cuando hay:
- Nuevo presupuesto
- Nuevo comentario en blog
- Actualización importante

#### Solución

**Paso 1**: Solicitar permiso de notificaciones

```typescript
// src/components/pwa/NotificationPermission.tsx
'use client';

import { useEffect, useState } from 'react';

export default function NotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        // Registrar service worker para push
        const registration = await navigator.serviceWorker.ready;
        // Suscribirse a notificaciones push
        // ... implementación con Firebase/OneSignal/etc
      }
    }
  };

  if (permission === 'granted') {
    return null; // Ya tiene permiso
  }

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <button onClick={requestPermission}>
        🔔 Activar notificaciones
      </button>
    </div>
  );
}
```

**Paso 2**: Service Worker para manejar notificaciones

```javascript
// public/sw.js (crear)
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url,
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
```

---

### 6. Offline Support Completo

#### Escenario
Quieres que el admin pueda:
- Ver proyectos offline
- Editar borradores offline
- Sincronizar cuando vuelva online

#### Solución

**Paso 1**: Configurar Next.js PWA con cache strategy

```javascript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/.*$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'supabase-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24, // 24 horas
        },
      },
    },
  ],
});

module.exports = withPWA({
  // ... resto de config
});
```

**Paso 2**: Implementar IndexedDB para drafts

```typescript
// src/lib/offline-storage.ts
import { openDB } from 'idb';

const DB_NAME = 'admin-offline';
const STORE_NAME = 'drafts';

export async function saveDraft(type: 'blog' | 'proyecto', data: any) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    },
  });

  await db.put(STORE_NAME, {
    ...data,
    type,
    savedAt: new Date(),
    synced: false,
  });
}

export async function getDrafts() {
  const db = await openDB(DB_NAME, 1);
  return await db.getAll(STORE_NAME);
}

export async function syncDrafts() {
  const drafts = await getDrafts();
  const unsynced = drafts.filter((d) => !d.synced);

  for (const draft of unsynced) {
    try {
      // Sincronizar con Supabase
      await uploadToSupabase(draft);
      
      // Marcar como sincronizado
      await markAsSynced(draft.id);
    } catch (error) {
      console.error('Error syncing draft:', error);
    }
  }
}
```

---

## 🔧 Mejores Prácticas

### 1. Testing
- Siempre testear en dispositivos reales (Android + iOS)
- Verificar que los manifests se cargan correctamente
- Probar en modo incógnito para simular primera instalación

### 2. Iconos
- Crear iconos específicos por rol/tipo de usuario
- Usar herramientas como [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- Mantener consistencia de branding

### 3. Seguridad
- NUNCA exponer manifests admin en la web pública
- Siempre validar roles en el backend (no solo frontend)
- Usar RLS (Row Level Security) en Supabase

### 4. Performance
- Minimizar JavaScript adicional
- Lazy load componentes admin
- Cachear assets estáticos

### 5. UX
- Feedback claro al usuario sobre su rol
- Instrucciones específicas por dispositivo
- Mensajes de error amigables

## 📚 Recursos Adicionales

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Next.js PWA](https://github.com/shadowwalker/next-pwa)
- [Workbox (Service Workers)](https://developers.google.com/web/tools/workbox)
- [Web Push Notifications](https://web.dev/push-notifications-overview/)

## 🆘 Soporte

Para implementar cualquiera de estas extensiones:
1. Lee la documentación base en `PWA_ADMIN_GUIA.md`
2. Sigue los ejemplos de código de esta guía
3. Testea exhaustivamente antes de producción
4. Documenta cualquier cambio personalizado
