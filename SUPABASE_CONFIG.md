# 🗄️ Supabase - Configuración Rápida

**Referencia rápida para la configuración de Supabase en el proyecto.**

---

## 📋 Variables de Entorno Requeridas

Tu proyecto necesita **3 variables de Supabase** + **1 de TinyMCE**. El resto (OpenAI, SMTP Hostinger, VAPID) está en [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md).

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_TINYMCE_API_KEY=hzc5ul9u051j4hya4cc4dxrtf8gq7mzrmluchwsgptgkz15g
```

### 🔐 **Dónde Obtener las Credenciales**

1. **Ve a Supabase Dashboard:** https://supabase.com/dashboard
2. **Selecciona tu proyecto**
3. **Click en Settings (⚙️)** → **API**
4. **Copia:**
   - **Project URL:** En "Project URL"
   - **anon key:** En "Project API keys" → `anon` `public`
   - **service_role key:** En "Project API keys" → `service_role` `secret`

### ⚠️ **IMPORTANTE: Service Role Key**

La `SUPABASE_SERVICE_ROLE_KEY` es **CRÍTICA** para el panel admin:
- ⚠️ **Bypasea Row Level Security** → Permite operaciones admin
- ⚠️ **Solo para servidor** → Nunca en el frontend
- ✅ Usada en `src/lib/supabase-admin.ts`
- ✅ Permite CRUD completo en panel admin

**Sin esta key, el panel admin NO funciona.**

---

## 📝 Configuración Completa

### **Local (`.env.local`):**
📖 **Guía paso a paso:** Ver [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md)

### **Vercel (Producción):**
```
Settings → Environment Variables → Add New
```
- Añadir las 4 variables
- Marcar ✅ Production, ✅ Preview, ✅ Development
- **Redeploy** después de añadirlas

📖 **Guía completa:** Ver [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md) (Parte 2)

---

## 🗄️ Schemas SQL

### **Ejecutar en Supabase SQL Editor:**

**Orden de ejecución:**
```sql
1. /supabase/supabase-schema.sql (formularios)
2. /supabase/supabase-schema-proyectos-blog.sql (proyectos y blog)
3. /supabase/fix-rls-policies.sql (políticas admin)
4. /supabase/fix-trigger-blog.sql (trigger actualizado_at)
5. /supabase/incrementar-visitas.sql (contador visitas)
6. Crear bucket "blog-images" en Storage (manual)
7. /supabase/politicas-storage-definitivas.sql (políticas storage)
```

📖 **Documentación completa:** Ver [`/supabase/README.md`](supabase/README.md)

---

## 📊 Tablas Creadas (7 total)

### **Formularios (3):**
- `contactos` → Formulario de contacto
- `presupuestos` → Solicitudes de presupuesto
- `newsletter` → Suscriptores

### **Contenido Dinámico (4):**
- `proyectos` → Portfolio
- `imagenes_proyectos` → Galerías
- `categorias_blog` → Categorías
- `blog_articulos` → Artículos

**Todas con Row Level Security (RLS) configurado.**

---

## 🔒 Seguridad (RLS)

### **Políticas Configuradas:**

**Frontend (anon key):**
- ✅ **SELECT** público: proyectos, blog (publicados)
- ✅ **INSERT** público: contactos, presupuestos, newsletter

**Backend (service_role key):**
- ✅ **CRUD completo** en panel admin
- ✅ Bypass RLS para operaciones admin
- ✅ Solo accesible desde servidor

---

## 🧪 Verificar Configuración

### **1. Tablas creadas:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Deberías ver: `blog_articulos`, `categorias_blog`, `contactos`, `imagenes_proyectos`, `newsletter`, `presupuestos`, `proyectos`

### **2. Políticas RLS:**
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

### **3. Bucket de Storage:**
```
Storage → Buckets → Deberías ver: "blog-images" (público)

Las imágenes generadas por IA se guardan en el mismo bucket:
- `ai-covers/{slug}-{timestamp}.webp` → portada (`imagen_destacada`)
- `ai-body/{slug}-{n}-{timestamp}.webp` → fotos del cuerpo del artículo
```

### **4. Datos de ejemplo:**
```sql
SELECT * FROM proyectos LIMIT 1;
SELECT * FROM blog_articulos LIMIT 1;
SELECT * FROM categorias_blog;
```

Deberías ver 1 proyecto, 1 artículo, 4 categorías de ejemplo.

---

## 🚀 Estado del Sistema

✅ **Sistema Completamente Funcional:**

| Componente | Estado |
|------------|--------|
| Schemas SQL | ✅ Ejecutados |
| Tablas | ✅ 7 tablas creadas |
| RLS | ✅ Configurado |
| Storage | ✅ Bucket blog-images |
| Variables de Entorno | ✅ Local y Vercel |
| Cliente Supabase | ✅ 3 clientes (público, server, admin) |
| Formularios | ✅ Funcionales |
| Panel Admin | ✅ Completo con TinyMCE |
| Blog Dinámico | ✅ Con visitas y categorías |
| Proyectos | ✅ Con galerías |

---

## 📚 Documentación Relacionada

### **Setup Inicial:**
- 📄 **Variables de entorno:** [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md)
- 🗄️ **Schemas SQL:** [`/supabase/README.md`](supabase/README.md)
- 🔐 **Panel admin:** [`ADMIN_SETUP.md`](ADMIN_SETUP.md)

### **Deployment:**
- 🚀 **Deploy en Vercel:** [`DEPLOY.md`](DEPLOY.md)
- 📖 **README principal:** [`README.md`](README.md)

### **Contenido:**
- 📝 **Gestión de contenido:** [`CONTENIDO.md`](CONTENIDO.md)
- 🤖 **Agentes de IA del blog:** [`AGENTES_BLOG_IA.md`](AGENTES_BLOG_IA.md)

---

## 🆘 Troubleshooting

### **Error: "Faltan variables de entorno"**
→ Ver [`CREAR_ENV_LOCAL.md`](CREAR_ENV_LOCAL.md)

### **Panel admin no funciona**
→ Ver [`ADMIN_SETUP.md`](ADMIN_SETUP.md)

### **Tablas no existen**
→ Ver [`/supabase/README.md`](supabase/README.md)

### **Imágenes no se suben**
→ Ver [`/supabase/crear-bucket-imagenes.md`](supabase/crear-bucket-imagenes.md)

### **Los agentes de blog no generan imágenes**
→ Ver [`AGENTES_BLOG_IA.md`](AGENTES_BLOG_IA.md) (OPENAI_API_KEY + bucket `blog-images`)

---

**📅 Última actualización:** Agosto 2026  
**✅ Sistema completo en producción**  
**🌐 URL:** https://www.alemanypajaron.es
