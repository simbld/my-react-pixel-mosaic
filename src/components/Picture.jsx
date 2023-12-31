import React, { useState, useEffect } from "react";
import romeo from "../assets/romeo.jpg";
import { TARGET_WIDTH, TARGET_HEIGHT } from "../config";
import { getAsciiCharacter } from "../utils/getAsciiCharacter";

function Picture() {
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    const image = new Image();
    image.src = romeo;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = TARGET_WIDTH;
      canvas.height = TARGET_HEIGHT;
      ctx.drawImage(image, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      const imageData = ctx.getImageData(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      let ascii = "";
      for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
          const pixelIndex = (i + j * imageData.width) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          ascii += getAsciiCharacter(r, g, b);
        }
        ascii += "\n";
      }
      setAsciiArt(ascii);
    };
  }, []);

  return <div className="asciiArt">{asciiArt}</div>;
}

export default Picture;
