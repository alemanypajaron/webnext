/* ============================================
   ALEMÁN Y PAJARÓN - JAVASCRIPT PRINCIPAL
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initCounters();
    initAccordion();
    initForms();
    initCookieBanner();
    initProjectFilters();
    
    // Inicializar scroll-top después de que se carguen los componentes
    document.addEventListener('componentsLoaded', function() {
        initScrollTop();
    });
    
    // También intentar inicializar inmediatamente por si los componentes ya están cargados
    setTimeout(initScrollTop, 100);
});

/* ---------- HEADER SCROLL ---------- */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    // Solo hacer transparente en home sobre hero
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
    const hero = document.querySelector('.hero');
    
    if (isHomePage && hero) {
        // En home con hero: transparente al inicio, blanco al hacer scroll
        header.classList.add('transparent');
        
        let ticking = false;
        
        function handleScroll() {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            if (window.pageYOffset > heroBottom - 100 || window.pageYOffset > 50) {
                header.classList.remove('transparent');
                header.classList.add('scrolled');
            } else {
                header.classList.add('transparent');
                header.classList.remove('scrolled');
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
        
        handleScroll();
    } else {
        // En otras páginas: siempre blanco
        header.classList.remove('transparent');
        
        let ticking = false;
        
        function handleScroll() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
        
        handleScroll();
    }
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Cerrar al hacer click en un enlace
    const navLinks = nav.querySelectorAll('.nav-link, .nav-dropdown-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Cerrar al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---------- SCROLL TO TOP ---------- */
function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) {
        console.log('Back to Top button not found');
        return;
    }
    
    console.log('Back to Top initialized');
    
    let ticking = false;
    
    function updateVisibility() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Check inicial
    updateVisibility();
}

/* ---------- ANIMATIONS ON SCROLL ---------- */
function initAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;
    
    // Aplicar estilos iniciales
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, parseInt(delay));
                
                observer.unobserve(el);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));
}

/* ---------- COUNTER ANIMATION ---------- */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    
    // Mostrar los números directamente sin animación
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.counter);
        counter.textContent = target;
    });
}

/* ---------- ACCORDION ---------- */
function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    
    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            header.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');
                
                // Cerrar todos
                items.forEach(i => {
                    i.classList.remove('active');
                    const c = i.querySelector('.accordion-content');
                    if (c) c.style.maxHeight = null;
                });
                
                // Abrir el clickeado si estaba cerrado
                if (!isOpen) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });
}

/* ---------- FORM VALIDATION ---------- */
function initForms() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const required = form.querySelectorAll('[required]');
            
            required.forEach(field => {
                const error = field.parentElement.querySelector('.form-error');
                
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    if (error) {
                        error.textContent = 'Este campo es obligatorio';
                        error.style.display = 'block';
                    }
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    if (error) {
                        error.textContent = 'Email no válido';
                        error.style.display = 'block';
                    }
                } else {
                    field.classList.remove('error');
                    if (error) error.style.display = 'none';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Validación en tiempo real
        const fields = form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });
    });
    
    function validateField(field) {
        const error = field.parentElement.querySelector('.form-error');
        
        if (field.required && !field.value.trim()) {
            field.classList.add('error');
            if (error) {
                error.textContent = 'Este campo es obligatorio';
                error.style.display = 'block';
            }
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            field.classList.add('error');
            if (error) {
                error.textContent = 'Email no válido';
                error.style.display = 'block';
            }
        } else {
            field.classList.remove('error');
            if (error) error.style.display = 'none';
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

/* ---------- COOKIE BANNER ---------- */
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    
    if (!banner) return;
    
    const consent = localStorage.getItem('cookieConsent');
    
    if (!consent) {
        setTimeout(() => {
            banner.classList.add('visible');
        }, 2000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.classList.remove('visible');
        });
    }
    
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            banner.classList.remove('visible');
        });
    }
}

/* ---------- PROJECT FILTERS ---------- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Añadir transiciones CSS
    projectCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}