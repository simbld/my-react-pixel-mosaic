import { useState } from "react";
import { defaultImage } from "./config/config";
import { ErrorProvider } from "./contexts/ErrorContext";
import ErrorMessage from "./features/common/ErrorMessage";
import Gameboy from "./features/components/Gameboy";
import MenuGameboy from "./features/components/MenuGameboy";
import Button from "./features/common/Button";
import Loader from "./features/common/Loader";
import "./styles/less/index.less";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showGameboy, setShowGameboy] = useState(false);
  const [showMenuGameboy, setShowMenuGameboy] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setShowGameboy(true);
      setLoading(false);
    });
  };

  const handleGameboyAnimationEnd = () => {
    setLoading(false);
    setShowMenuGameboy(true);
  };

  return (
    <ErrorProvider>
      <div className="App">
        {loading && <Loader />}
        {showGameboy && (
          <Gameboy
            imageSrc={defaultImage}
            onGameboyHome={handleGameboyAnimationEnd}
          />
        )}
        {!showGameboy && (
          <Button
            text="HACK & PAST"
            onClick={handleClick}
            fill="url(#text-gradient)"
            filter="url(#text-filter)"
          />
        )}
        <ErrorMessage />
      </div>
    </ErrorProvider>
  );
};

export default App;
