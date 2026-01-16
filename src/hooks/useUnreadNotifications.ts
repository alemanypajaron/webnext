'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export function useUnreadNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil DENTRO del hook
  useEffect(() => {
    const checkIfMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 1024);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Función para contar elementos no leídos (useCallback para evitar recrearla)
  const fetchUnreadCount = useCallback(async () => {
    // Si es móvil, NO hacer nada
    if (isMobile) {
      setLoading(false);
      return;
    }

    try {
      // Verificar sesión primero
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      // Contar contactos no leídos
      const { count: contactosCount, error: contactosError } = await supabase
        .from('contactos')
        .select('*', { count: 'exact', head: true })
        .eq('leido', false);

      // Contar presupuestos no leídos
      const { count: presupuestosCount, error: presupuestosError } = await supabase
        .from('presupuestos')
        .select('*', { count: 'exact', head: true })
        .eq('leido', false);

      if (contactosError || presupuestosError) {
        console.error('[useUnreadNotifications] Error RLS:', contactosError || presupuestosError);
        setLoading(false);
        return;
      }

      const total = (contactosCount || 0) + (presupuestosCount || 0);
      setUnreadCount(total);
      setLoading(false);
    } catch (error) {
      console.error('[useUnreadNotifications] Error:', error);
      setLoading(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // Si es móvil, salir inmediatamente
    if (isMobile) {
      setLoading(false);
      return;
    }

    // Verificar primero si hay sesión antes de hacer nada
    const initializeNotifications = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.log('[useUnreadNotifications] No hay sesión activa, esperando...');
          setLoading(false);
          return;
        }

        // Si hay sesión, obtener el conteo inicial
        await fetchUnreadCount();
      } catch (error) {
        console.error('[useUnreadNotifications] Error al inicializar:', error);
        setLoading(false);
      }
    };

    initializeNotifications();

    // Suscribirse a cambios (solo si hay sesión)
    let contactosSubscription: any = null;
    let presupuestosSubscription: any = null;

    const setupSubscriptions = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return;
        }

        // Suscribirse a cambios en contactos
        contactosSubscription = supabase
          .channel('contactos-changes-v2')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'contactos' },
            () => {
              fetchUnreadCount();
            }
          )
          .subscribe();

        // Suscribirse a cambios en presupuestos
        presupuestosSubscription = supabase
          .channel('presupuestos-changes-v2')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'presupuestos' },
            () => {
              fetchUnreadCount();
            }
          )
          .subscribe();
      } catch (error) {
        console.error('[useUnreadNotifications] Error en subscriptions:', error);
      }
    };

    setupSubscriptions();

    // Cleanup
    return () => {
      if (contactosSubscription) {
        contactosSubscription.unsubscribe().catch(console.error);
      }
      if (presupuestosSubscription) {
        presupuestosSubscription.unsubscribe().catch(console.error);
      }
    };
  }, [fetchUnreadCount, isMobile]);

  return { unreadCount, loading };
}
