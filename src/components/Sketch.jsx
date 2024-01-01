import React from "react";
import Picture from "../components/Picture";

function Sketch() {
  return (
    <>
      <div className="tablet-container">
        <div class="tablet">
          <div class="monitor"></div>
          <div className="picture-container">
            <Picture />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sketch;
