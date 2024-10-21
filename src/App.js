import React from "react";
import "./styles/globalStyles.scss";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import GameDetails from "./pages/GameDetails";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="App">
      <Nav />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/game/:id" Component={GameDetails} />
          <Route path="/game/:id" Component={AnimatePresence} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
