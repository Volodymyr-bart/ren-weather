import { useEffect, useState } from "react";
import { Trip, WeatherData } from "../../types";
import { converDataToDayWeek, getWeathertDataCity } from "../../common";
import sprite from "../../assets/weather-icons/sprite.svg";
import Loader from "../Loader/Loader";
import "./Aside.css";
interface AsideProps {
  trip: Trip;
}
const Aside = ({ trip }: AsideProps) => {
  const [weatherData, setDataWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async (trip: Trip) => {
    try {
      setIsLoading(true);
      const result = await getWeathertDataCity(trip.city);
      setDataWeatherData(result);
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
  console.log(weatherData);

  return (
    <aside className="main-page__aside">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <ul className="weather-content">
          {weatherData &&
            weatherData.days.map((day) => (
              <li key={day.datetime}>
                <p>{converDataToDayWeek(day.datetime)}</p>
                <div>
                  <svg className="weather-content__icon">
                    <use href={`${sprite}#icon-${day.icon}`} />
                  </svg>
                  <p>{day.temp}</p>
                </div>
                <p>{weatherData.address}</p>
              </li>
            ))}
        </ul>
      )}
    </aside>
  );
};

export default Aside;
