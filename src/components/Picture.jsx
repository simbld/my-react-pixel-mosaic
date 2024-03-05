/**
 * @file Picture.jsx
 * @description A component that displays an image with various filters.
 *
 */

import { useState, useEffect } from "react";
import AsciiFilter from "../utils/AsciiFilter";
import StipplingFilter from "../utils/StipplingFilter";
import romeo from "../assets/romeo.jpg";

function Picture() {
  const [filterType, setFilterType] = useState("ascii");

  let FilterComponent;
  switch (filterType) {
    case "ascii":
      FilterComponent = AsciiFilter;
      break;
    case "stippling":
      FilterComponent = StipplingFilter;
      break;
    default:
      FilterComponent = null;
  }

  return (
    <div>
      <button type="button" onClick={() => setFilterType("ascii")}>
        ASCII Art
      </button>
      <button type="button" onClick={() => setFilterType("stippling")}>
        Stippling Effect
      </button>
      {FilterComponent && <FilterComponent />}
      <div>
        <img src={romeo} alt="Romeo" />
      </div>
    </div>
  );
}

export default Picture;
