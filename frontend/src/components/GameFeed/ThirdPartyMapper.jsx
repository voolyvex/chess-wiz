import React from 'react';
import '../../components/GameFeed/gamefeed.css'
import { Link } from 'react-router-dom';



const ThirdPartyMapper = ({ games, username, year, month }) => {
    
// Return the feed of Chess.com search results

    return (
        <div className="s-game-feed">
            {games && games
            
            .map((game) => (
              
                <Link to={`/${game.uuid}`} replace="true" key={game.url} state={{game: game}}>
                    <div className="s-game-card">
                        
                        <p>{game.white.username}</p>
                        <p>vs.</p>
                        <p>{game.black.username}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ThirdPartyMapper;