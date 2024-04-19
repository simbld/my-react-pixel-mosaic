import { Reducer, combineReducers } from "@reduxjs/toolkit";
import gameboyReducer from "./gameboy/gameboySlice";
import { imageProcessingReducer } from "./imageprocessing/imageProcessingSlice";
import menuGameboyReducer from "./menugameboy/menuGameboySlice";

const rootReducer: Reducer = combineReducers({
  imageProcessing: imageProcessingReducer,
  gameboy: gameboyReducer,
  menuGameboy: menuGameboyReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
