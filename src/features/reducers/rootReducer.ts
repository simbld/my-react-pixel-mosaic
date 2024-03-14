import { combineReducers, Reducer } from "redux";
import { imageProcessingReducer } from "../imageprocessing/imageProcessingSlice";

const rootReducer: Reducer = combineReducers({
  imageProcessing: imageProcessingReducer
  // autres reducers
});

export default rootReducer;
