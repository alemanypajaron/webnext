'use client';

import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function PushNotificationSettings() {
  const {
    isSupported,
    isSubscribed,
    isLoading,
    error,
    permission,
    subscribe,
    unsubscribe
  } = usePushNotifications();

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">
          ⚠️ Notificaciones no disponibles
        </h3>
        <p className="text-sm text-yellow-700">
          Tu navegador no soporta notificaciones push. Prueba con Chrome, Firefox o Edge en Android/Windows.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            🔔 Notificaciones Push
          </h3>
          <p className="text-sm text-gray-600">
            Recibe alertas cuando lleguen nuevos contactos o presupuestos, incluso con la app cerrada.
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isSubscribed 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {isSubscribed ? '✓ Activas' : 'Inactivas'}
        </div>
      </div>

      {/* Estado actual */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Estado:</span>
          <span className={`font-medium ${
            permission === 'granted' ? 'text-green-600' :
            permission === 'denied' ? 'text-red-600' :
            'text-yellow-600'
          }`}>
            {permission === 'granted' ? '✓ Permitido' :
             permission === 'denied' ? '✗ Bloqueado' :
             '⚠ Sin configurar'}
          </span>
        </div>
        {isSubscribed && (
          <div className="mt-2 text-xs text-gray-500">
            Este dispositivo recibirá notificaciones en tiempo real
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            ❌ {error}
          </p>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-3">
        {!isSubscribed ? (
          <button
            onClick={subscribe}
            disabled={isLoading || permission === 'denied'}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              isLoading || permission === 'denied'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Activando...
              </span>
            ) : (
              '🔔 Activar Notificaciones'
            )}
          </button>
        ) : (
          <button
            onClick={unsubscribe}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              isLoading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Desactivando...
              </span>
            ) : (
              '🔕 Desactivar Notificaciones'
            )}
          </button>
        )}
      </div>

      {/* Ayuda si está bloqueado */}
      {permission === 'denied' && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800 mb-2 font-medium">
            Las notificaciones están bloqueadas
          </p>
          <p className="text-xs text-orange-700">
            Para activarlas, ve a la configuración de tu navegador y permite las notificaciones para este sitio.
            Luego recarga la página.
          </p>
        </div>
      )}

      {/* Información adicional */}
      {isSubscribed && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            ℹ️ Las notificaciones funcionarán incluso cuando la app esté cerrada o el dispositivo esté bloqueado.
            Puedes activar notificaciones en múltiples dispositivos.
          </p>
        </div>
      )}
    </div>
  );
}
