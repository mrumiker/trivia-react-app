import React from "react";

export default function Question(props) {
  const { items, selectAnswer, gameComplete } = props;
  const { questionText, answers, questionId, selectedAnswerId } = items;

  const answerStyles = answerId => {
    if (answerId === selectedAnswerId) {
      return { // styles for selected answer
        border: "2px solid #d6dbf5",
        backgroundColor: "#d6dbf5",
        cursor: gameComplete ? "not-allowed" : "pointer",
      }
    }
    return {
      border: "2px solid #4d5b9e",
      cursor: gameComplete ? "not-allowed" : "pointer",
    }
  }

  return (
    <div>
      <h2 className="game--question">{questionText}</h2>
      <div className="answers-container">
        {answers.map((answerText, answerId) => <span key={answerId} onClick={gameComplete ? null : () => selectAnswer(questionId, answerId)} style={answerStyles(answerId)} className="answer">{answerText}</span>)}
      </div>
      <hr />
    </div>
  )
}