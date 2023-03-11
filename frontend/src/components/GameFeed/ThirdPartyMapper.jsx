import React from 'react';



const ThirdPartyMapper = ({ games }) => {

// Return the feed of Chess.com search results

    return (
        <div className="game-feed">
            {games && games.map((game) => (
                <div className="game-card" key={game.url}>
                    <p>{game.white.username} vs. {game.black.username}</p>
                    <p>{game.end_time}</p>
                    <p>{game.result}</p>
                </div>
            ))}
        </div>
    );
};

export default ThirdPartyMapper;