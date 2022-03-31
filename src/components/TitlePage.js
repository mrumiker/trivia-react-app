import React from "react";

export default function TitlePage(props) {
  return (<div className="title-page-container">
    <div className='game--title'>Quizzical: Music Edition</div>
    <div className='game--description'>Test Your Tunes</div>
    <button className='game--start-button' onClick={props.handleClick}>Start Quiz</button>
  </div>);
}