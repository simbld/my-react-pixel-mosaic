import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameboyState } from "../../../interfaces/types";

// Définition des types d'actions utilisant PayloadAction
export type PowerAction = PayloadAction<boolean>;

// Définition de l'état initial
const initialState: GameboyState = {
  poweredOn: false,
  titlesShown: false,
  menuVisible: false,
  soundPlaying: false
};

// Création du slice de Gameboy
export const gameboySlice = createSlice({
  name: "gameboy",
  initialState,
  reducers: {
    // Basculer l'état de power et arrêter le son si éteint
    togglePower: (state, action: PowerAction) => {
      state.poweredOn = action.payload;
      if (!state.poweredOn) {
        state.soundPlaying = false; // Arrêter le son si la console est éteinte
      }
    },
    // Afficher les titres et cacher le menu
    showTitles: (state) => {
      state.titlesShown = true;
      state.menuVisible = false;
    },
    // Cacher les titres et afficher le menu
    showMenu: (state) => {
      state.titlesShown = false;
      state.menuVisible = true;
    },
    // Jouer le son uniquement si la console est allumée
    playSound: (state) => {
      if (state.poweredOn) {
        state.soundPlaying = true;
      }
    },
    // Arrêter le son
    stopSound: (state) => {
      state.soundPlaying = false;
    }
  }
});

// Export des actions pour être utilisées dans les composants
export const { togglePower, showTitles, showMenu, playSound, stopSound } =
  gameboySlice.actions;

// Export du reducer pour être inclus dans le store
export default gameboySlice.reducer;
