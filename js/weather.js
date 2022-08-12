const onGeoSuccess = (position) => {
    const API_KEY = "c4a748e6c33103c932ec6ed22f83c7e7";
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const weatherSpan = document.querySelector("#weather span:first-child");
        const citySpan = document.querySelector("#weather span:last-child");

        const name = data.name;
        const weather = data.weather[0].main;
        const temp = data.main.temp;
        
        weatherSpan.innerText = weather + " " + temp + "°C";
        citySpan.innerText = name;
    })
};
const onGeoError = () => {
    alert("Can't find the location.");
};

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);