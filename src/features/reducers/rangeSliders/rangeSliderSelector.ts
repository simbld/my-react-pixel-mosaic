import { createSelector } from "reselect";
import { RootStateProps } from "../rootReducer";

// Sélecteur de base pour le state des filtres
const selectFilters = (state: RootStateProps) => state.filters;

// Sélecteurs pour chaque type de filtre dans le slice filters
export const selectStippling = createSelector(
  [selectFilters],
  (filters) => filters.stippling
);

export const selectRope = createSelector(
  [selectFilters],
  (filters) => filters.rope
);

export const selectSign = createSelector(
  [selectFilters],
  (filters) => filters.sign
);

export const selectString = createSelector(
  [selectFilters],
  (filters) => filters.string
);

export const selectAscii = createSelector(
  [selectFilters],
  (filters) => filters.ascii
);
