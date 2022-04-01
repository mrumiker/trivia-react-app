import React from "react";

export default function TitlePage(props) {
  return (<div className="title-page-container">
    <h1 className='game--title'>Quizzical</h1>
    <h2 className='game--subtitle'>Music Edition</h2>
    <div className="title--button-container">
      <button className='game--start-button easy' onClick={() => props.handleClick("easy")}>Easy Listening</button>
      <button className='game--start-button medium' onClick={() => props.handleClick("medium")}>Midtempo</button>
      <button className='game--start-button hard' onClick={() => props.handleClick("hard")}>Up to 11</button>
    </div>
  </div>);
}