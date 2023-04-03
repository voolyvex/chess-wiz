import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './gamefeed.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import { getAllFavorites } from '../Favorites/Favorites';
import useFetchFavorites from '../Favorites/useFetchFavorites';

const GameCardMaker = ({ id, playerWhite, playerBlack, eloWhite, eloBlack, date, eco, moves }) => {
  const {games,refetch} = useFetchFavorites()
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function getPGNbyID(id) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pgn/${id}/`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
        setIsFavorite(response.data.is_favorite);
      } catch (error) {
        console.log(error.message)
      }
    }
    getPGNbyID(id);
  }, [id]);

  async function patchPGN(pgnId) {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/pgn/favorites/${pgnId}/`, {}, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
      setIsFavorite(response.data.pgn_favorite.is_favorite);
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleClick = async (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    await patchPGN(id);
    await refetch()
  };

  // create game card to be rendered
  return (
    <Link key={id} to={`/${id}`} className="link" replace="true">
      <div className="s-game-card">
        <div className='table-div'>
          <table>
            <tr>
              <td className='cell-text-p'>White
                <h4 className='cell-val-p'>{playerWhite}</h4>
              </td>
              <td className='cell-text-r'>Rating
                <h4 className='cell-val-r'>{eloWhite}</h4>
              </td>
              <td className='cell-text-d'>Opening
                <h4 className='cell-val-d'>{eco}</h4>
              </td>
            </tr>
            <tr className='vs-container'>
              
              <th className='vs' colSpan={3}>vs</th>
              
            </tr>
            <tr>
              <td className='cell-text'>Black
                <h4 className='cell-val'>{playerBlack}</h4>
              </td>
              <td className='cell-text-r'>Rating
                <h4 className='cell-val-r'>{eloBlack}</h4>
              </td>
              <td className='cell-text-d'>Date
                <h4 className='cell-val-d'>{date}</h4>
              </td>
            </tr>
          </table>
        </div>
        <div className='heart-moves'>
          <div className='button-container'>
            <button id='heart-icon' onClick={handleClick}>
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div className='gmoves-container'>
            {moves ? <p id='gmoves'>{moves}</p> : <p id='gmoves'>move list unavailable</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCardMaker;
