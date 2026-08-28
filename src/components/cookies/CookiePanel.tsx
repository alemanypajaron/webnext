'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookieConsent {
  technical: boolean;
  analytics: boolean;
  functional?: boolean;
  marketing?: boolean;
  timestamp: number;
}

type Prefs = {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
};

export default function CookiePanel() {
  const [view, setView] = useState<'hidden' | 'banner' | 'settings'>('hidden');
  const [prefs, setPrefs] = useState<Prefs>({ analytics: true, functional: true, marketing: false });

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      try {
        const parsed: CookieConsent = JSON.parse(stored);
        const next: Prefs = {
          analytics: Boolean(parsed.analytics),
          functional: Boolean(parsed.functional),
          marketing: Boolean(parsed.marketing),
        };
        setPrefs(next);
        applyGtag(next);
      } catch {
        setView('banner');
      }
    } else {
      setView('banner');
    }

    const openFromFooter = () => {
      const raw = localStorage.getItem('cookie-consent');
      if (raw) {
        try {
          const parsed: CookieConsent = JSON.parse(raw);
          setPrefs({
            analytics: Boolean(parsed.analytics),
            functional: Boolean(parsed.functional),
            marketing: Boolean(parsed.marketing),
          });
        } catch {
          /* JSON roto */
        }
      }
      setView('settings');
    };
    window.addEventListener('openCookieSettings', openFromFooter);
    return () => window.removeEventListener('openCookieSettings', openFromFooter);
  }, []);

  const applyGtag = (next: Prefs) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const ads = next.marketing ? 'granted' : 'denied';
      (window as any).gtag('consent', 'update', {
        analytics_storage: next.analytics ? 'granted' : 'denied',
        ad_storage: ads,
        ad_user_data: ads,
        ad_personalization: ads,
      });
    }
  };

  const saveConsent = (next: Prefs) => {
    const newConsent: CookieConsent = {
      technical: true,
      analytics: next.analytics,
      functional: next.functional,
      marketing: next.marketing,
      timestamp: Date.now(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    applyGtag(next);
    setPrefs(next);
    setView('hidden');
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: newConsent }));
  };

  if (view === 'hidden') return null;

  if (view === 'settings') {
    return (
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <CookieGlyph className="h-8 w-8 text-accent" />
              <h2 id="cookie-settings-title" className="text-xl font-bold text-primary">Configuración de cookies</h2>
            </div>
            <button
              type="button"
              onClick={() => setView(localStorage.getItem('cookie-consent') ? 'hidden' : 'banner')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Cerrar"
            >
              <span className="block w-5 h-5 text-lg leading-none">×</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-gray-600 mb-6">
              Elige qué tipos de cookies deseas aceptar. Las cookies necesarias no se pueden desactivar ya que son imprescindibles para el funcionamiento del sitio.
            </p>
            <div className="space-y-4">
              <AlemanCategory title="Cookies necesarias" description="Estas cookies son esenciales para el funcionamiento del sitio web. Sin ellas, el sitio no funcionaría correctamente." enabled required />
              <AlemanCategory title="Cookies analíticas" description="Nos permiten contar las visitas y analizar cómo los usuarios navegan por el sitio para mejorarlo (Google Analytics)." enabled={prefs.analytics} onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))} />
              <AlemanCategory title="Cookies funcionales" description="Permiten recordar tus preferencias para una experiencia más personalizada." enabled={prefs.functional} onChange={(v) => setPrefs((p) => ({ ...p, functional: v }))} />
              <AlemanCategory title="Cookies de marketing" description="Se utilizan para mostrarte anuncios relevantes y medir la efectividad de las campañas publicitarias." enabled={prefs.marketing} onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))} />
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Para más información sobre cómo utilizamos las cookies, consulta nuestra{' '}
              <Link href="/legal/cookies" className="text-accent hover:underline" onClick={() => setView('hidden')}>
                Política de Cookies
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button type="button" onClick={() => saveConsent({ analytics: false, functional: false, marketing: false })} className="flex-1 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-white">
              Rechazar todas
            </button>
            <button type="button" onClick={() => saveConsent(prefs)} className="flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Guardar preferencias
            </button>
            <button type="button" onClick={() => saveConsent({ analytics: true, functional: true, marketing: true })} className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90">
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[350] p-4 bg-white border-t border-gray-200 shadow-lg md:p-6" role="region" aria-label="Banner de consentimiento de cookies">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1 flex items-start gap-3">
            <CookieGlyph className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">Utilizamos cookies</h3>
              <p className="text-gray-600 text-sm">
                Usamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y mostrarte contenido personalizado. Puedes aceptar todas o configurar tus preferencias.{' '}
                <Link href="/legal/cookies" className="text-accent hover:underline">Política de cookies</Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
            <button type="button" onClick={() => setView('settings')} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 text-sm">
              Configurar
            </button>
            <button type="button" onClick={() => saveConsent({ analytics: true, functional: true, marketing: true })} className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 text-sm">
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CookieGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2a9.5 9.5 0 0 0-1.2 18.93A10 10 0 1 0 21.8 11.4 7 7 0 0 1 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="8.2" cy="10" r="1.1" fill="currentColor" />
      <circle cx="12.5" cy="8" r="1" fill="currentColor" />
      <circle cx="10.5" cy="14.2" r="1.15" fill="currentColor" />
    </svg>
  );
}

function AlemanCategory({
  title,
  description,
  enabled,
  required,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  required?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className={`p-4 rounded-xl border-2 ${enabled ? 'border-accent bg-accent/5' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-1">
            <h3 className="font-semibold text-primary">{title}</h3>
            {required ? (
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">Siempre activas</span>
            ) : (
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={enabled} onChange={(e) => onChange?.(e.target.checked)} aria-label={title} />
                <span className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-accent transition-colors" />
                <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full border border-gray-300 shadow transition-transform peer-checked:translate-x-5" />
              </label>
            )}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
