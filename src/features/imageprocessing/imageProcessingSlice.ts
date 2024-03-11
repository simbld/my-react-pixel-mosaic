import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { ImageProcessingState } from "../../types/ImageProcessingState";

const initialState: ImageProcessingState = {
  url: null,
  filters: {
    ascii: false,
    stippling: false
  },
  error: null
};

const imageProcessingSlice = createSlice({
  name: "imageProcessing",
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string | null>) => {
      state.url = action.payload;
    },
    toggleFilter: (
      state,
      action: PayloadAction<{
        filter: keyof ImageProcessingState["filters"];
        enabled: boolean;
      }>
    ) => {
      const { filter, enabled } = action.payload;
      state.filters[filter] = enabled;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setUrl, toggleFilter, setError } = imageProcessingSlice.actions;
export const imageProcessingReducer: Reducer<ImageProcessingState> =
  imageProcessingSlice.reducer;
