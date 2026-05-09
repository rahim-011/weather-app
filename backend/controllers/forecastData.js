import { fetchWeather } from "../lib/api.js";
import { cities } from "../models/countries.js";

export default async function getForecastData(req,res){
    try{
        const {city} = req.params;
        const type = 'forecast';
        if (!cities.some(item => item.toLowerCase() === city.toLowerCase())){
            return res.status(401).json({error:'City not found!',success:'false'})
        }
        const forecastdata = await fetchWeather(type,city)
        if (!forecastdata){
            return res.status(404).json({error:'Forecast data not found!',success:false})
        }
        res.status(200).json({forecastdata,success:true})
    }
    catch(error){
        console.log('Error on fetching forecast data',error)
        res.status(500).json({error:'Error on the server',success:false,})
    }
}