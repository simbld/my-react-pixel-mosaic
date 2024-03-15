import { useState } from "react";
import ArtCanvas from "../components/ArtCanvas";
import HomeFilters from "../components/HomeFilters";
import { defaultImage } from "../config/config";

const MainLayout = () => {
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [applyAscii, setApplyAscii] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);

  const handleImageReady = (newImageSrc: string) => {
    setImageSrc(newImageSrc);
    setImageData(newImageSrc);
  };

  const handleApplyAsciiEffect = () => {
    setApplyAscii(true);
  };

  const imageProcessingState = {
    url: imageSrc,
    filters: { ascii: applyAscii },
    error: null
  };

  return (
    <div>
      <button onClick={handleApplyAsciiEffect}>Appliquer l'effet ASCII</button>
      <HomeFilters onImageReady={handleImageReady} />
      <ArtCanvas
        imageProcessingState={imageProcessingState}
        artCanvas={imageData || defaultImage}
      />
    </div>
  );
};

export default MainLayout;
