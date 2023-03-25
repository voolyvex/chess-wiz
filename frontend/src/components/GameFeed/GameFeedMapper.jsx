import React from 'react';
import GameFeedPresenter from './GameFeedPresenter';
import GameCardMaker from './GameCardMaker';

const GameFeedMapper = ({ games }) => {
  const gameFeed = games.map((game) => (
    <GameCardMaker key={game.id} id={game.id} pgnText={game.pgn} isFavorite={game.is_favorite}/>
  ));

  return <GameFeedPresenter gameFeed={gameFeed} />;
};

export default GameFeedMapper;