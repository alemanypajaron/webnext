import type { NextConfig } from "next";

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
      {
        // Aplicar a todas las rutas
        source: '/:path*',
        headers: [
          // DNS Prefetch Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Strict Transport Security (HSTS)
          // Fuerza HTTPS por 2 años, incluye subdominios
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // X-Frame-Options
          // Previene clickjacking (solo permite frames del mismo origen)
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // X-Content-Type-Options
          // Previene MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // X-XSS-Protection
          // Activa protección XSS del navegador
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer Policy
          // Control de información del referrer
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Permissions Policy
          // Deshabilita APIs innecesarias
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
        ],
      },
    ]
  },
};

export default nextConfig;
