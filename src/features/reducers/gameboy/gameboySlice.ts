import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameboyState } from "../../../interfaces/types";

// Définition des types d'actions utilisant PayloadAction
export type PowerAction = PayloadAction<boolean>;
export type ShowTitlesAction = PayloadAction<void>;
export type ShowMenuAction = PayloadAction<void>;
export type PlaySoundAction = PayloadAction<void>;

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
    // Basculer l'état de power
    togglePower: (state, action: PowerAction) => {
      state.poweredOn = action.payload;
    },
    // Afficher les titres
    showTitles: (state) => {
      state.titlesShown = true;
    },
    // Afficher le menu après les titres
    showMenu: (state) => {
      state.titlesShown = false;
      state.menuVisible = true;
    },
    // Jouer le son du Gameboy
    playSound: (state) => {
      state.soundPlaying = true;
    }
  }
});

// Export des actions pour être utilisées dans les composants
export const { togglePower, showTitles, showMenu, playSound } =
  gameboySlice.actions;

// Export du reducer pour être inclus dans le store
export default gameboySlice.reducer;
