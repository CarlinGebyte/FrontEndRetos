$(document).ready(function () {
    jQuery.support.cors = true; 

    // GET para actualizar la tabla de Reservaciones
    $("#upd-reservation").click(function (){
        var urlServicio = "http://localhost:8080/Reservation/all";
        console.log(urlServicio)
        $("#reservation-table tbody").empty();
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
                var startDate = "";
                var devolutionDate = "";
                var status = "";
                var car;
                var client;
                var score = 0;
                var salidaFila = "";

                $("#reservation-table tbody").empty();

                salidaFila = "<tr><th>Fecha Inicio</th><th>Fecha Entrega</th><th>Estado</th><th>Car</th><th>Client</th><th>Calificación</th></tr>";
                $("#reservation-table tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {                
                    startDate = result[i]["startDate"];
                    devolutionDate = result[i]["devolutionDate"];
                    status = result[i]["status"];
                    car = result[i]["car"];
                    client = result[i]["client"];
                    score = result[i]["score"];

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
                        console.log(JSON.stringify(car));
                    }

                    for (var j = 0; j<car["messages"].length;  j++){
                        delete car["messages"][j]["idMessage"];
                    }
                    
                    car = JSON.stringify(result[i]["car"]);
                    client = JSON.stringify(result[i]["client"]);

                    salidaFila = "<tr><td>" + startDate + "</td><td>" + devolutionDate + "</td><td>" +
                        status + "</td><td>" + car + "</td><td>" + client + "</td><td>" + 
                        score + "</td><tr>";

                    $("#reservation-table tbody").append(salidaFila);

                }//Fin del for
            }
        })
    })

    // POST para agregar una reservación
    $("#Add-Reservation").click(function (){
        var urlServicio = "http://localhost:8080/Reservation/save";
        var startDate = $("#Date-Start-Reservation").val();
        var devolutionDate = $("#Date-Devolution-Reservation").val();
        var client = parseInt($("#Client-Reservation").val());
        var car = parseInt($("#Car-Reservation").val());
        $.ajax({
            url: urlServicio,
            type: "POST",
            data: JSON.stringify({ "startDate":startDate, "devolutionDate":devolutionDate, "client":{"idClient":client}, "car":{"idCar":car}}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })
})