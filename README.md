# Alemán y Pajarón - Web Corporativa Next.js

**Sitio web profesional de arquitectura técnica construido con Next.js 15, React 19, TypeScript y Tailwind CSS**

🌐 **En producción:** [webnext-one.vercel.app](https://webnext-one.vercel.app)  
📦 **Repositorio:** [github.com/alemanypajaron/webnext](https://github.com/alemanypajaron/webnext)

---

## 🎯 Sobre el Proyecto

Sitio web completo para **Alemán y Pajarón**, estudio de arquitectura técnica en Murcia, especializado en:
- Dirección de obra
- Reformas integrales
- Gestión de proyectos
- Licencias y permisos
- Asesoramiento técnico
- Diseño de espacios

---

## ✅ Estado del Proyecto

**✨ PROYECTO COMPLETO Y EN PRODUCCIÓN**

- ✅ 21 páginas completamente funcionales
- ✅ 6 páginas de servicios con contenido SEO optimizado
- ✅ Componentes reutilizables (Header, Footer, FAQ, PageHeader)
- ✅ SEO completo (metadata, sitemap, robots.txt, JSON-LD)
- ✅ Diseño responsive y accesible
- ✅ Deploy automático con Vercel
- ✅ Imágenes optimizadas
- ✅ Analytics integrado

---

## 🚀 Inicio Rápido

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/alemanypajaron/webnext.git
cd webnext

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

**Servidor local:** [http://localhost:3000](http://localhost:3000)

### Variables de Entorno (Opcional)

Crea un archivo `.env.local`:

```env
GOOGLE_VERIFICATION_CODE=tu_codigo_aqui
```

---

## 📁 Estructura del Proyecto

```
webnext/
├── src/
│   ├── app/                          # App Router de Next.js
│   │   ├── actions/                  # Server Actions
│   │   │   └── forms.ts              # Envío de formularios
│   │   ├── layout.tsx                # Layout principal (Header + Footer)
│   │   ├── page.tsx                  # Home
│   │   ├── globals.css               # Estilos globales + Tailwind
│   │   ├── favicon.ico               # Favicon
│   │   ├── opengraph-image.tsx       # OG image dinámica
│   │   ├── twitter-image.tsx         # Twitter card dinámica
│   │   ├── sitemap.ts                # Sitemap XML
│   │   ├── robots.ts                 # Robots.txt
│   │   ├── nosotros/                 # Sobre nosotros
│   │   ├── contacto/                 # Contacto + formulario
│   │   ├── presupuesto/              # Solicitud presupuesto
│   │   ├── servicios/                # 6 servicios + índice
│   │   │   ├── page.tsx              # Índice de servicios
│   │   │   ├── asesoramiento-tecnico/
│   │   │   ├── direccion-obra/
│   │   │   ├── diseno-espacios/
│   │   │   ├── gestion-proyectos/
│   │   │   ├── licencias-permisos/
│   │   │   └── reformas-integrales/
│   │   ├── blog/                     # Blog (estructura lista)
│   │   ├── proyectos/                # Portfolio
│   │   └── legal/                    # Aviso legal, Privacidad, Cookies
│   ├── components/
│   │   ├── forms/                    # Formularios con Supabase
│   │   │   ├── ContactForm.tsx       # Formulario de contacto
│   │   │   └── PresupuestoForm.tsx   # Formulario de presupuesto
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Navegación principal
│   │   │   └── Footer.tsx            # Footer con enlaces + créditos
│   │   ├── ui/
│   │   │   ├── FAQ.tsx               # Componente preguntas frecuentes
│   │   │   ├── PageHeader.tsx        # Header de páginas internas
│   │   │   ├── ScrollToTop.tsx       # Botón volver arriba
│   │   │   └── WhatsAppButton.tsx    # Botón WhatsApp flotante
│   │   └── seo/
│   │       └── JsonLd.tsx            # Structured data
│   └── lib/
│       ├── supabase.ts               # Cliente de Supabase
│       └── structuredData.ts         # Helpers para JSON-LD
├── public/
│   ├── img/                          # Logos
│   └── images/                       # Imágenes
├── .gitignore
├── .env.local                        # Variables de entorno (NO en Git)
├── supabase-schema.sql               # Schema SQL para Supabase
├── SUPABASE_CONFIG.md                # Documentación Supabase
├── next.config.ts                    # Configuración Next.js
├── tailwind.config.js                # Configuración Tailwind
├── tsconfig.json                     # Configuración TypeScript
└── package.json
```

---

## 🛠 Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Next.js** | 15.1.6 | Framework React con App Router |
| **React** | 19.0.0 | UI Library |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 3.4.1 | Estilos utility-first |
| **Supabase** | Latest | Base de datos PostgreSQL + Backend |
| **Google Fonts** | - | Inter + Poppins |

---

## 🗄️ Supabase (Base de Datos)

### **Configuración:**

1. **Crea archivo `.env.local`** en la raíz:
```env
NEXT_PUBLIC_SUPABASE_URL=tu-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

2. **Ejecuta los schemas en Supabase:**
   
   **Paso 1:** Si ya ejecutaste el schema de formularios, salta al Paso 2.
   Si no, ejecuta `supabase/supabase-schema.sql` (formularios).
   
   **Paso 2:** Ejecuta `supabase-schema-proyectos-blog.sql` (nuevas tablas):
   - Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
   - Abre el **SQL Editor**
   - Copia y ejecuta el contenido completo
   - Esto creará tablas + datos de ejemplo

3. **Verifica las tablas:**
   
   **Formularios:**
   - ✅ `contactos` → Formulario de contacto
   - ✅ `presupuestos` → Solicitudes de presupuesto
   - ✅ `newsletter` → Suscriptores (opcional)
   
   **Proyectos y Blog:**
   - ✅ `proyectos` → Portfolio de proyectos
   - ✅ `imagenes_proyectos` → Galería múltiple por proyecto
   - ✅ `categorias_blog` → Categorías de artículos
   - ✅ `blog_articulos` → Artículos completos con SEO

4. **Configura en Vercel:**
   - Settings → Environment Variables
   - Añade `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Redeploy

📖 **Documentación completa:** Ver [`SUPABASE_CONFIG.md`](SUPABASE_CONFIG.md)

---

## 📄 Páginas del Sitio

### Páginas Principales (7)
- ✅ **/** - Home con hero, servicios, stats
- ✅ **/nosotros** - Historia y valores del estudio
- ✅ **/servicios** - Índice de servicios
- ✅ **/contacto** - Formulario de contacto (conectado a Supabase)
- ✅ **/presupuesto** - Solicitud de presupuesto (conectado a Supabase)
- ✅ **/blog** - Listado dinámico de artículos desde Supabase
- ✅ **/proyectos** - Portfolio dinámico desde Supabase

### Páginas Dinámicas (2 tipos)
- ✅ **/proyectos/[slug]** - Páginas individuales de proyectos (SSG)
  - Hero con imagen principal
  - Detalles completos del proyecto
  - Galería de imágenes
  - Sidebar con info y servicios
  - CTAs integrados
  
- ✅ **/blog/[slug]** - Páginas individuales de artículos (SSG)
  - Hero con imagen destacada
  - Contenido HTML enriquecido
  - Meta información (autor, fecha, tiempo lectura)
  - Compartir en redes sociales
  - Artículos relacionados
  - Contador de visitas

### Servicios (6 páginas completas)
Cada una con:
- Descripción detallada del servicio
- Proceso paso a paso
- Beneficios y ventajas
- Casos de uso
- FAQ con preguntas frecuentes
- CTA (call to action)
- SEO optimizado (metadata + JSON-LD)

1. ✅ **/servicios/asesoramiento-tecnico**
2. ✅ **/servicios/direccion-obra**
3. ✅ **/servicios/diseno-espacios**
4. ✅ **/servicios/gestion-proyectos**
5. ✅ **/servicios/licencias-permisos**
6. ✅ **/servicios/reformas-integrales**

### Páginas Legales (3)
- ✅ **/legal/aviso-legal**
- ✅ **/legal/privacidad**
- ✅ **/legal/cookies**

**Total: 21 páginas estáticas + Páginas dinámicas ilimitadas (proyectos y blog)**

---

## ✨ Características Completas del Sistema

### 🗄️ Base de Datos (Supabase)
- ✅ **7 tablas configuradas**: proyectos, imágenes, blog, categorías, contactos, presupuestos, newsletter
- ✅ **Row Level Security (RLS)** en todas las tablas
- ✅ **Políticas de seguridad** configuradas (lectura pública, escritura controlada)
- ✅ **Datos de ejemplo** incluidos (1 proyecto, 1 artículo, 4 categorías)
- ✅ **Triggers automáticos** para updated_at

### 📄 Páginas Dinámicas (SSG)
- ✅ **generateStaticParams** para pre-renderizar en build time
- ✅ **Metadata dinámica** por proyecto/artículo
- ✅ **Páginas ilimitadas** desde base de datos
- ✅ **Galería de imágenes** múltiple por proyecto
- ✅ **Contador de visitas** en artículos

### 📝 Formularios Funcionales
- ✅ **Validación en tiempo real** (email, campos requeridos)
- ✅ **Estados de carga** con spinners animados
- ✅ **Feedback visual** (éxito/error con colores)
- ✅ **Reseteo automático** tras envío exitoso
- ✅ **Guardado en Supabase** automático

### 🎨 UI/UX
- ✅ **Diseño responsive** perfecto en móvil/tablet/desktop
- ✅ **Hover effects** y animaciones suaves
- ✅ **Cards modernas** con sombras y transiciones
- ✅ **Compartir en redes** (Facebook, Twitter, LinkedIn)
- ✅ **Categorías con colores** personalizados
- ✅ **Tags y etiquetas** en artículos

---

## 🎨 Diseño

### Paleta de Colores

```css
Primary:       #0A2230  /* Azul oscuro */
Primary Light: #0F2D3F
Primary Dark:  #050F16
Accent:        #F9B513  /* Amarillo dorado */
Accent Dark:   #E0A410
```

### Tipografía

- **Títulos:** Poppins (Google Fonts)
- **Cuerpo:** Inter (Google Fonts)

### Componentes UI

**Componentes de Layout:**
- Header responsive con navegación sticky
- Footer con enlaces, contacto y redes sociales
- PageHeader dinámico con imagen de fondo
- Botón WhatsApp flotante
- Scroll to top animado

**Componentes de Contenido:**
- Cards de proyectos con galería
- Cards de blog con categorías
- FAQ con acordeones animados
- **Formularios funcionales** con Supabase:
  - Formulario de contacto con validación
  - Formulario de presupuesto completo
  - Feedback en tiempo real (éxito/error)
  - Estados de carga (loading spinners)

**Componentes de Servicio:**
- Hero sections con overlays
- Stats y métricas
- Galerías de imágenes responsive
- Botones de compartir en redes
- Badges y etiquetas dinámicas

---

## 🔍 SEO & Performance

### Optimizaciones Implementadas

✅ **Metadata completa** en todas las páginas:
- Title dinámico por página
- Description optimizada
- Keywords locales (Murcia)
- Canonical URLs
- Open Graph (Facebook, LinkedIn)
- Twitter Cards

✅ **Structured Data (JSON-LD)**:
- LocalBusiness
- Service (en cada servicio)
- WebSite
- BreadcrumbList

✅ **Archivos SEO**:
- `sitemap.xml` dinámico
- `robots.txt` configurado
- OpenGraph image dinámica
- Twitter image dinámica

✅ **Performance**:
- Imágenes optimizadas con `next/image`
- Server Components por defecto
- **Static Generation** (21 páginas base + proyectos y blog dinámicos)
- **ISR (Incremental Static Regeneration)** listo
- CSS optimizado con Tailwind
- Fonts optimizados con `next/font`
- **Edge-ready** para deploy global

---

## 📝 Scripts NPM

```bash
# Desarrollo
npm run dev          # Servidor local en puerto 3000

# Producción
npm run build        # Build optimizado para producción
npm start            # Servidor de producción

# Calidad de código
npm run lint         # ESLint check
```

---

## 🚀 Deploy & CI/CD

### Deploy en Vercel (Configurado y Activo)

**URL de Producción:** https://webnext-one.vercel.app

#### Configuración Actual:

```yaml
Framework: Next.js (detectado automáticamente)
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 20.x
```

#### Workflow de Deploy:

```bash
# 1. Hacer cambios en código local
git add .
git commit -m "feat: descripción del cambio"

# 2. Push a GitHub
git push origin main

# 3. Vercel detecta el push automáticamente
#    - Inicia build (~45 segundos)
#    - Ejecuta tests (si los hay)
#    - Deploy automático
#    - URL actualizada

# 4. ✅ Deploy completado
#    Producción actualizada en ~1 minuto
```

#### URLs Disponibles:

- **Producción:** `webnext-one.vercel.app`
- **Git Branch:** `webnext-git-main-ivan-alemans-projects.vercel.app`
- **Preview (por commit):** `webnext-[hash].vercel.app`

#### Monitoreo en Vercel:

- **Dashboard:** https://vercel.com/dashboard
- **Build Logs:** Ver progreso y errores en tiempo real
- **Runtime Logs:** Monitorear errores en producción
- **Analytics:** Métricas de tráfico y performance
- **Speed Insights:** Core Web Vitals

### Deploy Alternativo (Netlify)

```bash
# Build settings
Build command: npm run build
Publish directory: .next

# Environment variables (opcional)
GOOGLE_VERIFICATION_CODE = tu_codigo
```

---

## 🔄 Workflow de Desarrollo

### Para Desarrolladores

```bash
# 1. Clonar y configurar
git clone https://github.com/alemanypajaron/webnext.git
cd webnext
npm install

# 2. Crear branch para nueva feature
git checkout -b feature/nueva-funcionalidad

# 3. Desarrollar localmente
npm run dev
# Hacer cambios...

# 4. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-funcionalidad

# 5. Vercel crea preview deployment automático
# URL preview: webnext-git-feature-nueva-funcionalidad-*.vercel.app

# 6. Merge a main cuando esté listo
# → Deploy automático a producción
```

### Para Contenido/Marketing

```bash
# Solo necesitas editar archivos y hacer push
# Todo el proceso de deploy es automático

# Ejemplo: Actualizar texto en home
1. Editar: src/app/page.tsx
2. git add .
3. git commit -m "content: actualizar home"
4. git push
5. ✅ En producción en 1 minuto
```

---

## 📊 Analytics & Monitoreo

### Vercel Analytics (Incluido)

- ✅ **Web Analytics**: Visitantes, páginas vistas, países
- ✅ **Speed Insights**: Core Web Vitals en tiempo real
- ✅ **Deployment History**: Historial completo de deploys

### Configurar Google Analytics (Opcional)

Añadir en `src/app/layout.tsx`:

```tsx
import Script from 'next/script'

// En el return del layout
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

## 🎯 Próximos Pasos (Roadmap)

### Corto Plazo
- [ ] Configurar dominio personalizado `alemanypajaron.es`
- [ ] Conectar formularios a servicio de email (Resend/SendGrid)
- [ ] Implementar artículos de blog con contenido
- [ ] Añadir casos de estudio de proyectos con imágenes

### Medio Plazo
- [ ] Sistema de gestión de contenido (CMS headless)
- [ ] Multiidioma (ES/EN)
- [ ] Portal de clientes
- [ ] Integración con CRM

### Optimizaciones
- [ ] Convertir imágenes a WebP/AVIF
- [ ] Implementar ISR en blog
- [ ] A/B testing con Vercel
- [ ] PWA (Progressive Web App)

---

## 📞 Información de Contacto

### Alemán y Pajarón
- 📱 **Teléfono:** 650 075 842
- 📧 **Email:** ivan@alemanypajaron.es
- 📍 **Ubicación:** Murcia, España
- 🕐 **Horario:** Lunes a Viernes, 8:00 - 16:00
- 🌐 **Web:** https://webnext-one.vercel.app

### Redes Sociales
- **Instagram:** [@alemanypajaron](https://www.instagram.com/alemanypajaron/)
- **LinkedIn:** [Alemán y Pajarón](https://www.linkedin.com/company/alemanypajaron/)

---

## 🤝 Créditos

**Desarrollado con ❤️ en Murcia**

- **Web desarrollada por:** [ESKALA marketing digital](https://www.eskaladigital.com)
- **Framework:** Next.js by Vercel
- **Hosting:** Vercel
- **Diseño:** Basado en arquitectura técnica moderna

---

## 📄 Licencia

© 2026 Alemán y Pajarón. Todos los derechos reservados.

---

## 🆘 Soporte & Troubleshooting

### Problemas Comunes

**Error: Puerto 3000 en uso**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [numero] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Error: node_modules**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build falla en Vercel**
- Revisar Build Logs en Vercel Dashboard
- Verificar que no haya errores de TypeScript
- Comprobar que todas las imágenes existan

### Contacto para Soporte Técnico

📧 ivan@alemanypajaron.es  
💬 WhatsApp: +34 650 075 842

---

**✨ Proyecto en producción desde Enero 2026**  
**🚀 Deploy automático configurado**  
**📈 SEO optimizado para Murcia**
