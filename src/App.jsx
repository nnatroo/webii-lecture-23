import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({})
  const [inputData, setInputData] = useState('Tbilisi')
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=1b40634a79db4734baf203617210410&q=${inputData}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setCurrentWeather(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setShowError(true);
        setCurrentWeather({});
      })
      .finally(function () {
        // always executed
      });
  }, [inputData]);

  const inputChangeHandler = (e) => {
    setShowError(false);
    setInputData(e.target.value);
  }

  return (
    <>
      <p>Enter city: </p>
      <input value={inputData} onChange={inputChangeHandler} type="text"/>
      {showError && <p>No data found!</p>}
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
