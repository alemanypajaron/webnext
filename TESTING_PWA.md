# Checklist de Testing PWA

## 🧪 Testing Manual

### 1. Acceso desde la Home Pública

- [ ] Abrir `https://alemanypajaron.es/`
- [ ] Verificar que NO hay botón de login visible
- [ ] Scroll hasta el footer
- [ ] Verificar que el icono ⚙️ es muy pequeño y discreto (opacity: 30%)
- [ ] Hacer clic en ⚙️
- [ ] Verificar redirección a `/administrator/login`

### 2. Página de Login

- [ ] Ver que aparece el banner de PWA (si no está instalada)
- [ ] Clic en "Ver cómo instalar"
- [ ] Verificar redirección a `/administrator/instalar-pwa`
- [ ] Verificar que las instrucciones son correctas para tu dispositivo

### 3. Instalación PWA

#### En Android (Chrome/Edge)

- [ ] Ir a `/administrator/instalar-pwa`
- [ ] Ver botón "Instalar App Ahora" (si disponible)
- [ ] Hacer clic o usar menú ⋮ → "Añadir a pantalla de inicio"
- [ ] Verificar que se instala con el nombre "A&P Admin"
- [ ] Verificar que el icono aparece en la pantalla de inicio

#### En iOS (Safari)

- [ ] Ir a `/administrator/instalar-pwa`
- [ ] Leer instrucciones de iOS
- [ ] Tocar 📤 (Compartir) → "Añadir a pantalla de inicio"
- [ ] Verificar que se añade con el nombre "A&P Admin"
- [ ] Verificar que el icono aparece en la pantalla de inicio

#### En Desktop (Chrome/Edge)

- [ ] Ir a `/administrator/instalar-pwa`
- [ ] Buscar icono ⊕ o 🖥️ en la barra de direcciones
- [ ] Hacer clic en "Instalar"
- [ ] Verificar que se instala como app de escritorio

### 4. Primera Apertura de la PWA

- [ ] Abrir la app desde el icono instalado
- [ ] Verificar que NO hay barras del navegador
- [ ] Verificar que abre en `/administrator` o `/administrator/login`
- [ ] Verificar que el banner de instalación ya NO aparece
- [ ] Ver indicador verde "✓ Ejecutándose como App instalada"

### 5. Login y Uso

- [ ] Iniciar sesión normalmente
- [ ] Verificar acceso al panel de administración
- [ ] Cerrar la app
- [ ] Volver a abrir desde el icono
- [ ] Verificar que mantiene la sesión (si no expiró)
- [ ] Verificar redirección automática a `/administrator`

### 6. Testing en Web Normal (Sin PWA)

- [ ] Abrir en navegador normal `https://alemanypajaron.es/`
- [ ] Navegar por servicios, proyectos, blog
- [ ] Verificar que NO hay ninguna mención al login
- [ ] Verificar que NO hay confusión para usuarios
- [ ] Scroll al footer → ver que el icono ⚙️ pasa desapercibido

### 7. Verificación de Manifests

#### Manifest Usuario (`/manifest.json`)

```bash
curl https://alemanypajaron.es/manifest.json
```

- [ ] Verificar `"start_url": "/"`
- [ ] Verificar `"name": "Alemán y Pajarón - Gestión de Obras Murcia"`

#### Manifest Admin (`/manifest-admin.json`)

```bash
curl https://alemanypajaron.es/manifest-admin.json
```

- [ ] Verificar `"start_url": "/administrator"`
- [ ] Verificar `"name": "A&P Administrador"`

### 8. Testing de Redirección Automática

- [ ] Instalar PWA y hacer login
- [ ] Cerrar la app
- [ ] Abrir desde navegador normal y cerrar sesión
- [ ] Abrir la PWA instalada
- [ ] Verificar que va a `/administrator/login` (sin sesión)
- [ ] Hacer login en la PWA
- [ ] Cerrar la app
- [ ] Abrir de nuevo
- [ ] Verificar redirección automática a `/administrator` (con sesión)

### 9. Testing de Persistencia del Banner

- [ ] Ir a `/administrator/login` (sin PWA)
- [ ] Ver banner de instalación
- [ ] Hacer clic en "Ahora no"
- [ ] Recargar la página
- [ ] Verificar que el banner NO vuelve a aparecer
- [ ] Borrar localStorage y recargar
- [ ] Verificar que el banner vuelve a aparecer

### 10. Testing Cross-Browser

- [ ] Chrome Android
- [ ] Safari iOS
- [ ] Firefox Android
- [ ] Samsung Internet
- [ ] Chrome Desktop
- [ ] Edge Desktop
- [ ] Safari Desktop (no soporta PWA completa, pero debe funcionar como web)

## 🐛 Problemas Conocidos a Verificar

- [ ] Verificar que el manifest-admin.json es servido correctamente
- [ ] Verificar que el admin layout sobrescribe el manifest del root
- [ ] Verificar que la detección de PWA funciona en iOS
- [ ] Verificar que el localStorage persiste después de cerrar

## 📱 Casos de Uso Reales

### Usuario Normal

1. Busca en Google "reformas Murcia"
2. Entra en alemanypajaron.es
3. Ve proyectos y servicios
4. Solicita presupuesto
5. Nunca ve botón de login
6. No se confunde

### Administrador - Primera vez

1. Recibe instrucciones "instala la app"
2. Va a alemanypajaron.es en móvil
3. Hace scroll al footer
4. Toca el ⚙️ discreto
5. Ve banner de instalación
6. Toca "Ver cómo instalar"
7. Sigue pasos
8. Instala "A&P Admin"
9. Hace login
10. Trabaja normalmente

### Administrador - Uso diario

1. Toca icono "A&P Admin" en su móvil
2. Se abre automáticamente en el panel
3. Gestiona proyectos/presupuestos/blog
4. Cierra la app
5. Vuelve a abrir cuando necesita
6. Todo funciona como app nativa

## ✅ Criterios de Éxito

- [ ] Usuarios NO ven login ni se confunden
- [ ] Admin puede instalar PWA fácilmente
- [ ] PWA funciona como app nativa
- [ ] Redirección automática funciona
- [ ] Banner de instalación es inteligente
- [ ] Manifests correctos según contexto
- [ ] Experiencia fluida en todos los dispositivos
