import React, { useState } from 'react';
import Up from './images/up.png'
import './App.css'

const conditionTranslations = {
  'clear sky': 'céu limpo',
  'few clouds': 'algumas nuvens',
  'scattered clouds': 'nuvens dispersas',
  'broken clouds': 'nuvens quebradas',
  'overcast clouds': 'nuvens encobertas',
  'light rain': 'chuva leve',
  'moderate rain': 'chuva moderada',
  'heavy rain': 'chuva intensa',
  // Mais traducoes(se for preciso)
};

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  const apiKey = '905071f8e36a72762aea1dc1b45cc3f8';

  const handleSearch = () => {
    if (city.trim() === '') {
      return;
    }

    setLoading(true);
    setError(null);

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherApiUrl)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <img src={Up} className='up'/>
      <div className='whatCity'>
        <input
          type='text'
          placeholder='Digite o nome da cidade...'
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className='input'
        />
        <button onClick={handleSearch} className='serch'>Pesquisar Cidade</button>
      </div>
      <h1 className='title'>Previsão do Tempo</h1>
      {loading && <div>Carregando...</div>}
      {error && <div>Ocorreu um erro: {error.message}</div>}
      {weatherData && (
        <div>
          <div>
          <img src={Up} className='upPC'/>
          <p className='graus'>{weatherData.main.temp}°C</p>
          </div>
          <h1 className='city'>{weatherData.name}</h1>
          <p className='condition'>Condição: {conditionTranslations[weatherData.weather[0].description]}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
