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
      switch (filterType) {
        case "ascii": {
          const ascii = generateAsciiArt(imageData);
          setFilterOutput(ascii);
          break;
        }
        case "stippling":
          generateStipplingEffect(imageData).then((stippling) => {
            setFilterOutput(stippling);
          });
          break;
        default:
          setFilterOutput("");
      }
    };
  }, [filterType]);

  return (
    <div>
      <button type="button" onClick={() => setFilterType("ascii")}>
        ASCII Art
      </button>
      <button type="button" onClick={() => setFilterType("stippling")}>
        Stippling Effect
      </button>
      <div className="effectOutput">
        {typeof filterOutput === "string" ? (
          filterOutput
        ) : (
          <img src={filterOutput} alt="Stippling Effect" />
        )}
      </div>
    </div>
  );
}

export default Picture;
