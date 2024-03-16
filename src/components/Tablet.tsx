import { TabletProps } from "../interfaces/prop-types";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

function Tablet({ imageSrc }: TabletProps) {
  const [imageData, setImageData] = useState<string | null>(null);

  return (
    <div className="tablet-container">
      <div className="tablet">
        <div className="title-container">
          <h1 className="title">RePixelAct</h1>
        </div>
        <div className="canvas-container">
          <div className="canvas">
            <MainLayout imageSrc={imageSrc} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tablet;
