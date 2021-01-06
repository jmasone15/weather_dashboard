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
                console.log(data);
            }
        })
    }

})