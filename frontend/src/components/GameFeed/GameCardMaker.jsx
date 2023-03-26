import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './gamefeed.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';


const GameCardMaker = ({ id, pgnText }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function getPGNbyID(id) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pgn/${id}/`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
        setIsFavorite(response.data.favorited_dict.users.includes(response.data.current_user.username));
      } catch (error) {
        console.log(error.message)
      }
    }
    getPGNbyID(id);
  }, [id]);

  async function patchPGN(pgnId) {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/pgn/favorites/${pgnId}/`, {}, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
      setIsFavorite(response.data.pgn.is_favorite);
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    patchPGN(id);
  };

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
          <div className='button-container'>
            <button type='button' id='heart-icon' onClick={handleClick}>
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div className='gmoves-container'>
            <p id='gmoves'>{gameMovesPreview}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCardMaker;
