document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('main section[id]');
    const form = document.querySelector('.demo-form');
    const header = document.querySelector('.header');

    // 1. SCROLL SUAVE AL HACER CLIC EN EL MENÚ
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Solo aplica scroll suave a enlaces internos #algo
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. RESALTAR LINK ACTIVO MIENTRAS HACES SCROLL
    function actualizarLinkActivo() {
        let scrollY = window.scrollY;
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Quitar 'active' de todos los links
                navLinks.forEach(link => link.classList.remove('active'));

                // Agregar 'active' al link correspondiente
                const linkActivo = document.querySelector(`.nav a[href="#${sectionId}"]`);
                if (linkActivo) linkActivo.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', actualizarLinkActivo);
    actualizarLinkActivo(); // Ejecutar al cargar
