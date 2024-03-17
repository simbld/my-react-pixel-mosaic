import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { imageProcessingReducer } from "../imageprocessing/imageProcessingSlice";
import gameboyReducer from "../gameboy/gameboySlice";

const rootReducer = combineReducers({
  imageProcessing: imageProcessingReducer,
  gameboy: gameboyReducer
});

const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
