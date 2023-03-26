import React from 'react';
import '../../components/GameFeed/gamefeed.css'
import { Link } from 'react-router-dom';



const ThirdPartyMapper = ({ games, username, year, month }) => {

    // Return the feed of Chess.com search results

    return (
        <div className="s-game-feed">
            {games && games

                .map((game) => (

                    <Link className='s-link' to={`/${game.uuid}`} replace="true" key={game.url} state={{ game: game }}>
                        <div className="s-game-card">
                            <hr></hr>
                            <div className='table-label-container'>

                                <div className='table-div'>
                                    <table>
                                        <tr>
                                            <td className='cell-text'>White:
                                                <th>{game.white.username}</th>
                                            </td>
                                            <td className='cell-text'>Rating:
                                                <th>{game.white.rating}</th>
                                            </td>
                                        </tr>
                                        <tr className='vs'>
                                            <th colSpan={3}>vs</th>
                                        </tr>
                                        <tr>
                                            <td className='cell-text'>Black:
                                                <th>{game.black.username}</th>
                                            </td>
                                            <td className='cell-text'>Rating:
                                                <th>{game.black.rating}</th>
                                            </td>
                                        </tr>

                                    </table>

                                </div>
                                <div className='label-div'>

                                    <label>View Game</label>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default ThirdPartyMapper;