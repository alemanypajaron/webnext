import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ScrollToTop from '@/components/ui/ScrollToTop';

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

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
    default: 'Alemán y Pajarón | Arquitectura Técnica en Murcia',
    template: '%s | Alemán y Pajarón',
  },
  description:
    'Estudio de arquitectura técnica en Murcia especializado en dirección de obra, gestión de proyectos, licencias y reformas integrales. Más de 15 años de experiencia.',
  keywords: [
    'arquitectura técnica murcia',
    'arquitecto técnico murcia',
    'aparejador murcia',
    'dirección de obra murcia',
    'reformas integrales murcia',
    'licencia de obra murcia',
    'gestión proyectos construcción murcia',
  ],
  authors: [{ name: 'Alemán y Pajarón' }],
  creator: 'Alemán y Pajarón',
  publisher: 'Alemán y Pajarón',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://alemanypajaron.es'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Alemán y Pajarón | Arquitectura Técnica en Murcia',
    description:
      'Estudio de arquitectura técnica en Murcia especializado en dirección de obra, gestión de proyectos, licencias y reformas integrales.',
    url: 'https://alemanypajaron.es',
    siteName: 'Alemán y Pajarón',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Alemán y Pajarón - Arquitectura Técnica Murcia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alemán y Pajarón | Arquitectura Técnica en Murcia',
    description:
      'Estudio de arquitectura técnica en Murcia especializado en dirección de obra, gestión de proyectos y reformas integrales.',
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
  verification: googleVerification ? { google: googleVerification } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
