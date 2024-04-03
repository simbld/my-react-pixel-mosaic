import { useState } from "react";
import ErrorMessage from "./common/ErrorMessage";
import Gameboy from "./components/Gameboy";
import { defaultImage } from "./config/config";
import { ErrorProvider } from "./contexts/ErrorContext";
import Button from "./common/Button";
import "./styles/less/index.less";

const App: React.FC = () => {
  const [showGameboy, setShowGameboy] = useState(false);

  return (
    <>
      <ErrorProvider>
        {!showGameboy ? (
          <Button
            type="button"
            className="title-btn"
            text="HACK & PAST"
            onClick={() => setShowGameboy(true)}
          />
        ) : (
          <Gameboy imageSrc={defaultImage} />
        )}
        <ErrorMessage />
      </ErrorProvider>
    </>
  );
};

export default App;
