// 1. Fetch weather data from an API
const fetchWeatherData = async () => {
    try {
      // Replace `your_api_key` with your actual OpenWeatherMap API key
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&cnt=10&units=metric&appid=your_api_key'
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
  
      const data = await response.json();
  
      // Call the function to update the UI with fetched data
      updateWeatherUI(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  // 2. Update the UI with fetched weather data
  const updateWeatherUI = (data) => {
    // Select the container where weather cards will be updated
    const forecastContainer = document.querySelector('.forecast');
  
    // Clear any existing content
    forecastContainer.innerHTML = '';
  
    // Loop through the weather data and create cards
    data.list.forEach((day, index) => {
      // Format the date
      const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      });
  
      // Create a new div for each day
      const weatherDiv = document.createElement('div');
      weatherDiv.classList.add('weather');
  
      // Add content to the div
      weatherDiv.innerHTML = `
        <span class="day">${index === 0 ? 'Today' : date}</span>
        <div class="${day.weather[0].main === 'Rain' ? 'blue' : 'orange'}"></div>
        <div class="temp">${Math.round(day.main.temp_max)}°/${Math.round(day.main.temp_min)}°</div>
      `;
  
      // Append the weather div to the container
      forecastContainer.appendChild(weatherDiv);
    });
  };
  
  // 3. Call the fetchWeatherData function to start
  fetchWeatherData();
  