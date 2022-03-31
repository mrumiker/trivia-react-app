import React from "react";
import './App.css';
import TitlePage from './components/TitlePage';
import TriviaGame from "./components/TriviaGame";

export default function App() {
  const [play, setPlay] = React.useState(false);

  return (
    <div className="App">
      {play ?
        <TriviaGame /> :
        <TitlePage handleClick={() => setPlay(true)} />}
    </div>
  );
}
