# 📂 Estructura de Archivos - Versión 1.0

## ✅ ARCHIVOS PRINCIPALES (MANTENER)

### Documentación Core
- `README.md` - Documentación principal del proyecto ✅
- `SOLUCION_LOGIN_MOVIL.md` - Solución técnica login móvil ✅
- `PUSH_NOTIFICATIONS_README.md` - Resumen notificaciones push ✅
- `PUSH_NOTIFICATIONS_SETUP.md` - Setup notificaciones push ✅
- `DEPLOY.md` - Guía de deployment ✅
- `CREAR_ENV_LOCAL.md` - Variables de entorno ✅
- `SUPABASE_CONFIG.md` - Configuración Supabase ✅
- `URL_CANONICA_CONFIG.md` - Configuración URL canónica ✅
- `VAPID_KEYS_GENERADAS.md` - Claves VAPID (NO SUBIR A GIT) ✅
- `SENTRY_SETUP.md` - Configuración Sentry ✅

### Documentación de Referencia
- `ADMIN_SETUP.md` - Setup panel admin
- `AUDITORIA_SEO.md` - Auditoría SEO
- `CONTENIDO.md` - Gestión de contenido
- `FAVICON_GUIA.md` - Guía de favicons

### Scripts SQL Activos (Mantener)
- `supabase/supabase-schema.sql` - Schema principal ✅
- `supabase/supabase-schema-proyectos-blog.sql` - Schema proyectos/blog ✅
- `supabase/crear-tabla-push-subscriptions.sql` - Tabla notificaciones ✅
- `supabase/crear-triggers-notificaciones-push.sql` - Triggers activos ✅
- `supabase/incrementar-visitas.sql` - Función visitas blog ✅
- `supabase/README.md` - Documentación Supabase ✅

### Edge Functions (Activas)
- `supabase/functions/send-push-notification/index.ts` - Envío notificaciones ✅

### Herramientas PWA
- `public/limpiar-pwa-completo.html` - Herramienta limpieza PWA ✅
- `public/manifest.json` - Manifest PWA ✅
- `public/service-worker.js` - Service Worker v2 ✅

---

## ⚠️ ARCHIVOS DUPLICADOS/OBSOLETOS (REVISAR PARA ELIMINAR)

### Documentación Duplicada
- `IMPLEMENTACION_COMPLETA.md` - ⚠️ Duplica info de PUSH_NOTIFICATIONS_SETUP.md
- `IMPLEMENTACION_FINAL.md` - ⚠️ Duplica info de README.md
- `INSTALACION_COMPLETA.md` - ⚠️ Duplica info de README.md
- `PWA_CONFIG_FINAL.md` - ⚠️ Duplica info de PUSH_NOTIFICATIONS
- `EXTENSION_PWA.md` - ⚠️ Duplica info
- `FAQ_PWA.md` - ⚠️ Duplica info
- `INSTRUCCIONES_ADMIN_PWA.md` - ⚠️ Duplica info
- `SOLUCION_PWA_RESUMEN.md` - ⚠️ Duplica info
- `TESTING_PWA.md` - ⚠️ Duplica info
- `PWA_ADMIN_GUIA.md` - ⚠️ Duplica info
- `GUIA_RAPIDA_SUBIDA.md` - ⚠️ Duplica DEPLOY.md
- `AUDITORIA_Y_OPTIMIZACION.md` - ⚠️ Duplica AUDITORIA_SEO.md
- `IMPLEMENTACION_FAVICON.md` - ⚠️ Duplica FAVICON_GUIA.md

### Documentación de Procesos Antiguos
- `RESUMEN_PROYECTOS.md` - ⚠️ Proyectos ya migrados
- `PROCESO_PROYECTOS.md` - ⚠️ Proceso ya completado

### Scripts SQL Obsoletos (Ya aplicados o reemplazados)
- `supabase/fix-urls-notificaciones.sql` - ⚠️ Ya aplicado
- `supabase/verificar-ultimo-presupuesto-trigger.sql` - ⚠️ Solo diagnóstico
- `supabase/diagnostico-notificaciones-push.sql` - ⚠️ Solo diagnóstico
- `supabase/fix-rls-definitivo.sql` - ⚠️ Ya aplicado
- `supabase/corregir-politica-lectura-publica.sql` - ⚠️ Ya aplicado
- `supabase/verificar-estado-proyectos.sql` - ⚠️ Solo diagnóstico
- `supabase/verificar-politicas-storage.sql` - ⚠️ Solo diagnóstico
- `supabase/crear-politicas-rls-proyectos.sql` - ⚠️ Ya en schema principal
- `supabase/crear-politicas-proyectos-images.sql` - ⚠️ Ya en schema principal
- `supabase/crear-bucket-imagenes.sql` - ⚠️ Ya en schema principal
- `supabase/fix-trigger-blog.sql` - ⚠️ Ya aplicado
- `supabase/fix-storage-rls-final.sql` - ⚠️ Ya aplicado
- `supabase/fix-storage-policies.sql` - ⚠️ Ya aplicado
- `supabase/fix-storage-rls-simple.sql` - ⚠️ Ya aplicado
- `supabase/fix-rls-policies.sql` - ⚠️ Ya aplicado
- `supabase/fix-rls-admin-access.sql` - ⚠️ Ya aplicado
- `supabase/politicas-storage-definitivas.sql` - ⚠️ Ya aplicado
- `supabase/hacer-bucket-publico-simple.sql` - ⚠️ Ya aplicado
- `supabase/solucion-definitiva-storage.sql` - ⚠️ Ya aplicado
- `supabase/storage-policies-blog-images.sql` - ⚠️ Ya aplicado
- `supabase/verificar-bucket-publico.sql` - ⚠️ Solo diagnóstico
- `supabase/verificar-y-arreglar-rls.sql` - ⚠️ Solo diagnóstico
- `supabase/crear-bucket-imagenes.md` - ⚠️ Proceso completado

### HTML de Testing/Debug (Obsoletos)
- `public/limpiar-cache.html` - ⚠️ Reemplazado por limpiar-pwa-completo.html
- `public/test-favicon.html` - ⚠️ Testing, no necesario en producción
- `public/test-cookies-debug.html` - ⚠️ Testing, no necesario en producción
- `public/test-analytics-debug.html` - ⚠️ Testing, no necesario en producción
- `public/diagnostico-analytics.html` - ⚠️ Testing, no necesario en producción
- `public/test-analytics.html` - ⚠️ Testing, no necesario en producción

### Scripts JS de Migración (Ya ejecutados)
- `crear-bucket-imagenes.mjs` - ⚠️ Proceso completado
- `enriquecer-proyectos.mjs` - ⚠️ Proceso completado
- `generar-datos-proyectos.mjs` - ⚠️ Proceso completado
- `subir-proyectos-supabase.mjs` - ⚠️ Proceso completado
- `verificar-buckets-supabase.mjs` - ⚠️ Diagnóstico, ya no necesario
- `verificar-proyectos.mjs` - ⚠️ Diagnóstico, ya no necesario

### Scripts PowerShell de Setup (Ya ejecutados)
- `instalar-push-notifications.ps1` - ⚠️ Setup ya completado
- `crear-env-local.ps1` - ⚠️ Setup ya completado

### Archivos de Configuración (Ya ejecutados)
- `env-push-notifications-example.txt` - ⚠️ Ya configurado

---

## 🗑️ RECOMENDACIÓN: ARCHIVOS A ELIMINAR

### Documentación para archivar en carpeta `/docs-old/`
Mover estos archivos a una carpeta de archivo para mantener el historial pero limpiar la raíz:

```
docs-old/
├── pwa/
│   ├── EXTENSION_PWA.md
│   ├── FAQ_PWA.md
│   ├── INSTRUCCIONES_ADMIN_PWA.md
│   ├── PWA_ADMIN_GUIA.md
│   ├── PWA_CONFIG_FINAL.md
│   ├── SOLUCION_PWA_RESUMEN.md
│   └── TESTING_PWA.md
├── implementacion/
│   ├── IMPLEMENTACION_COMPLETA.md
│   ├── IMPLEMENTACION_FINAL.md
│   ├── IMPLEMENTACION_FAVICON.md
│   └── INSTALACION_COMPLETA.md
├── procesos/
│   ├── PROCESO_PROYECTOS.md
│   ├── RESUMEN_PROYECTOS.md
│   └── GUIA_RAPIDA_SUBIDA.md
└── auditoria/
    └── AUDITORIA_Y_OPTIMIZACION.md
```

### Scripts SQL para archivar en `/supabase/sql-old/`
Scripts que ya fueron aplicados o son solo de diagnóstico:

```
supabase/sql-old/
├── fixes-aplicados/
│   ├── fix-urls-notificaciones.sql
│   ├── fix-rls-definitivo.sql
│   ├── fix-trigger-blog.sql
│   ├── fix-storage-rls-final.sql
│   ├── fix-storage-policies.sql
│   ├── fix-rls-policies.sql
│   └── ... (todos los fix-*.sql)
├── diagnosticos/
│   ├── verificar-*.sql (todos)
│   └── diagnostico-*.sql (todos)
└── migraciones-completadas/
    ├── crear-bucket-imagenes.sql
    ├── crear-politicas-*.sql
    └── ...
```

### HTML de Testing para eliminar
```bash
# Estos archivos se pueden eliminar completamente:
public/limpiar-cache.html (reemplazado)
public/test-favicon.html
public/test-cookies-debug.html
public/test-analytics-debug.html
public/diagnostico-analytics.html
public/test-analytics.html
```

### Scripts de Migración para archivar en `/scripts-old/`
```
scripts-old/
├── crear-bucket-imagenes.mjs
├── enriquecer-proyectos.mjs
├── generar-datos-proyectos.mjs
├── subir-proyectos-supabase.mjs
├── verificar-buckets-supabase.mjs
├── verificar-proyectos.mjs
├── instalar-push-notifications.ps1
├── crear-env-local.ps1
└── env-push-notifications-example.txt
```

---

## 📦 ESTRUCTURA LIMPIA FINAL

```
ALEMANYPAJARON/
├── 📄 Documentación Core (10 archivos)
│   ├── README.md ⭐
│   ├── SOLUCION_LOGIN_MOVIL.md ⭐
│   ├── PUSH_NOTIFICATIONS_README.md ⭐
│   ├── PUSH_NOTIFICATIONS_SETUP.md ⭐
│   ├── DEPLOY.md
│   ├── CREAR_ENV_LOCAL.md
│   ├── SUPABASE_CONFIG.md
│   ├── URL_CANONICA_CONFIG.md
│   ├── VAPID_KEYS_GENERADAS.md (NO GIT)
│   └── SENTRY_SETUP.md
│
├── 📄 Documentación de Referencia (4 archivos)
│   ├── ADMIN_SETUP.md
│   ├── AUDITORIA_SEO.md
│   ├── CONTENIDO.md
│   └── FAVICON_GUIA.md
│
├── 🗄️ supabase/
│   ├── README.md
│   ├── supabase-schema.sql ⭐
│   ├── supabase-schema-proyectos-blog.sql ⭐
│   ├── crear-tabla-push-subscriptions.sql ⭐
│   ├── crear-triggers-notificaciones-push.sql ⭐
│   ├── incrementar-visitas.sql
│   └── functions/
│       └── send-push-notification/index.ts ⭐
│
├── 🌐 public/
│   ├── limpiar-pwa-completo.html ⭐
│   ├── manifest.json ⭐
│   └── service-worker.js ⭐
│
├── 📂 src/ (código fuente)
├── 📦 package.json
├── ⚙️ next.config.ts
├── ⚙️ tailwind.config.js
├── ⚙️ tsconfig.json
└── 🔒 .env.local (NO GIT)
```

**Total archivos raíz:** ~14 documentos (vs ~30 actuales)  
**Reducción:** ~50% de archivos

---

## ✅ BENEFICIOS DE LA LIMPIEZA

1. **Claridad** - Solo documentos relevantes y actualizados
2. **Mantenibilidad** - Fácil encontrar información
3. **Profesional** - Estructura limpia para cliente
4. **Git más limpio** - Menos archivos en seguimiento
5. **Onboarding rápido** - Nuevos desarrolladores entienden rápido

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Crear carpetas de archivo (`docs-old/`, `supabase/sql-old/`, `scripts-old/`)
2. ✅ Mover archivos obsoletos a carpetas de archivo
3. ✅ Eliminar archivos HTML de testing
4. ✅ Actualizar .gitignore para ignorar carpetas `*-old/`
5. ✅ Commit final: "chore: limpieza proyecto v1.0 - archivos obsoletos movidos"
6. ✅ Tag de versión: `git tag v1.0.0`

---

**Versión:** 1.0.0  
**Fecha:** 16 Enero 2026  
**Estado:** Listo para Cliente
