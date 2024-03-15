import ErrorMessage from "./common/ErrorMessage";
import Tablet from "./components/Tablet";
import { defaultImage } from "./config/config";
import { ErrorProvider } from "./contexts/ErrorContext";

const App: React.FC = () => {
  return (
    <>
      <ErrorProvider>
        <Tablet imageSrc={defaultImage} />
        <ErrorMessage />
      </ErrorProvider>
    </>
  );
};

export default App;
