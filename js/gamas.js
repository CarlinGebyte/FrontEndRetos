$(document).ready(function () {
    jQuery.support.cors = true; 

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

                    salidaFila = "<tr><td>" + nombre + "</td><td>" + descripcion + "</td><td>" +
                        car + "</td><tr>";

                    $("#gama-table tbody").append(salidaFila);

                }//Fin del for
            }
        })
    })

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