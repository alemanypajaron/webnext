'use client';

import { useState, useEffect } from 'react';

interface CookieSettingsProps {
  onOpenBanner: () => void;
}

export default function CookieSettings({ onOpenBanner }: CookieSettingsProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Mostrar botón solo si ya hay un consentimiento guardado
    const consent = localStorage.getItem('cookie-consent');
    setShowButton(!!consent);
  }, []);

  if (!showButton) return null;

  return (
    <button
      onClick={onOpenBanner}
      className="fixed left-0 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-6 rounded-r-lg shadow-lg hover:bg-primary-dark transition-all z-40 group"
      style={{ writingMode: 'vertical-rl' }}
      title="Configuración de cookies"
      aria-label="Configuración de cookies"
    >
      <span className="flex items-center gap-2">
        <span className="text-sm font-semibold">🍪 Cookies</span>
      </span>
    </button>
  );
}

