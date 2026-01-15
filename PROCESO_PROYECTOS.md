# Proceso de Generación y Subida de Proyectos

Este documento explica el proceso completo para generar y subir proyectos reales a la base de datos de Supabase desde las carpetas de imágenes.

## Descripción General

El proceso consta de 3 pasos principales:

1. **Generación de datos** - Analiza las carpetas de imágenes y genera archivos JSON con información estructurada
2. **Enriquecimiento** - Añade detalles específicos basados en análisis visual de las imágenes
3. **Subida a Supabase** - Sube las imágenes al storage y crea los registros en la base de datos

## Estructura de Archivos

```
ALEMANYPAJARON/
├── imagenes_proyectos/           # Carpetas con imágenes de cada proyecto
│   ├── BERNALES 2023/
│   ├── FLORIDABLANCA 2024/
│   ├── CORREOS 2024/
│   └── ...
├── datos_proyectos_generados/     # JSON generados automáticamente
├── datos_proyectos_enriquecidos/  # JSON con análisis visual detallado
├── generar-datos-proyectos.mjs    # Script paso 1
├── enriquecer-proyectos.mjs       # Script paso 2
└── subir-proyectos-supabase.mjs   # Script paso 3
```

## Paso 1: Generar Datos de Proyectos

### Comando
```bash
node generar-datos-proyectos.mjs
```

### ¿Qué hace?
- Lee cada carpeta en `imagenes_proyectos/`
- Extrae información del nombre de la carpeta (nombre del proyecto y año)
- Identifica todas las imágenes válidas (JPG, JPEG, PNG, WEBP)
- Genera datos estructurados:
  - **Título**: Basado en el nombre de la carpeta
  - **Slug**: URL-friendly del título
  - **Ubicación**: Detecta barrios conocidos de Murcia
  - **Año**: Extraído del nombre de la carpeta
  - **Tipo de proyecto**: Vivienda, local comercial u oficina
  - **Servicios**: Basados en el tipo de proyecto
  - **Superficie, presupuesto, duración**: Estimaciones realistas
  - **Descripción completa**: Genera HTML con estructura profesional

### Salida
- Crea `datos_proyectos_generados/` con un JSON por proyecto
- Genera `_resumen.json` con estadísticas
- Genera `_todos_proyectos.json` con todos los proyectos juntos

### Ejemplo de datos generados
```json
{
  "titulo": "Reforma Floridablanca",
  "slug": "floridablanca-2024",
  "descripcion_corta": "Reforma integral de vivienda...",
  "descripcion_completa": "<h2>Descripción del Proyecto</h2>...",
  "ubicacion": "Floridablanca, Murcia",
  "ano": 2024,
  "superficie": "100 m²",
  "presupuesto": "80.000€ - 100.000€",
  "duracion": "6 meses",
  "servicios": ["Dirección de Obra", "Gestión de Proyectos", ...],
  "imagenes": [...]
}
```

## Paso 2: Enriquecer con Análisis Visual

### Comando
```bash
node enriquecer-proyectos.mjs
```

### ¿Qué hace?
- Lee los proyectos generados
- Aplica análisis visual manual para proyectos específicos
- Añade una sección "Detalles y Acabados" a la descripción HTML
- Incluye características específicas vistas en las fotos:
  - Materiales utilizados
  - Acabados especiales
  - Elementos de diseño destacados
  - Estilo y calidad del proyecto

### Proyectos con análisis visual detallado
- Floridablanca 2024
- Clínica Estética La Flota 2024
- Correos 2024
- Bernales 2023
- La Fama 2021
- Vistabella 2025
- El Palmar 2023

### Salida
- Crea `datos_proyectos_enriquecidos/` con versiones mejoradas
- Los proyectos sin análisis específico se copian sin cambios

## Paso 3: Subir a Supabase

### Requisitos previos
- Archivo `.env.local` con las credenciales:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
  ```
- Bucket `imagenes` creado en Supabase Storage
- Tablas `proyectos` e `imagenes_proyectos` creadas

### Comando
```bash
node subir-proyectos-supabase.mjs
```

### ¿Qué hace?

1. **Verifica la conexión** con Supabase
2. **Para cada proyecto**:
   - Verifica si ya existe (por slug) - si existe, lo omite
   - Sube todas las imágenes al storage en `proyectos/{slug}/`
   - Crea el registro del proyecto con la URL de la imagen principal
   - Crea registros de imágenes asociadas con orden y metadatos
3. **Genera un resumen** con estadísticas de éxito/error
4. **Guarda un log** en `log-subida-proyectos.json`

### Estructura en Supabase Storage
```
imagenes/
└── proyectos/
    ├── floridablanca-2024/
    │   ├── IMG_1479.JPEG
    │   ├── IMG_1481.JPEG
    │   └── ...
    ├── bernales-2023/
    │   ├── IMG_2622.JPEG
    │   └── ...
    └── ...
```

### Tabla `proyectos`
Campos que se completan:
- `titulo`, `slug`, `descripcion_corta`, `descripcion_completa`
- `ubicacion`, `ano`, `superficie`, `presupuesto`, `duracion`
- `servicios` (array), `estado`, `imagen_principal` (URL pública)
- `cliente`, `destacado`, `publicado`, `orden`

### Tabla `imagenes_proyectos`
Campos que se completan:
- `proyecto_id` (UUID del proyecto)
- `url` (URL pública en storage)
- `alt_text` (texto alternativo para SEO)
- `orden` (orden de aparición en la galería)

## Ejecución Completa

Para procesar nuevas carpetas de proyectos, ejecuta en orden:

```bash
# 1. Generar datos desde carpetas
node generar-datos-proyectos.mjs

# 2. Enriquecer con análisis visual
node enriquecer-proyectos.mjs

# 3. Subir a Supabase
node subir-proyectos-supabase.mjs
```

## Resultados Esperados

### Proyectos generados: 13
1. Bernales 2023 (11 imágenes)
2. Clínica Estética La Flota 2024 (12 imágenes)
3. Correos 2024 (12 imágenes)
4. El Palmar 2023 (20 imágenes)
5. Floridablanca 2024 (23 imágenes)
6. La Fama 2021 (21 imágenes)
7. Lousteau 2018 (12 imágenes)
8. Same Wave 2019 (12 imágenes)
9. San Juan 2016 (14 imágenes)
10. Santa Eulalia 2023 (8 imágenes)
11. Santa Marta 2018 (17 imágenes)
12. Soriano 2017 (11 imágenes)
13. Vistabella 2025 (24 imágenes)

**Total: 197 imágenes**

## Añadir Nuevos Proyectos

1. Crea una carpeta en `imagenes_proyectos/` con formato: `NOMBRE PROYECTO AÑO`
   - Ejemplo: `NUEVA REFORMA 2025`
2. Añade las imágenes (JPG, JPEG, PNG, WEBP)
3. Ejecuta los 3 scripts en orden
4. Opcionalmente, añade análisis visual en `enriquecer-proyectos.mjs`

## Añadir Análisis Visual Personalizado

Para añadir detalles específicos a un nuevo proyecto:

1. Abre `enriquecer-proyectos.mjs`
2. Añade una entrada en el objeto `analisisManual`:

```javascript
'mi-proyecto-2025': {
  caracteristicas: [
    'Característica 1 vista en las fotos',
    'Característica 2 vista en las fotos',
    // ...
  ],
  espacios: ['cocina', 'salón', 'baño'],
  estilo: 'contemporáneo_minimalista',
  calidad: 'alta',
  descripcion_adicional: 'Descripción detallada del proyecto...'
}
```

3. Vuelve a ejecutar el script de enriquecimiento y subida

## Verificación Post-Subida

1. **En la base de datos**:
   ```sql
   SELECT COUNT(*) FROM proyectos;
   SELECT COUNT(*) FROM imagenes_proyectos;
   ```

2. **En la web**:
   - Visita `/proyectos` para ver el listado
   - Visita `/proyectos/[slug]` para ver cada proyecto individual

3. **URLs de ejemplo**:
   - https://www.alemanypajaron.es/proyectos
   - https://www.alemanypajaron.es/proyectos/floridablanca-2024
   - https://www.alemanypajaron.es/proyectos/bernales-2023

## Troubleshooting

### Error: "No se pudo establecer conexión con Supabase"
- Verifica que `.env.local` existe y tiene las claves correctas
- Verifica que las claves son válidas en el dashboard de Supabase

### Error: "Error subiendo imagen"
- Verifica que el bucket `imagenes` existe en Supabase Storage
- Verifica que el bucket es público o tiene las políticas RLS correctas
- Verifica que las imágenes existen en las carpetas locales

### Error: "Error creando proyecto"
- Verifica que la tabla `proyectos` existe
- Verifica que todas las columnas requeridas existen
- Revisa el mensaje de error específico en el log

### Proyectos omitidos
- Si un proyecto ya existe (mismo slug), se omite automáticamente
- Para re-subir, elimina el proyecto de la base de datos primero

## Notas Importantes

- **No se crean duplicados**: El script verifica el slug antes de insertar
- **Las imágenes se suben con `upsert: true`**: Se sobrescriben si ya existen
- **Los datos no se inventan**: Se basan en nombres de carpetas y análisis real
- **SEO optimizado**: Slugs, alt texts y descripciones están optimizados
- **Escalable**: Fácil añadir nuevos proyectos siguiendo el mismo proceso

## Mantenimiento Futuro

- Mantener la convención de nombres de carpetas
- Actualizar análisis visual cuando se añadan proyectos destacados
- Revisar periódicamente la calidad de las descripciones generadas
- Considerar añadir más datos específicos por proyecto si es necesario
