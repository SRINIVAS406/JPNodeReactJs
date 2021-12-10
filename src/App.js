import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

let name = "Srinivas";
function App() {
  const [mode, setMode] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <Router>
      <Navbar
        title="TextUtils"
        mode={mode}
        aboutText="About"
        toggleMode={toggleMode}
      ></Navbar>
      <div className="container">
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <TextForm heading="Enter the text toa analyse."></TextForm>
          </Route>
        </Switch>

        <About></About>
      </div>
    </Router>
  );
}

export default App;
