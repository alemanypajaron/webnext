'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useUnreadNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar primero si hay sesión
    const checkSessionAndFetch = async () => {
      try {
        // Verificar si hay usuario autenticado
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.log('[useUnreadNotifications] No hay sesión activa');
          setLoading(false);
          return;
        }

        // Si hay sesión, obtener el conteo
        await fetchUnreadCount();
      } catch (error) {
        console.error('[useUnreadNotifications] Error al verificar sesión:', error);
        setLoading(false);
      }
    };

    // Función para contar elementos no leídos
    const fetchUnreadCount = async () => {
      try {
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
          console.error('[useUnreadNotifications] Error al obtener notificaciones:', contactosError || presupuestosError);
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
    };

    checkSessionAndFetch();

    // Suscribirse a cambios solo si hay sesión
    let contactosSubscription: any = null;
    let presupuestosSubscription: any = null;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Suscribirse a cambios en contactos
        contactosSubscription = supabase
          .channel('contactos-changes')
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
          .channel('presupuestos-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'presupuestos' },
            () => {
              fetchUnreadCount();
            }
          )
          .subscribe();
      }
    });

    // Cleanup
    return () => {
      if (contactosSubscription) {
        contactosSubscription.unsubscribe();
      }
      if (presupuestosSubscription) {
        presupuestosSubscription.unsubscribe();
      }
    };
  }, []);

  return { unreadCount, loading };
}
