import { Reducer, combineReducers } from "@reduxjs/toolkit";
import gameboyReducer from "./gameboy/gameboySlice";
import { imageProcessingReducer } from "./imageprocessing/imageProcessingSlice";

const rootReducer: Reducer = combineReducers({
  imageProcessing: imageProcessingReducer,
  gameboy: gameboyReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
