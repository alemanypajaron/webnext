import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt="Alemán y Pajarón"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Gestores de obras en Murcia especializados en dirección de obra,
              gestión de proyectos y reformas integrales.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/alemanypajaron/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-light hover:bg-accent transition-colors"
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/alemanypajaron/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-light hover:bg-accent transition-colors"
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Servicios Column */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servicios/asesoramiento-tecnico"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Asesoramiento Técnico
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/direccion-obra"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Dirección de Obra
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/diseno-espacios"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Diseño de Espacios
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/gestion-proyectos"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Gestión de Proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/licencias-permisos"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Licencias y Permisos
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reformas-integrales"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Reformas Integrales
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa Column */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/proyectos"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/presupuesto"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Presupuesto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto Column */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 mt-0.5 text-accent"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href="tel:+34650075842"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  650 075 842
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 mt-0.5 text-accent"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a
                  href="mailto:ivan@alemanypajaron.es"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  ivan@alemanypajaron.es
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 mt-0.5 text-accent"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-gray-300 text-sm">Lun - Vie: 8:00 - 16:00</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 mt-0.5 text-accent"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-gray-300 text-sm">Murcia, España</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-primary-light space-y-4">
          {/* Copyright y Links Legales */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © {currentYear} Alemán y Pajarón. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                href="/legal/aviso-legal"
                className="text-gray-400 hover:text-accent transition-colors text-xs md:text-sm"
              >
                Aviso Legal
              </Link>
              <Link
                href="/legal/privacidad"
                className="text-gray-400 hover:text-accent transition-colors text-xs md:text-sm"
              >
                Privacidad
              </Link>
              <Link
                href="/legal/cookies"
                className="text-gray-400 hover:text-accent transition-colors text-xs md:text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
          
          {/* Línea con corazón y créditos - Optimizado para móvil */}
          <div className="text-center text-gray-400 text-xs md:text-sm leading-relaxed">
            <span className="block sm:inline">
              Hecho con{' '}
              <span className="text-red-500 inline-block animate-pulse">❤️</span>
              {' '}en Murcia
            </span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline mt-1 sm:mt-0">
              Web desarrollada por{' '}
              <a
                href="https://www.eskaladigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dark transition-colors font-medium whitespace-nowrap"
              >
                ESKALA Agencia de Marketing Digital
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

