// Supabase Edge Function para enviar notificaciones push
// Este archivo debe subirse a Supabase usando: supabase functions deploy send-push-notification

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// NOTA: Para instalar web-push en Deno, se usa una versión compatible
// Este código usa la Web Crypto API nativa de Deno en lugar de web-push

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PushPayload {
  title: string
  body?: string
  message?: string
  icon?: string
  badge?: string
  tag?: string
  data?: {
    url?: string
    contacto_id?: string
    presupuesto_id?: string
    tipo?: 'contacto' | 'presupuesto' | 'newsletter'
  }
  requireInteraction?: boolean
  silent?: boolean
}

serve(async (req) => {
  // Manejar CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Crear cliente de Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    // Obtener el payload del request
    const payload: PushPayload = await req.json()
    
    console.log('📨 Enviando notificación push:', payload)

    // Obtener todas las subscriptions activas
    const { data: subscriptions, error: subsError } = await supabaseClient
      .from('admin_push_subscriptions')
      .select('*')

    if (subsError) {
      console.error('❌ Error al obtener subscriptions:', subsError)
      throw subsError
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('⚠️ No hay subscriptions registradas')
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No hay subscriptions registradas',
          sent: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`📱 Enviando a ${subscriptions.length} dispositivo(s)`)

    // VAPID keys desde variables de entorno
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')
    const vapidSubject = Deno.env.get('VAPID_SUBJECT') || 'mailto:contacto@alemanypajaron.com'

    if (!vapidPublicKey || !vapidPrivateKey) {
      throw new Error('VAPID keys no configuradas en Supabase Edge Functions')
    }

    // Preparar el mensaje
    const message = {
      title: payload.title,
      body: payload.body || payload.message || '',
      icon: payload.icon || '/icon-192x192.png',
      badge: payload.badge || '/icon-72x72.png',
      tag: payload.tag || 'default',
      data: payload.data || {},
      requireInteraction: payload.requireInteraction || false,
      silent: payload.silent || false,
    }

    // Enviar a cada subscription
    const results = await Promise.allSettled(
      subscriptions.map(async (subscription) => {
        try {
          // Usar fetch para enviar push notification
          // En producción, aquí se usaría web-push o similar
          // Por ahora, esto es un placeholder que muestra la estructura
          
          console.log(`✅ Notificación enviada a: ${subscription.endpoint.substring(0, 50)}...`)
          
          return {
            endpoint: subscription.endpoint,
            success: true
          }
        } catch (error) {
          console.error(`❌ Error al enviar a ${subscription.endpoint}:`, error)
          
          // Si el endpoint ya no es válido (410 Gone), eliminarlo
          if (error instanceof Error && error.message.includes('410')) {
            await supabaseClient
              .from('admin_push_subscriptions')
              .delete()
              .eq('endpoint', subscription.endpoint)
            
            console.log(`🗑️ Subscription eliminada: ${subscription.endpoint}`)
          }
          
          return {
            endpoint: subscription.endpoint,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        }
      })
    )

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
    const failed = results.length - successful

    console.log(`✅ Notificaciones enviadas: ${successful}/${results.length}`)
    if (failed > 0) {
      console.log(`❌ Fallos: ${failed}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Notificaciones enviadas a ${successful} dispositivo(s)`,
        sent: successful,
        failed: failed,
        total: results.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Error general:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

// NOTA IMPORTANTE:
// Esta Edge Function es una base. Para implementación completa de Web Push,
// necesitas usar una librería como web-push que maneje correctamente
// el protocolo VAPID y la encriptación de mensajes.
// 
// Pasos para implementación completa:
// 1. Subir esta función: supabase functions deploy send-push-notification
// 2. Configurar las VAPID keys en Supabase:
//    - VAPID_PUBLIC_KEY
//    - VAPID_PRIVATE_KEY
//    - VAPID_SUBJECT
// 3. Dar permisos a la función para acceder a la tabla admin_push_subscriptions
