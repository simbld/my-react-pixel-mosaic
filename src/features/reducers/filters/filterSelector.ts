import type { FiltersStateProps } from "@interfaces/types";
import { RootStateProps } from "../rootReducer";

// Sélecteur pour obtenir l'état complet des filtres
export const selectFilters = (state: RootStateProps) => state.filters;

// Sélecteur pour un filtre spécifique
export const selectFilter =
  (filter: keyof FiltersStateProps) => (state: RootStateProps) =>
    state.filters[filter];
