import { Reducer, combineReducers } from "@reduxjs/toolkit";
import gameboyReducer from "./gameboy/gameboySlice";
import { imageProcessingReducer } from "./imageprocessing/imageProcessingSlice";
import menuGameboyReducer from "./menugameboy/menuGameboySlice";
import rangeSliderReducer from "./rangeSliders/rangeSliderSlice";
import { filtersReducer } from "./filters/filtersSlice";

const rootReducer: Reducer = combineReducers({
  imageProcessing: imageProcessingReducer,
  gameboy: gameboyReducer,
  menuGameboy: menuGameboyReducer,
  rangeSliders: rangeSliderReducer,
  filters: filtersReducer
});

export type RootStateProps = ReturnType<typeof rootReducer>;

export default rootReducer;
