// Supabase Edge Function para enviar notificaciones push
// Usa web-push para implementación completa del protocolo Web Push

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import webPush from 'npm:web-push@3.6.6'

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
  data?: any
  requireInteraction?: boolean
  silent?: boolean
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const payload: PushPayload = await req.json()
    
    console.log('📨 Enviando notificación push:', { tag: payload.tag })

    // Obtener subscriptions
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
        JSON.stringify({ success: true, message: 'No hay subscriptions', sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`📱 Enviando a ${subscriptions.length} dispositivo(s)`)

    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')
    const vapidSubject = Deno.env.get('VAPID_SUBJECT') || 'mailto:contacto@alemanypajaron.com'

    if (!vapidPublicKey || !vapidPrivateKey) {
      throw new Error('VAPID keys no configuradas')
    }

    // Configurar VAPID
    webPush.setVapidDetails(
      vapidSubject,
      vapidPublicKey,
      vapidPrivateKey
    )

    // Mensaje a enviar
    const message = JSON.stringify({
      title: payload.title,
      body: payload.body || payload.message || '',
      icon: payload.icon || '/icon-192x192.png',
      badge: payload.badge || '/icon-72x72.png',
      tag: payload.tag || 'default',
      data: payload.data || {},
      requireInteraction: payload.requireInteraction || false,
    })

    // Enviar a cada subscription
    const results = await Promise.allSettled(
      subscriptions.map(async (subscription) => {
        try {
          console.log(`📤 Enviando a: ${subscription.endpoint.substring(0, 50)}...`)
          
          // Crear objeto de subscription para web-push
          const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth
            }
          }

          // Enviar notificación usando web-push
          const response = await webPush.sendNotification(
            pushSubscription,
            message,
            {
              TTL: 86400, // 24 horas
              urgency: 'high'
            }
          )

          console.log(`✅ Notificación enviada exitosamente`, response)

          return { 
            endpoint: subscription.endpoint.substring(0, 50), 
            success: true, 
            status: response.statusCode || 201
          }
        } catch (error: any) {
          console.error(`❌ Error al enviar a ${subscription.endpoint.substring(0, 50)}:`, error)

          // Si el endpoint está caducado (410 Gone), eliminarlo
          if (error.statusCode === 410 || error.statusCode === 404) {
            console.log(`🗑️ Endpoint caducado, eliminando...`)
            await supabaseClient
              .from('admin_push_subscriptions')
              .delete()
              .eq('endpoint', subscription.endpoint)
          }

          return { 
            endpoint: subscription.endpoint.substring(0, 50), 
            success: false, 
            status: error.statusCode || 500,
            error: error.message || String(error)
          }
        }
      })
    )

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
    const failed = results.length - successful

    console.log(`✅ Notificaciones enviadas: ${successful}/${results.length}`)
    
    // Logging detallado de resultados
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const value = result.value
        console.log(`   [${index}] ${value.success ? '✅' : '❌'} Status: ${value.status} - ${value.endpoint}`)
        if (!value.success && value.error) {
          console.error(`        Error: ${value.error}`)
        }
      } else {
        console.log(`   [${index}] ❌ Error fatal: ${result.reason}`)
      }
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Notificaciones enviadas a ${successful} dispositivo(s)`,
        sent: successful,
        failed: failed,
        total: results.length,
        details: results.map(r => r.status === 'fulfilled' ? r.value : { error: String(r.reason) })
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
