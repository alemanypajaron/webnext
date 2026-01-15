# Guía Rápida - Subida de Proyectos

## ✅ Estado Actual

Todo está listo para subir los proyectos a Supabase:
- ✅ 13 proyectos generados y validados
- ✅ 197 imágenes verificadas
- ✅ 7 proyectos con análisis visual detallado
- ✅ 0 errores detectados

## 🚀 Para Subir AHORA

Ejecuta un solo comando:

```bash
node subir-proyectos-supabase.mjs
```

Esto subirá automáticamente:
- 197 imágenes al storage de Supabase
- 13 proyectos a la base de datos
- 197 registros de imágenes asociadas

## ⏱️ Tiempo Estimado

- Subida de imágenes: ~5-10 minutos (depende de la conexión)
- Creación de registros: ~1-2 minutos
- **Total: 10-15 minutos aproximadamente**

## 📊 Lo Que Verás

El script mostrará en tiempo real:
```
🚀 Iniciando subida de proyectos a Supabase
✅ Conexión con Supabase establecida correctamente

📦 Procesando: Reforma Floridablanca
   🔗 Slug: floridablanca-2024
   📸 Subiendo 23 imágenes...
   ✅ 23 imágenes subidas correctamente
   💾 Creando registro en base de datos...
   ✅ Proyecto creado con ID: xxx-xxx-xxx
   🖼️  Registrando imágenes en base de datos...
   ✅ 23 imágenes registradas
   ✨ Proyecto completado exitosamente

[... proceso para cada uno de los 13 proyectos ...]

📊 RESUMEN DE LA SUBIDA
✅ Proyectos subidos exitosamente: 13
⏭️  Proyectos omitidos (ya existían): 0
❌ Proyectos con errores: 0
```

## ⚠️ Importante

### Antes de Ejecutar

1. **Verifica que tienes el archivo `.env.local`** con:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. **Verifica que el bucket `imagenes` existe en Supabase Storage**

3. **Verifica que las tablas existen**:
   - `proyectos`
   - `imagenes_proyectos`

### Si Ya Ejecutaste el Script Antes

- El script detecta proyectos duplicados (por slug)
- Los proyectos existentes se omiten automáticamente
- No se crearán duplicados

### Para Re-subir un Proyecto

Si necesitas volver a subir un proyecto:

1. Elimínalo de la base de datos:
   ```sql
   DELETE FROM proyectos WHERE slug = 'slug-del-proyecto';
   ```
   (Las imágenes se eliminarán automáticamente por CASCADE)

2. Vuelve a ejecutar el script de subida

## 🔍 Verificar Resultados

### En Supabase Dashboard

1. **Tabla proyectos**:
   - Ve a Database → proyectos
   - Deberías ver 13 registros

2. **Tabla imagenes_proyectos**:
   - Ve a Database → imagenes_proyectos
   - Deberías ver 197 registros

3. **Storage**:
   - Ve a Storage → imagenes → proyectos
   - Deberías ver 13 carpetas

### En la Web

1. **Lista de proyectos**:
   ```
   https://www.alemanypajaron.es/proyectos
   ```

2. **Proyecto individual** (ejemplo):
   ```
   https://www.alemanypajaron.es/proyectos/floridablanca-2024
   https://www.alemanypajaron.es/proyectos/bernales-2023
   https://www.alemanypajaron.es/proyectos/correos-2024
   ```

## 📝 Log de Resultados

Después de ejecutar, revisa:
```
log-subida-proyectos.json
```

Contiene detalles de:
- Proyectos subidos exitosamente
- Proyectos omitidos
- Errores (si los hubo)

## 🛟 Solución de Problemas

### Error: "No se pudo establecer conexión"
```bash
# Verifica las variables de entorno
cat .env.local | grep SUPABASE
```

### Error: "Bucket no encontrado"
- Ve a Supabase Dashboard → Storage
- Crea el bucket `imagenes` si no existe
- Márcalo como público

### Error: "Tabla no encontrada"
- Ve a Supabase Dashboard → SQL Editor
- Ejecuta el schema: `supabase/supabase-schema-proyectos-blog.sql`

### El proceso se interrumpe
- El script guarda el progreso
- Puedes volver a ejecutarlo
- Los proyectos ya subidos se omitirán

## 📋 Checklist Final

Antes de subir, verifica:
- [ ] Archivo `.env.local` existe y tiene las claves
- [ ] Bucket `imagenes` creado en Supabase
- [ ] Tablas `proyectos` e `imagenes_proyectos` creadas
- [ ] Conexión a internet estable
- [ ] Has ejecutado `node verificar-proyectos.mjs` (sin errores)

Si todos los checks están ✅, ejecuta:
```bash
node subir-proyectos-supabase.mjs
```

## 🎉 Después de Subir

1. **Verifica en la web** que los proyectos se ven correctamente
2. **Prueba las galerías** de imágenes
3. **Revisa el SEO** (slugs, alt texts, descripciones)
4. **Opcionalmente**: Marca algunos como "destacados" en la base de datos:
   ```sql
   UPDATE proyectos 
   SET destacado = true 
   WHERE slug IN ('floridablanca-2024', 'correos-2024', 'vistabella-2025');
   ```

## 💪 ¡Listo!

Todo el sistema está preparado y verificado. Solo falta ejecutar el comando final para subir todo a Supabase.
