import { useState } from "react"; // Assurez-vous d'importer React en TypeScript
import Sketch from "./components/Sketch";

function App() {
  const [image, setImage] = useState<string>();

  return (
    <>
      <h1>PixelMosaic</h1>
      <div>
        <Sketch image={image} />
      </div>
    </>
  );
}

export default App;
