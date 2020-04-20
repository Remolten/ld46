import React, {useEffect} from "react";
import Game, {parent} from "./Game";

const App = () => {
  useEffect(() => {
    new Game();
  }, []);

  return (
    <div id={parent}/>
  );
};

export default App;
