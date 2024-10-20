import React from "react";
import "./styles/globalStyles.scss";
import Nav from "./components/Nav";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
    </div>
  );
}

export default App;
