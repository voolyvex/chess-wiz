import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './gamefeed.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const GameCardMaker = ({ id, pgnText }) => {

  const [fav, setFav] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFav((favState) => !favState);

  }


  // format the raw PGN data
  let rawText = pgnText.replace(/\r\n/g, '\n');
  let splitGame = rawText.split('\n\n');
  let gameHeaders = splitGame.filter((item, i) => i % 2 === 0);
  let gameMoves = splitGame.filter((item, i) => i % 2 !== 0);
  let gameMovesStr = JSON.stringify(gameMoves);
  let gameMovesNoQuotes = gameMovesStr.replace(/"/g, '').replace('[', '').replace(']', '');
  let gameMovesPreview = gameMovesNoQuotes.slice(0, 40);
  const regex = /\[(\w+)\s+"([^"]+)"\]/g;
  const formattedHeaders = gameHeaders.map(header => header.replace(regex, '$1: $2\n')).join('');

  // create game card to be rendered
  return (
    <Link key={id} to={`/${id}`} className="link" replace="true">
      <div className='game-card'>
        <p id='gheader'>{formattedHeaders}</p>
        <div className='heart-moves'>
          <button id='heart-icon' onClick={handleClick}>
            {fav ? <FaHeart/> : <FaRegHeart/>}
          </button>
          <p id='gmoves'>{gameMovesPreview}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCardMaker;
