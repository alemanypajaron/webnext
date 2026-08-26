# 🏗️ Alemán y Pajarón - Web Corporativa Next.js

**Sitio web profesional de gestión de obras y proyectos construido con Next.js 15, React 19, TypeScript y Tailwind CSS**

🌐 **En producción:** [www.alemanypajaron.es](https://www.alemanypajaron.es)  
📦 **Repositorio:** [github.com/alemanypajaron/webnext](https://github.com/alemanypajaron/webnext)  
📱 **Versión:** 1.0.0 - Producción Estable

---

## 🎯 Sobre el Proyecto

Sitio web completo para **Alemán y Pajarón**, técnicos de edificación y gestores de obras en **Murcia capital y un radio de ~50 km** (pedanías + área metropolitana):
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
- ✅ **~48 páginas estáticas** + blog y proyectos dinámicos
- ✅ **29 landings de servicio** + hub `/servicios` (SEO local Murcia / 50 km)
- ✅ **Blog dinámico** con editor TinyMCE profesional
- ✅ **Agentes de IA del blog** (redacción, portada e imágenes de cuerpo)
- ✅ **Portfolio de proyectos** con galería de imágenes
- ✅ **Panel de administración** completo y seguro
- ✅ **PWA instalable** (funciona como app nativa)
- ✅ **Notificaciones PUSH** en tiempo real
- ✅ **Sesión persistente** (nunca expira en móvil)
- ✅ **SEO local** (titles, sitemap, JSON-LD `areaServed`, cobertura 50 km, `seo_noindex` en blog)
- ✅ **Analytics integrado** con Google Analytics
- ✅ **Deploy automático** con Vercel
- ✅ **Base de datos** Supabase PostgreSQL
- ✅ **Storage** para imágenes y multimedia
- ✅ **Email SMTP Hostinger** (envío local desde `contacto@alemanypajaron.es`)
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
OPENAI_API_KEY=tu-openai-api-key

# Email SMTP (Hostinger) — solo local
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contacto@alemanypajaron.es
SMTP_PASS=tu-password-del-buzon
MAIL_FROM_NAME=Alemán y Pajarón
MAIL_FROM=contacto@alemanypajaron.es
MAIL_REPLY_TO=contacto@alemanypajaron.es
```

**En Vercel las variables de la web ya están configuradas** en Settings → Environment Variables. El SMTP de Hostinger se usa en local para enviar correos a clientes; no hace falta subirlo a Vercel salvo que más adelante se conecten los formularios.

📖 **Más info:** Ver [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md)  
📖 **Agentes de blog:** Ver [`AGENTES_BLOG_IA.md`](AGENTES_BLOG_IA.md)

---

## ✉️ Email SMTP (Hostinger)

Envío de correos desde local con el buzón `contacto@alemanypajaron.es` (dominio en Hostinger). La plantilla HTML usa la identidad de la web: navy `#0A2230`, dorado `#F9B513`, logo blanco, firma y pie.

### Comandos

```bash
# Comprobar usuario y contraseña SMTP
npm run mail:verificar

# Enviar (en Windows PowerShell usa npx tsx para pasar bien los argumentos)
npx tsx scripts/enviar-email.ts --to=cliente@correo.com --subject="Asunto" --body="Mensaje"

# Cuerpo largo desde archivo
npx tsx scripts/enviar-email.ts --to=cliente@correo.com --subject="Asunto" --body-file=mensaje.txt
```

### Outlook / clientes IMAP

| Campo | Entrante | Saliente |
|---|---|---|
| Servidor | `imap.hostinger.com` | `smtp.hostinger.com` |
| Puerto | `993` | `465` (o `587` si 465 falla) |
| Cifrado | SSL/TLS | SSL/TLS (o STARTTLS en 587) |
| Usuario | `contacto@alemanypajaron.es` | igual |
| SPA | Desmarcado | Desmarcado |

El script local usa puerto **587 + STARTTLS** (más fiable en Windows). No subas `SMTP_PASS` a Git.

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
- 📧 **Nuevos contactos** (histórico; /contacto ya no tiene formulario)
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
│   │   │   ├── blog/imagenes/        # Subida de imágenes a Supabase Storage
│   │   │   └── admin/blog/           # Agentes IA: redact, portada, cuerpo
│   │   ├── layout.tsx                # Layout principal (Header + Footer)
│   │   ├── page.tsx                  # Home
│   │   ├── globals.css               # Estilos globales + Tailwind + Blog
│   │   ├── opengraph-image.tsx       # OG image dinámica
│   │   ├── twitter-image.tsx         # Twitter card dinámica
│   │   ├── sitemap.ts                # Sitemap XML
│   │   ├── robots.ts                 # Robots.txt
│   │   ├── middleware.ts             # Protección rutas admin
│   │   ├── nosotros/                 # Sobre nosotros
│   │   ├── contacto/                 # Contacto + cobertura 50 km + mapa
│   │   ├── presupuesto/              # Solicitud presupuesto
│   │   ├── servicios/                # Hub + 29 landings
│   │   │   ├── page.tsx              # Índice (6 generales + demandados)
│   │   │   ├── direccion-obra/       # Money page
│   │   │   ├── licencias-permisos/   # Money page
│   │   │   ├── reformas-integrales/  # Money page
│   │   │   ├── reforma-bano/         # Money page
│   │   │   └── …                     # Resto de landings (vivienda, licencias, negocios)
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
│   │   │   ├── ContactForm.tsx       # Legacy (ya no se usa en /contacto)
│   │   │   ├── PresupuestoForm.tsx   # Formulario de presupuesto
│   │   │   └── NewsletterForm.tsx    # Formulario de newsletter
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Navegación principal
│   │   │   └── Footer.tsx            # Footer con enlaces + créditos
│   │   ├── ui/
│   │   │   ├── FAQ.tsx               # Componente preguntas frecuentes
│   │   │   ├── PageHeader.tsx        # Header de páginas internas
│   │   │   ├── MurciaMap.tsx         # Mapa radio 50 km (Carto Positron)
│   │   │   ├── ScrollToTop.tsx       # Botón volver arriba
│   │   │   └── WhatsAppButton.tsx    # Botón WhatsApp flotante
│   │   └── seo/
│   │       ├── JsonLd.tsx            # Structured data
│   │       └── AreaServicio.tsx      # Copy de cobertura (corta / completa)
│   └── lib/
│       ├── mail.ts                   # SMTP Hostinger + plantilla HTML
│       ├── openai-config.ts          # Modelos OpenAI (texto / imagen)
│       ├── blog/                     # Agentes IA: redactor + portada + cuerpo
│       ├── supabase.ts               # Cliente de Supabase (público)
│       ├── supabase-server.ts        # Cliente Supabase con auth
│       ├── supabase-admin.ts         # Cliente admin (Service Role)
│       ├── data.ts                   # Funciones de fetch de datos
│       └── structuredData.ts         # Helpers para JSON-LD
├── scripts/
│   ├── enviar-email.ts               # CLI envío SMTP
│   ├── redact-blog-article.ts        # CLI redactor
│   ├── generate-blog-cover.ts        # CLI portada
│   ├── generate-blog-body-images.ts  # CLI imágenes de cuerpo
│   └── generate-blog-cover-and-body.ts
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
| **OpenAI** | 4.x | Redactor de artículos + generación de imágenes |
| **Nodemailer** | Latest | Envío SMTP Hostinger (local) |
| **React Hot Toast** | Latest | Notificaciones toast |
| **Leaflet + CARTO** | Latest | Mapa de cobertura 50 km en /contacto (Positron) |
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
   - ✅ `contactos` → Histórico del formulario de contacto (página pública sin form)
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
- ✅ **/contacto** - Teléfono, WhatsApp, email, horario, cobertura 50 km y mapa (sin formulario)
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

### Servicios Generales (6 páginas)
Cada una con descripción detallada, proceso, beneficios, casos de uso, FAQ y SEO optimizado:

1. ✅ **/servicios/asesoramiento-tecnico**
2. ✅ **/servicios/direccion-obra**
3. ✅ **/servicios/diseno-espacios**
4. ✅ **/servicios/gestion-proyectos**
5. ✅ **/servicios/licencias-permisos**
6. ✅ **/servicios/reformas-integrales**

### Reformas Vivienda (8 páginas)
Landings de particular. SEO local = **Murcia** (las pedanías se cubren en copy, no con URL propia):

1. ✅ **/servicios/reforma-bano** — money page
2. ✅ **/servicios/cambio-banera-ducha** — apoyo de baño
3. ✅ **/servicios/reforma-cocina**
4. ✅ **/servicios/reforma-tejados**
5. ✅ **/servicios/reforma-terraza**
6. ✅ **/servicios/cambio-ventanas-pvc**
7. ✅ **/servicios/reforma-piscina**
8. ✅ **/servicios/certificado-energetico**

### Licencias de Apertura (7 páginas por sector)
Páginas específicas para licencias de actividad de negocios en Murcia:

1. ✅ **/servicios/licencia-bar** - Bar, restaurante, cafetería
2. ✅ **/servicios/licencia-peluqueria** - Peluquería, barbería, estética
3. ✅ **/servicios/licencia-gimnasio** - Gimnasio, box, centro deportivo
4. ✅ **/servicios/licencia-clinica-estetica** - Clínica estética, medicina estética
5. ✅ **/servicios/licencia-veterinaria** - Clínica veterinaria
6. ✅ **/servicios/licencia-centro-medico** - Centro médico, clínica
7. ✅ **/servicios/licencia-farmacia** - Farmacia, parafarmacia

### Reformas de Negocios (8 páginas)
1. ✅ **/servicios/reforma-local-comercial-murcia** — hub de local
2. ✅ **/servicios/reforma-bar**
3. ✅ **/servicios/reforma-peluqueria**
4. ✅ **/servicios/reforma-gimnasio**
5. ✅ **/servicios/reforma-clinica-estetica**
6. ✅ **/servicios/reforma-veterinaria**
7. ✅ **/servicios/reforma-centro-medico**
8. ✅ **/servicios/reforma-farmacia**

**Total: 29 landings de servicio + hub `/servicios`.**  
Estrategia y money pages: [`ESTRATEGIA_SEO_INDEXACION.md`](ESTRATEGIA_SEO_INDEXACION.md)

### Páginas Legales (3)
- ✅ **/legal/aviso-legal**
- ✅ **/legal/privacidad**
- ✅ **/legal/cookies**

### Páginas Informativas (2)
- ✅ **/sitemap-html** - Sitemap HTML para usuarios
- ✅ **/sitemap.xml** - Sitemap XML para buscadores

**Total: ~48 páginas estáticas + dinámicas ilimitadas (proyectos y blog)**

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
  - **Agentes de IA:** redactar artículo, generar portada y fotos del cuerpo
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
  - Formulario de presupuesto (canal principal de leads)
  - Newsletter
  - Feedback en tiempo real (éxito/error)
- Mapa de cobertura 50 km en /contacto (Carto Positron, círculo desde Murcia)
  - Estados de carga (loading spinners)

**Componentes de Servicio:**
- Hero sections con overlays
- Stats y métricas
- Galerías de imágenes responsive
- Botones de compartir en redes
- Badges y etiquetas dinámicas

---

## 🔍 SEO & Performance

**Documento vivo:** [`ESTRATEGIA_SEO_INDEXACION.md`](ESTRATEGIA_SEO_INDEXACION.md)

### Estrategia local (agosto 2026)

- **Plaza única:** Murcia capital + pedanías en el mismo copy. Sin URLs por pueblo.
- **Radio 50 km:** Alcantarilla, Molina de Segura, Las Torres de Cotillas, Santomera, Beniel (schema + texto).
- **Money pages:** home, `/servicios`, dirección de obra, licencias, reformas integrales, reforma baño, asesoramiento, contacto.
- **Titles:** el layout añade `| Alemán y Pajarón`. No repetir la marca en el `title` de cada página. La home usa `title.absolute` con marca una vez.
- **Indexación:** legales `noindex, follow`; blog con `seo_noindex` y exclusión del sitemap.

### On-page y técnica

✅ **Metadata** (title, description, canonical, Open Graph, Twitter Cards)  
✅ **JSON-LD:** ProfessionalService + `areaServed` del anillo, Service, WebSite, BreadcrumbList  
✅ **`sitemap.xml`** dinámico (servicios, blog indexable, proyectos)  
✅ **`robots.txt`** bloquea `/administrator/`  
✅ **Componente** `AreaServicio` + mapa 50 km en `/contacto#donde-trabajamos`  
✅ **Google Analytics** (excluye admin) y **Search Console**

Pendiente fuera de código: ficha Google con zona de servicio, reseñas con pueblo, FAQ/Article schema.

### Performance

- `next/image`, Server Components, ISR en blog/proyectos
- Tailwind + `next/font`
- Edge-ready (Vercel)

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

# Agentes de IA del blog (requieren OPENAI_API_KEY)
npm run redact:blog -- --slug=tu-slug
npm run generate:blog-cover -- "https://www.alemanypajaron.es/blog/tu-slug"
npm run generate:blog-body-images -- "https://www.alemanypajaron.es/blog/tu-slug" --force
npm run generate:blog-cover-and-body -- "https://www.alemanypajaron.es/blog/tu-slug"

# Email SMTP Hostinger (requiere SMTP_* en .env.local)
npm run mail:verificar
npx tsx scripts/enviar-email.ts --to=cliente@correo.com --subject="Asunto" --body="Mensaje"
```

📖 **Guía completa de agentes:** [`AGENTES_BLOG_IA.md`](AGENTES_BLOG_IA.md)

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
- ✅ Agentes de IA del blog (redacción + portada + imágenes de cuerpo)
- ✅ Email SMTP Hostinger en local (`contacto@alemanypajaron.es` + plantilla de marca)

### Corto Plazo
- [ ] Conectar formularios web al mismo SMTP (aviso interno al recibir contacto/presupuesto)
- [ ] Implementar envío masivo de newsletters
- [ ] Añadir más casos de estudio de proyectos con imágenes (ubicacion real: pedanía o municipio)
- [ ] Google Business Profile: zona de servicio 50 km + reseñas locales
- [ ] Sacar páginas legales del sitemap XML

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
- 📧 **Email:** [contacto@alemanypajaron.es](mailto:contacto@alemanypajaron.es) · [ivan@alemanypajaron.es](mailto:ivan@alemanypajaron.es)
- 📍 **Ubicación:** Murcia capital y radio ~50 km (área metropolitana y pedanías)
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
**📈 SEO local: Murcia + radio 50 km**
