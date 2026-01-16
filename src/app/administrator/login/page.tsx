'use client';

import { useState, useEffect } from 'react';
import { loginAction } from '@/app/actions/auth';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPWABanner, setShowPWABanner] = useState(false);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Detectar si está en modo PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    setIsPWA(isStandalone || isIOSStandalone);

    // Mostrar banner si NO es PWA y no se ha cerrado antes
    if (!isStandalone && !isIOSStandalone) {
      const dismissed = localStorage.getItem('pwa-banner-dismissed');
      if (!dismissed) {
        setShowPWABanner(true);
      }
    }
  }, []);

  const dismissPWABanner = () => {
    setShowPWABanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('[Login] 🔐 Iniciando proceso de login...');
    console.log('[Login] 📧 Email:', email);
    
    setLoading(true);

    try {
      console.log('[Login] 📤 Llamando a loginAction...');
      const result = await loginAction(email, password);
      
      console.log('[Login] 📥 Resultado recibido:', result);
      
      // Si llegamos aquí, hubo un error (redirect() no retorna)
      if (result && !result.success) {
        console.error('[Login] ❌ Error de autenticación:', result.error);
        toast.error(`Error: ${result.error}`);
        setLoading(false);
      } else {
        console.log('[Login] ⚠️ Resultado inesperado (no success ni redirect)');
        toast.error('Respuesta inesperada del servidor');
        setLoading(false);
      }
      // Si es exitoso, loginAction redirige automáticamente y nunca llega aquí
    } catch (error: any) {
      console.log('[Login] 🔄 Excepción capturada:', error);
      
      // redirect() lanza un error NEXT_REDIRECT, lo cual es normal
      // Solo mostramos error si NO es un NEXT_REDIRECT
      if (error?.message && !error.message.includes('NEXT_REDIRECT')) {
        console.error('[Login] ❌ Error no esperado:', error);
        toast.error('Error al iniciar sesión: ' + error.message);
        setLoading(false);
      } else {
        console.log('[Login] ✅ Redirección detectada (comportamiento normal)');
        // Si es NEXT_REDIRECT, dejamos que la redirección ocurra sin mostrar error
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light p-4">
        <div className="w-full max-w-md space-y-4">
          {/* Banner PWA */}
          {showPWABanner && !isPWA && (
            <div className="bg-gradient-to-r from-accent to-yellow-400 rounded-xl p-4 shadow-lg animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary mb-1">
                    ¡Instala la App!
                  </h3>
                  <p className="text-sm text-primary-dark mb-3">
                    Accede más rápido desde tu pantalla de inicio
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href="/administrator/instalar-pwa"
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      Ver cómo instalar
                    </Link>
                    <button
                      onClick={dismissPWABanner}
                      className="px-4 py-2 bg-white/20 text-primary rounded-lg text-sm hover:bg-white/30 transition-colors"
                    >
                      Ahora no
                    </button>
                  </div>
                </div>
                <button
                  onClick={dismissPWABanner}
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Indicador PWA */}
          {isPWA && (
            <div className="bg-green-500 text-white rounded-lg p-3 shadow-lg text-center">
              <span className="text-sm font-medium">
                ✓ Ejecutándose como App instalada
              </span>
            </div>
          )}

          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-3xl font-heading font-bold text-primary mb-2">
                Panel de Administración
              </h1>
              <p className="text-gray-600">Alemán y Pajarón</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="admin@alemanypajaron.es"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-primary font-bold py-3 px-6 rounded-lg hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="inline-block mr-1"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Acceso restringido solo para administradores
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
