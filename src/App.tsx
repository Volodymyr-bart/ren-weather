import { ChangeEvent, useState } from "react";
import "./App.css";
import ListTrips from "./components/ListTrips/ListTrips";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { FormData as TripFormData, Trip } from "./types";
import Filter from "./components/Filter/Filter";
import { filtredTrips } from "./common";
import WeekForecast from "./components/WeekForecast/WeekForecast";

function App() {
  const [filterValue, setFilterValue] = useState<string>("");

  const [trips, setTrips] = useLocalStorage("trips", [] as Trip[]);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(
    trips[0].id
  );

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

  const getSelectedTrip = () => {
    if (selectedTripId) {
      return trips.find((trip: Trip) => trip.id === selectedTripId);
    }
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
        selectedTripId={selectedTripId}
        setSelectedTripId={setSelectedTripId}
      />
      <h3>Week</h3>
      <WeekForecast trip={getSelectedTrip()} />
    </div>
  );
}

export default App;
