import Picture from "./Picture";
import "../less/Sketch.less";

function Sketch() {
  return (
    <div className="tablet-container">
      <div className="tablet">
        <div className="monitor" />
        <div className="picture-container">
          <Picture />
        </div>
      </div>
    </div>
  );
}

export default Sketch;
