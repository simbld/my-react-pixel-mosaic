import { TabletProps } from "../interfaces/prop-types";
import { useState } from "react";
import HomeFilters from "./HomeFilters";

function Tablet({ image }: TabletProps) {
  const [imageData, setImageData] = useState<string | null>(null);

  return (
    <div className="tablet-container">
      <div className="tablet">
        <div className="monitor" />
        <div className="picture-container">
          <HomeFilters onImageReady={setImageData} />{" "}
          {/* // update imageData */}
        </div>

        <div className="image-display">
          {imageData ? <img src={imageData} alt="Uploaded" /> : "No image"}
        </div>
      </div>
    </div>
  );
}

export default Tablet;
