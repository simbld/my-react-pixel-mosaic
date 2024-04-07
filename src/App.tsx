import { useState } from "react";
import ErrorMessage from "./common/ErrorMessage";
import Gameboy from "./components/Gameboy";
import { defaultImage } from "./config/config";
import { ErrorProvider } from "./contexts/ErrorContext";
import Button from "./common/Button";
import "./styles/less/index.less";
import Loader from "./common/Loader";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showGameboy, setShowGameboy] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowGameboy(true);
    }, 300);
  };

  return (
    <ErrorProvider>
      <div className="App">
        {!showGameboy ? (
          <>
            {loading ? (
              <Loader />
            ) : (
              <Button text="HACK & PAST" onClick={handleClick} />
            )}
          </>
        ) : (
          <Gameboy imageSrc={defaultImage} />
        )}
        <ErrorMessage />
      </div>
    </ErrorProvider>
  );
};

export default App;
