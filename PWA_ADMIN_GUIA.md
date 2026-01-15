# Guía de PWA para Administradores

## 🎯 Problema Resuelto

La aplicación Next.js está configurada como PWA dual:
- **Usuarios normales**: Visitan como web normal
- **Administrador**: Puede instalar como app nativa en móvil

## 🔧 Solución Implementada

### 1. Dos Manifests Diferentes

#### `/public/manifest.json` (Usuarios)
```json
{
  "name": "Alemán y Pajarón - Gestión de Obras Murcia",
  "start_url": "/",
  ...
}
```

#### `/public/manifest-admin.json` (Administrador)
```json
{
  "name": "A&P Administrador",
  "start_url": "/administrator",
  ...
}
```

### 2. Acceso Discreto al Panel

- **Icono oculto en el footer**: ⚙️ (muy pequeño, casi invisible)
- **Ruta directa**: `/administrator/login`
- Los usuarios normales NO ven ningún botón de login en la navegación

### 3. Página de Instalación PWA

**Ruta**: `/administrator/instalar-pwa`

Características:
- Detecta la plataforma (iOS, Android, Desktop)
- Muestra instrucciones específicas paso a paso
- Botón de instalación automática (cuando disponible)
- Explica los beneficios de instalar

### 4. Banner Inteligente en Login

Al acceder a `/administrator/login`:
- Si NO está instalado → muestra banner promocional
- Si YA está instalado → muestra indicador verde
- El banner se puede cerrar y no vuelve a aparecer

### 5. Redirección Automática

Si un admin abre la PWA desde la home instalada:
- Detecta si hay sesión activa
- Redirige automáticamente a `/administrator`
- Evita que tenga que navegar manualmente

## 📱 Flujo de Uso

### Primera vez (Instalación)

1. Admin accede a `alemanypajaron.es` en el móvil
2. Hace scroll hasta el footer y toca el icono ⚙️
3. Va a `/administrator/login`
4. Ve el banner de instalación
5. Toca "Ver cómo instalar"
6. Sigue las instrucciones específicas de su dispositivo
7. Instala la app "A&P Admin"

### Uso diario

1. Admin abre la app desde el icono en su pantalla de inicio
2. Se abre directamente en `/administrator` (si tiene sesión)
3. Si no tiene sesión, va a `/administrator/login`
4. Trabaja normalmente

## 🎨 Características Técnicas

### Detección de PWA
```typescript
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
const isIOSStandalone = (window.navigator as any).standalone === true;
```

### Manejo de Instalación
```typescript
window.addEventListener('beforeinstallprompt', handler);
```

### Persistencia de Preferencias
```typescript
localStorage.setItem('pwa-banner-dismissed', 'true');
```

## 🔒 Seguridad

- El manifest del admin NO está enlazado en el layout principal
- Solo se activa en rutas `/administrator/*`
- No hay botones de login visibles en la web pública
- El icono en el footer es discreto (opacity: 30%)

## 🚀 Ventajas para el Admin

1. **Acceso rápido**: Un toque desde la pantalla de inicio
2. **Sin navegador**: Interfaz limpia sin barras de URL
3. **Más espacio**: Pantalla completa
4. **Más nativo**: Se siente como app móvil
5. **Offline**: Algunas funciones disponibles sin internet

## 📝 Notas Importantes

- Los usuarios NUNCA ven el panel de administración
- No hay confusión con botones de login en la web pública
- El admin puede seguir usando el navegador si lo prefiere
- La instalación es OPCIONAL, no obligatoria

## 🛠️ Archivos Modificados/Creados

1. `/public/manifest-admin.json` - Nuevo manifest para admin
2. `/src/app/administrator/layout.tsx` - Usa manifest-admin
3. `/src/app/administrator/instalar-pwa/page.tsx` - Página de instalación
4. `/src/components/pwa/PWAAdminRedirect.tsx` - Redirección inteligente
5. `/src/components/layout/Footer.tsx` - Icono discreto ⚙️
6. `/src/app/administrator/login/page.tsx` - Banner promocional
7. `/src/app/layout.tsx` - Componente de redirección

## 🎯 Resultado Final

- **Usuarios**: Ven una web normal, limpia, sin login visible
- **Admin**: Puede instalar app y acceder rápidamente desde móvil
- **Mejor de ambos mundos**: PWA solo para quien la necesita
