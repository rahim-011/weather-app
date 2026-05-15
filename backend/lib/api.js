import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export  const fetchWeather = async (type,city)=>{
    try{
        const response = await fetch(`${BASE_URL}${type}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if (!response.ok) {
            const error = new Error(data.message || 'Fetching data request failed!');
            error.status = response.status;
            throw error;
        }
        return data;
    }
    catch(error){
        console.log('Error on fetching data ',error)
        throw error;
    }
}