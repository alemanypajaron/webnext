/**
 * ============================================
 * BLUR PLACEHOLDERS - Generación Automática
 * ============================================
 * 
 * Genera blur data URLs para placeholders de imágenes
 * Mejora la UX durante la carga de imágenes
 * 
 * Uso con next/image:
 * <Image
 *   src="..."
 *   placeholder="blur"
 *   blurDataURL={getBlurDataURL()}
 * />
 */

/**
 * Genera un blur data URL genérico de alta calidad
 * Basado en el color principal de Alemán y Pajarón
 * 
 * @param color - Color hex opcional (por defecto: azul oscuro #0A2230)
 * @returns Data URL para usar como placeholder blur
 */
export function getBlurDataURL(color: string = '#0A2230'): string {
  // Convertir color hex a RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // SVG de 10x10 con el color especificado
  const svg = `
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10" fill="rgb(${r},${g},${b})" />
    </svg>
  `;

  // Convertir a data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Blur placeholder para imágenes de hero/banner
 * Usa un gradiente similar al overlay usado en el diseño
 */
export function getHeroBlurDataURL(): string {
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(10,34,48);stop-opacity:0.98" />
          <stop offset="100%" style="stop-color:rgb(10,34,48);stop-opacity:0.95" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#grad)" />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Blur placeholder para imágenes de proyectos
 * Tono más neutro, gris suave
 */
export function getProjectBlurDataURL(): string {
  return getBlurDataURL('#374151'); // gray-700
}

/**
 * Blur placeholder para imágenes de blog
 * Tono cálido acorde al contenido
 */
export function getBlogBlurDataURL(): string {
  return getBlurDataURL('#1F2937'); // gray-800
}

/**
 * Blur placeholder para servicios
 * Usa el color accent (amarillo) con baja opacidad
 */
export function getServiceBlurDataURL(): string {
  return getBlurDataURL('#F9B513'); // accent color
}

/**
 * Genera un shimmer effect (opcional para skeleton loaders)
 */
export function getShimmerDataURL(width: number = 100, height: number = 100): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(229,231,235);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgb(243,244,246);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(229,231,235);stop-opacity:1" />
          <animate attributeName="x1" values="-100%;200%" dur="2s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;300%" dur="2s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shimmer)" />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}


