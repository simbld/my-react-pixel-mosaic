import { useState } from "react";
import AsciiArtCanvas from "../components/AsciiArtCanvas";
import ImageUpload from "../containers/ImageUpload"; // Assurez-vous que ce chemin est correct

const MainLayout = () => {
  const [imageSrc, setImageSrc] = useState<string>("/src/assets/default.png");

  const handleImageReady = (newImageSrc: string) => {
    setImageSrc(newImageSrc);
  };

  return (
    <>
      <ImageUpload onImageReady={handleImageReady} />
      <AsciiArtCanvas asciiArtCanvas={imageSrc} />
    </>
  );
};

export default MainLayout;
