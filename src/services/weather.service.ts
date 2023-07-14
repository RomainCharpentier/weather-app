import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { Weather } from './Weather';

// Définir la configuration de base de votre API
const apiConfig: AxiosRequestConfig = {
  baseURL: 'https://weatherapi-com.p.rapidapi.com',
  params: { q: "53.1,-0.13" },
  headers: {
    'Content-Type': 'application/json',
    "X-RapidAPI-Key": import.meta.env.VITE_WEATHER_API_KEY,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
  },
};

interface WeatherApiResponse {
    current: {
        condition: Weather;
    }
}

const api = axios.create(apiConfig);

const API = {
  getCurrent: (): Promise<Weather> => api.get<WeatherApiResponse>('/current.json')
    .then(response => response.data.current.condition)
};

export default API;
