import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import { getWeather } from './services/WeatherService';
import { getDateFromHours } from './utils';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('New York');
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    getWeather(city)
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputCity = e.target.elements['search-city'].value;
    if (inputCity.trim()) {
      setCity(inputCity);
    }
  };

  return (
    <main className="weather-container">
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading">Weather Loading...</p>
      ) : (
        <section className="weather-card">
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              name="search-city" 
              id="search-city" 
              placeholder='Search for Weather' 
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          <h1 className="city-name">Weather in {city}</h1>
          <div className="weather-details">
            <p className="temperature">{weather?.main.temp}°C | {weather?.weather[0].description}</p>
            <p>Sunset: {getDateFromHours(weather?.sys.sunset)}</p>
            <p>Humidity: {weather?.main.humidity}%</p>
            <p>Sea Level: {weather?.main.sea_level || 'N/A'} hPa</p>
            <p>Wind Speed: {weather?.wind.speed} m/s</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
