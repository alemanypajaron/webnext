import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import PageViewTracker from '@/components/analytics/PageViewTracker';
import ConditionalAnalytics from '@/components/cookies/ConditionalAnalytics';
import Script from 'next/script';

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '0RDY_vpUpTMgVPTIlKlOknWHNu_iRjPnSprwINucMgg';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Alemán y Pajarón | Gestión de Obras y Proyectos en Murcia',
    template: '%s | Alemán y Pajarón',
  },
  description:
    'Técnicos de edificación en Murcia especializados en dirección de obra, gestión de proyectos, licencias y reformas integrales. Más de 15 años de experiencia.',
  keywords: [
    'técnico edificación murcia',
    'gestor obras murcia',
    'dirección de obra murcia',
    'reformas integrales murcia',
    'licencia de obra murcia',
    'gestión proyectos construcción murcia',
    'coordinación obras murcia',
  ],
  authors: [{ name: 'Alemán y Pajarón' }],
  creator: 'Alemán y Pajarón',
  publisher: 'Alemán y Pajarón',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.alemanypajaron.es'),
  // Next.js 14+ detecta automáticamente icon.png y apple-icon.png desde src/app/
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32' }, // Fallback para navegadores antiguos
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Alemán y Pajarón | Gestión de Obras y Proyectos en Murcia',
    description:
      'Gestores de obras en Murcia especializados en dirección de obra, gestión de proyectos, licencias y reformas integrales.',
    url: 'https://www.alemanypajaron.es',
    siteName: 'Alemán y Pajarón',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Alemán y Pajarón - Gestión de Obras Murcia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alemán y Pajarón | Gestión de Obras y Proyectos en Murcia',
    description:
      'Técnicos de edificación en Murcia especializados en dirección de obra, gestión de proyectos y reformas integrales.',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  verification: googleVerification ? { google: googleVerification } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <Script
          id="gtag-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              var analyticsStorage = 'denied';
              try {
                var stored = localStorage.getItem('cookie-consent');
                if (stored) {
                  var prefs = JSON.parse(stored);
                  if (prefs.analytics) analyticsStorage = 'granted';
                }
              } catch (e) {}
              gtag('consent', 'default', {
                analytics_storage: analyticsStorage,
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />
        <ConditionalAnalytics />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <ConditionalLayout>{children}</ConditionalLayout>
        <SpeedInsights />
      </body>
    </html>
  );
}
