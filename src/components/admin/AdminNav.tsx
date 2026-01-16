'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';
import toast from 'react-hot-toast';
import { useUnreadNotifications } from '@/hooks/useUnreadNotifications';

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';
import toast from 'react-hot-toast';
// TEMPORALMENTE DESACTIVADO - Causaba error en móvil
// import { useUnreadNotifications } from '@/hooks/useUnreadNotifications';

function AdminNavContent() {
  const pathname = usePathname();
  // TEMPORALMENTE DESACTIVADO - Causaba error en móvil
  // const { unreadCount } = useUnreadNotifications();
  const unreadCount = 0; // Hardcoded temporalmente

  const handleLogout = async () => {
    try {
      await logoutAction();
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
      console.error(error);
    }
  };

  const tabs = [
    {
      name: 'Contactos',
      href: '/administrator',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      name: 'Presupuestos',
      href: '/administrator/presupuestos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      name: 'Proyectos',
      href: '/administrator/proyectos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      name: 'Blog',
      href: '/administrator/blog',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
    },
    {
      name: 'Multimedia',
      href: '/administrator/multimedia',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/administrator" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-accent to-yellow-400 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg lg:text-xl font-heading font-bold text-primary">
                    Panel Admin
                  </h1>
                  <p className="text-xs text-gray-500">Alemán y Pajarón</p>
                </div>
              </Link>
            </div>

            {/* Tabs - Desktop */}
            <div className="hidden lg:ml-10 lg:flex lg:space-x-2 xl:space-x-3">
              {tabs.map((tab) => {
                const isActive =
                  pathname === tab.href ||
                  (tab.href !== '/administrator' && pathname.startsWith(tab.href));

                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={`
                      flex items-center space-x-2 px-4 xl:px-5 py-2.5 rounded-xl font-medium transition-all
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-accent to-yellow-400 text-primary shadow-md scale-105'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-primary hover:scale-105'
                      }
                    `}
                  >
                    {tab.icon}
                    <span className="text-sm xl:text-base">{tab.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Botón de Notificaciones con Badge */}
            <Link
              href="/administrator/notificaciones-panel"
              className="relative flex items-center space-x-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-accent hover:bg-yellow-50 rounded-xl transition-all hover:scale-105"
              title="Ver notificaciones pendientes"
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
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="hidden lg:inline text-sm">Notificaciones</span>
              {/* Badge de notificaciones no leídas */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-105"
              title="Cerrar sesión"
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="hidden lg:inline text-sm">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet tabs */}
      <div className="lg:hidden border-t border-gray-200 bg-white">
        <div className="flex justify-around overflow-x-auto">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href ||
              (tab.href !== '/administrator' && pathname.startsWith(tab.href));

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  relative flex flex-col items-center space-y-1 px-3 py-3 flex-1 min-w-[60px] transition-all
                  ${
                    isActive
                      ? 'text-accent border-b-2 border-accent bg-yellow-50'
                      : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                  }
                `}
              >
                {tab.icon}
                <span className="text-xs font-medium whitespace-nowrap">{tab.name}</span>
                {/* Badge de notificaciones en tab de Contactos */}
                {tab.name === 'Contactos' && unreadCount > 0 && (
                  <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default function AdminNav() {
  const pathname = usePathname();

  // No renderizar nada en páginas que no necesitan navegación
  if (
    pathname === '/administrator/login' ||
    pathname === '/administrator/diagnostico-auth' ||
    pathname === '/administrator/instalar-pwa'
  ) {
    return null;
  }

  // Renderizar el contenido solo si es una página admin normal
  return <AdminNavContent />;
}

