import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  toggleAsciiFilter,
  toggleStipplingFilter,
  toggleRopeFilter,
  toggleSignFilter,
  toggleStringFilter,
  resetAllFilters
} from "./filterActions";

interface FiltersStateProps {
  ascii: boolean;
  stippling: boolean;
  rope: boolean;
  sign: boolean;
  string: boolean;
}

const initialState: FiltersStateProps = {
  ascii: false,
  stippling: false,
  rope: false,
  sign: false,
  string: false
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleAsciiFilter, (state, action: PayloadAction<boolean>) => {
        state.ascii = action.payload;
      })
      .addCase(
        toggleStipplingFilter,
        (state, action: PayloadAction<boolean>) => {
          state.stippling = action.payload;
        }
      )
      .addCase(toggleRopeFilter, (state, action: PayloadAction<boolean>) => {
        state.rope = action.payload;
      })
      .addCase(toggleSignFilter, (state, action: PayloadAction<boolean>) => {
        state.sign = action.payload;
      })
      .addCase(toggleStringFilter, (state, action: PayloadAction<boolean>) => {
        state.string = action.payload;
      })
      .addCase(resetAllFilters, (state) => {
        return initialState;
      });
  }
});

export const filtersReducer = filtersSlice.reducer;
