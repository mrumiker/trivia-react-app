import React from "react";

export default function Question(props) {
  const { question, questionId, answers, correctAnswer, selectedAnswer, setQuestions } = props.items;

  function selectAnswer(answerId) {
    setQuestions(prevQuestionsArr => {
      return prevQuestionsArr.map(quest => {
        if (quest.questionId === questionId) {
          return {
            ...quest,
            selectedAnswer: quest.answers[answerId],
          };
        } else {
          return quest;
        }
      })
    });
  }

  const selectedStyles = {
    border: "2px solid #d6dbf5",
    backgroundColor: "#d6dbf5",
  }

  const unSelectedStyles = {
    border: "2px solid #4d5b9e"
  }

  return (
    <div>
      <h2>{question}</h2>
      <div className="answers-container">
        {answers.map((answer, i) => <span key={i} onClick={() => selectAnswer(i)} style={answer === selectedAnswer ? selectedStyles : unSelectedStyles} className="answer">{answer}</span>)}
      </div>
      <hr />
    </div>
  )
}