import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './gamefeed.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";


const GameCardMaker = ({ id, pgnText, playerWhite, playerBlack, eloWhite, eloBlack, date, eco, moves }) => {
  const [user] = useAuth();
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
    event.stopPropagation();
    patchPGN(id);
  };

 
  // create game card to be rendered
  return (
    <Link key={id} to={`/${id}`} className="link" replace="true">
      
        <div className="s-game-card">
          <hr></hr>
          <div className='table-div'>
            <table>
              <tr>
                <td className='cell-text'>White:
                  <th>{playerWhite}</th>
                </td>
                <td className='cell-text'>Rating:
                  <th>{eloWhite}</th>
                </td>

                <td className='cell-text'>Date:
                  <th>{date}</th>
                </td>
                <td className='cell-text'>ECO Code:
                  <th>{eco}</th>
                </td>
              </tr>
              <tr className='vs'>
                <th colSpan={3}>vs</th>
              </tr>
              <tr>
                <td className='cell-text'>Black:
                  <th>{playerBlack}</th>
                </td>
                <td className='cell-text'>Rating:
                  <th>{eloBlack}</th>
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
              {moves ? <p id='gmoves'>{moves}</p> : <p id='gmoves'>move list is empty</p>}
            </div>
          </div>
          <hr></hr>
        </div>
      
    </Link>
  );
};

export default GameCardMaker;
