import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameboyStateProps } from "../../../interfaces/types";

// Définition des types d'actions utilisant PayloadAction
export type PowerAction = PayloadAction<boolean>;

// Définition de l'état initial
const initialState: GameboyStateProps = {
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
      // Définir l'état poweredOn selon l'action
      state.poweredOn = action.payload;

      // Si la console est éteinte, réinitialiser les états associés
      if (!state.poweredOn) {
        state.soundPlaying = false; // Arrête le son
        state.titlesShown = false; // Cache les titres
        state.menuVisible = false; // Cache le menu
      } else {
        // Si la console est allumée, configurer les états pour l'allumage
        state.titlesShown = true; // Affiche les titres
        state.menuVisible = false; // S'assure que le menu n'est pas visible immédiatement
        // La logique pour jouer le son pourrait être gérée ici ou déclenchée par un effet dans le composant
      }
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
