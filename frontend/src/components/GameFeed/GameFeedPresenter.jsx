import React from 'react';
import './gamefeed.css';

const GameFeedPresenter = ({ gameFeed }) => {
  return <div className='game-card-container'>{gameFeed}</div>;
};

export default GameFeedPresenter;