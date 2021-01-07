$(document).ready(function () {

    $("#search-button").on("click", function () {
        var searchValue = $("#search-value").val()
        console.log(searchValue)
        $("#search-value").val("")

        searchWeather(searchValue);
    })

    let APIkey = "ed8b97e489f3133d4b5f41f0db8eaa8e"

    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIkey,
            dataType: "json",
            success: function (data) {
                
                console.log(data)

                let tempF = ((data.main.temp - 273.15) * 1.80 + 32).toFixed(1);

                console.log("Temperature (F): " + tempF);
                console.log("Humidity: " + data.main.humidity);
                console.log("Wind Speed: " + data.wind.speed);
                console.log("Latitude, Longitude: " + data.coord.lat + ", " + data.coord.lon);
                let lattitude = data.coord.lat
                let longitude = data.coord.lon

                $(".forecast-temp").text("Temperature (F): " + tempF)
                $(".forecast-hws").text("Humidity: " + data.main.humidity)
                $(".forecast-ws").text("Wind Speed: " + data.wind.speed)

                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lattitude + "&lon=" + longitude + "&appid=" + APIkey,
                    dataType: "json",
                    success: function (data2) {

                        console.log(data2)

                        console.log("UV Index: " + data2.value);
                        $(".uv-button").text(data2.value)
                    }
                })

                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=hourly,minutely,current,alerts&appid=" + APIkey,
                    dataType: "json",
                    success: function (data3) {

                        console.log(data3)

                        let today = data3.daily[0].dt
                        let dayOne = data3.daily[1].dt
                        let dayTwo = data3.daily[2].dt
                        let dayThree = data3.daily[3].dt
                        let dayFour = data3.daily[4].dt
                        let dayFive = data3.daily[5].dt

                        function timeConverter(value) {
                            var dt = new Date(value * 1000);
                            var year = dt.getFullYear();
                            var month = (dt.getMonth() + 1);
                            var newdate = dt.getDate();
                            var formattedTime = month + '/' + newdate + '/' + year
                            console.log(formattedTime);
                            return (formattedTime);
                        };

                        let iconURL = "https://openweathermap.org/img/wn/";

                        $(".city-name").text(searchValue + " " + timeConverter(today));
                        $("#icon-main").attr("src", iconURL + data3.daily[0].weather[0].icon + ".png")
                        $("#icon-one").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")
                        $("#icon-two").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")
                        $("#icon-three").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")
                        $("#icon-four").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")
                        $("#icon-five").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")

                        $(".forecast-ones").text(timeConverter(dayOne));
                        $(".forecast-twos").text(timeConverter(dayTwo));
                        $(".forecast-threes").text(timeConverter(dayThree));
                        $(".forecast-fours").text(timeConverter(dayFour));
                        $(".forecast-fives").text(timeConverter(dayFive));

                        let tempFOne = ((data3.daily[1].temp.max - 273.15) * 1.80 + 32).toFixed(1);
                        let tempFTwo = ((data3.daily[2].temp.max - 273.15) * 1.80 + 32).toFixed(1);
                        let tempFThree = ((data3.daily[3].temp.max - 273.15) * 1.80 + 32).toFixed(1);
                        let tempFFour = ((data3.daily[4].temp.max - 273.15) * 1.80 + 32).toFixed(1);
                        let tempFFive = ((data3.daily[5].temp.max - 273.15) * 1.80 + 32).toFixed(1);

                        $(".forecast-temp-one").text("Temp: " + tempFOne);
                        $(".forecast-temp-two").text("Temp: " + tempFTwo);
                        $(".forecast-temp-three").text("Temp: " + tempFThree);
                        $(".forecast-temp-four").text("Temp: " + tempFFour);
                        $(".forecast-temp-five").text("Temp: " + tempFFive);

                        $(".forecast-hum-one").text("Humidity: " + data3.daily[1].humidity);
                        $(".forecast-hum-two").text("Humidity: " + data3.daily[2].humidity);
                        $(".forecast-hum-three").text("Humidity: " + data3.daily[3].humidity);
                        $(".forecast-hum-four").text("Humidity: " + data3.daily[4].humidity);
                        $(".forecast-hum-five").text("Humidity: " + data3.daily[5].humidity);
                    }
                })


            }
        })



    }

})