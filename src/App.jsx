import { useContext } from "react";

import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import ThemeContext from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Footer from "./components/Footer/Footer";
function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <ToastProvider>
        <Navbar />
        <AppRoutes />
      </ToastProvider>
      <Footer />
    </div>
  );
}

export default App;