import loader from './assets/loader.svg'
import browser from './assets/browser.svg'
import './App.css'
import {useEffect, useState} from "react";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
    // Appli météo
    //appel d'api AQAIR
    //gestion erreur
    //reception des données
    //afficher les données

    const [weatherData, setWeatherData] = useState(null)
    const [errorInfo, setErrorInfo] = useState(null)

    useEffect(() => {
        fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
            .then(response => {
                if (!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`) // target .catch
                return response.json()
            })
            .then(responseData => {
                console.log(responseData)
                setWeatherData({
                    city: responseData.data.city,
                    country: responseData.data.country,
                    iconId: responseData.data.current.weather.ic,
                    temperature: responseData.data.current.weather.tp,
                    humidity: responseData.data.current.weather.hu
                })
            })
            //prend le relaie si erreur
            .catch(err => {
                setErrorInfo(err.message)
            })
    }, []);

    return (

        <main>
            <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}>
                <img src={loader} alt=""/>
            </div>

            {weatherData && (
                <>
                    <p className="city-name">
                        {weatherData.city}
                    </p>
                    <p className="country-name">
                        {weatherData.country}
                    </p>
                    <p className="temperature">
                        {weatherData.temperature}°
                    </p>
                    <div className="info-icon-container">
                        <img className="info-icon" src={`/icons/${weatherData.iconId}.svg`} alt=""/>
                        <p className="info-hu">Humidité: <span>{weatherData.humidity}%</span></p>
                    </div>
                </>
            )}

            {(errorInfo && !weatherData) && (
                <>
                    <p className="error-information">{errorInfo}</p>
                    <img src={browser} alt=""/>
                </>
            )}
        </main>

    );
}

export default App;
