'use client';

import { useEffect, useState } from 'react';

interface DiagnosticInfo {
  serviceWorkerRegistered: boolean;
  serviceWorkerActive: boolean;
  pushPermission: string;
  hasSubscription: boolean;
  subscriptionEndpoint?: string;
  vapidPublicKey?: string;
}

export default function PushDiagnosticPage() {
  const [info, setInfo] = useState<DiagnosticInfo>({
    serviceWorkerRegistered: false,
    serviceWorkerActive: false,
    pushPermission: 'unknown',
    hasSubscription: false,
  });

  useEffect(() => {
    const checkStatus = async () => {
      const diagnostic: DiagnosticInfo = {
        serviceWorkerRegistered: false,
        serviceWorkerActive: false,
        pushPermission: 'unknown',
        hasSubscription: false,
      };

      // Check Service Worker
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          diagnostic.serviceWorkerRegistered = !!registration;
          diagnostic.serviceWorkerActive = !!(registration?.active);

          // Check Push subscription
          if (registration) {
            const subscription = await registration.pushManager.getSubscription();
            diagnostic.hasSubscription = !!subscription;
            if (subscription) {
              diagnostic.subscriptionEndpoint = subscription.endpoint.substring(0, 50) + '...';
            }
          }
        } catch (error) {
          console.error('Error checking Service Worker:', error);
        }
      }

      // Check Push permission
      if ('Notification' in window) {
        diagnostic.pushPermission = Notification.permission;
      }

      // Check VAPID key
      diagnostic.vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      setInfo(diagnostic);
    };

    checkStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">
          🔍 Diagnóstico de Push Notifications
        </h1>

        <div className="space-y-4">
          {/* Service Worker Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className={info.serviceWorkerRegistered ? '✅' : '❌'}>
                {info.serviceWorkerRegistered ? '✅' : '❌'}
              </span>
              Service Worker
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Registrado:</strong>{' '}
                {info.serviceWorkerRegistered ? 'Sí' : 'No'}
              </p>
              <p>
                <strong>Activo:</strong>{' '}
                {info.serviceWorkerActive ? 'Sí' : 'No'}
              </p>
            </div>
          </div>

          {/* Push Permission */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className={info.pushPermission === 'granted' ? '✅' : '⚠️'}>
                {info.pushPermission === 'granted' ? '✅' : '⚠️'}
              </span>
              Permisos de Notificaciones
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Estado:</strong>{' '}
                <span className={`font-bold ${
                  info.pushPermission === 'granted' 
                    ? 'text-green-600' 
                    : info.pushPermission === 'denied'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}>
                  {info.pushPermission}
                </span>
              </p>
            </div>
          </div>

          {/* Push Subscription */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className={info.hasSubscription ? '✅' : '❌'}>
                {info.hasSubscription ? '✅' : '❌'}
              </span>
              Suscripción Push
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Suscrito:</strong>{' '}
                {info.hasSubscription ? 'Sí' : 'No'}
              </p>
              {info.subscriptionEndpoint && (
                <p className="break-all">
                  <strong>Endpoint:</strong> {info.subscriptionEndpoint}
                </p>
              )}
            </div>
          </div>

          {/* VAPID Key */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className={info.vapidPublicKey ? '✅' : '❌'}>
                {info.vapidPublicKey ? '✅' : '❌'}
              </span>
              VAPID Public Key
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Configurada:</strong>{' '}
                {info.vapidPublicKey ? 'Sí' : 'No'}
              </p>
              {info.vapidPublicKey && (
                <p className="break-all font-mono text-xs bg-gray-100 p-2 rounded">
                  {info.vapidPublicKey}
                </p>
              )}
            </div>
          </div>

          {/* Console Logs Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-3 text-blue-900">
              📋 Instrucciones
            </h2>
            <div className="space-y-2 text-sm text-blue-800">
              <p>1. Abre la consola del navegador (F12)</p>
              <p>2. Ve a la pestaña "Console"</p>
              <p>3. Busca mensajes que empiecen con "[Push]" o "[SW]"</p>
              <p>4. Copia cualquier error que veas y envíamelo</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🛠️ Acciones Rápidas</h2>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/administrator/notificaciones'}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition"
              >
                Ir a Configuración de Notificaciones
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Recargar Página
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
