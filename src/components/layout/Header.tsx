'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const servicios = [
    { href: '/servicios/asesoramiento-tecnico', label: 'Asesoramiento Técnico' },
    { href: '/servicios/direccion-obra', label: 'Dirección de Obra' },
    { href: '/servicios/diseno-espacios', label: 'Diseño de Espacios' },
    { href: '/servicios/gestion-proyectos', label: 'Gestión de Proyectos' },
    { href: '/servicios/licencias-permisos', label: 'Licencias y Permisos' },
    { href: '/servicios/reformas-integrales', label: 'Reformas Integrales' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[300] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/img/logo-dark.svg"
              alt="Alemán y Pajarón"
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Navegación principal">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/') ? 'text-accent' : 'text-gray-700'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/nosotros') ? 'text-accent' : 'text-gray-700'
              }`}
            >
              Nosotros
            </Link>
            
            {/* Servicios Dropdown */}
            <div className="relative group">
              <Link
                href="/servicios"
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive('/servicios') ? 'text-accent' : 'text-gray-700'
                }`}
              >
                Servicios
              </Link>
              <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                <div className="py-2">
                  {servicios.map((servicio) => (
                    <Link
                      key={servicio.href}
                      href={servicio.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-accent transition-colors"
                    >
                      {servicio.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/proyectos"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/proyectos') ? 'text-accent' : 'text-gray-700'
              }`}
            >
              Proyectos
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/blog') ? 'text-accent' : 'text-gray-700'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contacto"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/contacto') ? 'text-accent' : 'text-gray-700'
              }`}
            >
              Contacto
            </Link>
            <Link
              href="/presupuesto"
              className="px-6 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-sm"
            >
              Solicitar Presupuesto
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-primary transition-transform ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-opacity ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-transform ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="px-6 py-4 space-y-4">
            <Link
              href="/"
              className="block text-base font-medium text-gray-700 hover:text-accent"
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className="block text-base font-medium text-gray-700 hover:text-accent"
            >
              Nosotros
            </Link>
            <div>
              <Link
                href="/servicios"
                className="block text-base font-medium text-gray-700 hover:text-accent mb-2"
              >
                Servicios
              </Link>
              <div className="pl-4 space-y-2">
                {servicios.map((servicio) => (
                  <Link
                    key={servicio.href}
                    href={servicio.href}
                    className="block text-sm text-gray-600 hover:text-accent"
                  >
                    {servicio.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/proyectos"
              className="block text-base font-medium text-gray-700 hover:text-accent"
            >
              Proyectos
            </Link>
            <Link
              href="/blog"
              className="block text-base font-medium text-gray-700 hover:text-accent"
            >
              Blog
            </Link>
            <Link
              href="/contacto"
              className="block text-base font-medium text-gray-700 hover:text-accent"
            >
              Contacto
            </Link>
            <Link
              href="/presupuesto"
              className="block px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-center"
            >
              Solicitar Presupuesto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

