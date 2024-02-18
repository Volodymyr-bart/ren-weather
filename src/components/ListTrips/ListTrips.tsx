import { useState } from "react";
import { Trip, FormData as TripFormData } from "../../types";
import Modal from "../Modal/Modal";
import TripForm from "../TripForm/TripForm";

interface ListTripsProps {
  // filter: string;
  trips: Trip[];
  handleDeleteTrip: (id: string) => void;
  handleAddTrip: (values: TripFormData) => void;
  selectedTripId: string | null;
  setSelectedTripId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ListTrips = ({
  selectedTripId,
  trips,
  handleDeleteTrip,
  handleAddTrip,
  setSelectedTripId,
}: ListTripsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTripClick = (id: string) => {
    setSelectedTripId(id);
    // Perform any additional actions with the clicked trip ID
  };
  return (
    <div
      style={{
        display: "inline-flex",
        gap: "30px",
        alignItems: "flex-start",
        margin: "20px auto",
      }}
    >
      <ul
        style={{
          display: "flex",
          gap: "30px",
          listStyle: "none",
          margin: 0,
        }}
      >
        {trips.map((trip) => (
          <li
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "7px",
              width: "200px",
              border: "1px solid grey",
              backgroundColor:
                trip.id === selectedTripId ? "lightblue" : "white", // Highlight selected trip
            }}
            key={trip.id}
            onClick={() => {
              handleTripClick(trip.id);
            }}
          >
            <img
              src=""
              alt="Picture"
              style={{
                width: "200px",
                height: "200px",
                background: "grey",
              }}
            />
            <h2>{trip.city}</h2>
            <p style={{ marginBottom: "10px" }}>
              {trip.startDate} -{trip.endDate}
            </p>
            <button
              style={{ position: "absolute", top: "15px", right: "15px" }}
              onClick={() => handleDeleteTrip(trip.id)}
            >
              <svg height="20" viewBox="0 0 200 200" width="20">
                <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleOpenModal}
        style={{ background: "grey", width: "200px", height: "200px" }}
      >
        +<br />
        Add Trip
      </button>
      <Modal
        children={
          <TripForm
            onSubmit={(values) => {
              handleAddTrip(values);
              handleCloseModal();
            }}
          />
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ListTrips;
