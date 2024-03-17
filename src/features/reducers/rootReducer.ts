import gameboyReducer from "./gameboy/gameboySlice";
import { combineReducers, Reducer } from "redux";
import { imageProcessingReducer } from "./imageprocessing/imageProcessingSlice";

const rootReducer: Reducer = combineReducers({
  imageProcessing: imageProcessingReducer,
  gameboy: gameboyReducer
});

export default rootReducer;
