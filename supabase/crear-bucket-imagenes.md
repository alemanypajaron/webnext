# 📦 Configurar Bucket de Imágenes en Supabase Storage

Para que el gestor de imágenes funcione, necesitas crear un bucket público en Supabase Storage.

## 🔧 Pasos para Configurar

### 1️⃣ Acceder a Supabase Storage

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. En el menú lateral, click en **"Storage"**
3. Click en **"Create a new bucket"** (Crear nuevo bucket)

### 2️⃣ Crear el Bucket

**Configuración del bucket:**

```
Name: blog-images
✅ Public bucket (marcar como público)
```

**Importante:**
- El nombre DEBE ser exactamente: `blog-images`
- DEBE estar marcado como **Public** para que las URLs funcionen

### 3️⃣ Configurar Políticas de Acceso (RLS)

Una vez creado el bucket, necesitas configurar las políticas de seguridad:

**En Storage > Policies > blog-images:**

#### Política 1: Permitir LECTURA pública
```sql
-- Nombre: Public Read Access
-- Operación: SELECT
-- Política:
CREATE POLICY "Permitir lectura pública"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');
```

#### Política 2: Permitir SUBIDA para usuarios autenticados
```sql
-- Nombre: Authenticated Upload
-- Operación: INSERT
-- Política:
CREATE POLICY "Permitir subida autenticados"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' AND
  auth.role() = 'authenticated'
);
```

#### Política 3: Permitir ELIMINACIÓN para usuarios autenticados
```sql
-- Nombre: Authenticated Delete
-- Operación: DELETE
-- Política:
CREATE POLICY "Permitir borrado autenticados"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images' AND
  auth.role() = 'authenticated'
);
```

### 4️⃣ Verificar Configuración

1. En Storage > blog-images, deberías ver el bucket vacío
2. Las políticas deberían aparecer en la pestaña "Policies"
3. Intenta subir una imagen desde el gestor en el panel admin

## ✅ Resultado

Una vez configurado:
- ✅ Las imágenes se subirán a Supabase Storage
- ✅ URLs públicas funcionarán automáticamente
- ✅ Funciona en Vercel (producción)
- ✅ No hay límites de sistema de archivos

## 🌐 URLs de las Imágenes

Las imágenes tendrán URLs como:
```
https://[tu-proyecto].supabase.co/storage/v1/object/public/blog-images/1234567890-imagen.jpg
```

## 📝 Notas

- **Límite de tamaño:** 5MB por imagen (configurable en el código)
- **Formatos soportados:** JPG, PNG, GIF, WEBP
- **Bucket público:** Necesario para que las imágenes se muestren en el sitio web
- **RLS:** Solo usuarios autenticados (admin) pueden subir/eliminar

## 🔥 Troubleshooting

### Error: "Bucket not found"
→ Verifica que el bucket se llame exactamente `blog-images`

### Error: "Permission denied"
→ Verifica que el bucket esté marcado como **Public**
→ Verifica que las políticas RLS estén creadas

### Las imágenes no se muestran
→ Verifica que el bucket sea público
→ Verifica la URL en el navegador

