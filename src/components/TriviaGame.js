import React from "react";
import Question from "./Question";
import Confetti from "react-confetti";

export default function TriviaGame(props) {

  const [questions, setQuestions] = React.useState([]);
  const [gameOver, setGameOver] = React.useState(false);

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
          }
        });
        setQuestions(questionData);
        if (gameOver) setGameOver(false);
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

  const gameTitle = level => {
    switch (level) {
      case "easy":
        return "Easy Listening 🎷";
      case "medium":
        return "Midtempo 🥁";
      default:
        return "🎸🔊🚨 Up To 11! 🚨🔊🎸";
    }
  }

  const fixText = text => text.replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&ndash;/g, "-").replace(/&divide;/g, "÷").replace(/&micro;/g, "µ").replace(/&ntilde;/g, "ñ").replace(/&eacute;/g, "é").replace(/&aacute;/g, "á");

  const allAnswersChosen = questions.every(question => question.selectedAnswerId !== -1);

  const checkAnswersButtonStyles = {
    opacity: allAnswersChosen ? 1 : 0.5,
    cursor: allAnswersChosen ? "pointer" : "not-allowed",
  };

  const endGame = () => setGameOver(true);

  const correctAnswers = questions.filter(question => question.selectedAnswerId === question.correctAnswerId);

  return (
    questions.length ?
      <div>
        {gameOver && correctAnswers.length === 5 && <Confetti />}
        <h1 className="game--title">{gameTitle(props.level)}</h1>
        <hr />
        {questions.map(question => <Question key={question.questionId} items={question} selectAnswer={selectAnswer} gameOver={gameOver} />)}
        <div className="game--button-container">
          <button className="game--end-button" onClick={props.handleClick}>Go Back</button>
          {gameOver && <h3 className="game--final-score">{`You Scored ${correctAnswers.length}/5 Correct Answers`}</h3>}
          {gameOver ?
            <button className="game--end-button" onClick={getNewQuestions}>Play Again</button>
            :
            <button className="game--end-button" onClick={allAnswersChosen ? endGame : null} style={checkAnswersButtonStyles}>Check Answers</button>}
        </div>
      </div>
      :
      <div className="loading-container">
        <h1 className="loading-message">Loading Your Questions...</h1>
      </div>
  )
}