import { fetchWeather } from "../lib/api.js";

export default async function getWeatherData(req,res){
    try{
        const {city} = req.params;
        const type = 'weather';
        const weatherdata = await fetchWeather(type,city);
        res.status(200).json({weatherdata,success:true})
    }
    catch(error){
        console.log('Error on fetching the weather data',error)
        if (error.status === 404) {
            return res.status(404).json({error:'City not found!',success:false})
        }
        res.status(500).json({error:'Error on the server!' ,success:false})
    }
}