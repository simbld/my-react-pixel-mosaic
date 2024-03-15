import { useState, useEffect } from "react";
import ArtCanvas from "./ArtCanvas";
import { HomeFiltersProps } from "../interfaces/prop-types";
import { defaultImage } from "../config/config";

const HomeFilters: React.FC<HomeFiltersProps> = ({ onImageReady }) => {
  const [filterType, setFilterType] = useState("none");
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    if (imageData) {
      onImageReady(imageData);
    } else {
      onImageReady(defaultImage);
    }
  }, [imageData, onImageReady]);

  const renderFilter = () => {
    if (!imageData) return null;
    switch (filterType) {
      case "ascii":
        return (
          <ArtCanvas
            artCanvas={imageData || defaultImage}
            imageProcessingState={{
              url: imageData || defaultImage,
              filters: { ascii: true },
              error: null
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setFilterType("none")}>
        No Filter
      </button>
      <button type="button" onClick={() => setFilterType("ascii")}>
        ASCII Art
      </button>
      <div className="filter-output">{renderFilter()}</div>
    </div>
  );
};

export default HomeFilters;
