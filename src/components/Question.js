import React from "react";

export default function Question(props) {
  const { question, answers, questionId, correctAnswerId, selectedAnswerId, setQuestions } = props.items;

  function selectAnswer(answerId) {
    setQuestions(prevQuestionsArr => {
      return prevQuestionsArr.map(quest => {
        if (quest.questionId === questionId) {
          return {
            ...quest,
            selectedAnswerId: answerId,
          };
        } else {
          return quest;
        }
      })
    });
  }

  const answerStyles = answerIndex => {
    if (answerIndex === selectedAnswerId) {
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
        {answers.map((answer, i) => <span key={i} onClick={() => selectAnswer(i)} style={answerStyles(i)} className="answer">{answer}</span>)}
      </div>
      <hr />
    </div>
  )
}