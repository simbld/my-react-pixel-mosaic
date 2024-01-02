import Picture from "./Picture";

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
