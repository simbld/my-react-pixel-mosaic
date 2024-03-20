import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../reducers/rootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist/es/constants";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["imageProcessing", "gameboy"]
};

// Création du store redux avec redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// Initialisation de redux-persist avec le store configuré
export const persistor = persistStore(store);

// Définition du type pour le store Redux utilisé dans l'application
export type AppStore = typeof store;

// Type pour l'état global avec useSelector
export type RootState = ReturnType<typeof store.getState>;

// Type avec useDispatch
export type AppDispatch = typeof store.dispatch;

// Export par défaut du store configuré
export default store;
