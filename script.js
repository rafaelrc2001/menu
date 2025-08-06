document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.querySelector('.sidebar');
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    
    // Alternar menú lateral
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });
    
    // Manejar clics en los botones desplegables
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevenir el comportamiento predeterminado del enlace
            e.preventDefault();
            
            // Cerrar otros menús desplegables abiertos
            const alreadyActive = this.classList.contains('active');
            document.querySelectorAll('.dropdown-btn').forEach(item => {
                if (item !== this) {
                    item.classList.remove('active');
                    const content = item.nextElementSibling;
                    if (content && content.classList.contains('dropdown-content')) {
                        content.style.display = 'none';
                    }
                }
            });
            
            // Alternar el menú desplegable actual
            this.classList.toggle('active');
            const dropdownContent = this.nextElementSibling;
            
            if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }
            }
            
            // Si la barra lateral está colapsada, no colapsar al hacer clic en un enlace
            if (!sidebar.classList.contains('collapsed')) {
                e.stopPropagation();
            }
        });
    });
    
    // Cerrar menús desplegables al hacer clic fuera de ellos
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown-btn') && !e.target.matches('.dropdown-btn *')) {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => {
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                }
            });
            
            const activeBtns = document.querySelectorAll('.dropdown-btn.active');
            activeBtns.forEach(btn => {
                btn.classList.remove('active');
            });
        }
    });
    
    // Manejar el redimensionamiento de la ventana
    function handleResize() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }
    
    // Ejecutar al cargar y al redimensionar
    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar al cargar la página
});
