document.addEventListener('DOMContentLoaded', function () {
    // Hacer la solicitud Ajax al archivo "recursos.json"
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'recursos.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            // Iterar sobre cada recurso en el JSON y agregarlos al div
            data.forEach(function (recurso) {
                var recursoDiv = document.createElement('div');
                recursoDiv.className = 'recurso';

                var recursoInfoDiv = document.createElement('div');
                recursoInfoDiv.className = 'recurso-info';

                var titulo = document.createElement('h4');
                titulo.textContent = recurso.title;

                var tipoTamañoDiv = document.createElement('div');

                var tipo = document.createElement('p');
                tipo.textContent = recurso.type;

                var tamaño = document.createElement('p');
                tamaño.textContent = recurso.size;

                tipoTamañoDiv.appendChild(tipo);
                tipoTamañoDiv.appendChild(tamaño);

                recursoInfoDiv.appendChild(titulo);
                recursoInfoDiv.appendChild(tipoTamañoDiv);

                recursoDiv.appendChild(recursoInfoDiv);

                // Crear el botón de descarga con el enlace
                var botonDescarga = document.createElement('button');
                botonDescarga.textContent = 'Descargar';
                botonDescarga.addEventListener('click', function () {
                    window.location.href = recurso.url;
                });

                recursoDiv.appendChild(botonDescarga);

                // Agregar el recurso al div en tu página
                document.getElementById('lista-recursos').appendChild(recursoDiv);
            }
        }
    };

    xhr.send();
});
