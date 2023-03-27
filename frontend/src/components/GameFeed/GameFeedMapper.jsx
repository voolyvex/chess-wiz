import React from 'react';
import GameFeedPresenter from './GameFeedPresenter';
import GameCardMaker from './GameCardMaker';



const GameFeedMapper = ({ games }) => {
  const gameFeed = games.map((game) => (
    <GameCardMaker
      key={game.id}
      id={game.id}
      pgnText={game.pgn}
      playerWhite={game.white_name}
      playerBlack={game.black_name}
      eloWhite={game.white_rating}
      eloBlack={game.black_rating}
      date={game.date}
      eco={game.eco}
      moves={game.moves}
    />
  ));

  return <GameFeedPresenter gameFeed={gameFeed} />;
};

export default GameFeedMapper;