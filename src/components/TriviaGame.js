import React from "react";

export default function TriviaGame(props) {

  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    getNewQuestions();
  }, []);

  function getNewQuestions() {
    fetch(`https://opentdb.com/api.php?amount=5&category=12&difficulty=${props.level}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        const questionArr = data.results;
        const questionData = questionArr.map(entry => {
          const question = fixText(entry.question);
          const correctAnswer = fixText(entry.correct_answer);
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

  const fixText = text => text.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  const questionsArr = questions.length ?
    questions.map((questionData, i) => (
      <div key={i}>
        <h2>{questionData.question}</h2>
        <p>Answers: {questionData.answers.map((answer, j) => <span key={j}>{answer}</span>)}</p>
        <hr />
      </div>
    )) :
    [];

  return (
    questions.length ?
      <div>
        <h1>Your Questions</h1>
        <hr />
        {questionsArr}
        <button className="game--start-button" onClick={props.handleClick}>Go Back</button>
      </div> :
      <div className="loading-container">
        <h1 className="loading-message">Loading Your Questions...</h1>
      </div>
  )
}