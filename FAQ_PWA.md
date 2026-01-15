# FAQ - PWA Dual para Administrador

## Preguntas Frecuentes

### 1. ¿Por qué no hay un botón de login visible en la web?

**Respuesta**: Para no confundir a los visitantes. Si ven un botón de "Iniciar sesión", pensarán que pueden crear una cuenta o loguear, cuando realmente es solo para el administrador. Esta solución mantiene la web limpia y profesional para los usuarios normales.

### 2. ¿Cómo accede el administrador entonces?

**Respuesta**: Hay un pequeño icono ⚙️ muy discreto en el footer (parte de abajo de cualquier página). Es casi invisible para usuarios normales pero el administrador sabe dónde está. También se puede acceder directamente via URL: `/administrator/login`

### 3. ¿Los usuarios normales pueden instalar la PWA?

**Respuesta**: Sí, podrían instalarla, pero:
- Les instalaría la versión pública (manifest.json) que abre en la home
- No tendrían acceso al panel de administración sin credenciales
- No tiene mucho sentido para ellos, es más útil para el admin

### 4. ¿Qué pasa si un usuario instala la PWA pública?

**Respuesta**: No hay problema. Les instalará "Alemán y Pajarón" normal, que abre en la home pública. Pueden navegar, ver proyectos, solicitar presupuestos, etc. Es completamente funcional pero sin acceso admin.

### 5. ¿El administrador necesita instalar la PWA obligatoriamente?

**Respuesta**: No, es opcional. Puede seguir usando el navegador normal. La PWA es solo para mejorar la experiencia en móvil con acceso más rápido.

### 6. ¿Qué diferencia hay entre manifest.json y manifest-admin.json?

**Respuesta**:
- `manifest.json`: Para usuarios, abre en `/` (home pública)
- `manifest-admin.json`: Para admin, abre en `/administrator` (panel)

Ambos apuntan a la misma app, solo cambia el punto de entrada.

### 7. ¿Cómo detecta el sistema qué manifest usar?

**Respuesta**: Next.js carga el manifest según el layout:
- Layout raíz (`/src/app/layout.tsx`) → `manifest.json`
- Layout admin (`/src/app/administrator/layout.tsx`) → `manifest-admin.json`

### 8. ¿El banner de instalación es molesto?

**Respuesta**: No, porque:
- Solo aparece en `/administrator/login`
- Se puede cerrar con un clic
- Una vez cerrado, no vuelve a aparecer (localStorage)
- Si ya está instalado, muestra un indicador verde en su lugar

### 9. ¿Funciona offline?

**Respuesta**: Parcialmente. La app puede abrir offline pero necesita conexión para:
- Login/autenticación
- Cargar datos de Supabase
- Subir imágenes
- Crear/editar contenido

### 10. ¿Qué pasa si el admin abre la PWA sin sesión activa?

**Respuesta**: Lo lleva automáticamente a `/administrator/login` para que inicie sesión.

### 11. ¿Y si tiene sesión activa?

**Respuesta**: Lo redirige automáticamente a `/administrator` (panel principal).

### 12. ¿Puedo tener múltiples administradores?

**Respuesta**: Sí, cada uno puede instalar la PWA en su móvil. Solo necesitan:
1. Conocer el icono ⚙️ o la URL directa
2. Tener credenciales de acceso (usuario/contraseña)
3. Seguir las instrucciones de instalación

### 13. ¿Afecta esto al SEO?

**Respuesta**: No, porque:
- El panel admin tiene `robots: noindex, nofollow`
- Los buscadores no indexan `/administrator/*`
- La web pública sigue siendo totalmente indexable

### 14. ¿Es seguro?

**Respuesta**: Sí, porque:
- El panel requiere autenticación (Supabase Auth)
- Solo usuarios autenticados pueden acceder
- Las rutas admin están protegidas por middleware
- El icono de acceso es discreto

### 15. ¿Puedo desinstalar la PWA?

**Respuesta**: Sí, como cualquier app:
- **Android**: Mantener pulsado el icono → "Desinstalar"
- **iOS**: Mantener pulsado el icono → "Eliminar app"
- **Desktop**: Click derecho → "Desinstalar"

### 16. ¿Qué navegadores soportan PWA?

**Respuesta**:
- ✅ Chrome (Android/Desktop)
- ✅ Edge (Android/Desktop)
- ✅ Safari (iOS/Mac) - con limitaciones
- ✅ Samsung Internet
- ❌ Firefox (soporte limitado)

### 17. ¿Por qué no usar un subdominio como admin.alemanypajaron.es?

**Respuesta**: Complicaría la configuración:
- Requiere configurar DNS
- Certificados SSL adicionales
- Mayor complejidad de deploy
- Posibles problemas con cookies/sesiones

La solución actual es más simple y elegante.

### 18. ¿Y si quiero cambiar el icono del admin?

**Respuesta**: Edita `manifest-admin.json` y crea iconos específicos para admin (ej: con fondo oscuro o badge de "Admin").

### 19. ¿El admin puede usar la web desde ordenador?

**Respuesta**: Sí, perfectamente. Puede:
- Acceder vía navegador normal a `/administrator/login`
- También instalar la PWA en desktop (Chrome/Edge)
- Funciona en cualquier dispositivo

### 20. ¿Qué pasa si actualizo la app?

**Respuesta**: Next.js y la PWA se actualizan automáticamente:
- El service worker detecta nuevas versiones
- Descarga actualizaciones en background
- La próxima vez que abra la app, tendrá la última versión

### 21. ¿Puedo cambiar el texto del banner de instalación?

**Respuesta**: Sí, edita `/src/app/administrator/login/page.tsx` y modifica el JSX del banner.

### 22. ¿Puedo ocultar completamente el icono ⚙️ del footer?

**Respuesta**: Sí, pero entonces el admin tendría que:
- Memorizar la URL `/administrator/login`
- O crear un marcador en su navegador
- O recibir el link por WhatsApp/email

El icono discreto es un buen balance entre seguridad y usabilidad.

### 23. ¿Afecta esto al rendimiento de la web?

**Respuesta**: No, porque:
- Los manifests son archivos pequeños (~2KB)
- El componente de redirección solo corre en modo standalone
- No añade JavaScript extra a la web pública

### 24. ¿Puedo personalizar el splash screen de la PWA?

**Respuesta**: Sí, editando los manifests:
- `background_color`: Color de fondo del splash
- `theme_color`: Color de la barra de estado
- `icons`: Iconos que se muestran

### 25. ¿Necesito regenerar iconos para el manifest admin?

**Respuesta**: No necesariamente. Puedes usar los mismos iconos o crear unos específicos con algún distintivo (ej: badge "Admin", color diferente).

## 🆘 Soporte

Si tienes más preguntas:
1. Revisa la documentación en `PWA_ADMIN_GUIA.md`
2. Consulta el checklist de testing en `TESTING_PWA.md`
3. Lee las instrucciones de usuario en `INSTRUCCIONES_ADMIN_PWA.md`
