import { converDataToDayWeek, geWeathertData } from "../../common";
import sprite from "../../assets/weather-icons/sprite.svg";
import { Trip, WeatherData } from "../../types";
import { useEffect, useState } from "react";

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
    fetchData(trip);
  }, [trip]);

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            margin: "0 auto",
          }}
        >
          {weatherData &&
            weatherData.days.map((day) => (
              <li key={day.datetime} style={{ width: "100px" }}>
                <p>{day.datetime}</p>
                <p>{converDataToDayWeek(day.datetime)}</p>
                <svg style={{ width: "40px", height: "40px" }}>
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