# ============================================
# ALEMÁN Y PAJARÓN - Servidor Local
# Script para iniciar servidor de desarrollo
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ALEMÁN Y PAJARÓN - Servidor Local" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Intentar con Python
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "✓ Python encontrado. Iniciando servidor..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Servidor iniciado en: http://localhost:8000" -ForegroundColor Green
    Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    Write-Host ""
    
    # Abrir navegador automáticamente
    Start-Process "http://localhost:8000"
    
    # Iniciar servidor
    python -m http.server 8000
    exit
}

# Intentar con Node.js (npx serve)
if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "✓ Node.js encontrado. Iniciando servidor..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Servidor iniciado en: http://localhost:3000" -ForegroundColor Green
    Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    Write-Host ""
    
    # Abrir navegador automáticamente
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3000"
    
    # Iniciar servidor
    npx serve -l 3000
    exit
}

# Intentar con PHP
if (Get-Command php -ErrorAction SilentlyContinue) {
    Write-Host "✓ PHP encontrado. Iniciando servidor..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Servidor iniciado en: http://localhost:8000" -ForegroundColor Green
    Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    Write-Host ""
    
    # Abrir navegador automáticamente
    Start-Process "http://localhost:8000"
    
    # Iniciar servidor
    php -S localhost:8000
    exit
}

# Si no se encuentra ninguno
Write-Host "✗ No se encontró Python, Node.js ni PHP instalado." -ForegroundColor Red
Write-Host ""
Write-Host "Por favor, instala una de estas opciones:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Python: https://www.python.org/downloads/" -ForegroundColor White
Write-Host "2. Node.js: https://nodejs.org/" -ForegroundColor White
Write-Host "3. PHP: https://www.php.net/downloads" -ForegroundColor White
Write-Host ""
Write-Host "Después de instalar, ejecuta este script de nuevo." -ForegroundColor Yellow
Write-Host ""

Read-Host "Presiona Enter para salir"

