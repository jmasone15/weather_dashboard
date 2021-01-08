$(document).ready(function () {

    //function that saves the user input as a search value
    $("#search-button").on("click", function () {
        var searchValue = $("#search-value").val()
        console.log(searchValue)
        $("#search-value").val("")

        searchWeather(searchValue);
    })

    $("#search-button").on("click", function () {
        var searchHistory = $("#search-value").val();
        console.log(searchHistory)
        localStorage.setItem("history", JSON.stringify(searchHistory))
    })

    //APIkey from openweatherAPI
    let APIkey = "ed8b97e489f3133d4b5f41f0db8eaa8e"

    //AJAX call with the user input
    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIkey,
            dataType: "json",
            success: function (data) {

                //formula to convert Kelvin to Fahrenheit 
                let tempF = ((data.main.temp - 273.15) * 1.80 + 32).toFixed(1);

                //setting variables for lattitude and longitude for the UV api call
                let lattitude = data.coord.lat
                let longitude = data.coord.lon

                //Grabbing the values from the data object and assigning them to HTML ids
                $(".forecast-temp").text("Temperature (F): " + tempF)
                $(".forecast-hws").text("Humidity: " + data.main.humidity)
                $(".forecast-ws").text("Wind Speed: " + data.wind.speed)

                //second AJAX call to get UV index
                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lattitude + "&lon=" + longitude + "&appid=" + APIkey,
                    dataType: "json",
                    success: function (data2) {

                        //grabbing the value from the data object and assigning it to the HTML id
                        $(".uv-button").text(data2.value)
                    }
                })

                //third AJAX call to get the five day forecast
                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=hourly,minutely,current,alerts&appid=" + APIkey,
                    dataType: "json",
                    success: function (data3) {

                        //setting variables for the various days of the forecas
                        let today = data3.daily[0].dt
                        let dayOne = data3.daily[1].dt
                        let dayTwo = data3.daily[2].dt
                        let dayThree = data3.daily[3].dt
                        let dayFour = data3.daily[4].dt
                        let dayFive = data3.daily[5].dt

                        //function that converts the date value into mm/dd/yyyy
                        function timeConverter(value) {
                            var dt = new Date(value * 1000);
                            var year = dt.getFullYear();
                            var month = (dt.getMonth() + 1);
                            var newdate = dt.getDate();
                            var formattedTime = month + '/' + newdate + '/' + year
                            console.log(formattedTime);
                            return (formattedTime);
                        };

                        //url for the icons
                        let iconURL = "https://openweathermap.org/img/wn/";

                        //grabbing city name value and assigning them to the HTML
                        $(".city-name").text(searchValue + " " + timeConverter(today));

                        //grabbing icon value and assigning them to the HTML
                        $("#icon-main").attr("src", iconURL + data3.daily[0].weather[0].icon + ".png")
                        $("#icon-one").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")
                        $("#icon-two").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")
                        $("#icon-three").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")
                        $("#icon-four").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")
                        $("#icon-five").attr("src", iconURL + data3.daily[1].weather[0].icon + ".png")

                        //grabbing the forecast date and assigning them to the HTML
                        $(".forecast-ones").text(timeConverter(dayOne));
                        $(".forecast-twos").text(timeConverter(dayTwo));
                        $(".forecast-threes").text(timeConverter(dayThree));
                        $(".forecast-fours").text(timeConverter(dayFour));
                        $(".forecast-fives").text(timeConverter(dayFive));

                        //Kelvin to Fahrenheit formula
                        let tempFOne = ((data3.daily[1].temp.max - 273.15) * 1.80 + 32).toFixed(1);
                        let tempFTwo = ((data3.daily[2].temp.max - 273.15) * 1.80 + 32).toFixed(1);
                        let tempFThree = ((data3.daily[3].temp.max - 273.15) * 1.80 + 32).toFixed(1);
                        let tempFFour = ((data3.daily[4].temp.max - 273.15) * 1.80 + 32).toFixed(1);
                        let tempFFive = ((data3.daily[5].temp.max - 273.15) * 1.80 + 32).toFixed(1);

                        //grabbing the forecast temp and assigning them to the HTML
                        $(".forecast-temp-one").text("Temp: " + tempFOne);
                        $(".forecast-temp-two").text("Temp: " + tempFTwo);
                        $(".forecast-temp-three").text("Temp: " + tempFThree);
                        $(".forecast-temp-four").text("Temp: " + tempFFour);
                        $(".forecast-temp-five").text("Temp: " + tempFFive);

                        //grabbing the forecast humidity data and assigning them to the HTML
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