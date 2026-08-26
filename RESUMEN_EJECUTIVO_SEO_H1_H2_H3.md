> **Histórico (16 enero 2026).** Meter “Murcia” en todos los H2 ya no es la prioridad. Vigente: [`ESTRATEGIA_SEO_INDEXACION.md`](ESTRATEGIA_SEO_INDEXACION.md).

# Resumen ejecutivo: encabezados H1-H3 (histórico)

**Fecha:** 16 enero 2026  
**Páginas analizadas:** 20+  
**Estado general:** ⚠️ BUENO pero MEJORABLE

---

## 📊 PUNTUACIÓN GENERAL

### Por Categorías
- **H1 (Títulos principales):** ✅ 9/10 - EXCELENTE
- **H2 (Subtítulos):** ⚠️ 6/10 - NECESITA MEJORA
- **H3 (Subsecciones):** ✅ 7.5/10 - BUENO
- **Localización "Murcia":** ❌ 5/10 - INSUFICIENTE
- **Keywords Long-tail:** ❌ 5/10 - INSUFICIENTE

### Por Tipo de Servicio
- **Licencias (8 páginas):** 7/10 - Solo 32% de H2 incluyen "Murcia"
- **Reformas (12+ páginas):** 7.5/10 - 50% de H2 incluyen "Murcia"
- **Otros servicios:** 7.5/10

---

## 🔥 PROBLEMAS CRÍTICOS DETECTADOS

### 1. 🔴 CRÍTICO - Reforma Cocina (línea 189)

```typescript
// ACTUAL:
<h2>"La cocina que siempre has soñado"</h2>  ❌ PÉSIMO PARA SEO

// DEBE SER:
<h2>"Reforma de Cocina en Murcia: Diseño Personalizado y Muebles a Medida"</h2>  ✅
```

**Impacto:** ALTO - Página importante con H2 muy poético pero SIN keywords.

---

### 2. ⚠️ PATRÓN REPETITIVO - Falta "Murcia" en H2

**Problema en 40-50 H2 de 20+ páginas:**

| Patrón Actual | Apariciones | Estado |
|---------------|-------------|--------|
| "¿Qué incluye la [servicio]?" | 20+ veces | ❌ SIN "Murcia" |
| "¿Cuánto cuesta [servicio]?" | 20+ veces | ❌ SIN "Murcia" |
| "También te puede interesar" | 20+ veces | ❌ SIN "Murcia" |

**Ejemplos Específicos:**

#### Reforma Baño (línea 208):
```
❌ "¿Qué incluye la reforma de tu baño?"
✅ "¿Qué Incluye una Reforma Completa de Baño en Murcia?"
```

#### Licencia Bar (línea 204):
```
❌ "¿Qué incluye la tramitación de licencia?"
✅ "¿Qué Incluye la Licencia de Apertura de Bar en Murcia?"
```

#### Todas las páginas de precios:
```
❌ "¿Cuánto cuesta [servicio]?"
✅ "Precio [SERVICIO] Murcia: ¿Cuánto Cuesta?"
```

---

## 📋 PLAN DE ACCIÓN PRIORIZADO

### FASE 1: Cambios Críticos (1-2 horas)

#### 🔴 Prioridad MÁXIMA

1. **Reforma Cocina línea 189** - CAMBIO INMEDIATO
   ```
   Archivo: src/app/servicios/reforma-cocina/page.tsx
   Línea 189: Cambiar H2 completo
   Impacto: Alto
   ```

2. **Licencia Farmacia línea 203 y 229** - Añadir "Murcia"
   ```
   Archivo: src/app/servicios/licencia-farmacia/page.tsx
   2 cambios de H2
   ```

3. **Licencia Gimnasio línea 203** - Añadir "Murcia"
   ```
   Archivo: src/app/servicios/licencia-gimnasio/page.tsx
   1 cambio de H2
   ```

---

### FASE 2: Optimización Sistemática (2-3 horas)

#### 🟡 Patrón "¿Qué incluye...?" (20+ páginas)

**Cambio masivo necesario:**

| Página | Línea | Cambio |
|--------|-------|--------|
| Reforma Baño | 208 | + "en Murcia" |
| Reforma Cocina | 246 | + "en Murcia" |
| Reforma Bar | 203 | + "en Murcia" |
| Reforma Centro Médico | 204 | + "en Murcia" |
| Reforma Piscina | 207 | + "en Murcia" |
| Reforma Terraza | 208 | + "en Murcia" |
| Reforma Tejados | 202 | + "en Murcia" |
| Certificado Energético | 205 | + "en Murcia" |
| Licencia Bar | 204 | + "en Murcia" |
| Licencia Centro Médico | 204 | + "en Murcia" |
| Licencia Peluquería | 201 | + "en Murcia" |
| Licencia Veterinaria | 203 | + "en Murcia" |
| Licencia Clínica Estética | 204 | + "en Murcia" |

**Y más...**

---

### FASE 3: Mejoras Incrementales (1-2 horas)

#### 🟢 Optimización de H2 de precios

**Todas las páginas que tengan:**
```
"¿Cuánto cuesta [servicio]?"
```

**Cambiar por:**
```
"Precio [SERVICIO] Murcia: ¿Cuánto Cuesta?"
```

---

## 📈 IMPACTO ESPERADO

### Estimaciones SEO

| Métrica | Antes | Después (3-6 meses) | Mejora |
|---------|-------|---------------------|--------|
| **Posicionamiento Keywords principales** | Pos. 5-15 | Pos. 3-8 | +30-40% |
| **Tráfico Orgánico Servicios** | Baseline | +20-30% | Significativo |
| **CTR en SERPs** | Baseline | +10-15% | Bueno |
| **Páginas indexadas correctamente** | 100% | 100% | Mantener |

### Keywords Objetivo

**Mejorarán posicionamiento en:**
- "reforma baño murcia" → Objetivo Top 3
- "licencia bar murcia" → Objetivo Top 5
- "reforma cocina murcia" → Objetivo Top 3
- "licencia gimnasio murcia" → Objetivo Top 5
- "reforma integral murcia" → Objetivo Top 3

---

## ⏱️ TIEMPO Y RECURSOS

### Esfuerzo Estimado

| Fase | Páginas | H2 a cambiar | Tiempo | Complejidad |
|------|---------|--------------|--------|-------------|
| **Fase 1** | 3 | 5 | 1-2h | Baja |
| **Fase 2** | 20 | 40 | 2-3h | Media |
| **Fase 3** | 20 | 20 | 1-2h | Baja |
| **TOTAL** | 20+ | 65+ | **4-7h** | Media |

### Recursos Necesarios
- 1 desarrollador/editor
- Acceso a archivos TSX
- Testing en local antes de deploy
- NO requiere conocimientos avanzados SEO
- Cambios repetitivos = fácil de sistematizar

---

## ✅ VENTAJAS DE LA IMPLEMENTACIÓN

### Aspectos Positivos Actuales
1. ✅ **H1 perfectos** - Todos incluyen "Murcia", precios, keywords
2. ✅ **Estructura correcta** - H1 > H2 > H3 bien jerarquizado
3. ✅ **Metadata excelente** - Titles y descriptions optimizados
4. ✅ **Consistencia** - Todas las páginas siguen mismo patrón

### Lo Que Ganaremos
1. 🎯 **Mejor posicionamiento local** - "Murcia" en más H2
2. 🎯 **Long-tail keywords** - Más variaciones de búsqueda
3. 🎯 **Mayor relevancia** - Google ve más señales de localización
4. 🎯 **Competencia** - Superaremos a competidores locales
5. 🎯 **CTR mejorado** - Titles más descriptivos atraen más clics

---

## 🎬 SIGUIENTE PASO RECOMENDADO

### Opción A: Implementación Completa
**Realizar las 3 fases completas en orden**
- Tiempo: 4-7 horas totales
- Impacto: Máximo (+20-30% tráfico)
- Recomendado: SÍ

### Opción B: Solo Críticos
**Realizar solo Fase 1 (problemas críticos)**
- Tiempo: 1-2 horas
- Impacto: Medio (+5-10% tráfico)
- Recomendado: Solo si tiempo limitado

---

## 📂 DOCUMENTACIÓN COMPLETA

Para detalles exhaustivos consultar:
- `ANALISIS_ENCABEZADOS_SEO_SERVICIOS.md` - Análisis completo página por página
- Lista completa de cambios con números de línea exactos
- Ejemplos de código antes/después
- Benchmarking con competencia

---

**RECOMENDACIÓN FINAL:** ✅ **Implementar FASE 1 inmediatamente (1-2h) y FASE 2 esta semana (2-3h)**

El ROI es muy alto: 4-7 horas de trabajo pueden generar +20-30% más tráfico orgánico en 3-6 meses.

---

*Análisis realizado el 16 enero 2026*  
*Próxima revisión recomendada: Tras implementar cambios (Febrero 2026)*
