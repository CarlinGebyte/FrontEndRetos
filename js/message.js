$(document).ready(function () {
    jQuery.support.cors = true;

    // GET para actualizar la tabla de Mensaje
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

    // DELETE para eliminar un mensaje
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
        });   
    })

    // POST para agregar un mensaje
    $("#Agregar-Mensaje").click(function () {
        var urlServicio = "http://localhost:8080/Message/save";
        var message = $("#Message").val();
        var client = parseInt($("#Client-Message-ID").val());
        var car = parseInt($("#Car-Message-ID").val()); 
        console.log(car)       
        $.ajax({
            url: urlServicio,
            type: "POST",
            data: JSON.stringify({ "messageText":message, "client":{"idClient":client}, "car":{"idCar":car}}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })

    // PUT para actualizar un mensaje
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
})