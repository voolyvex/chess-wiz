import "../PlayPage/Play.css";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import useAuth from "../../hooks/useAuth";
import SavePgnToDatabase from "../../components/SavePgnToDatabase/SavePgnToDatabase";

function Analyze() {
  const [game, setGame] = useState(new Chess());
  const [user] = useAuth();
  //Let's perform a function on the game state

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }
//   Movement of computer
  function makeRandomMove() {
    const possibleMove = game.moves();

    //exit if the game is over

    if (game.game_over() || game.in_draw() || possibleMove.length === 0) {
      
      return;
    }
    //select random move

    const randomIndex = Math.floor(Math.random() * possibleMove.length);
    //play random move
    safeGameMutate((game) => {
      game.move(possibleMove[randomIndex]);
    });
  }

//   Perform an action when a piece is droped by a user

  function onDrop(source, target) {
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion: "q",
      });
    });
    //illegal move
    if (move == null) return false;
    //valid move
    setTimeout(makeRandomMove, 200);
    return true;
  }
  var date=Date()
  game.header('White', user.username, 'Black', 'AI (Level 0)', 'Date', date);
  
  return (
    <div className="play-page">
      <div className="play-container">
        <div className="play">
          <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
      </div>
      <div className="save-container">
      <SavePgnToDatabase pgn={game.pgn({ maxWidth: 5, newline: '<br />' })}/>
      </div>
    </div>
  );
}

export default Analyze;
