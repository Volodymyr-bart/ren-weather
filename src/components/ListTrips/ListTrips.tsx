import { Trip } from "../../types";
import "./ListTrips.css";
interface ListTripsProps {
  trips: Trip[];
  handleDeleteTrip: (id: string) => void;
  // handleAddTrip: (trip: Trip) => void;
  selectedTripId: string | null;
  setSelectedTripId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ListTrips = ({
  selectedTripId,
  trips,
  handleDeleteTrip,
  // handleAddTrip,
  setSelectedTripId,
}: ListTripsProps) => {
  const handleTripClick = (id: string) => {
    setSelectedTripId(id);
  };
  return (
    <div className="trips-container">
      <ul className="trips-list">
        {trips.map((trip) => (
          <li
            className={`trips-item ${
              trip.id === selectedTripId ? "active" : ""
            }`}
            key={trip.id}
            onClick={() => {
              handleTripClick(trip.id);
            }}
          >
            {trip.imgSrc ? (
              <img
                src={trip.imgSrc}
                alt="Picture"
                className="trips-item__picture"
              />
            ) : (
              <>Error</>
            )}

            <h2>{trip.city}</h2>
            <p className="trips-item__date">
              {trip.startDate} -{trip.endDate}
            </p>
            {trips.length >= 2 && (
              <button
                className="btn-close"
                onClick={() => handleDeleteTrip(trip.id)}
              >
                <svg height="200" viewBox="0 0 200 200" width="200">
                  <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTrips;
