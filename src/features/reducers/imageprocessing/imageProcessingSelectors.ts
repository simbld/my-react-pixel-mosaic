import { RootState } from "../stores/store";

export const selectImage = (state: RootState) => state.imageProcessing.image;
