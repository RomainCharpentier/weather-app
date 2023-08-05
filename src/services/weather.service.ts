import axios, { type AxiosRequestConfig } from "axios";
import type { Weather } from "./Weather";
import type { Location } from "./Location";

interface WeatherCurrentResponse {
  current: {
    condition: {
      code: number;
      icon: string;
      text: string;
    };
    temp_c: number;
    feelslike_c: number;
    wind_kph: number;
  };
}

interface WeatherForecastResponse {
  forecast: {
    forecastday: [
      {
        date: string;
        day: {
          condition: {
            code: number;
            icon: string;
            text: string;
          };
          avgtemp_c: number;
          maxwind_kph: number;
        };
      }
    ];
  };
}

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
      .get<WeatherCurrentResponse>("/current.json", {
        params: { q: `${location.latitude},${location.longitude}` },
      })
      .then((response) => ({
        ...response.data.current.condition,
        date: "today",
        temperature: response.data.current.temp_c,
        wind: response.data.current.wind_kph,
      })),
  getForecast: (location: Location): Promise<Weather[]> =>
    api
      .get<WeatherForecastResponse>("/forecast.json", {
        params: { q: `${location.latitude},${location.longitude}`, days: "3" },
      })
      .then((response) =>
        response.data.forecast.forecastday.map((weather) => ({
          ...weather.day.condition,
          date: weather.date,
          temperature: weather.day.avgtemp_c,
          wind: weather.day.maxwind_kph,
        }))
      ),
};

export default API;
