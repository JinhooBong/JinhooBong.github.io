const locateButton = document.getElementById("locate-button");
const mainHalf = document.getElementsByClassName("main-title");
const mainDiv = mainHalf[0];
const rightHalf = document.getElementById("right-half");
const weatherSection = document.getElementsByClassName("weather");
const weatherDiv = weatherSection[0];
const clothing = document.getElementById("clothing-list");
const clothingSentence = document.getElementById("sentence");
const weatherSentence = document.getElementById("weatherSentence");
const topHalf = document.getElementById("top-portion");
const bottomHalf = document.getElementById("bottom-portion");

locateButton.addEventListener('click', (e) => {
    setTimeout(weather(), 3000);
    fadeOut();
    spreadOut();
});

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + "Longitude: " + 
        position.coords.longitude);
}

function fadeOut() {
    $(locateButton).fadeOut(2000);
}

function spreadOut() {
    mainDiv.style.width = "55%";
    mainDiv.style.transitionDuration = "3s";
    rightHalf.style.width = "35%";
    rightHalf.style.transitionDuration = "3s";
}

function weather() {

    navigator.geolocation.getCurrentPosition(success, error);

    var location = document.getElementById("location");
    var apiKey = "265c2ea9a67e8d8b35153eff6980f1c8";
    var url = "https://api.forecast.io/forecast/";

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        //location.innerHTML = "Latitude is " + latitude + "&deg; Longitude is " +
        //    longitude + "&deg";

        $.getJSON(
            url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
                function(data) {
                    $("#temperature").html(data.currently.temperature + 
                        " &deg; F <br>");
                    var x = document.getElementById("temperature").innerHTML;
                    var temp = parseFloat(x);
                    clothingAdvice(temp);
                    changeBackground(temp);
                }
        );

        function displayLocation(latitude, longitude) {
            var geocoder;
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(latitude, longitude);

            geocoder.geocode(
                {'latLng': latlng},
                function(results, status) {
                    if(status == google.maps.GeocoderStatus.OK) {
                        if(results[0]) {
                            var add = results[0].formatted_address;
                            var value = add.split(",");
                            count = value.length;
                            country = value[count-1];
                            state = value[count-2];
                            city = value[count-3];
                            location.innerHTML = city + ", " + state;
                            location.style.backgroundColor = "rgba(0,0,0,0.3)";
                            location.style.padding = "3% 3.5%";
                            location.style.color = "white";
                            location.style.borderRadius = "15px";
                            location.style.width = "50%";
                            location.style.margin = "auto";
                        } else {
                            location.innerHTML = "Not Found";
                        }
                    } else {
                        location.innerHTML = "Error: " + status;
                    }
                }
            )
        };

        displayLocation(latitude, longitude);
    }

    function error() {
        location.innerHTML = "Unable to locate."
    }

    function clothingAdvice(temp) {
        bottomHalf.style.backgroundColor = "rgba(255,255,255,0.3)";
        bottomHalf.style.borderRadius = "15px";
        topHalf.style.transitionDuration = "3s";
        clothingSentence.innerHTML = "I might recommend a combination of the following for today: "
        if(temp >= 75) {
            weatherSentence.innerHTML = "The weather is on the warmer side today. Go enjoy!";
            var li = document.createElement("li");
            li.innerHTML = "<img src='img/weatherImages/t-shirt.png'>";
            clothing.appendChild(li);
            var li2 = document.createElement("li");
            li2.innerHTML = "<img src='img/weatherImages/football-short.png'>";
            clothing.appendChild(li2);
            var li3 = document.createElement("li");
            li3.innerHTML = "<img src='img/weatherImages/sneakers.png'>";
            clothing.appendChild(li3);
        } else if(temp >= 50 && temp < 75) {
            weatherSentence.innerHTML = "The weather is on the chillier side. Grab a light jacket!";
            var li = document.createElement("li");
            li.innerHTML = "<img src='img/weatherImages/sweatshirt.png'>";
            clothing.appendChild(li);
            var li2 = document.createElement("li");
            li2.innerHTML = "<img src='img/weatherImages/jeans.png'>";
            clothing.appendChild(li2);
            var li3 = document.createElement("li");
            li3.innerHTML = "<img src='img/weatherImages/men-socks.png'>";
            clothing.appendChild(li3);
            var li4 = document.createElement("li");
            li4.innerHTML = "<img src='img/weatherImages/sneakers.png'>";
            clothing.appendChild(li6);
        } else {
            weatherSentence.innerHTML = "The weather is pretty cold. Bundle up before going out!";
            var li = document.createElement("li");
            li.innerHTML = "<img src='img/weatherImages/hat.png'>";
            clothing.appendChild(li);
            var li2 = document.createElement("li");
            li2.innerHTML = "<img src='img/weatherImages/scarf.png'>";
            clothing.appendChild(li2);
            var li3 = document.createElement("li");
            li3.innerHTML = "<img src='img/weatherImages/pullover.png'>";
            clothing.appendChild(li3);
            var li4 = document.createElement("li");
            li4.innerHTML = "<img src='img/weatherImages/sweatpants.png'>";
            clothing.appendChild(li4);
            var li5 = document.createElement("li");
            li5.innerHTML = "<img src='img/weatherImages/snow-boot.png'>";
            clothing.appendChild(li5);
        }
    }

    function changeBackground(temp) {
        var date = new Date();
        var hour = date.getHours();
        topHalf.style.borderRadius = "15px";
        topHalf.style.transitionDuration = "3s";
        if(hour >= 7 && hour <= 16) { // if its before 5, use daylight
            topHalf.style.backgroundImage = "url('img/weatherImages/day.jpg')";
            topHalf.style.backgroundSize = "100% 100%";
            topHalf.style.backgroundRepeat = "no-repeat";
        } else if(hour > 16 && hour <= 19){
            topHalf.style.backgroundImage = "url('img/weatherImages/evening.jpg')";
            topHalf.style.backgroundSize = "100% 100%";
            topHalf.style.backgroundRepeat = "no-repeat";
        } else {
            topHalf.style.backgroundImage = "url('img/weatherImages/night.jpg')";
            topHalf.style.backgroundSize = "100% 100%";
            topHalf.style.backgroundRepeat = "no-repeat";
        }
    }
}