import React from "react";
import './App.css';
import TitlePage from './components/TitlePage';
import TriviaGame from "./components/TriviaGame";

export default function App() {
  const [play, setPlay] = React.useState(false);

  function toggleView() {
    setPlay(prevPlay => !prevPlay)
  }

  return (
    <div className="App">
      {play ?
        <TriviaGame handleClick={toggleView} /> :
        <TitlePage handleClick={toggleView} />}
    </div>
  );
}
