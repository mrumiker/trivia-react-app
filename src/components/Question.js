import React from "react";

export default function Question(props) {
  const { question, answers, correctAnswer } = props.items;
  return (
    <div>
      <h2>{question}</h2>
      <p>Answers: {answers.map((answer, i) => <span key={i}>{answer}</span>)}</p>
      <hr />
    </div>
  )
}