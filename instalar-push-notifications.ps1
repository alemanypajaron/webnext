# ================================================================
# Script de Instalación Rápida - Notificaciones Push
# ================================================================
# Este script te guía paso a paso para configurar las notificaciones
# push en tu PWA de Alemán y Pajarón.
#
# REQUISITOS:
# - Node.js instalado
# - Cuenta de Supabase activa
# - Acceso al dashboard de Supabase
# ================================================================

Write-Host "
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🔔 INSTALACIÓN DE NOTIFICACIONES PUSH                      ║
║   Alemán y Pajarón - PWA                                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

Write-Host "`n📋 Este script te ayudará a configurar:" -ForegroundColor Yellow
Write-Host "   1. Generar VAPID keys" -ForegroundColor White
Write-Host "   2. Configurar variables de entorno" -ForegroundColor White
Write-Host "   3. Crear archivos SQL necesarios" -ForegroundColor White
Write-Host "`n"

# ================================================================
# PASO 1: Verificar instalación de web-push
# ================================================================
Write-Host "🔍 PASO 1: Verificando dependencias..." -ForegroundColor Cyan

$webPushInstalled = $false
try {
    $null = npx web-push --version 2>&1
    $webPushInstalled = $true
    Write-Host "✅ web-push está disponible" -ForegroundColor Green
} catch {
    Write-Host "⚠️  web-push no está instalado" -ForegroundColor Yellow
}

# ================================================================
# PASO 2: Generar VAPID Keys
# ================================================================
Write-Host "`n🔑 PASO 2: Generando VAPID Keys..." -ForegroundColor Cyan

$generateKeys = Read-Host "`n¿Quieres generar nuevas VAPID keys? (s/n)"

if ($generateKeys -eq "s" -or $generateKeys -eq "S") {
    Write-Host "`n⏳ Generando VAPID keys..." -ForegroundColor Yellow
    
    $vapidOutput = npx web-push generate-vapid-keys 2>&1 | Out-String
    
    Write-Host "`n$vapidOutput" -ForegroundColor White
    
    Write-Host "`n⚠️  IMPORTANTE: Guarda estas keys de forma segura" -ForegroundColor Yellow
    Write-Host "   NO las compartas públicamente ni las subas a Git" -ForegroundColor Yellow
    
    $continue = Read-Host "`n¿Has guardado las keys? (s/n)"
    if ($continue -ne "s" -and $continue -ne "S") {
        Write-Host "`n❌ Por favor, guarda las keys antes de continuar" -ForegroundColor Red
        exit
    }
} else {
    Write-Host "⏩ Saltando generación de keys" -ForegroundColor Yellow
}

# ================================================================
# PASO 3: Configurar .env.local
# ================================================================
Write-Host "`n📝 PASO 3: Configurando variables de entorno..." -ForegroundColor Cyan

$configureEnv = Read-Host "`n¿Quieres añadir las VAPID keys al .env.local? (s/n)"

if ($configureEnv -eq "s" -or $configureEnv -eq "S") {
    
    Write-Host "`nPega tu VAPID Public Key:" -ForegroundColor Yellow
    $publicKey = Read-Host
    
    Write-Host "`nPega tu VAPID Private Key:" -ForegroundColor Yellow
    $privateKey = Read-Host
    
    Write-Host "`nEmail de contacto (default: contacto@alemanypajaron.com):" -ForegroundColor Yellow
    $subject = Read-Host
    if ([string]::IsNullOrWhiteSpace($subject)) {
        $subject = "mailto:contacto@alemanypajaron.com"
    } elseif (-not $subject.StartsWith("mailto:")) {
        $subject = "mailto:$subject"
    }
    
    $envContent = @"

# ================================================================
# VAPID Keys para notificaciones push
# ================================================================
NEXT_PUBLIC_VAPID_PUBLIC_KEY=$publicKey
VAPID_PRIVATE_KEY=$privateKey
VAPID_SUBJECT=$subject
"@
    
    $envPath = ".env.local"
    
    if (Test-Path $envPath) {
        Add-Content -Path $envPath -Value $envContent
        Write-Host "`n✅ Variables añadidas a .env.local" -ForegroundColor Green
    } else {
        New-Item -Path $envPath -ItemType File -Value $envContent | Out-Null
        Write-Host "`n✅ Archivo .env.local creado con las variables" -ForegroundColor Green
    }
    
} else {
    Write-Host "⏩ Saltando configuración de .env.local" -ForegroundColor Yellow
    Write-Host "   Recuerda añadir manualmente las variables VAPID" -ForegroundColor Yellow
}

# ================================================================
# PASO 4: Información de SQL Scripts
# ================================================================
Write-Host "`n📊 PASO 4: Scripts SQL de Supabase" -ForegroundColor Cyan

Write-Host "`nDebes ejecutar los siguientes scripts en tu dashboard de Supabase:" -ForegroundColor Yellow
Write-Host "   (Supabase Dashboard → SQL Editor)" -ForegroundColor White
Write-Host ""
Write-Host "   1️⃣  supabase/crear-tabla-push-subscriptions.sql" -ForegroundColor White
Write-Host "       → Crea la tabla para guardar subscriptions" -ForegroundColor Gray
Write-Host ""
Write-Host "   2️⃣  Configurar variables de entorno:" -ForegroundColor White
Write-Host "       ALTER DATABASE postgres SET app.supabase_url = 'https://TU-PROYECTO.supabase.co';" -ForegroundColor Gray
Write-Host "       ALTER DATABASE postgres SET app.supabase_service_role_key = 'TU-SERVICE-ROLE-KEY';" -ForegroundColor Gray
Write-Host ""
Write-Host "   3️⃣  supabase/crear-triggers-notificaciones-push.sql" -ForegroundColor White
Write-Host "       → Crea triggers para enviar notificaciones automáticamente" -ForegroundColor Gray
Write-Host ""

# ================================================================
# PASO 5: Desplegar Edge Function
# ================================================================
Write-Host "`n🚀 PASO 5: Desplegar Edge Function" -ForegroundColor Cyan

Write-Host "`nPara desplegar la Edge Function, ejecuta:" -ForegroundColor Yellow
Write-Host "   supabase login" -ForegroundColor White
Write-Host "   supabase link --project-ref TU-PROYECTO-ID" -ForegroundColor White
Write-Host "   supabase functions deploy send-push-notification" -ForegroundColor White
Write-Host ""
Write-Host "Luego, configura las variables en:" -ForegroundColor Yellow
Write-Host "   Dashboard → Edge Functions → send-push-notification → Settings" -ForegroundColor White
Write-Host "   - VAPID_PUBLIC_KEY" -ForegroundColor Gray
Write-Host "   - VAPID_PRIVATE_KEY" -ForegroundColor Gray
Write-Host "   - VAPID_SUBJECT" -ForegroundColor Gray
Write-Host ""

# ================================================================
# PASO 6: Próximos pasos
# ================================================================
Write-Host "`n✅ INSTALACIÓN COMPLETADA (Parte Local)" -ForegroundColor Green

Write-Host "`n📚 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   1. Ejecuta los scripts SQL en Supabase (ver arriba)" -ForegroundColor White
Write-Host "   2. Despliega la Edge Function (ver arriba)" -ForegroundColor White
Write-Host "   3. Inicia el servidor de desarrollo:" -ForegroundColor White
Write-Host "      npm run dev" -ForegroundColor Gray
Write-Host "   4. Ve a http://localhost:3000/administrator" -ForegroundColor White
Write-Host "   5. Activa las notificaciones push desde el panel" -ForegroundColor White
Write-Host "   6. ¡Prueba enviando un formulario de contacto!" -ForegroundColor White
Write-Host ""
Write-Host "📖 Para más información, consulta:" -ForegroundColor Yellow
Write-Host "   - PUSH_NOTIFICATIONS_SETUP.md (Guía completa)" -ForegroundColor White
Write-Host "   - PUSH_NOTIFICATIONS_README.md (Resumen rápido)" -ForegroundColor White
Write-Host ""

Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   ¡Listo! Sistema de notificaciones push configurado        ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
