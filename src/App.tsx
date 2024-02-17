import { ChangeEvent, useState } from "react";
import "./App.css";
import ListTrips from "./components/ListTrips/ListTrips";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { FormData as TripFormData, Trip } from "./types";
import Filter from "./components/Filter/Filter";
import { filtredTrips } from "./common";
function App() {
  const [filterValue, setFilterValue] = useState<string>("");

  const [trips, setTrips] = useLocalStorage("trips", [] as Trip[]);

  const handleSetFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value);
  };

  const handleAddTrip = (values: TripFormData) => {
    const newTrip: Trip = {
      id: values.id,
      city: values.city,
      startDate: values.startDate,
      endDate: values.endDate,
    };
    setTrips((prevState: Trip[]) => [...prevState, newTrip]);
  };

  const handleDeleteTrip = (id: string) => {
    setTrips((prevState: Trip[]) => {
      const fitredTrips = prevState.filter((trip) => trip.id !== id);
      return [...fitredTrips];
    });
  };

  return (
    <div className="main-page">
      <h2>
        Weather <strong>Forecast</strong>
      </h2>
      <Filter filterValue={filterValue} handleSetFilter={handleSetFilter} />
      <ListTrips
        trips={filtredTrips(trips, filterValue)}
        handleDeleteTrip={handleDeleteTrip}
        handleAddTrip={handleAddTrip}
      />
    </div>
  );
}

export default App;
