## ✅ VAPID KEYS GENERADAS - COPIAR AL .env.local

Añade estas líneas a tu archivo `.env.local`:

```env
# ================================================================
# VAPID Keys para Notificaciones Push
# ================================================================
# Generadas el: 2026-01-15

# Public Key (usada en el navegador - es segura)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BIcGOris1F1sAEqMEDsiGHBBls4ze_f3uJoAYufpE2BFdFfLK_pZ1WsP2_Ab0bHa7XqoV-VvtqU0ioZSVFWw1B0

# Private Key (solo para referencia, NO se usa en Next.js)
# Esta key solo se usa en Supabase Edge Functions
# VAPID_PRIVATE_KEY=137r3U-yzAtwDFmMsW8zRTvDYv_v3e5wxy7N_2dkrU8

# Subject (email de contacto)
VAPID_SUBJECT=mailto:contacto@alemanypajaron.com
```

---

## 📝 INSTRUCCIONES

### 1. Añadir al .env.local (Next.js)

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Copia y pega las líneas de arriba al final del archivo
3. Guarda el archivo
4. Reinicia el servidor: `npm run dev`

### 2. Configurar en Supabase Edge Functions

Ve a **Supabase Dashboard** → **Edge Functions** → **send-push-notification** → **Settings**

Añade estas 3 variables:

```
VAPID_PUBLIC_KEY=BIcGOris1F1sAEqMEDsiGHBBls4ze_f3uJoAYufpE2BFdFfLK_pZ1WsP2_Ab0bHa7XqoV-VvtqU0ioZSVFWw1B0
VAPID_PRIVATE_KEY=137r3U-yzAtwDFmMsW8zRTvDYv_v3e5wxy7N_2dkrU8
VAPID_SUBJECT=mailto:contacto@alemanypajaron.com
```

### 3. Configurar en Vercel (Producción)

Ve a tu proyecto en **Vercel** → **Settings** → **Environment Variables**

Añade estas 2 variables:

```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BIcGOris1F1sAEqMEDsiGHBBls4ze_f3uJoAYufpE2BFdFfLK_pZ1WsP2_Ab0bHa7XqoV-VvtqU0ioZSVFWw1B0
VAPID_SUBJECT=mailto:contacto@alemanypajaron.com
```

⚠️ **NO añadas** `VAPID_PRIVATE_KEY` en Vercel (solo en Supabase Edge Functions)

---

## ⚠️ IMPORTANTE - SEGURIDAD

- ✅ **Public Key:** Es segura, se puede compartir (va en el navegador)
- ❌ **Private Key:** NUNCA la compartas públicamente
- ❌ **Private Key:** NUNCA la subas a Git
- ✅ **Private Key:** Solo va en Supabase Edge Functions (backend)

---

## 🔐 DÓNDE VA CADA KEY

| Variable | .env.local | Vercel | Supabase Edge Functions |
|----------|-----------|--------|------------------------|
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | ✅ | ✅ | ❌ |
| `VAPID_PUBLIC_KEY` | ❌ | ❌ | ✅ |
| `VAPID_PRIVATE_KEY` | ❌ | ❌ | ✅ |
| `VAPID_SUBJECT` | ✅ | ✅ | ✅ |

---

## ✅ PRÓXIMOS PASOS

Una vez añadidas las variables:

1. ✅ Ejecutar SQL en Supabase:
   - `supabase/crear-tabla-push-subscriptions.sql`
   - Configurar variables de entorno en SQL
   - `supabase/crear-triggers-notificaciones-push.sql`

2. ✅ Desplegar Edge Function:
   ```bash
   supabase login
   supabase link --project-ref TU-PROYECTO-ID
   supabase functions deploy send-push-notification
   ```

3. ✅ Probar en local:
   ```bash
   npm run dev
   ```
   - Ve a http://localhost:3000/administrator
   - Activa las notificaciones push
   - Envía un formulario de prueba

---

**📖 Ver guía completa:** `PUSH_NOTIFICATIONS_SETUP.md`
