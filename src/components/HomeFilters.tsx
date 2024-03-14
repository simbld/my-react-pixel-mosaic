/**
 *
 * @description A component that displays an image with various filters.
 *
 */

import { useState } from "react";
import AsciiArtCanvas from "./AsciiArtCanvas";
import ImageUpload from "../containers/ImageUpload";

function HomeFilters() {
  const [filterType, setFilterType] = useState<string>("none");
  const [imageData, setImageData] = useState<string | null>(null);

  const renderFilter = () => {
    if (!imageData) return null;
    switch (filterType) {
      case "ascii":
        return <AsciiArtCanvas imageSrc={imageData} />;

      default:
        return null;
    }
  };

  const onImageReady = (data: string) => {
    setImageData(data);
  };

  return (
    <div>
      <ImageUpload onImageReady={onImageReady} />
      <button type="button" onClick={() => setFilterType("none")}>
        No Filter
      </button>
      <button type="button" onClick={() => setFilterType("ascii")}>
        ASCII Art
      </button>

      <div className="filter-output">{renderFilter()}</div>
    </div>
  );
}

export default HomeFilters;
