# Alemán y Pajarón - Sitio Web

**Estudio de Arquitectura Técnica en Murcia**

Sitio web profesional para Alemán y Pajarón, especializado en dirección de obra, gestión de proyectos, licencias y reformas integrales en Murcia.

---

## 📋 Índice

1. [Estado Actual](#-estado-actual)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Páginas Creadas](#-páginas-creadas)
4. [Stack Tecnológico](#-stack-tecnológico)
5. [SEO y Marketing](#-seo-y-marketing)
6. [Pendiente para 200%](#-pendiente-para-200)
7. [Optimizaciones Futuras](#-optimizaciones-futuras-con-servidor)
8. [Instalación y Uso](#-instalación-y-uso)
9. [Información de Contacto](#-información-de-contacto)

---

## 🚀 Estado Actual

**Versión:** 1.0 (MVP Funcional)  
**Progreso:** ~70% completado

### ✅ Completado
- Diseño responsive completo
- Sistema de estilos CSS (1,600+ líneas)
- JavaScript funcional (animaciones, menú, formularios)
- Páginas principales creadas
- SEO on-page básico implementado
- Schema.org markup
- Componentes reutilizables (header, footer, WhatsApp, scroll-top)

### ⏳ En Progreso
- Páginas de servicios individuales
- Artículos de blog
- Casos de estudio de proyectos

---

## 📁 Estructura del Proyecto

```
ALEMANYPAJARON/
├── index.html                  # Página principal
├── nosotros.html               # Sobre nosotros
├── contacto.html               # Formulario de contacto
├── presupuesto.html            # Solicitud de presupuesto
├── README.md                   # Esta documentación
│
├── css/
│   └── styles.css              # Estilos completos (1,656 líneas)
│
├── js/
│   ├── main.js                 # JavaScript principal
│   └── components.js           # Cargador de componentes (para servidor)
│
├── img/                        # Imágenes (pendiente)
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   └── og-image.jpg
│
├── components/                 # Componentes reutilizables (para servidor)
│   ├── header.html
│   ├── footer.html
│   ├── whatsapp.html
│   ├── scroll-top.html
│   └── cookie-banner.html
│
├── servicios/
│   ├── index.html              # Listado de servicios
│   ├── direccion-obra.html     # ✅ Creada
│   ├── gestion-proyectos.html  # ✅ Creada
│   ├── licencias-permisos.html # ✅ Creada
│   ├── reformas-integrales.html# ✅ Creada
│   ├── asesoramiento-tecnico.html  # ⏳ Pendiente
│   └── diseno-espacios.html    # ⏳ Pendiente
│
├── proyectos/
│   ├── index.html              # ✅ Portfolio con filtros
│   ├── viviendas/              # ⏳ Casos de estudio
│   ├── locales-comerciales/
│   ├── oficinas/
│   └── rehabilitaciones/
│
├── blog/
│   ├── index.html              # ✅ Listado de artículos
│   ├── licencia-obra-murcia.html    # ⏳ Pendiente
│   ├── precio-reforma-murcia.html   # ⏳ Pendiente
│   └── direccion-obra-murcia.html   # ⏳ Pendiente
│
└── legal/
    ├── aviso-legal.html        # ✅ Creada
    ├── privacidad.html         # ✅ Creada
    └── cookies.html            # ✅ Creada
```

---

## 📄 Páginas Creadas

### Principales
| Página | Estado | Descripción |
|--------|--------|-------------|
| index.html | ✅ | Home con hero, servicios, proyectos, blog |
| nosotros.html | ✅ | Historia, valores, equipo |
| contacto.html | ✅ | Formulario + info contacto |
| presupuesto.html | ✅ | Formulario detallado |

### Servicios
| Página | Estado | Keywords SEO |
|--------|--------|--------------|
| servicios/index.html | ✅ | Servicios arquitectura técnica Murcia |
| direccion-obra.html | ✅ | Dirección de obra Murcia |
| gestion-proyectos.html | ✅ | Gestión proyectos construcción Murcia |
| licencias-permisos.html | ✅ | Licencia de obra Murcia, permisos |
| reformas-integrales.html | ✅ | Reformas integrales Murcia |
| asesoramiento-tecnico.html | ⏳ | Asesoramiento técnico Murcia |
| diseno-espacios.html | ⏳ | Diseño espacios interiores Murcia |

### Proyectos
| Página | Estado | Descripción |
|--------|--------|-------------|
| proyectos/index.html | ✅ | Portfolio con filtros |
| Casos individuales | ⏳ | 8-10 proyectos con detalles |

### Blog
| Página | Estado | Keywords SEO |
|--------|--------|--------------|
| blog/index.html | ✅ | Blog arquitectura Murcia |
| licencia-obra-murcia.html | ⏳ | Licencia obra Murcia guía |
| precio-reforma-murcia.html | ⏳ | Precio reforma piso Murcia |
| direccion-obra-murcia.html | ⏳ | Qué es dirección de obra |

### Legal
| Página | Estado |
|--------|--------|
| legal/aviso-legal.html | ✅ |
| legal/privacidad.html | ✅ |
| legal/cookies.html | ✅ |

---

## 🛠 Stack Tecnológico

### Frontend
- **HTML5** semántico
- **CSS3** con variables custom (Design System)
- **JavaScript** vanilla (ES6+)
- **Google Fonts**: Inter + Poppins

### Características CSS
- Sistema de variables para colores, tipografía, espaciado
- Paleta: Primary #0A2230, Accent #F9B513
- Grid system responsive (4/3/2/1 columnas)
- Animaciones GPU-accelerated
- Mobile-first con breakpoints: 640px, 768px, 1024px

### Características JS
- IntersectionObserver para animaciones on-scroll
- Counter animations con easing
- Mobile menu con overlay
- Scroll to top con throttling
- Form validation en tiempo real
- Cookie consent con localStorage
- Filtros de portfolio

---

## 🔍 SEO y Marketing

### Implementado
- ✅ Meta tags completos (title, description, keywords)
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Schema.org markup (ProfessionalService, Service)
- ✅ Semantic HTML5
- ✅ Keywords locales "Murcia" en todas las páginas
- ✅ Alt text en imágenes

### Keywords Objetivo
```
Primary:
- arquitectura técnica murcia
- arquitecto técnico murcia
- aparejador murcia

Servicios:
- dirección de obra murcia
- reformas integrales murcia
- licencia de obra murcia
- gestión proyectos construcción murcia

Long-tail:
- cuánto cuesta reformar piso murcia
- cómo solicitar licencia obra murcia ayuntamiento
- precio reforma integral murcia
```

---

## 📌 Pendiente para 200%

### Alta Prioridad
- [ ] Páginas servicios: asesoramiento-tecnico.html, diseno-espacios.html
- [ ] 3 artículos de blog SEO completos
- [ ] 6-8 casos de estudio de proyectos
- [ ] Imágenes reales de proyectos (carpeta /img)
- [ ] Favicon y apple-touch-icon
- [ ] sitemap.xml
- [ ] robots.txt

### Media Prioridad
- [ ] Integración formularios (EmailJS, Formspree, o backend)
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Google My Business optimizado
- [ ] Página equipo.html con fotos

### Baja Prioridad
- [ ] Testimonios reales con fotos
- [ ] Integración redes sociales
- [ ] Blog con más artículos (+10)
- [ ] Versión en inglés (opcional)
- [ ] Chat widget (Crisp, Tawk.to)

---

## ⚡ Optimizaciones Futuras (Con Servidor)

### Sistema de Componentes
Actualmente los componentes (header, footer, etc.) están incluidos en cada HTML porque el proyecto funciona sin servidor (file://). 

**Con un servidor web**, se puede activar el sistema de componentes modular:

```javascript
// js/components.js - Ya creado, listo para usar

// Componentes se cargan dinámicamente:
<div id="header-placeholder"></div>  // Se reemplaza por components/header.html
<div id="footer-placeholder"></div>  // Se reemplaza por components/footer.html
```

**Ventajas:**
- Un solo archivo para header/footer
- Cambios se aplican a todas las páginas
- Menos código duplicado
- Más fácil de mantener

**Cómo activar:**
1. Subir a servidor web (Apache, Nginx, Netlify, Vercel)
2. Cambiar cada página a usar placeholders
3. El JS ya está preparado para cargarlos

### Otras Optimizaciones con Servidor
- [ ] Minificación CSS/JS (build process)
- [ ] Compresión GZIP
- [ ] Caché de assets
- [ ] Lazy loading de imágenes con `loading="lazy"`
- [ ] Imágenes WebP con fallback
- [ ] Critical CSS inline
- [ ] Service Worker para PWA
- [ ] HTTPS (Let's Encrypt)

---

## 💻 Instalación y Uso

### ⚡ Inicio Rápido (RECOMENDADO)

**Doble click en:** `INICIAR-AQUI.bat`

El script detectará automáticamente Python, Node.js o PHP y lanzará el servidor.
Se abrirá automáticamente en tu navegador.

### Opción Manual: Con servidor local

```bash
# Con Python (más común en Windows)
python -m http.server 8000

# Con Node.js
npx serve -l 3000

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000` (o el puerto correspondiente)

### ⚠️ Importante
**El sitio requiere servidor local** para cargar los componentes (header, footer, etc.).
No funcionará correctamente abriendo los archivos HTML directamente (file://).

### Opción 3: Despliegue
```bash
# Netlify (gratis)
# Subir carpeta completa o conectar con GitHub

# Vercel (gratis)
vercel deploy

# Hosting tradicional
# Subir por FTP a public_html
```

---

## 📞 Información de Contacto

**Alemán y Pajarón**
- 📱 Teléfono: 650 075 842
- 📧 Email: ivan@alemanypajaron.es
- 📍 Ubicación: Murcia, España
- 🌐 Web: alemanypajaron.es
- 📷 Instagram: @alemanypajaron
- 💼 LinkedIn: /company/alemanypajaron

**Horario:**
Lunes a Viernes: 8:00 - 16:00

---

## 📊 Métricas Objetivo

### Performance (Lighthouse)
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### Conversiones
- CTR en CTA: > 3%
- Formularios enviados/mes: > 20
- Llamadas desde web: > 10/mes

---

## 📝 Changelog

### v1.0 (Diciembre 2024)
- Estructura inicial del proyecto
- Diseño responsive completo
- Páginas principales
- Sistema de estilos CSS
- JavaScript funcional
- SEO básico implementado

---

## 📄 Licencia

Proyecto propietario de Alemán y Pajarón. Todos los derechos reservados.

---

*Documentación creada: Diciembre 2024*
*Última actualización: Diciembre 2024*