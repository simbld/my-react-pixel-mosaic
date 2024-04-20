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
    togglePower: (state) => {
      state.poweredOn = !state.poweredOn;
      // Gère également les états liés à l'alimentation
      state.soundPlaying = state.poweredOn;
      state.titlesShown = state.poweredOn;
      state.menuVisible = false; // Cache le menu lors de l'extinction
    },
    // Afficher les titres et cacher le menu
    showTitles: (state) => {
      state.titlesShown = true;
    },
    hideTitles: (state) => {
      state.titlesShown = false;
    },
    // Cacher les titres et afficher le menu
    showMenu: (state) => {
      state.menuVisible = true;
    },
    hideMenu: (state) => {
      state.menuVisible = false;
    },
    // Jouer le son uniquement si la console est allumée
    playSound: (state) => {
      state.soundPlaying = true;
    },
    stopSound: (state) => {
      state.soundPlaying = false;
    }
  }
});

// Export des actions pour être utilisées dans les composants
export const {
  togglePower,
  showTitles,
  hideTitles,
  showMenu,
  hideMenu,
  playSound,
  stopSound
} = gameboySlice.actions;

// Export du reducer pour être inclus dans le store
export default gameboySlice.reducer;
