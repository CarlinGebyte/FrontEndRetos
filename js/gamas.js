$(document).ready(function () {
    jQuery.support.cors = true; 

    // GET para actualizar la tabla de Gamas
    $("#upd-gama").click(function (){
        var urlServicio = "http://localhost:8080/Gama/all";
        console.log(urlServicio)
        $("#gama-table tbody").empty();
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
                var descripcion = "";
                var car;
                var car2;
                var salidaFila = "";

                $("#gama-table tbody").empty();

                salidaFila = "<tr><th>Nombre</th><th>Descripción</th><th>Carros</th></tr>";
                $("#gama-table tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {
                    nombre = result[i]["name"];                    
                    descripcion = result[i]["description"];
                    car = result[i]["cars"];

                    for (var j = 0; j<car.length;  j++){
                        if (JSON.stringify(car) != "[]"){
                            delete car[j]["idCar"]
                            delete car[j]["gama"]["idGama"];
                            for (var k = 0; k < car[j]["reservations"].length;  k++){
                                delete car[j]["reservations"][k]["idReservation"]
                                delete car[j]["reservations"][k]["client"]["idClient"];
                                delete car[j]["reservations"][k]["client"]["password"];
                            }
                            for (var k = 0; k<car[j]["messages"].length;  k++){
                                delete car[j]["messages"][k]["idMessage"];
                            }
                        }
                    }
                    
                    car = JSON.stringify(car);

                    salidaFila = "<tr><td>" + nombre + "</td><td>" + descripcion + "</td><td>" +
                        car + "</td></tr>";

                    $("#gama-table tbody").append(salidaFila);

                }//Fin del for
            }
        })
    })

    // POST para agregar una gama
    $("#Add-Gama").click(function (){
        var urlServicio = "http://localhost:8080/Gama/save";
        var name = $("#Name-Gama").val();
        var descripcion = $("#Description-Gama").val();
        $.ajax({
            url: urlServicio,
            type: "POST",
            data: JSON.stringify({ "name":name, "description":descripcion}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })
})