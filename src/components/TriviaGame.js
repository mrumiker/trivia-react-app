import React from "react";

export default function TriviaGame(props) {
  return (
    <div>
      <h1>GAME</h1>
      <button className="game--start-button" onClick={props.handleClick}>Go Back</button>
    </div>
  )
}