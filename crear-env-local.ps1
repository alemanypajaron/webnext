# =====================================================
# Script para crear .env.local automáticamente
# =====================================================
# Uso: ./crear-env-local.ps1
# =====================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  CREAR ARCHIVO .env.local" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si ya existe .env.local
if (Test-Path ".env.local") {
    Write-Host "⚠️  El archivo .env.local ya existe." -ForegroundColor Yellow
    Write-Host ""
    $respuesta = Read-Host "¿Quieres sobrescribirlo? (s/n)"
    if ($respuesta -ne "s") {
        Write-Host "❌ Operación cancelada." -ForegroundColor Red
        exit
    }
}

Write-Host ""
Write-Host "📝 Vamos a crear tu archivo .env.local" -ForegroundColor Green
Write-Host ""
Write-Host "Necesitas tus credenciales de Supabase:" -ForegroundColor Yellow
Write-Host "1. Ve a: https://supabase.com/dashboard" -ForegroundColor Gray
Write-Host "2. Selecciona tu proyecto" -ForegroundColor Gray
Write-Host "3. Settings (⚙️) → API" -ForegroundColor Gray
Write-Host ""

# Solicitar Project URL
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "🌐 NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Cyan
Write-Host "   (Ejemplo: https://abcdefghijklmnopqrst.supabase.co)" -ForegroundColor Gray
$supabaseUrl = Read-Host "   Pega tu Project URL"

# Validar URL
if (-not $supabaseUrl -or $supabaseUrl -notmatch "^https://.*\.supabase\.co$") {
    Write-Host ""
    Write-Host "⚠️  La URL no parece válida." -ForegroundColor Yellow
    Write-Host "   Debe ser algo como: https://xxx.supabase.co" -ForegroundColor Gray
    Write-Host ""
    $continuar = Read-Host "¿Continuar de todos modos? (s/n)"
    if ($continuar -ne "s") {
        Write-Host "❌ Operación cancelada." -ForegroundColor Red
        exit
    }
}

Write-Host ""

# Solicitar Anon Key
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "🔑 NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Cyan
Write-Host "   (Empieza con: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)" -ForegroundColor Gray
Write-Host "   ⚠️  Usa la key 'anon' / 'public', NO la 'service_role'" -ForegroundColor Yellow
$supabaseKey = Read-Host "   Pega tu Anon Key"

# Validar Key
if (-not $supabaseKey -or $supabaseKey -notmatch "^eyJ") {
    Write-Host ""
    Write-Host "⚠️  La key no parece válida." -ForegroundColor Yellow
    Write-Host "   Debe empezar con: eyJ..." -ForegroundColor Gray
    Write-Host ""
    $continuar = Read-Host "¿Continuar de todos modos? (s/n)"
    if ($continuar -ne "s") {
        Write-Host "❌ Operación cancelada." -ForegroundColor Red
        exit
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Crear contenido del archivo
$contenido = @"
# =====================================================
# SUPABASE CONFIGURATION
# =====================================================
# Generado automáticamente el $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# Este archivo NO se sube a GitHub (está en .gitignore)
# =====================================================

# Tu Project URL de Supabase
NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl

# Tu Publishable (anon) API Key
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabaseKey

# =====================================================
# OPCIONAL: Otras configuraciones futuras
# =====================================================
# Descomenta si las necesitas

# Google Analytics
# NEXT_PUBLIC_GA_ID=

# Email Service
# EMAIL_HOST=
# EMAIL_PORT=
# EMAIL_USER=
# EMAIL_PASS=
"@

# Escribir archivo
try {
    $contenido | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "✅ Archivo .env.local creado exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Ubicación: $PWD\.env.local" -ForegroundColor Gray
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Reinicia el servidor de desarrollo:" -ForegroundColor Yellow
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Abre en tu navegador:" -ForegroundColor Yellow
    Write-Host "   http://localhost:3000/proyectos" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Si ves proyectos, ¡funciona! ✅" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "⚠️  RECUERDA: También debes configurar estas variables en Vercel" -ForegroundColor Yellow
    Write-Host "   Vercel Dashboard → Settings → Environment Variables" -ForegroundColor Gray
    Write-Host ""
}
catch {
    Write-Host "❌ Error al crear el archivo: $_" -ForegroundColor Red
    exit 1
}

