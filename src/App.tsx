import { Container, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react"; 
import CurrentWeather from './components/current-weather';

import Search from './components/search';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import Forecast from './components/forecast';
const containerStyle = {
  maxWidth: "1080px",
  margin:"20px auto",
  height: "100%",
}
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [units, setUnits]=useState("metric");


  const fetchWeather = (city)=>{
    const currentWeatherFetch = axios.get(
      `${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=${units}`
    );
    const forecastFetch = axios.get(
      `${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=${units}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].data;
      const forcastResponse = await response[1].data;

      setCurrentWeather({ city: city, ...weatherResponse });
      setForecast({ city: city, ...forcastResponse });
    })
    .catch(console.log);
  }

  // ...
  const handleOnSearchChange=(searchData)=>{
    const city = searchData;
    fetchWeather(city)
  };

  // ...
  useEffect(()=>{
    fetchWeather("Tunisia")
  },[units])

  return (
    <Container style={containerStyle} >
      <Search onSearchChange={handleOnSearchChange}/>
      <RadioGroup
        defaultValue={units}
        onChange={(e)=>setUnits(e.target.value)}
        name="radio-buttons-group"
        sx={{
          "&.MuiFormGroup-root":{
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"center",
          gap:"10%",
          fontSize:"1.2rem"
          },
          "& .MuiFormControlLabel-label":{
            fontSize:"1.2rem",
            fontWeight:600
          }
        }}
      >
        <FormControlLabel value="metric" control={<Radio />} label="Celsius" />
        <FormControlLabel value="imperial" control={<Radio />} label="Fahrenheit" />
      </RadioGroup>
      {currentWeather && (<CurrentWeather data={currentWeather} units={units}/>)}
      {forecast && (<Forecast data={forecast} units={units}/>)}
    </Container>
  );
}

export default App;
