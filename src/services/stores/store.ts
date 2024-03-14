import { configureStore, Store } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { imageProcessingReducer } from "../../features/imageprocessing/imageProcessingSlice";

const rootReducer = {
  imageProcessing: imageProcessingReducer
  // autres reducers
};

const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
