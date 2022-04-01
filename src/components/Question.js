import React from "react";

export default function Question(props) {
  const { question, answers, questionId, correctAnswerId, selectedAnswerId, selectAnswer } = props.items;

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
      <h2>{question}</h2>
      <div className="answers-container">
        {answers.map((answer, answerId) => <span key={answerId} onClick={() => selectAnswer(questionId, answerId)} style={answerStyles(answerId)} className="answer">{answer}</span>)}
      </div>
      <hr />
    </div>
  )
}