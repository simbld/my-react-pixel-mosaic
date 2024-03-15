import { TabletProps } from "../interfaces/prop-types";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

function Tablet({ imageSrc }: TabletProps) {
  const [imageData, setImageData] = useState<string | null>(null);

  return (
    <div className="tablet-container">
      <div className="tablet">
        <h1>RePixelAct</h1>
        <div className="monitor" />
        <div className="picture-container">
          <MainLayout imageSrc={imageSrc} />
        </div>
      </div>
    </div>
  );
}

export default Tablet;
