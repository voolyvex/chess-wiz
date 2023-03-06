import SavePgnToDatabase from "../../components/SavePgnToDatabase/SavePgnToDatabase";
import "../PlayPage/Play.css";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function AnalyzePage() {
  const [game, setGame] = useState(new Chess());
  //   const [headers, setHeaders] = useState(["Event", "", "Site", "", "Date", "", "Round", "", "White", "", "Black", "", "Result", "", "WhiteElo", "", "BlackElo", "", "ECO", "", "Archived", date])
  //Let's perform a function on the game state

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

  //   This is the STR (Seven Tag Roster).  The interpretation of these tags is
  // fixed as is the order in which they appear.  Although the definition and use of
  // additional tag names and semantics is permitted and encouraged when needed, the
  // STR is the common ground that all programs should follow for public data
  // interchange.
  // 1) Event (the name of the tournament or match event)
  // 2) Site (the location of the event)
  // 3) Date (the starting date of the game)
  // 4) Round (the playing round ordinal of the game)
  // 5) White (the player of the white pieces)
  // 6) Black (the player of the black pieces)
  // 7) Result (the result of the game)

//   game.header(
//     "Event",
//     "",
//     "Site",
//     "",
//     "Date",
//     "",
//     "Round",
//     "",
//     "White",
//     "",
//     "Black",
//     "",
//     "Result",
//     "",
//     "WhiteElo",
//     "",
//     "BlackElo",
//     "",
//     "ECO",
//     "",
//     "Archived",
//     date,
//   );
  
  return (
    <div className="play-page">
      <div className="play-container">
        <div className="play">
          <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
      </div>
      <div className="save-container">
        <SavePgnToDatabase
          headers={game.header("Event",
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
          date)}
          pgn={game.pgn({ maxWidth: 5, newline: "<br />" })}
        />
      </div>
    </div>
  );
}

export default AnalyzePage;
