import { fetchWeather } from "../lib/api.js";
import { cities } from "../models/countries.js";

export default async function getWeatherData(req,res){
    try{
        const {city} = req.params;
        const type = 'weather';
        if (!cities.some(item => item.toLowerCase() === city.toLowerCase())){
            return res.status(400).json({error:'City not found!',success:false})
        }
        const weatherdata = await fetchWeather(type,city);
        if (!weatherdata){
            return res.status(400).json({error:'Weather data for this country not found!',success:false})
        }
        res.status(200).json({weatherdata,success:true})
    }
    catch(error){
        console.log('Erroe on fetching the weather dara',error)
        res.status(500).json({error:'Error on the server!' ,success:false})
    }
}