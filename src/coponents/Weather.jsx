import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import searchs from '../assets/search.jpg'
import hum1 from '../assets/hum1.png'
import hum from '../assets/hum.png'
import temt from '../assets/temt.png'
import wind from '../assets/wind.png'



function Weather() {

    const [weaterData, setWeatherData]=useState(false)

    const inputRef = useRef()

    const allicons ={
        "01d": temt,
        "01n": temt,
        "02d": hum1,
    }


    const search = async (city)=>{

        if(city===""){
            alert("Please enter city name")
            return;
        }

        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            const icon = allicons[data.weather[0].icon] || hum1;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            setWeatherData(false)
        }
    }

    // useEffect(()=>{  
    //     search("abuja")
    //     {weaterData.location?search(weaterData.location):search("abuja")}
    // })

  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" ref={inputRef} placeholder='search' />
            <img src={searchs} width={30} height={30} alt="" 
            onClick={()=>search(inputRef.current.value)}
            />
        </div>

        {weaterData?
        <>
        <img src={temt} alt="" width={150} height={120} className='weater-icon' />
        <p className='temperature' >{weaterData.temperature}deg celcius</p>
        <p className='location'>{weaterData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={hum} width={30} height={30} alt="" />
                <p>{weaterData.humidity} %</p>
                <span>Humidity</span>
            </div>
             <div className="col">
                <img src={wind} width={30} height={30} alt="" />
                <p>{weaterData.windSpeed} Km/h</p>
                <span>Wind speed</span>
            </div>
        </div>
        </>:<span>Please enter the city you want to know its weather</span>}
        
    </div>
  )
}

export default Weather


