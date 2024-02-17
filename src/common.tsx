import axios from "axios";
import { Trip } from "./types";

export const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month: string | number = date.getMonth() + 1;
  const day: string | number = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const API_KEY = import.meta.env.VITE_API_KEY;
export const getData = async (selectedCity: string, selectedDate: string) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedCity}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json&startDateTime=${selectedDate}T00:00:00`;

  try {
    const response = await axios.get<any>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
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
