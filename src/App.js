import './App.css';
import { use, useEffect, useState } from 'react';

function App() {
  const [city,setCity]=useState("Lucknow");
  const [weather,setWeather]=useState("30");
  const [country,setCountry]=useState("Sunny");


const date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day = date.getDate();
const month = months[date.getMonth()];
const year = date.getFullYear();
const currentTime = `${day} ${month} ${year}`;
const temp = `${weather.main?.temp.toFixed(0)}`;

const API_KEY = "d65040dcae36a817137b86d46cb09b21"; // Replace with your actual API key

const fetchWeatherData = async () => {

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data);
    setWeather(data);
      

  }catch (error) {
    console.error("Error fetching weather data:", error);
  }

}

useEffect(() => {
  fetchWeatherData();
},[])


const handleChange=(event)=>{
  console.log(event.target.value);
  setCity(event.target.value);
}


const handleSubmit=(event)=>{
  event.preventDefault();
  fetchWeatherData();
}


  return (
    <div className="App">
      <div className='container'>
        {weather&&(

          <>
           <h1 className='container_date'> {currentTime} </h1>
        <div className='weather-data'>
          <h2 className='container_city'>{weather.name}</h2>
          <img src='https://img.freepik.com/premium-vector/thunder-icon_1134231-498.jpg' alt='weather-icon' width="180px" className='container_img'/>
          <h2 className='container_degree'>{temp}&#176;C</h2>
          <h2 className='country_per'>Sunny</h2>
          <form className='form' onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter City Name' className='input' onChange={handleChange}/>
            <button type='submit'>Get</button>
          </form>
        </div> 
          </>
        )}
       
      </div>
    </div>
  );
}

export default App;
