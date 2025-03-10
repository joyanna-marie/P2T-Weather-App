const apiKey = import.meta.env.VITE_API_KEY;

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
    const data = await response.json();
    return data;
}
export { getWeather };