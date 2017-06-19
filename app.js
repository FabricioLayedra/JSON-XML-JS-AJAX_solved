function filtrar( event ){

    /*Filtrado de los cantantes según el ritmo*/

    let ritmo = event.data.ritmo.toLowerCase();
    $('div#artistas > div').show();
    $('div#artistas > div:not(.'+ritmo+')').hide()
    return false;
}

function cargarRitmos() {
    

    $.ajax({
        url: 'servicios_basicos.xml',
        error: function() {
            alert('¡error al cargar el archivo con los ritmos!')
        },
        dataType: 'xml',
        success: function(data) {
            var ul = $('<ul></ul>')
            ul.attr('class', 'lista-generos text-center');
            $('#contenedor-generos').append(ul);

            $(data).find('genero').each(function() {

                var titulo = $(this).find('titulo').text();
                var valorCantidad = $(this).find('canciones').text();
                var cantidad = " (" + valorCantidad + ")";

                let li = $('<li></li>');
                let a = $('<a></a>');
                a.attr('class', 'ritmos-latinos')
                a.click({ritmo: titulo}, filtrar);

                a.append(titulo)
                li.append(a);
                li.append(cantidad);
                ul.append(li);

            });

        },
        type: 'GET'
    });
}
function cargarUsuarios() {

    /*carga de artistas desde cantantes.json*/

    $.getJSON("gastos_personales.json", function(data) {
        $.each(data, function(key, val) {
            let nombres = val["nombre"];
            let li = $('<li></li>');
            let a = $('<a href =""></a>');
            a.append(nombres)
            li.append(a)
            $('#lista-usuarios').append(li);
        });
    });
}

$('#requerimiento').click(function() {
    cargarUsuarios());
});
