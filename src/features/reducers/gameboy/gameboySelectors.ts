import { RootStateProps } from "../stores/store";

// Récupérer l'état de global de l'application ou des composants
export const selectPoweredOn = (state: RootStateProps) =>
  state.gameboy.poweredOn;
export const selectTitlesShown = (state: RootStateProps) =>
  state.gameboy.titlesShown;
export const selectMenuVisible = (state: RootStateProps) =>
  state.gameboy.menuVisible;
export const selectSoundPlaying = (state: RootStateProps) =>
  state.gameboy.soundPlaying;
