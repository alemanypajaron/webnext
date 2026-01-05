# 📁 Schemas SQL de Supabase

**⚠️ IMPORTANTE:** Todos los schemas SQL de Supabase **SIEMPRE** se guardan en esta carpeta `/supabase/`.

---

## 📄 Archivos Disponibles

### 1. `supabase-schema.sql` ✅
**Formularios básicos** (Ejecutar primero)

**Tablas incluidas:**
- `contactos` → Formulario de contacto
- `presupuestos` → Solicitudes de presupuesto  
- `newsletter` → Suscriptores al newsletter

**Cuándo ejecutar:**
- Primera vez que configuras Supabase
- Solo si aún no tienes estas tablas

---

### 2. `supabase-schema-proyectos-blog.sql` ✅
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

### 3. `fix-rls-policies.sql` ✅
**Corrección de políticas RLS para panel admin**

**Qué hace:**
- Elimina políticas RLS restrictivas de contactos y presupuestos
- Permite que el Service Role Key (admin) pueda leer y modificar registros
- Mantiene la seguridad: solo admins autenticados tienen acceso

**Cuándo ejecutar:**
- Si el panel admin no puede leer contactos o presupuestos
- Después de crear el primer usuario administrador

---

### 4. `fix-trigger-blog.sql` ✅
**Corrección del trigger de actualización automática en blog**

**Qué hace:**
- Arregla el trigger `update_blog_actualizado_at`
- Crea función específica para `actualizado_at` (en lugar de `updated_at`)
- Actualiza automáticamente la fecha de modificación al editar artículos

**Cuándo ejecutar:**
- Si al editar artículos del blog obtienes error: "record 'new' has no field 'updated_at'"
- Después de ejecutar `supabase-schema-proyectos-blog.sql`

---

### 5. `politicas-storage-definitivas.sql` ✅
**Políticas RLS para Supabase Storage (imágenes del blog)**

**Qué hace:**
- Crea políticas para el bucket `blog-images`
- Permite a admins autenticados: subir, actualizar, eliminar imágenes
- Permite a todos: ver imágenes (SELECT público)

**Requisito previo:**
- Crear el bucket `blog-images` en Supabase Storage (ver `crear-bucket-imagenes.md`)

**Cuándo ejecutar:**
- Después de crear el bucket `blog-images`
- Si las imágenes no se pueden subir o visualizar desde el panel admin

---

### 6. `incrementar-visitas.sql` ✅
**Función RPC para incrementar visitas de artículos**

**Qué hace:**
- Crea función `incrementar_visitas_articulo(articulo_uuid UUID)`
- Incrementa el contador de visitas de un artículo
- Se llama automáticamente cuando un usuario ve un artículo

**Cuándo ejecutar:**
- Después de ejecutar `supabase-schema-proyectos-blog.sql`
- Para activar el contador de visitas en artículos del blog

---

## 🚀 Orden de Ejecución

### ✅ Instalación Inicial Completa (RECOMENDADO):

```sql
-- 1. PRIMERO: Formularios básicos
Ejecutar: supabase-schema.sql

-- 2. SEGUNDO: Proyectos y Blog
Ejecutar: supabase-schema-proyectos-blog.sql

-- 3. TERCERO: Corrección de políticas RLS (para panel admin)
Ejecutar: fix-rls-policies.sql

-- 4. CUARTO: Corrección del trigger de blog
Ejecutar: fix-trigger-blog.sql

-- 5. QUINTO: Contador de visitas en artículos
Ejecutar: incrementar-visitas.sql

-- 6. SEXTO (ANTES): Crear bucket de imágenes
Seguir instrucciones en: crear-bucket-imagenes.md
Crear bucket manualmente: "blog-images" en Supabase Storage

-- 7. SÉPTIMO: Políticas de Storage para imágenes
Ejecutar: politicas-storage-definitivas.sql
```

### ⚠️ Si ya ejecutaste los schemas básicos:

```sql
-- Ejecutar solo los que falten:
1. fix-rls-policies.sql (si el admin no puede ver contactos)
2. fix-trigger-blog.sql (si error al editar artículos)
3. incrementar-visitas.sql (para contador de visitas)
4. Crear bucket "blog-images" en Storage (manual)
5. politicas-storage-definitivas.sql (para subir imágenes)
```

### 🔄 Verificación Rápida:

**Tablas creadas:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Triggers activos:**
```sql
SELECT tgname, relname FROM pg_trigger 
JOIN pg_class ON tgrelid = pg_class.oid 
WHERE relname IN ('blog_articulos', 'proyectos');
```

**Políticas RLS:**
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
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

## 📚 Archivos de Documentación Adicionales

Además de los schemas SQL, esta carpeta contiene:

### `crear-bucket-imagenes.md`
**Guía paso a paso** para crear el bucket `blog-images` en Supabase Storage:
- Instrucciones con capturas conceptuales
- Configuración de permisos
- Verificación del bucket

### `fix-storage-rls-simple.sql` (DEPRECADO)
Intento anterior de simplificar políticas de storage.  
**No usar** → Usar `politicas-storage-definitivas.sql` en su lugar.

### `verificar-bucket-publico.sql`
Query para verificar si el bucket `blog-images` es público o privado.

### `verificar-y-arreglar-rls.sql`
Script de diagnóstico completo para verificar y arreglar todas las políticas RLS del proyecto.

---

## 🔄 Mantenimiento

Si necesitas crear nuevos schemas o actualizaciones:

1. ✅ Crea el archivo en `/supabase/`
2. ✅ Nómbralo descriptivamente: `fix-[problema].sql` o `supabase-[feature].sql`
3. ✅ Actualiza este README con la descripción
4. ✅ Documenta qué tablas afecta y cuándo ejecutarlo
5. ✅ Añade comentarios SQL explicativos dentro del archivo

---

## 📖 Documentación Completa

Para más información sobre la configuración de Supabase, consulta:
- **Archivo raíz:** `/SUPABASE_CONFIG.md`
- **README principal:** `/README.md` (sección "Supabase")

---

**Última actualización:** Enero 2026  
**Versión de schemas:** 2.0 (Proyectos y Blog completos)

