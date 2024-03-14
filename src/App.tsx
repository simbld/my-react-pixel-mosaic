import ErrorMessage from "./common/ErrorMessage";
import { ErrorProvider } from "./contexts/ErrorContext";
import MainLayout from "./layouts/MainLayout";

const App: React.FC = () => {
  return (
    <>
      <ErrorProvider>
        <h1>RePixelAct</h1>
        <MainLayout />
        <ErrorMessage />
      </ErrorProvider>
    </>
  );
};

export default App;
