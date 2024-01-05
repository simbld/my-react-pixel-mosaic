import { useState, useEffect } from "react";
import romeo from "../assets/romeo.jpg";
import { TARGET_WIDTH, TARGET_HEIGHT } from "../config";
import createCanvas from "../utils/createCanvas";
import generateAsciiArt from "../utils/generateAsciiArt";

function Picture() {
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    const image = new Image();
    image.src = romeo;
    image.onload = () => {
      const { imageData } = createCanvas(image, TARGET_HEIGHT, TARGET_WIDTH);
      const ascii = generateAsciiArt(imageData);
      setAsciiArt(ascii);
    };
  }, []);

  return <div className="asciiArt">{asciiArt}</div>;
}

export default Picture;
