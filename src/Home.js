import React, { useState } from 'react'
import './Home.css'
import axios from "axios"

const Home = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});

    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
            q: city,
            units: '"metric" or "imperial"',
        },
        headers: {
            //'x-rapidapi-key': 'put your own API key here',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
    };

    const search = evt => {
        if (evt.key === "Enter") {
            axios.request(options).then(result => {
                setCity('');
                setWeather(result)
                console.log(weather);
            });

        }
    }
    return (
        <div className="home">
            <div>
                <div className="home__container">
                    <input type="text" placeholder="Search..." onChange={e => setCity(e.target.value)} value={city} onKeyPress={search} />
                </div>
                {(typeof weather.data != "undefined") ? (
                    <div className="home__result">
                        <h1>{weather.data.name},{weather.data.sys.country}</h1>
                        <h3>07 january 2021</h3>
                        <h2>{Math.round(weather.data.main.temp - 273.15)}°C</h2>
                    </div>
                ) : (<div></div>)}

            </div>
        </div>
    )
}

export default Home
