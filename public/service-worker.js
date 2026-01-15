// Service Worker para Alemán y Pajarón PWA
// Maneja notificaciones push y funcionamiento offline

const CACHE_NAME = 'alemanypajaron-v1';
const urlsToCache = [
  '/',
  '/admin',
  '/images/logo.svg',
  '/images/logo-dark.svg',
];

// ===================================================
// INSTALACIÓN DEL SERVICE WORKER
// ===================================================
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Error al cachear:', error);
      })
  );
  
  // Forzar activación inmediata
  self.skipWaiting();
});

// ===================================================
// ACTIVACIÓN DEL SERVICE WORKER
// ===================================================
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Tomar control inmediatamente
  return self.clients.claim();
});

// ===================================================
// MANEJO DE NOTIFICACIONES PUSH
// ===================================================
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push recibido:', event);
  
  let data = {
    title: 'Alemán y Pajarón',
    body: 'Nueva notificación',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'default',
    data: { url: '/admin' }
  };
  
  // Parsear datos si vienen en el push
  if (event.data) {
    try {
      const pushData = event.data.json();
      data = {
        title: pushData.title || data.title,
        body: pushData.body || pushData.message || data.body,
        icon: pushData.icon || data.icon,
        badge: pushData.badge || data.badge,
        tag: pushData.tag || data.tag,
        data: pushData.data || data.data,
        requireInteraction: pushData.requireInteraction || false,
        silent: pushData.silent || false,
      };
    } catch (error) {
      console.error('[Service Worker] Error al parsear push data:', error);
    }
  }
  
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    tag: data.tag,
    data: data.data,
    requireInteraction: data.requireInteraction,
    silent: data.silent,
    vibrate: [200, 100, 200], // Patrón de vibración
    actions: [
      {
        action: 'open',
        title: 'Abrir',
        icon: '/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icon-72x72.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ===================================================
// CLIC EN NOTIFICACIÓN
// ===================================================
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificación clickeada:', event);
  
  event.notification.close();
  
  // Si el usuario hizo clic en "Cerrar", no hacer nada más
  if (event.action === 'close') {
    return;
  }
  
  // Obtener la URL de destino
  const urlToOpen = event.notification.data?.url || '/admin';
  
  // Abrir la PWA en la URL especificada
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Si ya hay una ventana abierta, enfocarla
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus().then(() => {
              // Navegar a la URL si es posible
              if ('navigate' in client) {
                return client.navigate(urlToOpen);
              }
            });
          }
        }
        
        // Si no hay ventana abierta, abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ===================================================
// MANEJO DE MENSAJES
// ===================================================
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Mensaje recibido:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ===================================================
// ESTRATEGIA DE CACHE (Network First)
// ===================================================
self.addEventListener('fetch', (event) => {
  // Solo cachear requests GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  // No cachear requests de Supabase o APIs externas
  if (
    event.request.url.includes('supabase.co') ||
    event.request.url.includes('/api/') ||
    event.request.url.includes('analytics')
  ) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonarla y guardarla en cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar obtener desde cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // Si no está en cache y es una navegación, devolver página offline
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

console.log('[Service Worker] Cargado y listo');
