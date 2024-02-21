import axios from "axios";
import { City, Trip, WeatherData } from "./types";
export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const citiesApi: City[] = [
  {
    title: "Berlin",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Museumsinsel_Berlin_Juli_2021_1_%28cropped%29.jpg/1200px-Museumsinsel_Berlin_Juli_2021_1_%28cropped%29.jpg",
  },
  {
    title: "Warshava",
    imgSrc:
      "https://www.poland.travel/images/ru-RU/Miasta/warszawa_plac_zamkowy_1170.jpg",
  },
  {
    title: "Kyiv",
    imgSrc:
      "https://faktypro.com.ua/uploads/img/23-cikavih-faktu-pro-kiyiv.jpg",
  },
  {
    title: "Vinnytsia",
    imgSrc: "https://tamtour.com.ua/local/image/440/009/ua241.jpg",
  },
  {
    title: "Zhytomyr",
    imgSrc:
      "https://focus.ua/static/storage/thumbs/920x465/3/84/62862b5f-18becd93b2f63add3140e02c395dd843.jpg?v=0325_1",
  },
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
