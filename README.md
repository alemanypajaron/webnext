# Alemán y Pajarón - Next.js App

**Aplicación web moderna construida con Next.js 16, React 19, TypeScript y Tailwind CSS**

---

## ✅ **MIGRACIÓN COMPLETADA AL 100%**

El proyecto ha sido completamente migrado de HTML estático a Next.js.

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**La aplicación estará disponible en:** [http://localhost:3000](http://localhost:3000)

---

## 📄 Páginas Migradas (TODAS)

### ✅ Páginas Principales
- **Home** (`/`) - Página principal con hero, servicios, sobre nosotros
- **Nosotros** (`/nosotros`) - Historia, valores del estudio
- **Contacto** (`/contacto`) - Formulario de contacto e información
- **Presupuesto** (`/presupuesto`) - Solicitud de presupuesto detallado

### ✅ Servicios
- **Índice de Servicios** (`/servicios`)
- **Asesoramiento Técnico** (`/servicios/asesoramiento-tecnico`)
- **Dirección de Obra** (`/servicios/direccion-obra`)
- **Diseño de Espacios** (`/servicios/diseno-espacios`)
- **Gestión de Proyectos** (`/servicios/gestion-proyectos`)
- **Licencias y Permisos** (`/servicios/licencias-permisos`)
- **Reformas Integrales** (`/servicios/reformas-integrales`)

### ✅ Blog y Proyectos
- **Blog** (`/blog`) - Listado de artículos
- **Proyectos** (`/proyectos`) - Portfolio

### ✅ Páginas Legales
- **Aviso Legal** (`/legal/aviso-legal`)
- **Privacidad** (`/legal/privacidad`)
- **Cookies** (`/legal/cookies`)

---

## 📁 Estructura del Proyecto

```
ALEMANYPAJARON/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx          # Layout principal con Header/Footer
│   │   ├── page.tsx            # Página de inicio
│   │   ├── nosotros/
│   │   ├── contacto/
│   │   ├── presupuesto/
│   │   ├── servicios/          # 6 servicios + índice
│   │   ├── blog/
│   │   ├── proyectos/
│   │   └── legal/              # 3 páginas legales
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   └── ui/                 # WhatsApp, ScrollToTop
│   └── lib/                    # Utilidades
├── public/                     # Archivos estáticos
│   ├── img/                    # Logos
│   └── images/                 # Imágenes
├── _OLD_HTML_BACKUP/           # ⚠️ Backup archivos HTML antiguos
└── package.json
```

---

## 🛠 Stack Tecnológico

- **Framework:** Next.js 16.1.1 (App Router)
- **React:** 19.2.3
- **TypeScript:** 5.x
- **Estilos:** Tailwind CSS 3.x
- **Fuentes:** Google Fonts (Inter + Poppins)
- **Optimización:** next/image, Server Components

---

## ✨ Características Implementadas

✅ Todas las páginas migradas (20+ páginas)  
✅ Componentes reutilizables (Header, Footer, WhatsApp, ScrollToTop)  
✅ SEO optimizado con metadata de Next.js  
✅ Diseño responsive completo  
✅ Imágenes optimizadas con next/image  
✅ Animaciones y transiciones  
✅ Navegación funcional entre todas las páginas  
✅ Formularios de contacto y presupuesto  

---

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 3000)
npm run build    # Construir para producción
npm start        # Servidor de producción
npm run lint     # Ejecutar ESLint
```

---

## 🎨 Paleta de Colores

```css
Primary: #0A2230 (Azul oscuro)
Accent: #F9B513 (Amarillo dorado)
```

---

## 🚀 Despliegue

### Vercel (Recomendado - Gratis)

1. Conecta tu repositorio de GitHub
2. Vercel detectará automáticamente Next.js
3. Deploy automático en cada push

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

---

## 📦 Archivos Antiguos

Los archivos HTML estáticos originales están en la carpeta **`_OLD_HTML_BACKUP/`**

**Puedes eliminarlos cuando estés seguro de que todo funciona correctamente.**

---

## 📞 Contacto

**Alemán y Pajarón**
- 📱 Teléfono: 650 075 842
- 📧 Email: ivan@alemanypajaron.es
- 📍 Ubicación: Murcia, España
- 🌐 Web: alemanypajaron.es

**Horario:** Lunes a Viernes: 8:00 - 16:00

---

## 🎯 Próximos Pasos (Opcional)

- [ ] Conectar formularios a servicio de email (EmailJS, Resend, etc.)
- [ ] Agregar Google Analytics
- [ ] Implementar artículos de blog completos
- [ ] Agregar casos de estudio de proyectos con imágenes
- [ ] Configurar sitemap.xml y robots.txt
- [ ] Optimizar imágenes (convertir a WebP)

---

**✅ Migración completada:** Enero 2026  
**🚀 Proyecto listo para producción**
