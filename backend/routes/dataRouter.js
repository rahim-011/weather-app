import express from 'express';
import getWeatherData from '../controllers/WeatherData.js';
import getForecastData from '../controllers/forecastData.js';

export const router = express.Router();


router.get('/weather/:city',getWeatherData);
router.get('/forecast/:city',getForecastData);