export const updateWeatherApp = (city) => {

    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
    
    console.log(imageName);
    console.log(iconSrc);
    
}


    