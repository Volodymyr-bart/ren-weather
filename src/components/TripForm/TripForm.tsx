import React from "react";
import { useForm } from "react-hook-form";
import { citiesApi, getFormattedDate } from "../../common";
import { nanoid } from "nanoid";
import { FormData, Trip } from "../../types";
import "./TripForm.css";

interface TripFormProps {
  onSubmit: (trip: Trip) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 15);

  const generateIdAndSubmit = async (data: FormData) => {
    // const result = await getImageByQuery(data.city);
    const findCity = citiesApi.find((city) => city.title === data.city);
    const imgSrc = findCity?.imgSrc
      ? findCity.imgSrc
      : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg";

    const genId = nanoid();
    const newTrip: Trip = { ...data, imgSrc, id: genId };
    onSubmit(newTrip);
    reset();
  };

  return (
    <>
      <h2>Create trip</h2>
      <form onSubmit={handleSubmit(generateIdAndSubmit)} className="form-trip">
        <div className="form-trip-item">
          <label>City:</label>
          <select
            {...register("city", { required: true })}
            defaultValue={citiesApi[0].title}
          >
            {citiesApi.map((city) => (
              <option key={city.title} value={city.title}>
                {city.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-trip-item">
          <label>Start Date:</label>
          <input
            type="date"
            {...register("startDate", { required: true })}
            min={getFormattedDate(currentDate)}
            max={getFormattedDate(maxDate)}
          />
        </div>
        <div className="form-trip-item">
          <label>End Date:</label>
          <input
            type="date"
            {...register("endDate", { required: true })}
            min={getFormattedDate(currentDate)}
            max={getFormattedDate(maxDate)}
          />
        </div>
        <button formAction="submit">Add Trip</button>
      </form>
    </>
  );
};

export default TripForm;
