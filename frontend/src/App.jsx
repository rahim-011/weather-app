import './index.css'
import SideBar from "./components/SideBar";
import LeftContainer from "./components/LeftContainer";
import UnderContainer from './components/UnderContainer'
import TopContainer from "./components/TopContainer";
import { useEffect,useState } from "react";






export default function App(){
    const [city,setCity] = useState(null);
    const [weatherdata,setWeatherData] = useState(null);
    const [forecastdata,setForecastData] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);

    const API_BASE_URL = "https://weather-app-427p.onrender.com";



    const fetchData = async (city) => {
        setLoading(true)
        try{
            setError(null)
            const weatherResponse = await fetch(`${API_BASE_URL}/api/weather/${city}`);
            const weatherResult = await weatherResponse.json();
            

            const forecastResponse = await fetch(`${API_BASE_URL}/api/forecast/${city}`);
            const forecastResult = await forecastResponse.json();

            if (!weatherResult.success){
                setError(weatherResult.error);
                setWeatherData(null);
                return;
            }
            setWeatherData(weatherResult.weatherdata)
            if (!forecastResult.success){
                setError(forecastResult.error)
                setForecastData(null);
                return;
            }
            setForecastData(forecastResult.forecastdata)
        }
        catch(error){
            setError('Error on server')
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {

    const geoCity = () => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {

                        const geoRes = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
                        );

                        const cityRes = await geoRes.json();
                        const city = cityRes.city || 'Algiers';

                        const testRes = await fetch(`${API_BASE_URL}/api/weather/${city}`);
                        const testResult = await testRes.json();
                        if (testResult.success){
                            setCity(city);
                        }
                        else {
                            setCity('Algiers')
                        }
                        

                    } catch (error) {

                        console.log(error);

                        setCity('Algiers');
                    }
                },

                (error) => {

                    console.log(error);

                    setCity('Algiers');
                }

            );

        } else {

            setCity('Algiers');
        }
    };

    geoCity();

}, []);

useEffect(() => {
    if (city) {
        fetchData(city);
    }
}, [city]);

    return (
        <div className="container">
            <TopContainer setCity={setCity} weatherdata={weatherdata} forecastdata={forecastdata} isLoading={isLoading}/>
            <UnderContainer weatherdata={weatherdata} isLoading={isLoading}/>
        </div>
    )
}