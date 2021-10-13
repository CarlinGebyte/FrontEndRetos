$(document).ready(function () {
    jQuery.support.cors = true;    

    // GET para actualizar la tabla de carros
    $("#upd-table-car").click(function () {
        var urlServicio = "http://localhost:8080/Car/all";
        $("#table-car tbody").empty();
        console.log(urlServicio);
        $.ajax({
            url: urlServicio,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            
            success: function (result) {
                console.log("Entre a invocar el servicio REST");
                console.log(result);
                var i = 0;
                var nombre = "";
                var marca = "";
                var año = 0;
                var descripcion = "";
                var gama;
                var mensajes;
                var reservaciones;
                var salidaFila = "";

                $("#table-car tbody").empty();

                salidaFila = "<tr><th>Nombre</th><th>Marca</th><th>Año</th><th>Descripción</th><th>Gama</th><th>Mensajes</th><th>Reservaciones</th></tr>";
                $("#table-car tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {
                    nombre = result[i]["name"];
                    marca = result[i]["brand"];
                    año = result[i]["year"];
                    descripcion = result[i]["description"];
                    gama = result[i]["gama"];
                    mensajes = result[i]["messages"];
                    reservaciones = result[i]["reservations"];
                    
                    for (var k = 0;  k<reservaciones.length;  k++){
                        if (JSON.stringify(reservaciones) != "[]"){
                            delete reservaciones[k]["idReservation"];
                            delete reservaciones[k]["client"]["idClient"];
                            delete reservaciones[k]["client"]["password"];
                        }else{
                            console.log(JSON.stringify(reservaciones));
                        }
                    }

                    for (var j = 0;  j<mensajes.length;  j++){
                        if (JSON.stringify(mensajes) != "[]"){
                            delete mensajes[j]["idMessage"]
                        }else{
                            console.log(JSON.stringify(mensajes));
                        }
                    }

                    if (JSON.stringify(gama) != "[]"){
                        delete gama["idGama"]
                    }else{
                        console.log(JSON.stringify(gama));
                    }
                    gama = JSON.stringify(result[i]["gama"]);
                    mensajes = JSON.stringify(result[i]["messages"]);
                    reservaciones = JSON.stringify(result[i]["reservations"]);
                    
                    salidaFila = "<tr><td>" + nombre + "</td><td>" +
                        marca + "</td><td>" + año + "</td><td>" + descripcion + "</td><td>" +
                        gama + "</td><td>" + mensajes + "</td><td>" + reservaciones + "</td><tr>";

                    $("#table-car tbody").append(salidaFila);

                }//Fin del for


                            //Fin del selector success del AJAX
            }
        });
    })

    // DELETE para eliminar un carro
    $("#Borrar-Carro").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/car/car";
        var id = $("#ID-Carro").val();
        $.ajax({
            url: urlServicio,
            type: "DELETE",
            data: JSON.stringify({id:id}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        });   
    })

    // POST para agregar un carro
    $("#Agregar-Carro").click(function () {
        var urlServicio = "http://localhost:8080/Car/save";
        var name = $("#Name-Car").val();
        var marca = $("#Brand-Car").val();
        var año = parseInt($("#Year-Car").val());
        var descripcion = $("#Description-Car").val();
        var gama = $("#Gama-Car").val();
        $.ajax({
            url: urlServicio,
            type: "POST",
            data: JSON.stringify({ "name":name, "brand":marca, "year":año, "description":descripcion, "gama":{"idGama":gama} }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        });   
    })

    // PUT para actualizar un carro
    $("#Actualizar-Carro").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/car/car";
        var idCarro = parseInt($("#ID-Agregar-Carro").val());
        var marcaCarro = $("#Marca-Carro").val();
        var modeloCarro = parseInt($("#Modelo-Carro").val());
        var categoryIdCarro = parseInt($("#Category-ID-Carro").val());
        $.ajax({
            url: urlServicio,
            type: "PUT",
            data: JSON.stringify({ "id":idCarro, "brand":marcaCarro, "model":modeloCarro, "category_id":categoryIdCarro }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        });   
    })
})
