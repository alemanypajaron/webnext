# 🔧 Configurar API Key de TinyMCE en Vercel

## ✅ Estado Actual

- ✅ **Local**: API key configurada en `.env.local` (funciona en desarrollo)
- ✅ **Código**: `RichTextEditor.tsx` actualizado para usar variable de entorno
- ⚠️ **Producción**: Falta configurar en Vercel para que funcione online

---

## 📋 Pasos para Configurar en Vercel

### 1️⃣ Ir a la Configuración de Variables de Entorno

Accede a:
```
https://vercel.com/[tu-usuario]/webnext-one/settings/environment-variables
```

O manualmente:
1. Ve a [vercel.com](https://vercel.com)
2. Entra en tu proyecto **webnext-one**
3. Click en **Settings** (Configuración)
4. Click en **Environment Variables** (Variables de entorno)

---

### 2️⃣ Añadir la Nueva Variable

Haz click en **"Add New"** y completa:

**Nombre de la variable:**
```
NEXT_PUBLIC_TINYMCE_API_KEY
```

**Valor:**
```
hzc5ul9u051j4hya4cc4dxrtf8gq7mzrmluchwsgptgkz15g
```

**Entornos:** ✅ Selecciona **TODOS**
- ✅ Production
- ✅ Preview
- ✅ Development

---

### 3️⃣ Guardar y Redesplegar

1. Click en **"Save"**
2. Vercel te preguntará si quieres redesplegar
3. Click en **"Redeploy"** o ve a la pestaña **Deployments**
4. Click en los **3 puntos** (⋮) del último deployment
5. Click en **"Redeploy"**

---

## 🔍 Verificar que Funciona

Una vez desplegado, ve al panel de administración:

```
https://webnext-one.vercel.app/administrator/blog/nuevo
```

Y verifica que el editor TinyMCE:
- ✅ **No muestra** el mensaje de "This domain is not registered with Tiny Cloud"
- ✅ Tiene todas las funcionalidades completas (menús, toolbar, etc.)
- ✅ Carga correctamente

---

## 🎯 Qué Hace Esta API Key

La API key de TinyMCE:
- Permite usar TinyMCE sin limitaciones
- Elimina mensajes de dominio no registrado
- Habilita todas las funcionalidades premium gratuitas
- Es **pública** (empieza con `NEXT_PUBLIC_`) por eso es seguro incluirla en el frontend

---

## 🆘 Solución de Problemas

### El editor sigue mostrando "no-api-key"

1. Verifica que la variable esté **exactamente** así:
   - Nombre: `NEXT_PUBLIC_TINYMCE_API_KEY` (con guiones bajos)
   - Valor: `hzc5ul9u051j4hya4cc4dxrtf8gq7mzrmluchwsgptgkz15g`

2. Asegúrate de haber **redesplegado** después de añadir la variable

3. Limpia la caché del navegador (Ctrl + Shift + R)

### El editor no carga

1. Abre la consola del navegador (F12)
2. Busca errores relacionados con TinyMCE
3. Verifica que la API key sea válida en [tiny.cloud](https://www.tiny.cloud/my-account/dashboard/)

---

## 📝 Notas Importantes

- ⚠️ **No compartas** esta API key públicamente en GitHub (aunque es para frontend)
- 💡 Si necesitas regenerar la key, hazlo desde [tiny.cloud](https://www.tiny.cloud)
- 🔄 Cada vez que cambies la variable en Vercel, necesitas redesplegar

