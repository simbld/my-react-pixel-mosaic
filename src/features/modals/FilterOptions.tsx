import type { FilterOptionsProps } from "@interfaces/types";

/**
 * Composant pour afficher les options de filtre.
 * @param {FilterOptionsProps} props - Les propriétés du composant.
 * @returns {JSX.Element} - Composant JSX des options de filtre.
 */
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
