import type { NextConfig } from "next";

// ============================================
// BUNDLE ANALYZER
// Ejecutar: ANALYZE=true npm run build
// ============================================
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator ("N" bubble) that can overlap UI in development.
  devIndicators: false,
  
  // ============================================
  // OPTIMIZACIÓN DE IMÁGENES
  // ============================================
  images: {
    // Formatos modernos con mejor compresión
    formats: ['image/avif', 'image/webp'],
    
    // Tamaños optimizados para diferentes dispositivos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache de 30 días para imágenes optimizadas
    minimumCacheTTL: 60 * 60 * 24 * 30,
    
    // Dominios permitidos para imágenes remotas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'otodqkylgicywiffimhd.supabase.co',
      },
    ],
    
    // Seguridad: no permitir SVGs externos (XSS)
    dangerouslyAllowSVG: false,
  },

  // ============================================
  // HEADERS DE SEGURIDAD HTTP
  // ============================================
  async headers() {
    return [
      // Cache agresivo para assets estáticos (favicons, fuentes, imágenes)
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Headers de seguridad comunes
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
      // CSP estricta para páginas públicas (sin unsafe-eval)
      {
        source: '/((?!administrator).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "img-src 'self' data: blob: https: *.unsplash.com *.supabase.co",
              "font-src 'self' fonts.gstatic.com data:",
              "connect-src 'self' *.supabase.co *.googleanalytics.com *.google-analytics.com vercel.live",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; ')
          },
        ],
      },
      // CSP para panel de administración (TinyMCE requiere unsafe-eval)
      {
        source: '/administrator/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.tiny.cloud cdn.tiny.cloud",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com *.tiny.cloud",
              "img-src 'self' data: blob: https: *.unsplash.com *.supabase.co",
              "font-src 'self' fonts.gstatic.com data:",
              "connect-src 'self' *.supabase.co *.tiny.cloud vercel.live",
              "frame-src 'self' *.tiny.cloud",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; ')
          },
        ],
      },
    ]
  },
  
  // ============================================
  // OPTIMIZACIONES ADICIONALES
  // ============================================
  experimental: {
    // Optimizar imports de paquetes grandes
    optimizePackageImports: ['@headlessui/react', 'lucide-react'],
  },
};

export default withBundleAnalyzer(nextConfig);
