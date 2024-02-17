import { ChangeEvent } from "react";

interface FilterProps {
  filterValue: string;
  handleSetFilter: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({ filterValue, handleSetFilter }: FilterProps) => {
  return (
    <>
      <input
        style={{ width: "200px", padding: "10px" }}
        type="text"
        value={filterValue}
        onChange={handleSetFilter}
        placeholder="Search your trip"
      />
    </>
  );
};

export default Filter;
