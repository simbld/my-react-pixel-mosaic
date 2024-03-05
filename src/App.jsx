import React, { useState } from "react";
import Sketch from "./components/Sketch";
import "./less/Sketch.less";
import defaultImage from "./assets/romeo.jpg";

function App() {
  const [image, setImage] = useState(defaultImage);
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <h1>PixelMosaic</h1>
      <div>
        <input type="file" accept="image/*" onChange={handleUpload} />
        <Sketch image={image} />
      </div>
    </>
  );
}

export default App;
