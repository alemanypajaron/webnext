'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthDiagnostic {
  hasSupabaseUrl: boolean;
  hasSupabaseKey: boolean;
  browserCookiesEnabled: boolean;
  localStorageEnabled: boolean;
  sessionStorageEnabled: boolean;
  currentSession: boolean;
  sessionDetails?: any;
  supabaseConnected: boolean;
  error?: string;
}

export default function AuthDiagnosticPage() {
  const [diagnostic, setDiagnostic] = useState<AuthDiagnostic>({
    hasSupabaseUrl: false,
    hasSupabaseKey: false,
    browserCookiesEnabled: false,
    localStorageEnabled: false,
    sessionStorageEnabled: false,
    currentSession: false,
    supabaseConnected: false,
  });

  const [testLoginResult, setTestLoginResult] = useState<string | null>(null);

  useEffect(() => {
    const checkAll = async () => {
      const result: AuthDiagnostic = {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        browserCookiesEnabled: navigator.cookieEnabled,
        localStorageEnabled: false,
        sessionStorageEnabled: false,
        currentSession: false,
        supabaseConnected: false,
      };

      // Check localStorage
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        result.localStorageEnabled = true;
      } catch (e) {
        result.localStorageEnabled = false;
      }

      // Check sessionStorage
      try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        result.sessionStorageEnabled = true;
      } catch (e) {
        result.sessionStorageEnabled = false;
      }

      // Check Supabase connection and session
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          result.error = error.message;
          result.supabaseConnected = false;
        } else {
          result.supabaseConnected = true;
          result.currentSession = !!data.session;
          result.sessionDetails = data.session ? {
            user: data.session.user.email,
            expiresAt: new Date(data.session.expires_at! * 1000).toLocaleString(),
            provider: data.session.user.app_metadata.provider,
          } : null;
        }
      } catch (e: any) {
        result.error = e.message;
        result.supabaseConnected = false;
      }

      setDiagnostic(result);
    };

    checkAll();
  }, []);

  const testLogin = async () => {
    setTestLoginResult('Probando...');
    
    try {
      // Intentar login con credenciales de prueba (NO REALES)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@test.com',
        password: 'testpassword',
      });

      if (error) {
        setTestLoginResult(`❌ Error esperado (credenciales incorrectas): ${error.message}`);
      } else {
        setTestLoginResult('✅ Login funcionó (no debería pasar con credenciales de prueba)');
      }
    } catch (e: any) {
      setTestLoginResult(`❌ Error de conexión: ${e.message}`);
    }
  };

  const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">
          🔍 Diagnóstico de Autenticación
        </h1>

        <div className="space-y-4">
          {/* Environment Variables */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {diagnostic.hasSupabaseUrl && diagnostic.hasSupabaseKey ? '✅' : '❌'} Variables de Entorno
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>{' '}
                {diagnostic.hasSupabaseUrl ? '✅ Configurada' : '❌ Falta'}
              </p>
              <p>
                <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{' '}
                {diagnostic.hasSupabaseKey ? '✅ Configurada' : '❌ Falta'}
              </p>
              {diagnostic.hasSupabaseUrl && (
                <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL}
                </p>
              )}
            </div>
          </div>

          {/* Browser Storage */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {diagnostic.browserCookiesEnabled && diagnostic.localStorageEnabled ? '✅' : '⚠️'} Almacenamiento del Navegador
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Cookies:</strong>{' '}
                {diagnostic.browserCookiesEnabled ? '✅ Habilitadas' : '❌ Deshabilitadas'}
              </p>
              <p>
                <strong>localStorage:</strong>{' '}
                {diagnostic.localStorageEnabled ? '✅ Disponible' : '❌ No disponible'}
              </p>
              <p>
                <strong>sessionStorage:</strong>{' '}
                {diagnostic.sessionStorageEnabled ? '✅ Disponible' : '❌ No disponible'}
              </p>
            </div>
          </div>

          {/* Supabase Connection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {diagnostic.supabaseConnected ? '✅' : '❌'} Conexión con Supabase
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Estado:</strong>{' '}
                {diagnostic.supabaseConnected ? '✅ Conectado' : '❌ No conectado'}
              </p>
              {diagnostic.error && (
                <p className="text-red-600 bg-red-50 p-2 rounded">
                  <strong>Error:</strong> {diagnostic.error}
                </p>
              )}
            </div>
          </div>

          {/* Current Session */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {diagnostic.currentSession ? '✅' : 'ℹ️'} Sesión Actual
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Estado:</strong>{' '}
                {diagnostic.currentSession ? '✅ Sesión activa' : 'ℹ️ Sin sesión'}
              </p>
              {diagnostic.sessionDetails && (
                <div className="bg-green-50 p-3 rounded space-y-1">
                  <p><strong>Usuario:</strong> {diagnostic.sessionDetails.user}</p>
                  <p><strong>Expira:</strong> {diagnostic.sessionDetails.expiresAt}</p>
                  <p><strong>Proveedor:</strong> {diagnostic.sessionDetails.provider}</p>
                </div>
              )}
            </div>
          </div>

          {/* Test Connection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🧪 Probar Conexión</h2>
            <p className="text-sm text-gray-600 mb-4">
              Prueba si Supabase responde correctamente a intentos de login (usará credenciales inválidas)
            </p>
            <button
              onClick={testLogin}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition mb-3"
            >
              Probar Conexión de Login
            </button>
            {testLoginResult && (
              <div className="bg-gray-50 p-3 rounded text-sm">
                {testLoginResult}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🛠️ Acciones</h2>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/administrator/login'}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition"
              >
                Ir a Login
              </button>
              <button
                onClick={clearAllStorage}
                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Limpiar Todo el Almacenamiento y Recargar
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Recargar Página
              </button>
            </div>
          </div>

          {/* Console Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-3 text-blue-900">
              📋 Instrucciones para Debugging
            </h2>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Si el login no funciona:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Abre la consola del navegador (F12)</li>
                <li>Ve a la pestaña "Network"</li>
                <li>Intenta hacer login</li>
                <li>Busca requests a "supabase.co"</li>
                <li>Revisa si hay errores 401, 403, o CORS</li>
                <li>Copia cualquier error y envíalo</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
