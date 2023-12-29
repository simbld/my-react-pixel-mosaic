import React, { useState, useEffect } from "react";
import romeo from "../assets/romeo.jpg";
import { TARGET_WIDTH, TARGET_HEIGHT, density } from "../config";

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
          const r = imageData.data[pixelIndex + 0];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          const avg = (r + g + b) / 3;
          const charIndex = Math.floor(
            mapValue(avg, 0, 255, density.length, 0)
          );
          ascii += density.charAt(charIndex);
        }
        ascii += "\n";
      }
      setAsciiArt(ascii);
    };
  }, []);

  const mapValue = (value, start1, stop1, start2, stop2) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  };

  return <div className="asciiArt">{asciiArt}</div>;
}

export default Picture;

