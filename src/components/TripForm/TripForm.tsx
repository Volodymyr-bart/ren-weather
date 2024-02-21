import React from "react";
import { useForm } from "react-hook-form";
import { getFormattedDate, getImageByQuery } from "../../common";

import { nanoid } from "nanoid";
import { FormData, Trip } from "../../types";

interface TripFormProps {
  onSubmit: (trip: Trip) => void;
}

const cities: string[] = ["Kyiv", "Vinnytsia", "Zhytomyr"];

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 15);

  const generateIdAndSubmit = async (data: FormData) => {
    const result = await getImageByQuery(data.city);
    console.log(result);
    let imgSrc;
    if (result.hits) {
      imgSrc = result.hits[0].largeImageURL;
    } else {
      imgSrc =
        "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg";
    }
    const genId = nanoid();
    const newTrip: Trip = { ...data, imgSrc, id: genId };
    onSubmit(newTrip);
    reset();
  };

  return (
    <>
      <h2>Create trip</h2>
      <form
        onSubmit={handleSubmit(generateIdAndSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-start",
          }}
        >
          <label>City:</label>
          <select
            {...register("city", { required: true })}
            defaultValue={cities[0]}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-start",
          }}
        >
          <label>Start Date:</label>
          <input
            type="date"
            {...register("startDate", { required: true })}
            min={getFormattedDate(currentDate)}
            max={getFormattedDate(maxDate)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-start",
          }}
        >
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
