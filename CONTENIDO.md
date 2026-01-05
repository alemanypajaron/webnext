# 📝 Guía de Contenido - Alemán y Pajarón

**Documentación sobre el contenido y estructura del sitio web**

---

## 📊 Resumen del Contenido

**Total de páginas:** 21 estáticas + dinámicas (blog y proyectos)  
**Páginas de servicios:** 6 (todas con contenido SEO completo e íconos homogeneizados)  
**Palabras totales:** ~15,000+  
**Optimizado para:** SEO local Murcia  
**Blog:** Sistema CMS completo con editor TinyMCE  
**Newsletter:** Formulario de suscripción funcional  
**Admin:** Panel completo de gestión  

---

## 🔐 Panel de Administración

**URL:** `/administrator` (requiere login)

### Funcionalidades del Panel Admin:

✅ **Gestión de Contactos:**
- Ver todos los contactos recibidos desde el formulario
- Marcar como: leído, respondido
- Eliminar contactos
- Estadísticas de contactos nuevos

✅ **Gestión de Presupuestos:**
- Ver todas las solicitudes de presupuesto
- Cambiar estado: pendiente, respondido, atendido, rechazado, aceptado
- Eliminar presupuestos
- Estadísticas por estado

✅ **CMS de Blog (TinyMCE):**
- Crear artículos nuevos
- Editar artículos existentes
- Eliminar artículos
- **Editor TinyMCE** con menús completos (File, Edit, View, Insert, Format, Tools, Table, Help)
- **Gestor de imágenes integrado:**
  - Subir imágenes a Supabase Storage
  - Seleccionar de imágenes existentes
  - Drag & drop
  - Preview de imagen destacada
- Marcar artículos como destacados
- Editar fecha de publicación
- Gestión de categorías
- Tags y etiquetas

✅ **Gestión de Proyectos:**
- Crear proyectos nuevos
- Editar proyectos existentes
- Eliminar proyectos
- Marcar proyectos como destacados
- Galería de imágenes por proyecto

✅ **Gestión de Newsletter:**
- Ver lista de suscriptores
- Email y nombre de cada suscriptor
- Fecha de suscripción
- Estado (activo/inactivo)

---

## 📧 Formulario de Newsletter

**Ubicación:** Página del blog (`/blog`) al final

### Características:

✅ **Diseño inline** (input + botón en la misma línea)
✅ **Validación de email** en tiempo real
✅ **Detección de duplicados** (email ya suscrito)
✅ **Guardado en Supabase** (tabla `newsletter`)
✅ **Feedback con toasts** (éxito, error, duplicado)
✅ **Estados de carga** ("Suscribiendo...")
✅ **Reset automático** tras suscripción exitosa

### Campos:
- Email (obligatorio, validado)
- Nombre (opcional, no se pide en la versión inline)

### Mensajes:
- ✅ "¡Gracias por suscribirte! Te mantendremos informado."
- ❌ "Este email ya está suscrito a nuestro newsletter."
- ❌ "Por favor, introduce un email válido."

---

## 📝 Editor de Blog (TinyMCE)

**Integración completa de TinyMCE** en el panel admin:

### Menús disponibles:
- **File:** Nuevo, vista previa
- **Edit:** Deshacer, rehacer, buscar, reemplazar
- **View:** Código fuente, bloques visuales, pantalla completa
- **Insert:** Imagen, enlace, tabla, media, horizontal line, emoji
- **Format:** Negrita, cursiva, subrayado, tachado, colores, estilos
- **Tools:** Corrector ortográfico, estadísticas de palabras
- **Table:** Insertar tabla, propiedades, filas, columnas
- **Help:** Atajos de teclado, ayuda

### Toolbar:
```
Undo/Redo | Blocks | Bold Italic ForeColor BackColor | 
AlignLeft AlignCenter AlignRight AlignJustify | 
BulList NumList Outdent Indent | Read More PageBreak | 
RemoveFormat | Image Link | Code | Help
```

### Funciones especiales:
- **Botón "Leer Más"** personalizado (como Joomla)
- **Gestión de imágenes** integrada con Supabase Storage
- **Vista de código HTML** para edición avanzada
- **Interfaz en español**
- **Autoguardado** del contenido
- **Validación** de contenido antes de guardar

---

## 🎨 Homogeneización de Íconos en Servicios

**Estilo aplicado a todas las páginas de servicios:**

✅ **Diseño consistente:**
- Fondo amarillo sólido (`bg-accent`)
- Ícono azul oscuro (`text-primary`)
- Forma circular o cuadrada con bordes redondeados
- Tamaño consistente (48x48px o 56x56px)
- Sombra suave para profundidad

✅ **Páginas actualizadas:**
1. Asesoramiento Técnico
2. Dirección de Obra (referencia)
3. Diseño de Espacios
4. Gestión de Proyectos
5. Licencias y Permisos
6. Reformas Integrales

---

## 📊 Tipografía del Blog

**Mejoras aplicadas al contenido de los artículos:**

### Fuentes:
- **Headings (H1-H6):** Poppins, font-weight: 600-700
- **Cuerpo (p, li):** Inter, line-height: 1.6

### Estilos de contenido:
- **H2:** Borde inferior amarillo (`border-b border-accent`)
- **H3:** Tamaño 1.875rem, margin-top: 2rem
- **Listas:** Bullets amarillos, padding-left: 1.25rem
- **Blockquotes:** Borde izquierdo amarillo, cursiva, padding: 1rem
- **Código inline:** Fondo gris, padding: 0.375rem 0.5rem, border-radius
- **Tablas:** Headers oscuros, filas alternadas, bordes sutiles
- **Enlaces:** Color amarillo, subrayado en hover
- **Imágenes:** Border-radius: 0.75rem, sombra, margin vertical

### Espaciado:
- **Párrafos:** margin-bottom: 1rem
- **Secciones:** margin-top: 3rem, margin-bottom: 2rem
- **Listas:** margin-bottom: 1.5rem, gap entre items: 0.75rem

---

---

## 🎯 Páginas de Servicios (SEO Optimizado)

### Características de Cada Página de Servicio

Todas las 6 páginas de servicios incluyen:

✅ **Estructura completa:**
- Header con imagen de fondo profesional
- Introducción del servicio (qué es, para qué sirve)
- Servicios incluidos (grid de tarjetas)
- Proceso paso a paso (4-5 fases)
- Beneficios y ventajas (lista con checkmarks)
- Casos de uso / Tipos de proyectos
- FAQ (5-6 preguntas frecuentes)
- CTA final con botones de acción

✅ **SEO Completo:**
- Metadata optimizada (title, description, keywords)
- 1,500-2,500 palabras por página
- Keywords locales ("Murcia") repetidas naturalmente
- Long-tail keywords en FAQs
- Headings jerárquicos (H1, H2, H3)
- JSON-LD structured data (LocalBusiness, Service, Breadcrumb)
- Canonical URLs

✅ **Diseño:**
- PageHeader dinámico con imagen
- Badges de sección
- Cards con iconos
- Secciones alternadas (blanco/gris/azul oscuro)
- Imágenes de Unsplash optimizadas
- FAQ con acordeones amarillos/blancos

---

## 📄 Detalle de Cada Servicio

### 1. Asesoramiento Técnico
**URL:** `/servicios/asesoramiento-tecnico`

**Contenido:**
- Qué es el asesoramiento técnico
- 6 servicios incluidos:
  - Informes técnicos
  - Estudios de viabilidad
  - Before You Buy
  - Valoraciones
  - Asesoría en compras
  - Consultoría técnica
- Proceso en 4 pasos
- Beneficios (6 ventajas clave)
- 4 casos de uso detallados
- 5 FAQs sobre precios, plazos, validez

**Keywords:**
- asesoramiento técnico murcia
- consultoría construcción murcia
- informe técnico murcia
- técnico edificación murcia
- gestor obras murcia

### 2. Dirección de Obra
**URL:** `/servicios/direccion-obra`

**Contenido:**
- Qué es la dirección de obra
- 6 servicios incluidos:
  - Control de ejecución
  - Seguridad y salud
  - Documentación
  - Control de plazos
  - Control económico
  - Coordinación
- Metodología en 4 fases
- 3 tipos de obra (nueva, reformas, otros)
- 4 razones para contratar
- 6 FAQs sobre costes, obligatoriedad, visitas

**Keywords:**
- dirección de obra murcia
- director de obra murcia
- técnico edificación murcia dirección obra
- gestor obras murcia
- supervisión obra murcia

### 3. Diseño de Espacios
**URL:** `/servicios/diseno-espacios`

**Contenido:**
- Qué es el diseño de espacios
- 6 servicios incluidos:
  - Distribución interior
  - Renders 3D
  - Selección de materiales
  - Diseño de iluminación
  - Diseño de mobiliario
  - Interiorismo técnico
- Proceso en 4 pasos
- 4 tipos de espacios
- 6 beneficios
- 5 FAQs sobre precios, plazos, diferencias

**Keywords:**
- diseño espacios murcia
- diseño interiores murcia
- interiorismo técnico murcia
- distribución vivienda murcia

### 4. Gestión de Proyectos
**URL:** `/servicios/gestion-proyectos`

**Contenido:**
- Qué es la gestión de proyectos (Project Management)
- Método en 4 fases:
  - Análisis
  - Planificación
  - Ejecución
  - Entrega
- 6 beneficios clave
- 4 FAQs sobre diferencias, cuándo contratar, costes

**Keywords:**
- gestión de proyectos murcia
- project management murcia
- planificación obra murcia
- coordinación proyectos murcia

### 5. Licencias y Permisos
**URL:** `/servicios/licencias-permisos`

**Contenido:**
- Qué licencias se tramitan
- 6 tipos de licencias:
  - Licencia de obra mayor
  - Licencia de obra menor
  - Licencia de actividad
  - Declaración responsable
  - Comunicación previa
  - Primera ocupación
- Proceso de tramitación en 4 pasos
- 8 beneficios de confiar en expertos
- 5 FAQs sobre costes, plazos, multas, caducidad

**Keywords:**
- licencias de obra murcia
- licencia obra mayor murcia
- licencia actividad murcia
- permisos construcción murcia

### 6. Reformas Integrales
**URL:** `/servicios/reformas-integrales`

**Contenido:**
- Qué incluye una reforma integral
- 3 bloques de servicios:
  - Diseño y planificación
  - Gestión administrativa
  - Ejecución
- Proceso en 5 pasos
- 6 ventajas de trabajar con arquitectos técnicos
- 5 FAQs sobre precios orientativos, plazos, licencias

**Keywords:**
- reformas integrales murcia
- reforma vivienda murcia
- reforma local murcia
- reforma integral murcia precio

---

## 🏠 Páginas Principales

### Home (/)
**Contenido:**
- Hero section con estadísticas (250+ proyectos, 15+ años, 98% satisfacción)
- Servicios destacados (6 cards)
- Sobre nosotros (resumen)
- CTA final

**SEO:**
- Keywords: técnico edificación murcia, gestor obras murcia, gestión proyectos murcia
- JSON-LD: LocalBusiness + WebSite

### Nosotros (/nosotros)
**Contenido:**
- Historia del estudio
- Valores (5 valores clave con iconos)
- CTA para contactar

**SEO:**
- Keywords: estudio arquitectura técnica murcia

### Contacto (/contacto)
**Contenido:**
- Formulario de contacto
- Información de contacto
- Horarios
- Ubicación

### Presupuesto (/presupuesto)
**Contenido:**
- Formulario detallado de presupuesto
- Campos: tipo de proyecto, presupuesto, ubicación, descripción
- Respuesta en <24h

---

## 📊 Componentes de Contenido

### PageHeader
**Ubicación:** Todas las páginas internas

**Elementos:**
- Imagen de fondo (Unsplash)
- Overlay azul oscuro
- Badge amarillo sólido
- Título grande con palabra destacada en amarillo
- Subtítulo
- Breadcrumbs (opcional)

### FAQ Component
**Ubicación:** 6 páginas de servicios

**Características:**
- Acordeones animados
- Preguntas: fondo amarillo
- Respuestas: fondo blanco
- Icono chevron que rota
- 5-6 preguntas por servicio

### CTA Sections
**Ubicación:** Todas las páginas

**Elementos:**
- Fondo gris claro (contrast fix)
- Título en azul oscuro
- Texto en gris oscuro
- Botón amarillo "Solicitar Presupuesto"
- Botón azul "Contactar" o teléfono

---

## 🎨 Guía de Estilo de Contenido

### Tono de Voz
- **Profesional** pero cercano
- **Técnico** pero accesible
- **Local** (menciona Murcia frecuentemente)
- **Orientado a acción** (CTAs claros)

### Estructura de Textos

**Títulos H1:**
```
[Servicio] en Murcia: [Especificación]

Ejemplos:
- Asesoramiento Técnico en Murcia: Consultoría Profesional
- Dirección de Obra en Murcia: Gestor de Obras Colegiado
```

**Títulos H2:**
```
[Pregunta o afirmación clara]

Ejemplos:
- ¿Qué incluye la dirección de obra?
- Cómo gestionamos tu proyecto en Murcia
- Por qué contratar asesoramiento técnico
```

**Párrafos:**
- 2-3 frases por párrafo
- 150-200 caracteres máximo
- Lenguaje claro y directo

### Keywords Principales

**Repetir naturalmente:**
- Murcia (en casi cada sección)
- Técnico de edificación / Gestor de obras
- Nombre del servicio
- Variaciones (dirección obra, director obra, etc.)

---

## 📈 Mejoras de Contenido SEO

### Lo que está optimizado

✅ **Metadata:**
- Titles únicos por página
- Descriptions completas
- Keywords locales
- Canonical URLs

✅ **Estructura:**
- H1 único por página
- Jerarquía H2-H3 correcta
- Keywords en headings
- Alt text en imágenes

✅ **Rich Content:**
- FAQs (Google Featured Snippets)
- Listas numeradas/bullet points
- Bloques de texto largos (1,500+ palabras)
- Tablas/comparativas

✅ **Structured Data:**
- LocalBusiness (todas las páginas)
- Service (cada servicio)
- BreadcrumbList (navegación)
- WebSite (home)

---

## 🔄 Actualizar Contenido

### Editar Texto de una Página

```bash
# 1. Abrir el archivo
# Ejemplo: src/app/servicios/direccion-obra/page.tsx

# 2. Buscar el texto a cambiar
# Los textos están en los componentes JSX

# 3. Editar y guardar

# 4. Commit y push
git add src/app/servicios/direccion-obra/page.tsx
git commit -m "content: actualizar texto dirección obra"
git push

# 5. Deploy automático en Vercel (~1 min)
```

### Añadir una Nueva FAQ

**Ubicación:** Cualquier página de servicio

```typescript
<FAQ
  title="Preguntas frecuentes sobre [servicio]"
  items={[
    {
      question: '¿Tu nueva pregunta?',
      answer: 'La respuesta detallada con información útil.',
    },
    // ... resto de FAQs
  ]}
/>
```

### Cambiar una Imagen

**Imágenes de Unsplash:**
```typescript
// Reemplazar la URL en el PageHeader
image="https://images.unsplash.com/photo-XXXXXXX"
```

**Imágenes propias:**
```typescript
// 1. Subir imagen a public/images/
// 2. Cambiar la ruta
image="/images/mi-imagen.jpg"
```

---

## 📊 Métricas de Contenido

### Por Página de Servicio

| Servicio | Palabras | FAQs | Secciones |
|----------|----------|------|-----------|
| Asesoramiento | ~2,000 | 5 | 6 |
| Dirección Obra | ~2,200 | 6 | 6 |
| Diseño Espacios | ~1,900 | 5 | 6 |
| Gestión Proyectos | ~1,600 | 4 | 4 |
| Licencias | ~2,100 | 5 | 5 |
| Reformas | ~1,800 | 5 | 5 |

**Total:** ~12,000 palabras solo en servicios

---

## 🎯 Próximas Mejoras de Contenido

### Corto Plazo
- [ ] Añadir testimonios de clientes reales
- [ ] Incluir casos de estudio con antes/después
- [ ] Ampliar blog con artículos SEO
- [ ] Añadir videos explicativos

### Medio Plazo
- [ ] Crear calculadora de presupuestos
- [ ] Guías descargables (PDFs)
- [ ] Infografías sobre procesos
- [ ] Comparativas de servicios

### SEO Avanzado
- [ ] Crear páginas por servicio + ubicación
  - Ejemplo: /servicios/direccion-obra-murcia-centro
- [ ] Landing pages específicas
- [ ] Contenido long-form (+3,000 palabras)
- [ ] Esquema FAQ markup en más páginas

---

## 📞 Contacto para Contenido

**Para solicitar cambios de contenido:**
📧 ivan@alemanypajaron.es  
💬 WhatsApp: +34 650 075 842

---

**📅 Contenido completo:** Enero 2026  
**✅ SEO optimizado**  
**📈 1,500-2,500 palabras por servicio**

