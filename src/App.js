import React, {useEffect, useState} from "react";

import {loadModels} from "./helpers/faceApi";

import Camera from "./components/Camera/Camera";

import "./App.css";

function App() {
  const [mode, setMode] = useState(true); //true = photo mode; false = video mode
  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>
          Chorlton C of E Primary School <span>STEM Face Detector</span>
        </h1>
        <div className="App__switcher">
          {mode ? "Photo" : "Video"} Mode
          <span onClick={() => setMode(!mode)}>Switch</span>
        </div>
      </header>
      <Camera photoMode={mode} />
    </div>
  );
}

export default App;
