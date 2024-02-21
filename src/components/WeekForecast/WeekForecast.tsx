import { converDataToDayWeek, geWeathertData } from "../../common";
import sprite from "../../assets/weather-icons/sprite.svg";
import { Trip, WeatherData } from "../../types";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import "./WeekForecast.css";
interface WeekForecastProps {
  trip: Trip;
}

const WeekForecast = ({ trip }: WeekForecastProps) => {
  const [weatherData, setDataWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async (trip: Trip) => {
    try {
      setIsLoading(true);
      const result = await geWeathertData(trip.city, trip.startDate);
      setDataWeatherData(result ?? null);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (trip) {
      fetchData(trip);
    }
  }, [trip]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <ul className="weather-list">
          {weatherData &&
            weatherData.days.slice(0, 7).map((day) => (
              <li key={day.datetime} className="weather-item">
                <p>{day.datetime}</p>
                <p>{converDataToDayWeek(day.datetime)}</p>
                <svg className="weather-item__icon">
                  <use href={`${sprite}#icon-${day.icon}`} />
                </svg>
                <p>
                  {day.tempmax} / {day.tempmin}
                </p>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default WeekForecast;
