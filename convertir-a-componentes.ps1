# Script para convertir todas las páginas HTML a sistema de componentes
Write-Host "Convirtiendo páginas a sistema de componentes..." -ForegroundColor Cyan

$archivos = @(
    "contacto.html",
    "presupuesto.html",
    "servicios/index.html",
    "servicios/reformas-integrales.html",
    "servicios/licencias-permisos.html",
    "servicios/gestion-proyectos.html",
    "proyectos/index.html",
    "blog/index.html",
    "legal/aviso-legal.html",
    "legal/privacidad.html",
    "legal/cookies.html"
)

$patronesHeader = @(
    '    <!-- HEADER -->',
    '    <header class="header"',
    '</header>'
)

$patronesFooter = @(
    '    <!-- FOOTER -->',
    '    <footer class="footer">',
    '</footer>',
    '<a href="https://wa.me/',
    'whatsapp-btn',
    '<button class="scroll-top"',
    '<script src="../js/main.js">',
    '<script src="js/main.js">'
)

foreach ($archivo in $archivos) {
    if (Test-Path $archivo) {
        Write-Host "Procesando: $archivo" -ForegroundColor Yellow
        
        $contenido = Get-Content $archivo -Raw -Encoding UTF8
        
        # Buscar y reemplazar header
        if ($contenido -match '(?s)    <header class="header".*?</header>') {
            $contenido = $contenido -replace '(?s)    <header class="header".*?</header>', '    <div id="header-placeholder"></div>'
            Write-Host "  ✓ Header convertido" -ForegroundColor Green
        }
        elseif ($contenido -match '(?s)    <!-- HEADER -->.*?</header>') {
            $contenido = $contenido -replace '(?s)    <!-- HEADER -->.*?</header>', '    <div id="header-placeholder"></div>'
            Write-Host "  ✓ Header convertido" -ForegroundColor Green
        }
        
        # Reemplazar footer y scripts al final del body
        if ($contenido -match '(?s)    <!-- FOOTER -->.*?<script src="[^"]*main\.js"></script>') {
            $reemplazo = @"
    <div id="footer-placeholder"></div>
    <div id="whatsapp-placeholder"></div>
    <div id="scroll-top-placeholder"></div>
    <div id="cookie-banner-placeholder"></div>
    
    <script src="RUTA_COMPONENTES"></script>
    <script src="RUTA_MAIN"></script>
"@
            # Determinar rutas según profundidad
            $profundidad = ($archivo -split '/').Count - 1
            if ($profundidad -eq 0) {
                $reemplazo = $reemplazo -replace 'RUTA_COMPONENTES', 'js/components.js'
                $reemplazo = $reemplazo -replace 'RUTA_MAIN', 'js/main.js'
            } else {
                $rutaBase = '../' * $profundidad
                $reemplazo = $reemplazo -replace 'RUTA_COMPONENTES', "${rutaBase}js/components.js"
                $reemplazo = $reemplazo -replace 'RUTA_MAIN', "${rutaBase}js/main.js"
            }
            
            $contenido = $contenido -replace '(?s)    <!-- FOOTER -->.*?<script src="[^"]*main\.js"></script>', $reemplazo
            Write-Host "  ✓ Footer y scripts convertidos" -ForegroundColor Green
        }
        elseif ($contenido -match '(?s)    <footer class="footer">.*?<script src="[^"]*main\.js"></script>') {
            $reemplazo = @"
    <div id="footer-placeholder"></div>
    <div id="whatsapp-placeholder"></div>
    <div id="scroll-top-placeholder"></div>
    <div id="cookie-banner-placeholder"></div>
    
    <script src="RUTA_COMPONENTES"></script>
    <script src="RUTA_MAIN"></script>
"@
            # Determinar rutas según profundidad
            $profundidad = ($archivo -split '/').Count - 1
            if ($profundidad -eq 0) {
                $reemplazo = $reemplazo -replace 'RUTA_COMPONENTES', 'js/components.js'
                $reemplazo = $reemplazo -replace 'RUTA_MAIN', 'js/main.js'
            } else {
                $rutaBase = '../' * $profundidad
                $reemplazo = $reemplazo -replace 'RUTA_COMPONENTES', "${rutaBase}js/components.js"
                $reemplazo = $reemplazo -replace 'RUTA_MAIN', "${rutaBase}js/main.js"
            }
            
            $contenido = $contenido -replace '(?s)    <footer class="footer">.*?<script src="[^"]*main\.js"></script>', $reemplazo
            Write-Host "  ✓ Footer y scripts convertidos" -ForegroundColor Green
        }
        
        # Guardar archivo
        $contenido | Out-File -FilePath $archivo -Encoding UTF8 -NoNewline
        Write-Host "  ✓ Guardado" -ForegroundColor Green
    }
    else {
        Write-Host "  ✗ No encontrado: $archivo" -ForegroundColor Red
    }
}

Write-Host "`n✅ Conversión completada!" -ForegroundColor Green
Write-Host "Recarga el navegador para ver los cambios" -ForegroundColor Yellow

