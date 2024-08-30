import * as localforage from "localforage";
import { persistReducer } from "redux-persist";
import rootReducer, { RootStateProps } from "../rootReducer";
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
  whitelist: [
    "imageProcessing",
    "gameboy",
    "menuGameboy",
    "rangeSliders",
    "filters"
  ]
};

export const persistedReducer: Reducer<RootStateProps, UnknownAction> =
  persistReducer(persistConfig, rootReducer);
