import { useState } from "react";
import ErrorMessage from "./common/ErrorMessage";
import Gameboy from "./components/Gameboy";
import { defaultImage } from "./config/config";
import { ErrorProvider } from "./contexts/ErrorContext";
import "./styles/less/index.less";

const App: React.FC = () => {
  const [showGameboy, setShowGameboy] = useState(false);

  return (
    <>
      <ErrorProvider>
        {!showGameboy ? (
          <button
            type="button"
            className="title-btn"
            onClick={() => setShowGameboy(true)}
          >
            <span className="title-text">RePixelAct</span>
          </button>
        ) : (
          <Gameboy imageSrc={defaultImage} />
        )}
        <ErrorMessage />
      </ErrorProvider>
    </>
  );
};

export default App;
