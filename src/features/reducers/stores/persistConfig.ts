import * as localforage from "localforage";
import { persistReducer } from "redux-persist";
import rootReducer, { RootState } from "../rootReducer";
import { UnknownAction, Reducer } from "@reduxjs/toolkit";

localforage.config({
  driver: localforage.INDEXEDDB, // setDriver()
  name: "RePixelAct",
  storeName: "imageDataStore"
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: localforage,
  whitelist: ["imageProcessing", "gameboy", "menuGameboy"]
};

export const persistedReducer: Reducer<RootState, UnknownAction> =
  persistReducer(persistConfig, rootReducer);
