import { RootState } from "../stores/store";

// Récupérer l'état de global de l'application ou des composants
export const selectPower = (state: RootState) => state.gameboy.power;
export const selectCartridge = (state: RootState) => state.gameboy.cartridge;
export const selectScreen = (state: RootState) => state.gameboy.screen;
export const selectScreenColor = (state: RootState) =>
  state.gameboy.screenColor;
export const selectGameboy = (state: RootState) => state.gameboy;
