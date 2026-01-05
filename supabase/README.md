# 📁 Schemas SQL de Supabase

**⚠️ IMPORTANTE:** Todos los schemas SQL de Supabase **SIEMPRE** se guardan en esta carpeta `/supabase/`.

---

## 📄 Archivos Disponibles

### 1. `supabase-schema.sql`
**Formularios básicos** (Ejecutar primero)

**Tablas incluidas:**
- `contactos` → Formulario de contacto
- `presupuestos` → Solicitudes de presupuesto  
- `newsletter` → Suscriptores al newsletter

**Cuándo ejecutar:**
- Primera vez que configuras Supabase
- Solo si aún no tienes estas tablas

---

### 2. `supabase-schema-proyectos-blog.sql`
**Sistema completo de Proyectos y Blog** (Ejecutar segundo)

**Tablas incluidas:**
- `proyectos` → Portfolio de proyectos realizados
- `imagenes_proyectos` → Galería de imágenes por proyecto
- `categorias_blog` → Categorías para el blog
- `blog_articulos` → Artículos del blog completos

**Incluye además:**
- ✅ Row Level Security (RLS) configurado
- ✅ Políticas de seguridad
- ✅ Índices para performance
- ✅ Triggers automáticos (updated_at)
- ✅ **Datos de ejemplo:** 1 proyecto, 1 artículo, 4 categorías

**Cuándo ejecutar:**
- Después de ejecutar `supabase-schema.sql`
- Para añadir el sistema de proyectos y blog

---

## 🚀 Orden de Ejecución

### Instalación Inicial Completa:

```sql
-- 1. PRIMERO: Formularios básicos
-- Ejecutar: supabase-schema.sql

-- 2. SEGUNDO: Proyectos y Blog
-- Ejecutar: supabase-schema-proyectos-blog.sql
```

### Si ya ejecutaste los formularios:

```sql
-- Solo ejecutar: supabase-schema-proyectos-blog.sql
```

---

## 📝 Cómo Ejecutar en Supabase

1. **Ve a Supabase Dashboard:**
   - https://supabase.com/dashboard/project/[tu-project-id]

2. **Abre SQL Editor:**
   - Click en "SQL Editor" (icono `</>`)
   - Click en "+ New query"

3. **Copia el contenido del archivo SQL:**
   - Abre el archivo en tu editor
   - Copia TODO el contenido (Ctrl+A, Ctrl+C)

4. **Pega en el SQL Editor:**
   - Pega en Supabase (Ctrl+V)

5. **Ejecuta:**
   - Click en "Run" (esquina inferior derecha)
   - Deberías ver: "Success. No rows returned"

6. **Verifica:**
   - Ve a "Table Editor"
   - Deberías ver las nuevas tablas

---

## 🗂️ Estructura de Tablas Completa

Después de ejecutar ambos schemas tendrás **7 tablas:**

### Formularios (3)
- `contactos`
- `presupuestos`
- `newsletter`

### Proyectos y Blog (4)
- `proyectos`
- `imagenes_proyectos`
- `categorias_blog`
- `blog_articulos`

---

## 🔐 Seguridad

**Todas las tablas tienen:**
- ✅ Row Level Security (RLS) habilitado
- ✅ Políticas configuradas:
  - **Lectura pública:** Proyectos y blog publicados
  - **Escritura pública:** Solo formularios (contacto, presupuesto)
  - **Admin:** Todo lo demás requiere service_role

---

## 📊 Datos de Ejemplo

El schema `supabase-schema-proyectos-blog.sql` incluye datos de prueba:

### 1 Proyecto de Ejemplo:
- **Título:** Reforma Integral Vivienda Centro Murcia
- **Ubicación:** Centro Histórico, Murcia
- **Año:** 2023
- **Con 3 imágenes en la galería**

### 1 Artículo de Ejemplo:
- **Título:** Guía Completa: Licencias Necesarias para Reformar tu Vivienda en Murcia
- **Categoría:** Licencias
- **Contenido completo con HTML**

### 4 Categorías:
- Reformas, Licencias, Consejos, Normativa

---

## ⚠️ REGLA IMPORTANTE

**TODOS los archivos SQL de Supabase DEBEN estar en esta carpeta `/supabase/`**

Nunca en la raíz del proyecto. Esto mantiene el proyecto organizado y facilita encontrar los schemas.

---

## 🔄 Mantenimiento

Si necesitas crear nuevos schemas o actualizaciones:

1. ✅ Crea el archivo en `/supabase/`
2. ✅ Nómbralo descriptivamente: `supabase-[descripcion].sql`
3. ✅ Actualiza este README con la descripción
4. ✅ Documenta qué tablas afecta y cuándo ejecutarlo

---

## 📖 Documentación Completa

Para más información sobre la configuración de Supabase, consulta:
- **Archivo raíz:** `/SUPABASE_CONFIG.md`
- **README principal:** `/README.md` (sección "Supabase")

---

**Última actualización:** Enero 2026  
**Versión de schemas:** 2.0 (Proyectos y Blog completos)

