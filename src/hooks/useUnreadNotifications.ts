'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useUnreadNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          console.error('Error al obtener notificaciones:', contactosError || presupuestosError);
          return;
        }

        const total = (contactosCount || 0) + (presupuestosCount || 0);
        setUnreadCount(total);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchUnreadCount();

    // Suscribirse a cambios en contactos
    const contactosSubscription = supabase
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
    const presupuestosSubscription = supabase
      .channel('presupuestos-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'presupuestos' },
        () => {
          fetchUnreadCount();
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      contactosSubscription.unsubscribe();
      presupuestosSubscription.unsubscribe();
    };
  }, []);

  return { unreadCount, loading };
}
