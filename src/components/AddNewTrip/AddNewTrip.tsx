import { useState } from "react";
import Modal from "../Modal/Modal";
import TripForm from "../TripForm/TripForm";
import { Trip } from "../../types";
import "./AddNewTrip.css";

interface AddNewTripProps {
  handleAddTrip: (trip: Trip) => void;
}

const AddNewTrip = ({ handleAddTrip }: AddNewTripProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={handleOpenModal} className="btn-add-trip ">
        Add Trip
      </button>
      <Modal
        children={
          <TripForm
            onSubmit={(trip) => {
              handleAddTrip(trip);
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

export default AddNewTrip;
