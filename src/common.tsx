import axios from "axios";
import { Trip, WeatherData } from "./types";
export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month: string | number = date.getMonth() + 1;
  const day: string | number = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const geWeathertData = async (
  selectedCity: string,
  selectedDate: string
) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedCity}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json&startDateTime=${selectedDate}T00:00:00`;

  try {
    const response = await axios.get<WeatherData>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
export const getImageByQuery = async (query: string) => {
  const API_KEY = import.meta.env.VITE_PIXABY_API_KEY;
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
export const filtredTrips = (trips: Trip[], filterValue: string) => {
  if (trips.length) {
    if (filterValue) {
      return trips.filter((trip: Trip) => trip.city.includes(filterValue));
    }
    return trips;
  }
  return [];
};

export const converDataToDayWeek = (data: string) => {
  const date = new Date(data);
  return daysOfWeek[date.getDay()];
};
