import { RootState } from "../../services/stores/store";

export const selectImage = (state: RootState) => state.imageProcessing.image;
