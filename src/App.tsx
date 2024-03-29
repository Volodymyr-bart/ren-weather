import { ChangeEvent, useState } from "react";
import "./App.css";
import ListTrips from "./components/ListTrips/ListTrips";
import { useLocalStorageTrips } from "./hooks/useLocalStorage";
import { Trip } from "./types";
import Filter from "./components/Filter/Filter";
import { filtredTrips, initialTrips } from "./common";
import WeekForecast from "./components/WeekForecast/WeekForecast";
import Container from "./components/Container/Container";
import AddNewTrip from "./components/AddNewTrip/AddNewTrip";
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";

function App() {
  const [filterValue, setFilterValue] = useState<string>("");

  const [trips, setTrips] = useLocalStorageTrips("trips", initialTrips);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(
    trips[0].id
  );

  const handleSetFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value);
  };

  const handleAddTrip = (newTrip: Trip) => {
    setTrips((prevState: Trip[]) => [...prevState, newTrip]);
  };

  const handleDeleteTrip = (id: string) => {
    setTrips((prevState: Trip[]) => {
      const fitredTrips = prevState.filter((trip) => trip.id !== id);
      return [...fitredTrips];
    });
    setSelectedTripId(trips[0].id);
  };

  const getSelectedTrip = () => {
    if (selectedTripId) {
      return trips.find((trip: Trip) => trip.id === selectedTripId);
    }
  };

  return (
    <Container>
      <Header />
      <main className="main-page">
        <div className="main-page__content">
          <h2>
            Weather <strong>Forecast</strong>
          </h2>
          <div className="main-page__trips-action">
            <Filter
              filterValue={filterValue}
              handleSetFilter={handleSetFilter}
            />
            <AddNewTrip handleAddTrip={handleAddTrip} />
          </div>
          <ListTrips
            trips={filtredTrips(trips, filterValue)}
            handleDeleteTrip={handleDeleteTrip}
            // handleAddTrip={handleAddTrip}
            selectedTripId={selectedTripId}
            setSelectedTripId={setSelectedTripId}
          />
          <h3>Week</h3>
          <WeekForecast trip={getSelectedTrip()} />
        </div>
        <Aside trip={getSelectedTrip()}/>
      </main>
    </Container>
  );
}

export default App;
