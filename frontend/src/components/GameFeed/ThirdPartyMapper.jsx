import React from 'react';
import '../../components/GameFeed/gamefeed.css'
import { Link } from 'react-router-dom';



const ThirdPartyMapper = ({ games }) => {

    // Return the feed of Chess.com search results

    return (
        <div className="s-game-card-container">
            {games && games

                .map((game) => (

                    <Link className='s-link' to={`/${game.uuid}`} replace="true" key={game.url} state={{ game: game }}>
                        <div className="s-game-card-searchfeed">
                            <div className='table-label-container'>
                                <div className='table-div'>
                                    <table>
                                        <tr className='left-col'>
                                            <td className='cell-text-p-search'>White
                                                <h4 className='cell-val-p-search'>{game.white.username}</h4>
                                            </td>
                                            <td className='cell-text-r-search'>Rating
                                                <h4 className='cell-val-r-search'>{game.white.rating}</h4>
                                            </td>
                                        </tr>
                                        <tr className='vs-container'>
                                            <h4 className='vs' colSpan={2}>vs</h4>
                                        </tr>
                                        <tr className='left-col'>
                                            <td className='cell-text-p-search'>Black
                                                <h4 className='cell-val-p-search'>{game.black.username}</h4>
                                            </td>
                                            <td className='cell-text-r-search'>Rating
                                                <h4 className='cell-val-r-search'>{game.black.rating}</h4>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className='label-div'>
                                    <label>View Game</label>
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default ThirdPartyMapper;