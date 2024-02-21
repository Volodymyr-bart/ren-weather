import { Trip } from "../../types";

interface TripInfoProps {
  trip: Trip;
}
const TripInfo = ({ trip }: TripInfoProps) => {
  return <>{trip.city}</>;
};

export default TripInfo;
