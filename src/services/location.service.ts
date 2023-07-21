import axios, { type AxiosRequestConfig } from "axios";
import type { Weather } from "./Weather";
import type { Location } from "./Location";

interface LocationApiResponse {
  lat: string;
  lon: string;
  display_name: string;
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
  getLocation: (query: string): Promise<Location> =>
    axios
      .get<LocationApiResponse[]>("https://geocode.maps.co/search", {
        params: { q: query },
      })
      .then((response) => {
        const firstElement = response.data[0];
        return {
          name: firstElement?.display_name,
          latitude: firstElement?.lat,
          longitude: firstElement?.lon,
        };
      }),
};

export default API;
