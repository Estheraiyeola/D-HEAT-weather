

  function getWeather(){
    let city = document.getElementById('city').value;
    getLongAndLat(city);
  }

  function getLongAndLat(city){
    const apiKey = 'b0d7436a7faf498180a9625f064423c5';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;
    fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
        let body = document.querySelector('.body');
        body.removeAttribute('body');
        let infoDiv = document.getElementById('weather-info');
        infoDiv.style.display = 'none';
        let errorMessage = document.querySelector('#error-message');
        errorMessage.style.display = 'block';
        throw new 'Error'
    }
    return response.json();
  })
  .then(data => {
    let body = document.querySelector('.body');
        body.removeAttribute('body');
        let infoDiv = document.getElementById('weather-info');
        infoDiv.style.display = 'block';
        let errorMessage = document.querySelector('#error-message');
        errorMessage.style.display = 'none'
    const results = data.results;
    if (results.length > 0) {
      const location = results[0].geometry;
      const latitude = location.lat;
      const longitude = location.lng;
      getWeatherForecast(latitude, longitude);
    } else {
      console.log('No results found for the given city.');
    }
  })
  .catch(error => {
    console.error('Error fetching geocoding data:', error.message);
  });
  }




  function getWeatherForecast(latitude, longitude){
    let key = 'b1c0fa5aba024d04e167eb0e5966a7f1';
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(weatherUrl).then(res => res.json()).then(dat =>{
        document.getElementById('temperature').textContent = `${dat.main.temp} K`;
        document.getElementById('weather-state').textContent = dat.weather[0].main;
        document.getElementById('description').textContent = dat.weather[0].description;
    })
  }

