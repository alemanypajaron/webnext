# 🏗️ Alemán y Pajarón - Web Corporativa Next.js

**Sitio web profesional de gestión de obras y proyectos construido con Next.js 15, React 19, TypeScript y Tailwind CSS**

🌐 **En producción:** [www.alemanypajaron.es](https://www.alemanypajaron.es)  
📦 **Repositorio:** [github.com/alemanypajaron/webnext](https://github.com/alemanypajaron/webnext)  
📱 **Versión:** 1.0.0 - Producción Estable

---

## 🎯 Sobre el Proyecto

Sitio web completo para **Alemán y Pajarón**, técnicos de edificación y gestores de obras especializados en gestión de proyectos en Murcia:
- ✅ Dirección de obra
- ✅ Reformas integrales
- ✅ Gestión de proyectos
- ✅ Licencias y permisos
- ✅ Asesoramiento técnico
- ✅ Diseño de espacios

---

## ✅ Estado del Proyecto

**🎉 VERSIÓN 1.0 - PRODUCCIÓN ESTABLE**

### Funcionalidades Principales
- ✅ **21 páginas** completamente funcionales
- ✅ **6 servicios** con contenido SEO optimizado
- ✅ **Blog dinámico** con editor TinyMCE profesional
- ✅ **Portfolio de proyectos** con galería de imágenes
- ✅ **Panel de administración** completo y seguro
- ✅ **PWA instalable** (funciona como app nativa)
- ✅ **Notificaciones PUSH** en tiempo real
- ✅ **Sesión persistente** (nunca expira en móvil)
- ✅ **SEO completo** (metadata, sitemap, JSON-LD)
- ✅ **Analytics integrado** con Google Analytics
- ✅ **Deploy automático** con Vercel
- ✅ **Base de datos** Supabase PostgreSQL
- ✅ **Storage** para imágenes y multimedia
- ✅ **Responsive** perfecto en todos los dispositivos

---

## 🚀 Acceso a la Aplicación

### ✅ Producción (RECOMENDADO)

**La aplicación está desplegada y funcionando en Vercel:**

🌐 **URL Principal:** [https://www.alemanypajaron.es](https://www.alemanypajaron.es)  
🌐 **URL de Vercel:** [https://webnext-one.vercel.app](https://webnext-one.vercel.app)

**No es necesario ejecutar nada en local.** La aplicación está completamente operativa en Vercel con:
- ✅ Deploy automático al hacer push a GitHub
- ✅ HTTPS configurado
- ✅ CDN global
- ✅ Supabase integrado
- ✅ Panel de administración funcional

---

### 🛠 Desarrollo Local (OPCIONAL)

**Solo si necesitas desarrollar o probar cambios localmente:**

```bash
# 1. Clonar el repositorio
git clone https://github.com/alemanypajaron/webnext.git
cd webnext

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env.local con tus credenciales de Supabase
# Ver sección "Variables de Entorno" abajo

# 4. Iniciar servidor de desarrollo
npm run dev
```

**Servidor local:** [http://localhost:3000](http://localhost:3000)

⚠️ **NOTA IMPORTANTE:** Una vez que la aplicación está en Vercel, **no es necesario ejecutar el servidor local** a menos que estés desarrollando nuevas funcionalidades.

---

### 🔐 Variables de Entorno (Solo desarrollo local)

Si vas a desarrollar localmente, crea un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_TINYMCE_API_KEY=tu-tinymce-api-key
```

**En Vercel estas variables ya están configuradas** en Settings → Environment Variables.

📖 **Más info:** Ver [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md) y [`CONFIGURAR_TINYMCE_VERCEL.md`](CONFIGURAR_TINYMCE_VERCEL.md)

---

## 📱 PWA & Notificaciones Push

### Progressive Web App (PWA)

La aplicación está configurada como **PWA instalable** en dispositivos móviles y escritorio:

- ✅ **Instalable** como app nativa (sin tiendas de aplicaciones)
- ✅ **Funciona offline** con Service Worker
- ✅ **Icono en pantalla de inicio**
- ✅ **Sin barra del navegador** (modo standalone)
- ✅ **Splash screen** personalizada
- ✅ **Tema corporativo** con colores de marca

**Cómo instalar:**
1. Visita [www.alemanypajaron.es](https://www.alemanypajaron.es) en Chrome/Safari
2. Click en "Añadir a pantalla de inicio"
3. La app se instala como aplicación nativa

### Notificaciones Push en Tiempo Real

El administrador recibe **notificaciones push automáticas** cuando lleguen:
- 📧 **Nuevos contactos** desde el formulario web
- 💼 **Nuevos presupuestos** solicitados
- 📰 **Nuevas suscripciones** al newsletter

**Características:**
- ✅ Funcionan con **app cerrada** o móvil bloqueado
- ✅ Soporta **múltiples dispositivos** simultáneamente
- ✅ **Sesión persistente** (nunca cierra sesión)
- ✅ **100% gratuito** (sin servicios externos)
- ✅ **Contador visual** en desktop (badge rojo)
- ✅ **Detección automática** móvil/desktop
- ✅ **Configuración sencilla** desde el panel
- ✅ **Click en notificación** abre el panel de notificaciones pendientes

**Documentación:**
- 📖 [`PUSH_NOTIFICATIONS_SETUP.md`](PUSH_NOTIFICATIONS_SETUP.md) - Guía de configuración completa
- 📖 [`PUSH_NOTIFICATIONS_README.md`](PUSH_NOTIFICATIONS_README.md) - Resumen ejecutivo
- 📖 [`SOLUCION_LOGIN_MOVIL.md`](SOLUCION_LOGIN_MOVIL.md) - Solución técnica login móvil

---

## 📁 Estructura del Proyecto

```
webnext/
├── src/
│   ├── app/                          # App Router de Next.js
│   │   ├── actions/                  # Server Actions
│   │   │   ├── forms.ts              # Envío de formularios
│   │   │   ├── admin.ts              # Operaciones admin (CRUD)
│   │   │   └── auth.ts               # Autenticación admin
│   │   ├── administrator/            # 🔐 Panel de administración
│   │   │   ├── login/                # Login admin
│   │   │   ├── page.tsx              # Dashboard (contactos)
│   │   │   ├── presupuestos/         # Gestión presupuestos
│   │   │   ├── blog/                 # CMS Blog (crear, editar, eliminar)
│   │   │   ├── proyectos/            # Gestión proyectos
│   │   │   └── layout.tsx            # Layout admin con navegación
│   │   ├── api/                      # API Routes
│   │   │   └── blog/imagenes/        # Subida de imágenes a Supabase Storage
│   │   ├── layout.tsx                # Layout principal (Header + Footer)
│   │   ├── page.tsx                  # Home
│   │   ├── globals.css               # Estilos globales + Tailwind + Blog
│   │   ├── opengraph-image.tsx       # OG image dinámica
│   │   ├── twitter-image.tsx         # Twitter card dinámica
│   │   ├── sitemap.ts                # Sitemap XML
│   │   ├── robots.ts                 # Robots.txt
│   │   ├── middleware.ts             # Protección rutas admin
│   │   ├── nosotros/                 # Sobre nosotros
│   │   ├── contacto/                 # Contacto + formulario
│   │   ├── presupuesto/              # Solicitud presupuesto
│   │   ├── servicios/                # 6 servicios + índice
│   │   │   ├── page.tsx              # Índice de servicios
│   │   │   ├── asesoramiento-tecnico/ # Con íconos amarillos
│   │   │   ├── direccion-obra/        # Con íconos amarillos
│   │   │   ├── diseno-espacios/       # Con íconos amarillos
│   │   │   ├── gestion-proyectos/     # Con íconos amarillos
│   │   │   ├── licencias-permisos/    # Con íconos amarillos
│   │   │   └── reformas-integrales/   # Con íconos amarillos
│   │   ├── blog/                     # Blog dinámico
│   │   │   ├── page.tsx              # Lista de artículos + Newsletter
│   │   │   └── [slug]/               # Artículo individual + Visitas
│   │   ├── proyectos/                # Portfolio dinámico
│   │   │   ├── page.tsx              # Lista de proyectos
│   │   │   └── [slug]/               # Proyecto individual
│   │   └── legal/                    # Aviso legal, Privacidad, Cookies
│   ├── components/
│   │   ├── admin/                    # 🔐 Componentes admin
│   │   │   ├── AdminNav.tsx          # Navegación del admin
│   │   │   ├── ContactosTable.tsx    # Tabla contactos
│   │   │   ├── PresupuestosTable.tsx # Tabla presupuestos
│   │   │   ├── BlogArticulosTable.tsx # Tabla blog
│   │   │   ├── ProyectosTable.tsx    # Tabla proyectos
│   │   │   ├── BlogArticuloForm.tsx  # Formulario blog (crear/editar)
│   │   │   ├── ProyectoForm.tsx      # Formulario proyecto
│   │   │   ├── RichTextEditor.tsx    # Editor TinyMCE
│   │   │   └── ImagenSelectorModal.tsx # Gestor de imágenes
│   │   ├── blog/
│   │   │   └── VisitasTracker.tsx    # Contador de visitas
│   │   ├── forms/                    # Formularios con Supabase
│   │   │   ├── ContactForm.tsx       # Formulario de contacto
│   │   │   ├── PresupuestoForm.tsx   # Formulario de presupuesto
│   │   │   └── NewsletterForm.tsx    # Formulario de newsletter
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
│       ├── supabase.ts               # Cliente de Supabase (público)
│       ├── supabase-server.ts        # Cliente Supabase con auth
│       ├── supabase-admin.ts         # Cliente admin (Service Role)
│       ├── data.ts                   # Funciones de fetch de datos
│       └── structuredData.ts         # Helpers para JSON-LD
├── public/
│   ├── img/                          # Logos
│   └── images/                       # Imágenes
├── supabase/                         # ⚠️ SCHEMAS SQL (siempre aquí)
│   ├── README.md                     # Documentación de schemas
│   ├── supabase-schema.sql           # Schema formularios
│   └── supabase-schema-proyectos-blog.sql  # Schema proyectos y blog
├── .gitignore
├── .env.local                        # Variables de entorno (NO en Git)
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
| **Supabase** | Latest | Base de datos PostgreSQL + Auth + Storage |
| **TinyMCE** | Latest | Editor WYSIWYG para blog |
| **React Hot Toast** | Latest | Notificaciones toast |
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
   
   📁 **IMPORTANTE:** Todos los schemas SQL están en `/supabase/`
   
   **Paso 1 - Formularios básicos:**
   - Ejecuta `/supabase/supabase-schema.sql` (si aún no lo hiciste)
   - Tablas: contactos, presupuestos, newsletter
   
   **Paso 2 - Proyectos y Blog:**
   - Ejecuta `/supabase/supabase-schema-proyectos-blog.sql`
   - Tablas: proyectos, imagenes_proyectos, categorias_blog, blog_articulos
   - **Incluye datos de ejemplo** (1 proyecto, 1 artículo, 4 categorías)
   
   **Cómo ejecutar:**
   - Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
   - Abre el **SQL Editor**
   - Copia el contenido del archivo SQL
   - Pégalo y ejecuta (click "Run")
   
   📖 **Más info:** Ver `/supabase/README.md`

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

### 🔐 Panel de Administración
- ✅ **Login con Supabase Auth** (protegido con middleware)
- ✅ **Dashboard completo** con navegación por tabs
- ✅ **Gestión de Contactos** (ver, marcar estado, eliminar)
- ✅ **Gestión de Presupuestos** (ver, cambiar estado: pendiente/respondido/atendido/rechazado/aceptado, eliminar)
- ✅ **CMS de Blog** (crear, editar, eliminar artículos)
  - Editor **TinyMCE** profesional con menús completos
  - Gestión de imágenes integrada con Supabase Storage
  - Selector de imágenes existentes o subida nueva
  - Vista previa de imagen destacada
  - Campo de fecha de publicación editable
  - Marcar artículos como destacados
- ✅ **Gestión de Proyectos** (crear, editar, eliminar, marcar como destacado)
- ✅ **Gestión de Newsletter** (ver suscriptores)
- ✅ **Gestión de Multimedia** (subir, eliminar, organizar imágenes de Supabase Storage)
- ✅ **Bypass RLS** con Service Role Key para operaciones admin
- ✅ **Notificaciones toast** para feedback inmediato
- ✅ **Completamente oculto** de motores de búsqueda, robots, Analytics y cache público
- ✅ **PWA instalable** en dispositivos móviles (funciona como app nativa)
- ✅ **Sesión persistente** (nunca expira, como una app nativa)
- ✅ **Notificaciones push** en tiempo real cuando lleguen nuevos contactos/presupuestos
- ✅ **Service Worker** integrado para funcionamiento offline

### 📝 Editor de Contenido (TinyMCE)
- ✅ **Menús completos**: File, Edit, View, Insert, Format, Tools, Table, Help
- ✅ **Toolbar profesional** con todas las opciones de formato
- ✅ **Interfaz en español**
- ✅ **Integración con gestor de imágenes** (modal personalizado)
- ✅ **Botón "Leer Más"** personalizado (como Joomla)
- ✅ **Vista código HTML** para edición avanzada
- ✅ **Autoguardado** del contenido

### 🖼️ Gestor de Imágenes
- ✅ **Supabase Storage** (bucket: `blog-images`)
- ✅ **Subida de imágenes** (JPG, PNG, GIF, WEBP, máx 5MB)
- ✅ **Validación de formato** y tamaño
- ✅ **Galería de imágenes** existentes con preview
- ✅ **Selección visual** con checkbox
- ✅ **Drag & drop** para subir
- ✅ **URLs públicas** generadas automáticamente
- ✅ **Integrado en TinyMCE** para insertar en contenido

### 🗄️ Base de Datos (Supabase)
- ✅ **7 tablas configuradas**: proyectos, imágenes, blog, categorías, contactos, presupuestos, newsletter
- ✅ **Row Level Security (RLS)** en todas las tablas
- ✅ **Políticas de seguridad** configuradas (lectura pública, escritura admin)
- ✅ **Supabase Storage** para imágenes del blog
- ✅ **Triggers automáticos** para `updated_at` y `actualizado_at`
- ✅ **Datos de ejemplo** incluidos (1 proyecto, 1 artículo, 4 categorías)
- ✅ **Service Role Key** para operaciones admin sin restricciones RLS

### 📄 Páginas Dinámicas (SSG)
- ✅ **generateStaticParams** para pre-renderizar en build time
- ✅ **Metadata dinámica** por proyecto/artículo
- ✅ **Páginas ilimitadas** desde base de datos
- ✅ **Galería de imágenes** múltiple por proyecto
- ✅ **Contador de visitas** en artículos del blog
- ✅ **Artículos relacionados** automáticos
- ✅ **Compartir en redes** (Facebook, Twitter/X, LinkedIn)

### 📝 Formularios Funcionales
- ✅ **Formulario de Contacto** (guardado en Supabase)
- ✅ **Formulario de Presupuesto** (con tipos de servicio y presupuesto)
- ✅ **Formulario de Newsletter** (suscripción directa, inline y centered)
  - Validación de email en tiempo real
  - Detección de emails duplicados
  - Mensaje de bienvenida personalizado
- ✅ **Validación en tiempo real** (email, campos requeridos)
- ✅ **Estados de carga** con spinners animados
- ✅ **Feedback visual** con toasts (éxito/error/info)
- ✅ **Reseteo automático** tras envío exitoso
- ✅ **Server Actions** para procesamiento seguro

### 🎨 UI/UX
- ✅ **Diseño responsive** perfecto en móvil/tablet/desktop
- ✅ **Hover effects** y animaciones suaves
- ✅ **Cards modernas** con sombras y transiciones
- ✅ **Compartir en redes** (Facebook, Twitter, LinkedIn)
- ✅ **Categorías con colores** personalizados
- ✅ **Tags y etiquetas** en artículos
- ✅ **Íconos homogeneizados** en servicios (fondo amarillo + ícono azul)
- ✅ **Tipografía consistente** en todo el blog
  - Headings con Poppins
  - Cuerpo con Inter
  - Tamaños y espaciados optimizados
  - Line-height mejorado para legibilidad
- ✅ **Estilos de contenido** mejorados para artículos del blog
  - H2 con borde inferior amarillo
  - Listas con bullets claros
  - Blockquotes con estilo personalizado
  - Código inline y bloques destacados
  - Tablas responsive con headers oscuros

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
- `sitemap.xml` dinámico (incluye páginas estáticas, blog, proyectos)
- `robots.txt` configurado (bloquea `/administrator`)
- OpenGraph image dinámica
- Twitter image dinámica
- **Google Analytics** integrado (excluye `/administrator`)
- **Google Search Console** verificado

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

**⚠️ Solo necesarios para desarrollo local (opcional):**

```bash
# Desarrollo Local (OPCIONAL)
npm run dev          # Servidor local en puerto 3000

# Build Local (NO NECESARIO - Vercel lo hace automáticamente)
npm run build        # Build optimizado para producción
npm start            # Servidor de producción

# Calidad de código
npm run lint         # ESLint check
```

**Para cambios en producción:** Solo haz `git push` y Vercel hace el build y deploy automáticamente.

---

## 🚀 Deploy & CI/CD

### Deploy en Vercel (Configurado y Activo)

**URL de Producción:** https://www.alemanypajaron.es  
**URL de Vercel:** https://webnext-one.vercel.app

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

- **Producción (Dominio Canónico):** `www.alemanypajaron.es` ← **URL PRINCIPAL**
- **Redirección automática:** `alemanypajaron.es` → `www.alemanypajaron.es`
- **Producción (Vercel):** `webnext-one.vercel.app` → `www.alemanypajaron.es`
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

### ✅ Workflow Principal (Sin servidor local)

**Para cualquier cambio en producción:**

```bash
# 1. Hacer cambios directamente en los archivos
# (Usando VS Code, Cursor, o cualquier editor)

# 2. Commit y push
git add .
git commit -m "feat/fix/content: descripción del cambio"
git push origin main

# 3. Vercel detecta el push automáticamente
# → Build (~45 segundos)
# → Deploy automático
# → ✅ En producción en ~1 minuto
```

**No necesitas:**
- ❌ Ejecutar `npm run dev`
- ❌ Ejecutar `npm run build`
- ❌ Abrir `localhost:3000`
- ❌ Ningún servidor local

**Solo necesitas:**
- ✅ Editar archivos
- ✅ `git push`
- ✅ Esperar ~1 minuto

---

### 🧪 Workflow con Desarrollo Local (OPCIONAL)

**Solo si quieres probar cambios antes de subirlos:**

```bash
# 1. Clonar y configurar (primera vez)
git clone https://github.com/alemanypajaron/webnext.git
cd webnext
npm install

# 2. Crear .env.local con credenciales de Supabase
# (Ver sección "Variables de Entorno")

# 3. Desarrollar localmente
npm run dev
# Hacer cambios...
# Probar en http://localhost:3000

# 4. Cuando esté listo, commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# 5. ✅ Deploy automático a producción
```

---

### 📝 Para Cambios de Contenido

**El más simple de todos:**

```bash
# Ejemplo: Actualizar texto en la home
1. Abrir archivo: src/app/page.tsx
2. Editar el texto que necesites
3. Guardar
4. git add .
5. git commit -m "content: actualizar home"
6. git push
7. ✅ En producción en 1 minuto (sin tocar npm ni localhost)
```

---

### 🔀 Workflow con Branches (Avanzado)

**Para features grandes o experimentales:**

```bash
# 1. Crear branch para nueva feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commit
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-funcionalidad

# 3. Vercel crea preview deployment automático
# URL preview: webnext-git-feature-nueva-funcionalidad-*.vercel.app

# 4. Probar en la URL de preview

# 5. Merge a main cuando esté listo
git checkout main
git merge feature/nueva-funcionalidad
git push origin main

# 6. ✅ Deploy automático a producción
```

---

## 📊 Analytics & Monitoreo

### Google Analytics (Configurado)

- ✅ **Tracking ID:** `G-EH39D527MS`
- ✅ **Integrado** en `src/app/layout.tsx`
- ✅ **Páginas públicas:** Analytics activo
- ✅ **Panel admin (`/administrator`):** Analytics bloqueado (no registra tráfico)
- ✅ **Google Search Console:** Verificado

### Vercel Analytics (Incluido)

- ✅ **Web Analytics**: Visitantes, páginas vistas, países
- ✅ **Speed Insights**: Core Web Vitals en tiempo real
- ✅ **Deployment History**: Historial completo de deploys

### Privacidad del Panel Admin

El panel de administración (`/administrator`) está **completamente oculto**:
- ❌ **No indexado** por Google (robots.txt + meta noindex)
- ❌ **No rastreado** por bots (disallow en robots.txt)
- ❌ **No registrado** en Analytics (condicional en script)
- ❌ **No cacheable** en buscadores (meta nocache)
- ❌ **No archivable** en Wayback Machine (meta noarchive)
- ✅ **Solo accesible** con autenticación válida

---

## 🎯 Próximos Pasos (Roadmap)

### ✅ Completado Recientemente
- ✅ Sistema de gestión de contenido (CMS completo con TinyMCE)
- ✅ Panel de administración funcional
- ✅ Gestión de imágenes con Supabase Storage
- ✅ Formulario de newsletter integrado
- ✅ Contador de visitas en artículos
- ✅ Editor profesional de blog

### Corto Plazo
- [ ] Configurar dominio personalizado `alemanypajaron.es`
- [ ] Conectar formularios a servicio de email (Resend/SendGrid para notificaciones)
- [ ] Implementar envío masivo de newsletters
- [ ] Añadir más casos de estudio de proyectos con imágenes

### Medio Plazo
- [ ] Panel para gestionar suscriptores de newsletter (exportar, enviar)
- [ ] Multiidioma (ES/EN)
- [ ] Portal de clientes
- [ ] Integración con CRM
- [ ] Sistema de comentarios en blog
- [ ] Búsqueda de artículos y proyectos

### Optimizaciones
- [ ] Convertir imágenes a WebP/AVIF automáticamente
- [ ] Implementar ISR en blog
- [ ] A/B testing con Vercel
- [x] **PWA (Progressive Web App)** ✅ Implementada
- [x] **Notificaciones Push** ✅ Implementadas
- [x] **Sesión Persistente** ✅ Implementada
- [ ] Lazy loading de imágenes en galerías

---

## 📞 Información de Contacto

### Alemán y Pajarón
- 📱 **Teléfono:** 650 075 842
- 📧 **Email:** ivan@alemanypajaron.es
- 📍 **Ubicación:** Murcia, España
- 🕐 **Horario:** Lunes a Viernes, 8:00 - 16:00
- 🌐 **Web:** https://www.alemanypajaron.es

### Redes Sociales
- **Instagram:** [@alemanypajaron](https://www.instagram.com/alemanypajaron/)
- **LinkedIn:** [Alemán y Pajarón](https://www.linkedin.com/company/alemanypajaron/)

---

## 🤝 Créditos

**Desarrollado con ❤️ en Murcia**

- **Web desarrollada por:** [ESKALA marketing digital](https://www.eskaladigital.com)
- **Framework:** Next.js by Vercel
- **Hosting:** Vercel
- **Diseño:** Basado en gestión profesional de obras

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
