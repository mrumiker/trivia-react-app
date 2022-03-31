import React from "react";
import Question from "./Question";

export default function TriviaGame(props) {

  const [questions, setQuestions] = React.useState([]);

  React.useEffect(getNewQuestions, []);

  function getNewQuestions() {
    fetch(`https://opentdb.com/api.php?amount=5&category=12&difficulty=${props.level}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        const questionArr = data.results;
        const questionData = questionArr.map(entry => {
          const [question, correctAnswer] = [fixText(entry.question), fixText(entry.correct_answer)];
          const incorrectAnswers = entry.incorrect_answers.map(answer => fixText(answer));
          const tempAnswers = [correctAnswer, ...incorrectAnswers];
          const answers = [];
          while (tempAnswers.length) {
            const randomIndex = Math.floor(Math.random() * tempAnswers.length);
            answers.push(tempAnswers.splice(randomIndex, 1)[0]);
          }
          return {
            question,
            correctAnswer,
            answers,
          }
        });
        setQuestions(questionData);
      })
      .catch(err => console.error(err));
  }

  const fixText = text => text.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&");

  return (
    questions.length ?
      <div>
        <h1>Your Questions</h1>
        <hr />
        {questions.map((question, i) => <Question key={i} items={question} />)}
        <button className="game--start-button" onClick={props.handleClick}>Go Back</button>
      </div>
      :
      <div className="loading-container">
        <h1 className="loading-message">Loading Your Questions...</h1>
      </div>
  )
}