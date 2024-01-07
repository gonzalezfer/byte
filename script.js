function showSection(sectionId) {
                const sections = document.querySelectorAll('.content');
                sections.forEach(section => {
                    section.classList.remove('active');
                });

                const selectedSection = document.getElementById(sectionId);
                if (selectedSection) {
                    selectedSection.classList.add('active');
                }

                // Update active state in the navigation menu
                const menuLinks = document.querySelectorAll('div button');
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }

            // Marcar automáticamente la página de inicio al cargar
            window.addEventListener('load', () => {
                showSection('inicio');
            });
            