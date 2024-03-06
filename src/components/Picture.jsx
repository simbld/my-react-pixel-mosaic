/**
 *
 * @description A component that displays an image with various filters.
 *
 */

import { useCallback, useState } from "react";
import AsciiArtCanvas from "../components/AsciiArtCanvas";
import StipplingCanvas from "../components/StipplingCanvas";

function Picture() {
  const [filterType, setFilterType] = useState("none");
  const [imageData, setImageData] = useState(null);

  const renderFilterComponent = useCallback(() => {
    if (!imageData) return null;
    switch (filterType) {
      case "ascii":
        return <AsciiArtCanvas imageSrc={imageData} />;
      case "stippling":
        return <StipplingCanvas imageSrc={imageData} />;
      default:
        return null;
    }
  }, [filterType, imageData]);

  return (
    <div>
      <button type="button" onClick={() => setFilterType("ascii")}>
        ASCII Art
      </button>
      <button type="button" onClick={() => setFilterType("stippling")}>
        Stippling Effect
      </button>
      <div className="filter-output">{renderFilterComponent()}</div>
    </div>
  );
}

export default Picture;
