import './index.css'
import SideBar from "./components/SideBar";
import LeftContainer from "./components/LeftContainer";
import UnderContainer from './components/UnderContainer'
import TopContainer from "./components/TopContainer";
import { useEffect,useState } from "react";







export default function App(){
    const [city,setCity] = useState('Algiers');
    const [weatherdata,setWeatherData] = useState(null);
    const [forecastdata,setForecastData] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);




    const fetchData = async (city) => {
        setLoading(true)
        try{
            setError(null)
            const weatherResponse = await fetch(`http://localhost:3000/api/weather/${city}`);
            const weatherResult = await weatherResponse.json();
            

            const forecastResponse = await fetch(`http://localhost:3000/api/forecast/${city}`)
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

    useEffect(()=>{
        fetchData(city)
    },[city])
    return (
        <div className="container">
            <TopContainer setCity={setCity} weatherdata={weatherdata} forecastdata={forecastdata} isLoading={isLoading}/>
            <UnderContainer weatherdata={weatherdata} isLoading={isLoading}/>
        </div>
    )
}