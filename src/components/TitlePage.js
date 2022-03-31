import React from "react";

export default function TitlePage(props) {
  return (<div className="title-page-container">
    <h1 className='game--title'>Quizzical</h1>
    <h2 className='game--subtitle'>Music Edition</h2>
    <button className='game--start-button' onClick={props.handleClick}>Test Your Tunes</button>
  </div>);
}