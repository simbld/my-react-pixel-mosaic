import type { ImageComparisonSliderProps } from "@interfaces/types";
import ReactCompareImage from "react-compare-image";

const ImageComparisonSlider = ({
  leftImage,
  rightImage
}: ImageComparisonSliderProps) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactCompareImage leftImage={leftImage} rightImage={rightImage} />
    </div>
  );
};

export default ImageComparisonSlider;
