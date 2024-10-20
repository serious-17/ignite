import React from "react";
import "./styles/globalStyles.scss";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="App">
      <AnimatePresence>
        <Nav />
        <Home />
      </AnimatePresence>
    </div>
  );
}

export default App;
