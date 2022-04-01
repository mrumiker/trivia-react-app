import React from "react";

export default function Question(props) {
  const { questionText, answers, questionId, correctAnswerId, selectedAnswerId, selectAnswer } = props.items;

  const answerStyles = answerId => {
    if (answerId === selectedAnswerId) {
      return { // styles for selected answer
        border: "2px solid #d6dbf5",
        backgroundColor: "#d6dbf5",
      }
    }
    return {
      border: "2px solid #4d5b9e"
    }
  }

  return (
    <div>
      <h2>{questionText}</h2>
      <div className="answers-container">
        {answers.map((answerText, answerId) => <span key={answerId} onClick={() => selectAnswer(questionId, answerId)} style={answerStyles(answerId)} className="answer">{answerText}</span>)}
      </div>
      <hr />
    </div>
  )
}