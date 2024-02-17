import { useState } from "react";
import { Trip, FormData as TripFormData } from "../../types";
import Modal from "../Modal/Modal";
import TripForm from "../TripForm/TripForm";

interface ListTripsProps {
  // filter: string;
  trips: Trip[];
  handleDeleteTrip: (id: string) => void;
  handleAddTrip: (values: TripFormData) => void;
}

const ListTrips = ({
  // filter,
  trips,
  handleDeleteTrip,
  handleAddTrip,
}: ListTripsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ul style={{ display: "flex", gap: "30px", listStyle: "none" }}>
        {trips.map((trip) => (
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              width: "200px",
              padding: "20px",
              background: "grey",
              borderRadius: "20px",
            }}
            key={trip.id}
          >
            <h2>{trip.city}</h2>
            <p>{trip.startDate}</p>
            <p>{trip.endDate}</p>
            <button onClick={() => handleDeleteTrip(trip.id)}>
              Delete Trip
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleOpenModal}>Add Trip</button>
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
    </>
  );
};

export default ListTrips;
