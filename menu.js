const menuToggle = document.getElementById("menu-toggle");
            const menuContainer = document.getElementById("menu-container");
            
            menuContainer.style.maxHeight = '0px';
            menuToggle.addEventListener("click", function() {
                
        if (menuContainer.style.maxHeight === '0px') {
            menuContainer.style.maxHeight = '400px';
        } else {
            menuContainer.style.maxHeight = '0px';
        }
            });
