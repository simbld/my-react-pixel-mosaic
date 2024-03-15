import { useState } from "react";
import AsciiArtCanvas from "../components/AsciiArtCanvas";
import ImageUpload from "../containers/ImageUpload";

const MainLayout = () => {
  const [imageSrc, setImageSrc] = useState<string>("/src/assets/default.png");

  const handleImageReady = (newImageSrc: string) => {
    setImageSrc(newImageSrc);
  };

  return (
    <>
      <AsciiArtCanvas
        asciiArtCanvas={imageSrc}
        imageProcessingState={{
          url: imageSrc,
          filters: { ascii: true },
          error: null
        }}
      />
      <ImageUpload onImageReady={handleImageReady} />
    </>
  );
};

export default MainLayout;
