import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FiltersStateProps } from "@interfaces/types";

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
  reducers: {
    toggleAsciiFilter(state, action: PayloadAction<boolean>) {
      state.ascii = action.payload;
    },
    toggleStipplingFilter(state, action: PayloadAction<boolean>) {
      state.stippling = action.payload;
    },
    toggleRopeFilter(state, action: PayloadAction<boolean>) {
      state.rope = action.payload;
    },
    toggleSignFilter(state, action: PayloadAction<boolean>) {
      state.sign = action.payload;
    },
    toggleStringFilter(state, action: PayloadAction<boolean>) {
      state.string = action.payload;
    },
    resetAllFilters(state) {
      return initialState;
    }
  }
});

export const {
  toggleAsciiFilter,
  toggleStipplingFilter,
  toggleRopeFilter,
  toggleSignFilter,
  toggleStringFilter,
  resetAllFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
