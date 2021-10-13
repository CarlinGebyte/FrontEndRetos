$(document).ready(function () {
    jQuery.support.cors = true;    
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
        } );   
    })    
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
        } );   
    })
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
        } );   
    })    
    
    $("#upd-client").click(function () {
        var urlServicio = "http://localhost:8080/Client/all";
        $("#client-table tbody").empty();
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
                var id = 0;
                var nombre = "";
                var email = "";
                var edad = 0;
                var mensajes;
                var reservaciones;
                var salidaFila = "";
                
                $("#client-table tbody").empty();

                salidaFila = "<tr><th>ID Cliente</th><th>Nombre</th><th>Email</th><th>Edad</th><th>Mensajes</th><th>Reservaciones</th></tr>";
                $("#client-table tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {
                    id = result[i]["idClient"];
                    nombre = result[i]["name"];
                    email = result[i]["email"];
                    edad = result[i]["age"];
                    mensajes = result[i]["messages"];
                    reservaciones = result[i]["reservations"];

                    for (var j = 0; j<reservaciones.length; j++){
                        if (JSON.stringify(reservaciones) != "[]"){
                            delete reservaciones[j]["idReservation"];
                            delete reservaciones[j]["car"]["idCar"];
                            delete reservaciones[j]["car"]["gama"]["idGama"];
                            
                            for (var k = 0; k<reservaciones[j]["car"]["messages"].length;  k++){
                                delete reservaciones[j]["car"]["messages"][k]["idMessage"];
                            }
                        }else{
                            console.log(JSON.stringify(reservaciones));
                        }
                    }
                    for (var j = 0; j<mensajes.length; j++){
                        if (JSON.stringify(mensajes) != "[]"){
                            delete mensajes[j]["idMessage"];
                            delete mensajes[j]["car"]["idCar"];
                            delete mensajes[j]["car"]["gama"]["idGama"];
                        }else{
                            console.log(JSON.stringify(mensajes));
                        }
                    }
                    mensajes = JSON.stringify(result[i]["messages"]);
                    reservaciones = JSON.stringify(result[i]["reservations"]);

                    salidaFila = "<tr><td>" + id + "</td><td>" +
                        nombre + "</td><td>" + email + "</td><td>" + edad + "</td><td>" + mensajes + "</td><td>" + 
                        reservaciones +"</td></tr>";

                    $("#client-table tbody").append(salidaFila);

                }//Fin del for


                        //Fin del selector success del AJAX
            }
        });
    })
    $("#Borrar-Cliente").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client";
        var id = $("#ID-Cliente").val();
        $.ajax({
            url: urlServicio,
            type: "DELETE",
            data: JSON.stringify({id:id}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })    
    $("#Agregar-Cliente").click(function () {
        var urlServicio = "http://localhost:8080/Client/save";        
        var name = $("#Client-Name").val();
        var email = $("#Client-Email").val();
        var password = $("#Client-Password").val();
        var age = parseInt($("#Client-Age").val());
        $.ajax({
            url: urlServicio,
            type: "POST",
            data: JSON.stringify({ "name":name, "email":email, "password":password, "age":age }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })
    $("#Actualizar-Cliente").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client";
        var idCliente = parseInt($("#Agregar-ID-Cliente").val());
        var nombreCliente = $("#Nombre-Cliente").val();
        var emailCliente = $("#Email-Cliente").val();
        var edadCliente = parseInt($("#Edad-Cliente").val());
        $.ajax({
            url: urlServicio,
            type: "PUT",
            data: JSON.stringify({ "id":idCliente, "name":nombreCliente, "email":emailCliente, "age":edadCliente }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })

    $("#upd-message").click(function () {
        var urlServicio = "http://localhost:8080/Message/all";
        $("#Message-Table tbody").empty();
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
                var mensaje = "";
                var car;
                var client;
                var salidaFila = "";

                $("Message-Table tbody").empty();

                salidaFila = "<tr><th>Mensaje</th><th>Carro</th><th>Cliente</th></tr>";
                $("#Message-Table tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {
                    mensaje = result[i]["messageText"];
                    car = result[i]["car"];
                    client = result[i]["client"];

                    if (JSON.stringify(car) != "[]"){
                        delete car["idCar"];
                        delete car["gama"]["idGama"];
                    }else{
                        console.log(JSON.stringify(car));
                    }
                    if (JSON.stringify(client) != "[]"){
                        delete client["idClient"];
                        delete client["password"];
                    }else{
                        console.log(JSON.stringify(client));
                    }

                    car = JSON.stringify(result[i]["car"]);
                    client = JSON.stringify(result[i]["client"]);

                    salidaFila = "<tr><td>" + mensaje + "</td><td>" +
                        car + "</td><td>" + client + "</td></tr>";

                    $("#Message-Table tbody").append(salidaFila);

                            }//Fin del for


                            //Fin del selector success del AJAX
            }
        });
    })
    $("#Borrar-Mensaje").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";
        var id = $("#ID-Mensaje").val();
        $.ajax({
            url: urlServicio,
            type: "DELETE",
            data: JSON.stringify({id:id}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })    
    $("#Agregar-Mensaje").click(function () {
        var urlServicio = "http://localhost:8080/Message/save";
        var menssage = $("#Message").val();
        var client = parseInt($("#Client-Message-ID").val());
        var car = parseInt($("#Car-Message-ID").val());        
        $.ajax({
            url: urlServicio,
            type: "POST",
            data: JSON.stringify({ "messageText":menssage, "client":{"idClient":client}, "car":{"idCar":car}}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })
    $("#Actualizar-Mensaje").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";
        var idMensaje = parseInt($("#Agregar-ID-Mensaje").val());
        var mensaje = $("#Mensaje-Texto").val();
        $.ajax({
            url: urlServicio,
            type: "PUT",
            data: JSON.stringify({ "id":idMensaje, "messagetext":mensaje}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })

    $("#buscar-id-carro").click(function(){
        var uriServicioBusqueda = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/car/car/";
    
        //Recupero el id digitado de la caja texto
        var id=0;
        id = parseInt($("#ID-Carro").val());
        console.log ("id digitado por el usuario: " + id);

        console.log ("uriServicioBusqueda: " + (uriServicioBusqueda+id));

        var resultadoConsulta = null;

        $.ajax({
            url: uriServicioBusqueda + id,
            type: "GET", 
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,

            success: function(result){
                var i = 0;
                var id = 0;
                var marca = "";
                var modelo = 0;
                var categoryId = 0;
                var estructuraFila = "";
                resultadoConsulta = result.items;

                $("#tabla-carros tbody").empty();

                salidaFila = "<tr><th>ID Carro</th><th>Marca</th><th>Modelo</th><th>Category_ID</th></tr>";
                $("#tabla-carros tbody").append(salidaFila);


                for (i = 0;  i < resultadoConsulta.length;  i++){
                    id = result.items[i]["id"];
                    marca = result.items[i]["brand"];
                    modelo = result.items[i]["model"];
                    categoryId = result.items[i]["category_id"]
                    estructuraFila = "<tr><td>" + id + "</td><td>" +
                    marca + "</td><td>" + modelo + "</td><td>" + categoryId + "</td></tr>";
                    
                    $("#tabla-carros tbody").append(estructuraFila);
                }
                
                $("#tabla-carros tbody").show();

            }});

    });
    
    $("#buscar-id-cliente").click(function(){
        var uriServicioBusqueda = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/";
    
        //Recupero el id digitado de la caja texto
        var id=0;
        id = parseInt($("#ID-Cliente").val());
        console.log ("id digitado por el usuario: " + id);

        console.log ("uriServicioBusqueda: " + (uriServicioBusqueda+id));

        var resultadoConsulta = null;

        $.ajax({
            url: uriServicioBusqueda + id, 
            type: "GET",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,

            success: function(result){
                var i = 0;
                var id = 0;
                var nombre = "";
                var email = "";
                var edad = 0;
                var estructuraFila = "";
                resultadoConsulta = result.items;

                $("#tabla-cliente tbody").empty();

                salidaFila = "<tr><th>ID Cliente</th><th>Nombre</th><th>Email</th><th>Edad</th></tr>";
                $("#tabla-cliente tbody").append(salidaFila);


                for (i = 0;  i < resultadoConsulta.length;  i++){
                    id = result.items[i]["id"];
                    nombre = result.items[i]["name"];
                    email = result.items[i]["email"];
                    edad = result.items[i]["age"]
                    estructuraFila = "<tr><td>" + id + "</td><td>" +
                    nombre + "</td><td>" + email + "</td><td>" + edad + "</td></tr>";
                    
                    $("#tabla-cliente tbody").append(estructuraFila);
                }
                
                $("#tabla-cliente tbody").show();

            }});

    });

    $("#buscar-id-mensaje").click(function(){
        var uriServicioBusqueda = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/";
    
        //Recupero el id digitado de la caja texto
        var id=0;
        id = parseInt($("#ID-Mensaje").val());
        console.log ("id digitado por el usuario: " + id);

        console.log ("uriServicioBusqueda: " + (uriServicioBusqueda+id));

        var resultadoConsulta = null;

        $.ajax({
            url: uriServicioBusqueda + id,
            type: "GET",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,

            success: function(result){
                var i = 0;
                var id = 0;
                var mensaje = "";
                var estructuraFila = "";
                resultadoConsulta = result.items;

                $("#tabla-mensaje tbody").empty();

                salidaFila = "<tr><th>ID Mensaje</th><th>Mensaje</th></tr>";
                $("#tabla-mensaje tbody").append(salidaFila);


                for (i = 0;  i < resultadoConsulta.length;  i++){
                    id = result.items[i]["id"];
                    mensaje = result.items[i]["messagetext"];                   
                    estructuraFila = "<tr><td>" + id + "</td><td>" +
                    mensaje + "</td></tr>";
                    
                    $("#tabla-mensaje tbody").append(estructuraFila);
                }
                
                $("#tabla-mensaje tbody").show();

            }});

    });
})
