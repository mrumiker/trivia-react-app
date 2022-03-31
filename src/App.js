import React from "react";
import './App.css';
import TitlePage from './components/TitlePage';
import TriviaGame from "./components/TriviaGame";

export default function App() {

  const [level, setLevel] = React.useState("");

  return (
    <div className="App">
      {level ?
        <TriviaGame handleClick={() => setLevel("")} level={level} /> :
        <TitlePage handleClick={setLevel} />}
    </div>
  );
}
