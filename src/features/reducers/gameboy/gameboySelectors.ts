import { RootState } from "../stores/store";

// Récupérer l'état de global de l'application ou des composants
export const selectPoweredOn = (state: RootState) => state.gameboy.poweredOn;
export const selectTitlesShown = (state: RootState) =>
  state.gameboy.titlesShown;
export const selectMenuVisible = (state: RootState) =>
  state.gameboy.menuVisible;
export const selectSoundPlaying = (state: RootState) =>
  state.gameboy.soundPlaying;
