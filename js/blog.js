/* Blog Search, Filter and Pagination */

(function() {
    'use strict';
    
    // Configuración
    const ITEMS_PER_PAGE = 6;
    
    // Elementos del DOM
    const searchInput = document.getElementById('blog-search-input');
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogGrid = document.getElementById('blog-grid');
    const paginationContainer = document.getElementById('blog-pagination');
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Estado
    let currentPage = 1;
    let currentCategory = 'all';
    let currentSearch = '';
    
    // Inicializar
    function init() {
        if (!blogGrid || !paginationContainer) return;
        
        // Event listeners
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => handleFilter(btn.dataset.category));
        });
        
        // Renderizar paginación inicial
        renderPagination();
    }
    
    // Manejar búsqueda
    function handleSearch(e) {
        currentSearch = e.target.value.toLowerCase().trim();
        currentPage = 1;
        filterAndRender();
    }
    
    // Manejar filtro por categoría
    function handleFilter(category) {
        currentCategory = category;
        currentPage = 1;
        
        // Actualizar botones activos
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        filterAndRender();
    }
    
    // Filtrar y renderizar
    function filterAndRender() {
        const filtered = Array.from(blogCards).filter(card => {
            const category = card.dataset.category || '';
            const title = (card.dataset.title || '').toLowerCase();
            const content = (card.dataset.content || '').toLowerCase();
            const searchText = currentSearch;
            
            // Filtro por categoría
            const categoryMatch = currentCategory === 'all' || category === currentCategory;
            
            // Filtro por búsqueda
            const searchMatch = !searchText || 
                title.includes(searchText) || 
                content.includes(searchText) ||
                category.toLowerCase().includes(searchText);
            
            return categoryMatch && searchMatch;
        });
        
        // Ocultar todos primero
        blogCards.forEach(card => {
            card.style.display = 'none';
            card.classList.add('hidden');
        });
        
        // Calcular paginación
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = filtered.slice(startIndex, endIndex);
        
        // Mostrar items de la página actual
        paginatedItems.forEach(card => {
            card.style.display = 'flex';
            card.classList.remove('hidden');
        });
        
        // Mostrar mensaje si no hay resultados
        if (filtered.length === 0) {
            showNoResults();
        } else {
            hideNoResults();
        }
        
        // Renderizar paginación
        renderPagination(totalPages, filtered.length);
    }
    
    // Renderizar paginación
    function renderPagination(totalPages, totalItems) {
        if (!paginationContainer) return;
        
        totalPages = totalPages || Math.ceil(blogCards.length / ITEMS_PER_PAGE);
        totalItems = totalItems || blogCards.length;
        
        // Si solo hay una página o menos, no mostrar paginación
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let html = '';
        
        // Botón anterior
        html += `<button class="blog-pagination-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>`;
        
        // Números de página
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        if (startPage > 1) {
            html += `<button class="blog-pagination-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                html += `<span style="padding: 0 var(--spacing-sm); color: var(--color-gray-400);">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            html += `<button class="blog-pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span style="padding: 0 var(--spacing-sm); color: var(--color-gray-400);">...</span>`;
            }
            html += `<button class="blog-pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        // Botón siguiente
        html += `<button class="blog-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>`;
        
        paginationContainer.innerHTML = html;
        
        // Event listeners para botones de paginación
        paginationContainer.querySelectorAll('.blog-pagination-btn:not(.disabled)').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                if (page && page !== currentPage && page >= 1 && page <= totalPages) {
                    currentPage = page;
                    filterAndRender();
                    // Scroll suave hacia arriba
                    window.scrollTo({ top: blogGrid.offsetTop - 100, behavior: 'smooth' });
                }
            });
        });
    }
    
    // Mostrar mensaje de no resultados
    function showNoResults() {
        if (document.querySelector('.blog-no-results')) return;
        
        const noResults = document.createElement('div');
        noResults.className = 'blog-no-results';
        noResults.innerHTML = `
            <h3>No se encontraron artículos</h3>
            <p>Intenta con otros términos de búsqueda o cambia el filtro de categoría.</p>
        `;
        blogGrid.appendChild(noResults);
    }
    
    // Ocultar mensaje de no resultados
    function hideNoResults() {
        const noResults = document.querySelector('.blog-no-results');
        if (noResults) {
            noResults.remove();
        }
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

