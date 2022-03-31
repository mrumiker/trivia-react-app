import React from "react";

export default function Question(props) {
  const { question, answers, correctAnswer } = props.items;
  return (
    <div>
      <h2>{question}</h2>
      <div className="answers-container">
        {answers.map((answer, i) => <span key={i} className="answer">{answer}</span>)}
      </div>
      <hr />
    </div>
  )
}