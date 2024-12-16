import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({})

  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=1b40634a79db4734baf203617210410&q=Tbilisi`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setCurrentWeather(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <>
      {currentWeather.current && currentWeather.location ? <>
        <h1>{`${currentWeather.location.name}, ${currentWeather.location.country}`}</h1>
        <h2>{currentWeather.current.temp_c} °C</h2>
        <p>Feels Like: {currentWeather.current.feelslike_c} °C</p>
        <figure style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <p>{currentWeather.current.condition.text}</p>
          <img src={currentWeather.current.condition.icon} alt="weather-icon"/>
        </figure>
        <p>Wind kph: {currentWeather.current.wind_kph}</p>
        <p>Last Updated: {currentWeather.current.last_updated}</p>
      </> : null
      }
    </>
  )
};

export default App
