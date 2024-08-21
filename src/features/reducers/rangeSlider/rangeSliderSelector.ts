import { createSelector } from "reselect";
import { RootState } from "./../rootReducer";

// Sélecteur de base pour le state des filtres
const selectFilters = (state: RootState) => state.filters;

// Sélecteurs pour les filtres Stippling
export const selectStipplingSimple = createSelector(
  [selectFilters],
  (filters) => filters.stipplingSimple
);

export const selectStipplingExtended = createSelector(
  [selectFilters],
  (filters) => filters.stipplingExtended
);

export const selectStipplingBlock = createSelector(
  [selectFilters],
  (filters) => filters.stipplingBlock
);

// Sélecteurs pour les filtres Rope
export const selectRopeSimple = createSelector(
  [selectFilters],
  (filters) => filters.ropeSimple
);

export const selectRopeExtended = createSelector(
  [selectFilters],
  (filters) => filters.ropeExtended
);

export const selectRopeBlock = createSelector(
  [selectFilters],
  (filters) => filters.ropeBlock
);

// Sélecteurs pour les filtres Sign
export const selectSignSimple = createSelector(
  [selectFilters],
  (filters) => filters.signSimple
);

export const selectSignExtended = createSelector(
  [selectFilters],
  (filters) => filters.signExtended
);

export const selectSignBlock = createSelector(
  [selectFilters],
  (filters) => filters.signBlock
);

// Sélecteurs pour les filtres String
export const selectStringSimple = createSelector(
  [selectFilters],
  (filters) => filters.stringSimple
);

export const selectStringExtended = createSelector(
  [selectFilters],
  (filters) => filters.stringExtended
);

export const selectStringBlock = createSelector(
  [selectFilters],
  (filters) => filters.stringBlock
);

// Sélecteurs pour le filtre ASCII
export const selectAscii = createSelector(
  [selectFilters],
  (filters) => filters.ascii
);
