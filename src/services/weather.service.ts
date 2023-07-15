import axios, { type AxiosRequestConfig } from "axios";
import type { Weather } from "./Weather";
import type { Location } from "./Location";

interface WeatherApiResponse {
  current: {
    condition: Weather;
  };
}

// Définir la configuration de base de votre API
const apiConfig: AxiosRequestConfig = {
  baseURL: "https://weatherapi-com.p.rapidapi.com",
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": import.meta.env.VITE_WEATHER_API_KEY,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

const api = axios.create(apiConfig);

const API = {
  getCurrent: (location: Location): Promise<Weather> =>
    api
      .get<WeatherApiResponse>("/current.json", {
        params: { q: `${location.latitude},${location.longitude}` },
      })
      .then((response) => response.data.current.condition),
};

export default API;
