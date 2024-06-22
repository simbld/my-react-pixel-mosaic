import type { FilterOptionsProps } from "@interfaces/types";

const FilterOptions: React.FC<FilterOptionsProps> = ({
  activeFilter,
  onFilterChange
}) => {
  return (
    <div className={`filter-options ${activeFilter ? "active" : ""}`}>
      <button
        className={`filter-option ${activeFilter === "simple" ? "active" : ""}`}
        onClick={() => onFilterChange("simple")}
      >
        Simple
      </button>
      <button
        className={`filter-option ${activeFilter === "extended" ? "active" : ""}`}
        onClick={() => onFilterChange("extended")}
      >
        Extended
      </button>
      <button
        className={`filter-option ${activeFilter === "block" ? "active" : ""}`}
        onClick={() => onFilterChange("block")}
      >
        Block
      </button>
    </div>
  );
};

export default FilterOptions;
