const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&cnt=10&units=metric&appid=your_api_key'
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
  
      const data = await response.json();

      updateWeatherUI(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const updateWeatherUI = (data) => {
    const forecastContainer = document.querySelector('.forecast');

    forecastContainer.innerHTML = '';

    data.list.forEach((day, index) => {
      const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      });
  
      const weatherDiv = document.createElement('div');
      weatherDiv.classList.add('weather');

      weatherDiv.innerHTML = `
        <span class="day">${index === 0 ? 'Today' : date}</span>
        <div class="${day.weather[0].main === 'Rain' ? 'blue' : 'orange'}"></div>
        <div class="temp">${Math.round(day.main.temp_max)}°/${Math.round(day.main.temp_min)}°</div>
      `;

      forecastContainer.appendChild(weatherDiv);
    });
  };
  
  fetchWeatherData();
  