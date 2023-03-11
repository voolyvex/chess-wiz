import React from 'react';
import { Link } from 'react-router-dom';
import './gamefeed.css';

const GameCardMaker = ({ id, pgnText }) => {
  // format the raw PGN data
  let rawText = pgnText.replace(/\r\n/g, '\n');
  let splitGame = rawText.split('\n\n');
  let gameHeaders = splitGame.filter((item, i) => i % 2 === 0);
  let gameMoves = splitGame.filter((item, i) => i % 2 !== 0);
  let gameMovesStr = JSON.stringify(gameMoves);
  let gameMovesNoQuotes = gameMovesStr.replace(/"/g, '').replace('[', '').replace(']', '');
  let gameMovesPreview = gameMovesNoQuotes.slice(0, 40);

  // create game card to be rendered
  return (
    <Link key={id} to={`/pgnloader/${id}`}>
      <div className='game-card'>
        <p id='gheader'>{gameHeaders}</p>
        <p id='gmoves'>{gameMovesPreview}</p>
      </div>
    </Link>
  );
};

export default GameCardMaker;
