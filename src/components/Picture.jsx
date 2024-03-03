import { useState, useEffect } from "react";
import romeo from "../assets/romeo.jpg";
import { TARGET_WIDTH, TARGET_HEIGHT } from "../config";
import createCanvas from "../utils/createCanvas";
import generateAsciiArt from "../utils/generateAsciiArt";
import generateStipplingEffect from "../utils/generateStipplingEffect";

function Picture() {
  const [filterOutput, setFilterOutput] = useState("");
  const [filterType, setFilterType] = useState("ascii");

  useEffect(() => {
    const image = new Image();
    image.src = romeo;
    image.onload = () => {
      const { imageData } = createCanvas(image, TARGET_HEIGHT, TARGET_WIDTH);
      if (filterType === "ascii") {
        const ascii = generateAsciiArt(imageData);
        setFilterOutput(ascii);
      } else if (filterType === "stippling") {
        const stippling = generateStipplingEffect(imageData);
        setFilterOutput(stippling);
      }
    };
  }, [filterType]);

  return (
    <div>
      <select
        onChange={(e) => setFilterType(e.target.value)}
        value={filterType}
      >
        <option value="ascii">Art ASCII</option>
        <option value="stippling">Effet de Stippling</option>
      </select>
      <div className="filterOutput">{filterOutput}</div>
    </div>
  );
}

export default Picture;
