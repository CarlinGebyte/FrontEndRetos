$(document).ready(function () {
    jQuery.support.cors = true; 

    // Para actualizar el menu de selección del cliente
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
    
        success: function (result) {    
            var clientSelect = "<option hidden value=''>Seleccionar Cliente</option>";   
            $("#Client-Reservation").empty();
            $("#Client-Reservation").append(clientSelect);  
            for (var i = 0; i < result.length; i++) {
                console.log(result[i]["name"]);        
                clientSelect += "<option value='"+ result[i]["idClient"] +"'>"+ result[i]["name"] +"</option>";
                $("#Client-Reservation").empty();
                $("#Client-Reservation").append(clientSelect);
                console.log(clientSelect);
    
            }//Fin del for
        }
    })

    // Para actualizar el menu de selección del Carro
    $.ajax({
        url: "http://localhost:8080/api/Car/all",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        
        success: function (result) {    
            var carSelect = "<option hidden value=''>Seleccionar Carro</option>";  
            $("#Car-Reservation").empty();
            $("#Car-Reservation").append(carSelect);

            for (var i = 0; i < result.length; i++) {
                carSelect += "<option value='"+ result[i]["idCar"] +"'>"+ result[i]["name"] +"</option>";
                $("#Car-Reservation").empty();
                $("#Car-Reservation").append(carSelect);
    
            }//Fin del for
        }
    })


    // GET para actualizar la tabla de Reservaciones
    $("#upd-reservation").click(function (){
        var urlServicio = "http://localhost:8080/api/Reservation/all";
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
                var idReservation = 0;
                var startDate = "";
                var devolutionDate = "";
                var status = "";
                var car;
                var client;
                var score = 0;
                var salidaFila = "";

                $("#reservation-table tbody").empty();

                salidaFila = "<tr><th>ID Reservación</th><th>Fecha Inicio</th><th>Fecha Entrega</th><th>Estado</th><th>Carro</th><th>Cliente</th><th>Calificación</th><th class='accionTd'>Acción</th></tr>";
                $("#reservation-table tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {    
                    idReservation = result[i]["idReservation"];         
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
                        //delete client["idClient"];
                        delete client["password"];
                        delete client["age"];
                    }else{
                        console.log(JSON.stringify(car));
                    }

                    for (var j = 0; j<car["messages"].length;  j++){
                        delete car["messages"][j]["idMessage"];
                    }
                    
                    car = JSON.stringify(result[i]["car"]);
                    client = JSON.stringify(result[i]["client"]);

                    salidaFila = "<tr><td>" + idReservation + "</td><td>" + startDate + "</td><td>" + 
                        devolutionDate + "</td><td>" + status + "</td><td>" + car + 
                        "</td><td>" + client + "</td><td>" + score + "</td><td>" + "<button class='button del-button' onclick='deleteReservation("+ result[i]["idReservation"] +")'>Borrar</button>" + 
                        "<a href='#container-all'><button class='button' id='btn-abrir-popup' onclick='updateReservation("+ result[i]["idReservation"] +")'> Editar </button></a>" + "</td><tr>";

                    $("#reservation-table tbody").append(salidaFila);

                }//Fin del for
            }
        })
    })

    // POST para agregar una reservación
    $("#Add-Reservation").click(function (){
        var urlServicio = "http://localhost:8080/api/Reservation/save";
        var startDate = $("#Date-Start-Reservation").val();
        var devolutionDate = $("#Date-Devolution-Reservation").val();
        var client = $("#Client-Reservation").val();
        var car = $("#Car-Reservation").val();
        if(startDate != "" && devolutionDate != "" && client != "" && car != ""){
            $.ajax({
                url: urlServicio,
                type: "POST",
                data: JSON.stringify({ "startDate":startDate, "devolutionDate":devolutionDate, "client":{"idClient":client}, "car":{"idCar":car}}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function () {
                    alert("Se ha agregado");
                    $("#Date-Start-Reservation").val("");
                    $("#Date-Devolution-Reservation").val("");
                    $("#Client-Reservation").val("");
                    $("#Car-Reservation").val("");
                }
            });
            return false;
        }
    })
})

// DELETE para eliminar un carro
function deleteReservation(id){
    alert("Se ha eliminado")
    var urlServicio = "http://localhost:8080/api/Reservation/";
    urlServicio += id;
    console.log(urlServicio);
    $.ajax({
        url: urlServicio,
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
    });   
}

// PUT para actualizar un carro
function updateReservation(idReservation){
    $("#btn-upd-reservation").click(function () {
        var urlServicio = "http://localhost:8080/api/Reservation/update";
        var startDate = $("#Start-upd-reservation").val();
        var devolutionDate = $("#Devolution-upd-reservation").val();
        var status = $("#Status-upd-reservation").val();
        if (startDate != "" && devolutionDate != "" && status != ""){
            $.ajax({
                url: urlServicio,
                type: "PUT",
                data: JSON.stringify({ "idReservation":idReservation, "startDate":startDate, "devolutionDate": devolutionDate, "status": status}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                
                success: (function(){
                    idMessage = 0;
                    $("#Start-upd-reservation").val("dd/mm/aaaa");
                    $("#Devolution-upd-reservation").val("dd/mm/aaaa");
                    $("#Status-upd-reservation").val("");
                })
            })
        }else{
            alert("Todos los campos son obligatorios");
        }
        
    })
    
}