import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import "./globals.css";
import { createContext, useState } from "react";

export const AppContext = createContext<any>(null);

const App = () => {
  const [initialText, setInitialText] = useState("");
  const [initialName, setInitialName] = useState("");
  const [id, setId] = useState("");
  return (
    <AppContext.Provider
      value={{
        initialName,
        setInitialName,
        initialText,
        setInitialText,
        id,
        setId,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
