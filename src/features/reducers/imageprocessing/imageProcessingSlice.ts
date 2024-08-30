import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import defaultImage from "@assets/default.png";
import { ImageProcessingStateProps } from "../../../interfaces/types";

const initialState: ImageProcessingStateProps = {
  url: defaultImage,
  filters: {
    ascii: false,
    stippling: false,
    rope: false,
    sign: false,
    string: false
  },
  error: null
};

export const imageProcessingSlice = createSlice({
  name: "imageProcessing",
  initialState,
  reducers: {
    toggleFilter: (
      state,
      action: PayloadAction<keyof ImageProcessingStateProps["filters"]>
    ) => {
      const filter = action.payload;
      state.filters[filter] = !state.filters[filter];
    },
    resetImage: (state) => {
      state.url = defaultImage;
      Object.keys(state.filters).forEach((filter) => {
        state.filters[filter as keyof typeof state.filters] = false;
      });
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { toggleFilter, setError, resetImage } =
  imageProcessingSlice.actions;
export const imageProcessingReducer: Reducer<ImageProcessingStateProps> =
  imageProcessingSlice.reducer;
