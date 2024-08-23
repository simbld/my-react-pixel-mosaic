import type { FiltersStateProps } from "@interfaces/types";
import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";

const initialState: FiltersStateProps = {
  ascii: false,
  stippling: false,
  rope: false,
  sign: false,
  string: false
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<keyof FiltersStateProps>) => {
      const filter = action.payload;
      state[filter] = !state[filter];
    },
    resetFilters: (state) => {
      Object.keys(state).forEach((filter) => {
        state[filter as keyof FiltersStateProps] = false;
      });
    },
    setFilter: (
      state,
      action: PayloadAction<{ filter: keyof FiltersStateProps; value: boolean }>
    ) => {
      const { filter, value } = action.payload;
      state[filter] = value;
    }
  }
});

export const { toggleFilter, resetFilters, setFilter } = filtersSlice.actions;
export const filtersReducer: Reducer<FiltersStateProps> = filtersSlice.reducer;
