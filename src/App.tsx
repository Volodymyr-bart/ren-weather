import { ChangeEvent, useState } from "react";
import "./App.css";
import ListTrips from "./components/ListTrips/ListTrips";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Trip } from "./types";
import Filter from "./components/Filter/Filter";
import { filtredTrips } from "./common";
import WeekForecast from "./components/WeekForecast/WeekForecast";
import Container from "./components/Container/Container";
const initialTrips: Trip[] = [
  {
    id: "1",
    city: "Zhytomyr",
    startDate: "2024-02-21",
    endDate: "2024-02-25",
    imgSrc:
      "https://focus.ua/static/storage/thumbs/920x465/3/84/62862b5f-18becd93b2f63add3140e02c395dd843.jpg?v=0325_1",
  },
  {
    id: "2",
    city: "Kiev",
    startDate: "2024-02-21",
    endDate: "2024-02-25",
    imgSrc:
      "https://faktypro.com.ua/uploads/img/23-cikavih-faktu-pro-kiyiv.jpg",
  },
];

function App() {
  const [filterValue, setFilterValue] = useState<string>("");

  const [trips, setTrips] = useLocalStorage("trips", initialTrips);
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
      <header>
        <nav>
          <ul>
            <li>Google auth</li>
          </ul>
        </nav>
      </header>
      <main className="main-page">
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
      </main>
    </Container>
  );
}

export default App;
