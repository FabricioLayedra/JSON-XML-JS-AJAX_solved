function cargarUsuarios() {

    $.getJSON("gastos_personales.json", function(data) {
        $.each(data, function(key, val) {
            let nombres = val["nombre"];
            let servicios = val["servicios"];
            let li = $('<li></li>');
            
            li.click(function (){
                $.ajax({
                        url: 'servicios_basicos.xml',
                        error: function() {
                            alert('¡error al cargar el archivo con los servicios!')
                        },
                        dataType: 'xml',
                        success: function(data) {
                            var container =$('<div></div>');
                            container.attr('id', 'servicios');
                            var ul = $('<ul></ul>');
                            
                            let total = 0;

                            lista =document.getElementById("servicios")
                            if (lista!= null){
                                while (lista.hasChildNodes())
                                    lista.removeChild(lista.firstChild);
                            }
                            $('#servicios').append("Facturas de "+ nombres + "<br>");
                            $(data).find('servicio').each(function() {
                                
                                
                                for (servicio of servicios){
                                    
                                    let encontrado = servicio["servicio"];
                                    if(encontrado==$(this).attr("tipo")){
                                        var nombre = $(this).find('nombre').text();
                                        var direccion = $(this).find('direccion').text();
                                        var telefono = $(this).find('telefono').text();
                                        let li = $('<li></li>');
                                        total += parseFloat(servicio["deuda"]);
                                        li.append(nombre + "<br>" +direccion + "<br>" + telefono + "<br>" + "Valor: " + servicio["deuda"] + "<br>");

                                        ul.append(li);

                                    }

                                
                                }
                            });
                            $('#servicios').append(ul);
                            $('#servicios').append("Total: $"+ total.toFixed(2) + "<br>");
                            $('body').append(container);
                        },
                        type: 'GET'
                   });
            });
            li.append(nombres);
            $('#lista-usuarios').append(li);
        });
    });
}

$(window).load(function() {
    cargarUsuarios();
});