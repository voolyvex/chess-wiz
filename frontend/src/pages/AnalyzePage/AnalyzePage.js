import SavePgnToDatabase from "../../components/SavePgnToDatabase/SavePgnToDatabase";
import "../PlayPage/Play.css";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import useAuth from "../../hooks/useAuth";

function AnalyzePage() {
  const [game, setGame] = useState(new Chess());
  const [user] = useAuth();
 
  // Perform a function on the game state

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
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
    return true;
  }

  var date = new Date().toLocaleDateString();

  return (
    <div className="play-page">
      <div className="play-container">
        <div className="play">
          <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
      </div>
      <div className="save-container">
        <SavePgnToDatabase
          headers={game.header(
            "Event",
            "",
            "Site",
            "",
            "Date",
            "",
            "Round",
            "",
            "White",
            "",
            "Black",
            "",
            "Result",
            "",
            "WhiteElo",
            "",
            "BlackElo",
            "",
            "ECO",
            "",
            "Archived",
            date
          )}
          pgn={game.pgn({ maxWidth: 5, newline: "<br />" })}
        />
      </div>
    </div>
  );
}

export default AnalyzePage;
