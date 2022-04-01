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
        const questionData = questionArr.map((entry, index) => {
          const [questionText, correctAnswer] = [fixText(entry.question), fixText(entry.correct_answer)];
          const incorrectAnswers = entry.incorrect_answers.map(answer => fixText(answer));
          const tempAnswers = [correctAnswer, ...incorrectAnswers];
          const answers = [];
          while (tempAnswers.length) {
            const randomIndex = Math.floor(Math.random() * tempAnswers.length);
            answers.push(tempAnswers.splice(randomIndex, 1)[0]);
          }
          return {
            questionText,
            questionId: index,
            answers,
            correctAnswerId: answers.findIndex(answer => answer === correctAnswer),
            selectedAnswerId: -1,
            selectAnswer,
          }
        });
        setQuestions(questionData);
      })
      .catch(err => console.error(err));
  }

  function selectAnswer(questionId, answerId) {
    setQuestions(prevQuestionsArr => [
      ...prevQuestionsArr.slice(0, questionId),
      {
        ...prevQuestionsArr[questionId],
        selectedAnswerId: answerId,
      },
      ...prevQuestionsArr.slice(questionId + 1)
    ]);
  }

  const fixText = text => text.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&");

  const allAnswersChosen = questions.every(question => question.selectedAnswerId !== -1);

  return (
    questions.length ?
      <div>
        <h1>Your Questions</h1>
        <hr />
        {questions.map(question => <Question key={question.questionId} items={question} />)}
        <div className="game--button-container">
          <button className="game--start-button" onClick={props.handleClick}>Go Back</button>
          <button className="game--end-button" onClick={allAnswersChosen && props.handleClick} style={{ opacity: allAnswersChosen ? 1 : 0.5 }}>Check Answers</button>
        </div>
      </div>
      :
      <div className="loading-container">
        <h1 className="loading-message">Loading Your Questions...</h1>
      </div>
  )
}