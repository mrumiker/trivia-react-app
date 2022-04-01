import React from "react";

export default function Question(props) {
  const { items, selectAnswer, gameOver } = props;
  const { questionText, answers, questionId, correctAnswerId, selectedAnswerId } = items;

  const answerStyles = answerId => {

    const isSelected = answerId === selectedAnswerId;
    const isCorrect = answerId === correctAnswerId;

    const styles = {
      border: "2px solid #4d5b9e",
      cursor: gameOver ? "not-allowed" : "pointer",
    };

    if (gameOver) {
      if (isCorrect) { //correct answer
        styles.border = "2px solid #94d7a2"
        styles.backgroundColor = "#94d7a2";
      } else {
        styles.opacity = 0.5;
        if (isSelected) { //wrong answer
          styles.border = "2px solid #f8bcbc"
          styles.backgroundColor = "#f8bcbc";
        }
      }
    } else if (isSelected) {
      styles.border = "2px solid #d6dbf5";
      styles.backgroundColor = "#d6dbf5";
    }

    return styles;
  }

  return (
    <div>
      <h2 className="game--question">{questionText}</h2>
      <div className="answers-container">
        {answers.map((answerText, answerId) => <span key={answerId} onClick={gameOver ? null : () => selectAnswer(questionId, answerId)} style={answerStyles(answerId)} className="answer">{answerText}</span>)}
      </div>
      <hr />
    </div>
  )
}