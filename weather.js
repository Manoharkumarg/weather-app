const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".city");
const card=document.querySelector(".card");
const api="437054a204ed6fee3497fb1d7c890c4e";

weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();//prevents from refreshing of page each time
    const city=cityInput.value;
    if(city){
        try{
            const data=await getWeatherData(city);
            displayWeather(data);
        }
        catch(error){
            displayError(error);
        }
    }
    else{
        displayError( "Please enter a city");
    }
})

async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const response=await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    return await response.json();
}
 function displayWeather(data){
    const {name: city,
        main: {temp, humidity}, 
        weather: [{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    cityDisplay.classList.add("cityDisplay");

    tempDisplay.textContent=`${((temp-273.15)*(9/5) + 32).toFixed(1)}°F`;
    tempDisplay.classList.add("tempDisplay");

    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");

    descDisplay.textContent=description;
    descDisplay.classList.add("descDisplay");

    weatherEmoji.textContent=getEmoji(id);
    weatherEmoji.classList.add("emojiDisplay");

    card.append(cityDisplay);
    card.append(tempDisplay);
    card.append(humidityDisplay);
    card.append(descDisplay);
    card.append(weatherEmoji);
 }
 function getEmoji(id){
    switch(true){
        case (id>=200 && id<300):
            return "⛈️";
        case (id>=300 && id<400):
            return "🌦️";
        case (id>=500 && id<600):
            return "🌧️";
        case (id>=600 && id<700):
            return "❄️";
        case (id>=700 && id<800):
            return "💨";
        case (id===800):
            return "☀️"
        case (id>=801 && id<810):
            return "☁️";
        default:
            return "❓";
    }
 }
 function displayError(msg){
    const err=document.createElement("p");
    err.textContent=msg;
    err.classList.add("error");
    card.textContent="";
    card.style.display="flex";
    card.append(err);
 }