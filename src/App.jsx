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

  return (
    <main>
    {error && <p>{error}</p>}
    {loading ? (
      <p>Weather Loading...</p>
    ) : (
      <section>
        <form>
          <label htmlFor="search-city">
            <input type="text" name="search-city" id="search-city" placeholder='Search for Weather' />
            <button type="submit">Search</button>
          </label>
        </form>
        <h1>Weather Details for: {city}</h1>
        <p>{weather?.main.temp} | {weather?.weather[0].description}</p>
        <p>{getDateFromHours(weather?.sys.sunset)}</p>
        <p>{weather?.main.humidity}</p>
        <p>{weather?.main.sea_level}</p>
        <p>{weather?.wind.speed}</p>
      </section>
    )}
    </main>
  );
}

export default App;
