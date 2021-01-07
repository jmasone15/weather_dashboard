$(document).ready(function(){

    $("#search-button").on("click", function() {
        var searchValue = $("#search-value").val()
        console.log(searchValue)
        $("#search-value").val("")

        searchWeather(searchValue);
    })

    let APIkey = "ed8b97e489f3133d4b5f41f0db8eaa8e";

    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIkey,
            dataType: "json",
            success: function(data) {
                
                let tempF = ((data.main.temp - 273.15) * 1.80 + 32).toFixed(1);
                
                console.log(data);
                console.log("Temperature (F): " + tempF);
                console.log("Humidity: " + data.main.humidity);
                console.log("Wind Speed: " + data.wind.speed);
                console.log("Latitude, Longitude: " + data.coord.lat + ", " + data.coord.lon);
                let lattitude = data.coord.lat
                let longitude = data.coord.lon

                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lattitude + "&lon=" + longitude + "&appid=" + APIkey,
                    dataType: "json",
                    success: function(data) {
                        
                        console.log(data);
                        console.log("UV Index: " + data.value);
                    }
                })
            }
        })

        
        
    }

})