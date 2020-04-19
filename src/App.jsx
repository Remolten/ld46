import React, {useEffect} from "react";
import Phaser from "phaser";
import {parent, config} from "./config";

const App = () => {
  useEffect(() => {
    new Phaser.Game(config);
  }, []);

  return (
    <div id={parent}/>
  );
};

export default App;
