import { useSelector } from "react-redux";
import { selectFilter } from "./filterSelector";
import type { RootStateProps } from "../rootReducer";

const FiltersStatus: React.FC = () => {
  const filterNames: Array<keyof RootStateProps["filters"]> = [
    "ascii",
    "stippling",
    "rope",
    "sign",
    "string"
  ];
  const filtersStatusUses = filterNames.map((naming) => ({
    naming,
    isEnabled: useSelector(selectFilter(naming))
  }));

  return (
    <div>
      {filtersStatusUses.map((filter) => (
        <p key={String(filter.naming)}>
          {filter.naming.toString().charAt(0).toUpperCase() +
            filter.naming.toString().slice(1)}
          : {filter.isEnabled ? "Enabled" : "Disabled"}
        </p>
      ))}
    </div>
  );
};

export default FiltersStatus;
