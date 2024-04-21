import { useState } from "react";
import { defaultImage } from "./config/config";
import { ErrorProvider } from "./contexts/ErrorContext";
import ErrorMessage from "./common/ErrorMessage";
import Gameboy from "./components/Gameboy";
import MenuGameboy from "./components/MenuGameboy";
import Button from "./common/Button";
import Loader from "./common/Loader";
import "./styles/less/index.less";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showGameboy, setShowGameboy] = useState(false);
  const [showMenuGameboy, setShowMenuGameboy] = useState(false);

  // Define the actions for each menu option
  const handleUploadImage = () => {
    // Define what should happen when "upload my image" is clicked
  };

  const handleChooseFilter = () => {
    // Define what should happen when "choose my filter" is clicked
  };

  const handleDisplayOptions = () => {
    // Define what should happen when "display options" is clicked
  };

  const handleDownloadImage = () => {
    // Define what should happen when "download my filtered image" is clicked
  };

  const handleGameboyAnimationEnd = () => {
    setShowMenuGameboy(true);
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowGameboy(true);
    }, 1000);
  };

  return (
    <ErrorProvider>
      <div className="App">
        {showGameboy ? (
          <Gameboy
            imageSrc={defaultImage}
            onGameboyHome={handleGameboyAnimationEnd}
          />
        ) : loading ? (
          <Loader />
        ) : (
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
