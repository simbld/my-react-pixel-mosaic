import { createSelector } from "@reduxjs/toolkit";
import { RootStateProps } from "../rootReducer";

export const selectFilter = (filterName: keyof RootStateProps["filters"]) =>
  createSelector(
    (state: RootStateProps) => state.filters,
    (filters) => filters[filterName]
  );
