import React from "react";
import Sketch from "./components/Sketch";
import "./styles/App.css";
import "./assets/profil.png";

function App() {
  return (
    <>
      <div className="title">PixelMosaic</div>
      <div>
        <Sketch />
      </div>
    </>
  );
}

export default App;
