import React from "react";

export default function TriviaGame(props) {

  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
      .catch(err => console.error(err));
  }, []);

  console.log("Questions =", questions);

  const questionsArr = questions.length ?
    questions.map((questionData, i) => (
      <div key={i}>
        <h2>{questionData.question}</h2>
        <p>Answer: {questionData.correct_answer}</p>
        <hr />
      </div>
    )) :
    [];

  return (
    <div>
      <h1>Your Questions</h1>
      <hr />
      {questionsArr}
      <button className="game--start-button" onClick={props.handleClick}>Go Back</button>
    </div>
  )
}