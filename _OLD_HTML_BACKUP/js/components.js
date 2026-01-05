/* ============================================
   ALEMÁN Y PAJARÓN - COMPONENT LOADER
   Carga componentes reutilizables (header, footer, etc.)
   ============================================ */

(function() {
    'use strict';
    
    // Detectar la ruta base según la profundidad de la página actual
    function getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        
        if (depth <= 0) return '.';
        
        let basePath = '';
        for (let i = 0; i < depth; i++) {
            basePath += '../';
        }
        return basePath.slice(0, -1); // Quitar última barra
    }
    
    const basePath = getBasePath();
    
    // Componentes a cargar
    const components = [
        { id: 'header-placeholder', file: 'header.html' },
        { id: 'footer-placeholder', file: 'footer.html' },
        { id: 'whatsapp-placeholder', file: 'whatsapp.html' },
        { id: 'scroll-top-placeholder', file: 'scroll-top.html' },
        { id: 'cookie-banner-placeholder', file: 'cookie-banner.html' }
    ];
    
    // Función para cargar un componente
    async function loadComponent(component) {
        const placeholder = document.getElementById(component.id);
        if (!placeholder) return;
        
        try {
            const response = await fetch(`${basePath}/components/${component.file}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            let html = await response.text();
            
            // Reemplazar rutas absolutas con rutas relativas según la profundidad
            html = html.replace(/href="\//g, `href="${basePath}/`);
            html = html.replace(/src="\//g, `src="${basePath}/`);
            
            placeholder.outerHTML = html;
        } catch (error) {
            console.warn(`Error loading component ${component.file}:`, error);
        }
    }
    
    // Cargar todos los componentes
    async function loadAllComponents() {
        await Promise.all(components.map(loadComponent));
        
        // Marcar enlace activo en navegación
        setActiveNavLink();
        
        // Inicializar funcionalidades después de cargar componentes
        initAfterLoad();
    }
    
    // Marcar el enlace de navegación activo
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace(basePath, '').replace('/index.html', ''))) {
                link.classList.add('active');
            }
        });
    }
    
    // Inicializar funcionalidades que dependen de componentes cargados
    function initAfterLoad() {
        // Disparar evento personalizado para que main.js sepa que los componentes están listos
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllComponents);
    } else {
        loadAllComponents();
    }
})();