import React from "react";
// import mockData from "../mockData.json";

export default function TriviaGame(props) {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  return (
    <div>
      <h1>GAME</h1>
      <button className="game--start-button" onClick={props.handleClick}>Go Back</button>

      {JSON.stringify(questions)}
    </div>

  )
}