'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Utilidad para convertir VAPID key de base64 a Uint8Array
function urlBase64ToUint8Array(base64String: string): BufferSource {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray as BufferSource;
}

interface UsePushNotificationsReturn {
  isSupported: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  permission: NotificationPermission;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  // Registrar Service Worker al montar el componente
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Verificar soporte
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    setIsSupported(supported);

    if (!supported) {
      setIsLoading(false);
      setError('Tu navegador no soporta notificaciones push');
      return;
    }

    // Obtener permiso actual
    setPermission(Notification.permission);

    // Registrar Service Worker
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
          scope: '/'
        });

        console.log('✅ Service Worker registrado:', registration);

        // Verificar si ya está suscrito
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);

        // Escuchar actualizaciones del Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 Nueva versión del Service Worker disponible');
                // Opcionalmente, notificar al usuario que hay una actualización
              }
            });
          }
        });

        setIsLoading(false);
      } catch (err) {
        console.error('❌ Error al registrar Service Worker:', err);
        setError('Error al registrar el Service Worker');
        setIsLoading(false);
      }
    };

    registerServiceWorker();
  }, []);

  // Función para suscribirse a notificaciones push
  const subscribe = async () => {
    if (!isSupported) {
      setError('Las notificaciones push no están soportadas');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Pedir permiso
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission !== 'granted') {
        setError('Permisos de notificación denegados');
        setIsLoading(false);
        return;
      }

      // Obtener VAPID public key desde variables de entorno
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      
      if (!vapidPublicKey) {
        throw new Error('VAPID public key no configurada. Ejecuta: npx web-push generate-vapid-keys');
      }

      // Obtener Service Worker registration
      const registration = await navigator.serviceWorker.ready;

      // Suscribirse a push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      console.log('✅ Suscripción creada:', subscription);

      // Guardar la subscription en Supabase
      const subscriptionJSON = subscription.toJSON();
      
      const { error: dbError } = await supabase
        .from('admin_push_subscriptions')
        .upsert({
          endpoint: subscriptionJSON.endpoint,
          p256dh: subscriptionJSON.keys?.p256dh,
          auth: subscriptionJSON.keys?.auth,
          user_agent: navigator.userAgent,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'endpoint'
        });

      if (dbError) {
        console.error('❌ Error al guardar subscription:', dbError);
        throw new Error('Error al guardar la suscripción');
      }

      console.log('✅ Subscription guardada en Supabase');
      setIsSubscribed(true);
      setIsLoading(false);
    } catch (err) {
      console.error('❌ Error al suscribirse:', err);
      setError(err instanceof Error ? err.message : 'Error al suscribirse a notificaciones');
      setIsLoading(false);
    }
  };

  // Función para desuscribirse
  const unsubscribe = async () => {
    if (!isSupported) return;

    setIsLoading(true);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        const subscriptionJSON = subscription.toJSON();

        // Eliminar de Supabase
        const { error: dbError } = await supabase
          .from('admin_push_subscriptions')
          .delete()
          .eq('endpoint', subscriptionJSON.endpoint);

        if (dbError) {
          console.error('❌ Error al eliminar subscription:', dbError);
        }

        // Desuscribirse del navegador
        await subscription.unsubscribe();
        console.log('✅ Desuscrito de notificaciones push');
      }

      setIsSubscribed(false);
      setIsLoading(false);
    } catch (err) {
      console.error('❌ Error al desuscribirse:', err);
      setError('Error al desuscribirse de notificaciones');
      setIsLoading(false);
    }
  };

  return {
    isSupported,
    isSubscribed,
    isLoading,
    error,
    permission,
    subscribe,
    unsubscribe
  };
}
