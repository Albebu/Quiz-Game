import { useState } from "react";
import LandingPage from "./components/LandingPage";
import MainGame from "./components/MainGame";

const App = () => {
  const [name, setName] = useState("");

  const isPlaying = () => {
    if (name !== "") {
      return (
        <MainGame name={name}/>
      ); 
    } else {
      return <LandingPage setName={setName} name={name}/>;
    } 
  };

  return (
    <div>
      {isPlaying()}
    </div>
  );
};

export default App;
