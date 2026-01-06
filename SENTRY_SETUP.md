# 🐛 Sentry - Error Tracking Setup

**Monitoreo de errores en producción (OPCIONAL)**

---

## ⚠️ **ES OPCIONAL**

Sentry está configurado pero **NO activado por defecto**.

**Solo se activa si configuras el `NEXT_PUBLIC_SENTRY_DSN`.**

**Si no quieres usar Sentry:**
- ✅ No hagas nada
- ✅ La app funciona perfectamente sin él
- ✅ No afecta al performance

---

## 🚀 **Si Quieres Activar Sentry:**

### **1. Crear Cuenta en Sentry**

```
1. Ve a: https://sentry.io/signup/
2. Crea cuenta gratuita (10,000 errores/mes gratis)
3. Crea nuevo proyecto → Next.js
4. Copia el DSN (parece: https://xxxxx@xxxxx.ingest.sentry.io/xxxxx)
```

### **2. Configurar Variables de Entorno**

**Local (`.env.local`):**
```env
# Sentry DSN (opcional)
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**Vercel:**
```
Settings → Environment Variables
→ Add: NEXT_PUBLIC_SENTRY_DSN
→ Value: https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
→ Environments: ✅ Production, ✅ Preview, ✅ Development
→ Save
→ Redeploy
```

### **3. Verificar**

```typescript
// Sentry se activará automáticamente
// Solo en producción (NODE_ENV=production)
// No envía errores en desarrollo
```

---

## 📊 **¿Qué Monitorea Sentry?**

### **✅ Errores del Cliente (navegador):**
- JavaScript errors
- Promise rejections
- Network failures
- React errors

### **✅ Errores del Servidor:**
- API route errors
- Server Action errors
- Build errors
- SSR errors

### **✅ Performance Monitoring:**
- Page load times
- API response times
- Database query times
- Web Vitals (LCP, FID, CLS)

### **✅ Session Replay (opcional):**
- Graba sesiones con errores
- Ver qué hizo el usuario antes del error
- Cuesta créditos adicionales

---

## ⚙️ **Configuración Actual**

### **Sample Rates:**
```typescript
tracesSampleRate: 0.1  // 10% de transacciones
replaysSessionSampleRate: 0.1  // 10% de sesiones
replaysOnErrorSampleRate: 1.0  // 100% si hay error
```

### **Filtros Activos:**
```typescript
✅ NO envía errores de /administrator
✅ NO envía errores de extensiones del navegador
✅ NO envía errores de Supabase (tienen su propio tracking)
✅ Solo activo en producción (no en desarrollo)
```

---

## 🔍 **Dashboard de Sentry**

Una vez activado, verás en https://sentry.io:

### **Issues:**
- Lista de todos los errores
- Stack traces completos
- Frecuencia de ocurrencia
- Afectados (usuarios impactados)

### **Performance:**
- Tiempos de carga
- Cuellos de botella
- Queries lentas
- API lenta

### **Releases:**
- Tracking por versión
- ¿Qué deploy introdujo el error?
- Comparar performance entre versiones

---

## 💰 **Plan Gratuito de Sentry**

**Incluye:**
- ✅ 10,000 errores/mes
- ✅ 1,000 transacciones/mes
- ✅ 50 replays/mes
- ✅ 1 proyecto
- ✅ 30 días de retención

**Para Alemán y Pajarón:**
- Suficiente para empezar
- Escala conforme crece el tráfico
- Planes desde $26/mes si necesitas más

---

## 🆘 **Si Sentry Causa Problemas**

### **Desactivar Completamente:**

**Opción 1: No configurar DSN**
```
→ No pongas NEXT_PUBLIC_SENTRY_DSN
→ Sentry no se inicializa
→ Cero impacto
```

**Opción 2: Comentar archivos**
```typescript
// sentry.client.config.ts
// sentry.server.config.ts
// sentry.edge.config.ts
→ Comentar todo el contenido
```

**Opción 3: Desinstalar**
```bash
npm uninstall @sentry/nextjs
# Eliminar archivos sentry.*.config.ts
```

---

## 📚 **Documentación Oficial**

- **Setup:** https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Configuration:** https://docs.sentry.io/platforms/javascript/configuration/
- **Best Practices:** https://docs.sentry.io/platforms/javascript/best-practices/

---

## ✅ **Recomendación**

**Para Alemán y Pajarón:**

1. **Ahora mismo:** Dejar sin configurar (opcional)
2. **Cuando tengas tráfico:** Activar para monitorear errores reales
3. **Ventaja:** Detectar problemas antes que los usuarios los reporten

**No es urgente, pero es muy útil una vez en producción con usuarios reales.**

---

**📅 Configurado:** Enero 2026  
**✅ Listo para activar cuando quieras**  
**🆓 100% gratis hasta 10K errores/mes**

