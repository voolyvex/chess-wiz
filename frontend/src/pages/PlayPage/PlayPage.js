import "./Play.css";
import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import useAuth from "../../hooks/useAuth";
import SavePgnToDatabase from "../../components/SavePgnToDatabase/SavePgnToDatabase";

function Play() {
  const [game, setGame] = useState(new Chess());
  const [user] = useAuth();

  useEffect(() => {
    if (!user?.username) return;
    setGame((g) => {
      const update = new Chess(g.fen());
      update.header(
        "White",
        user.username,
        "Black",
        "AI (Level 0)",
        "Date",
        new Date().toISOString().slice(0, 10),
      );
      return update;
    });
  }, [user?.username]);

  function onDrop(source, target) {
    let move = null;
    setGame((g) => {
      const update = new Chess(g.fen());
      move = update.move({
        from: source,
        to: target,
        promotion: "q",
      });
      if (move == null) return g;

      setTimeout(() => {
        setGame((current) => {
          if (current.game_over() || current.in_draw()) return current;
          const possibleMoves = current.moves();
          if (possibleMoves.length === 0) return current;
          const aiMove = new Chess(current.fen());
          aiMove.move(
            possibleMoves[Math.floor(Math.random() * possibleMoves.length)],
          );
          return aiMove;
        });
      }, 200);

      return update;
    });
    return move != null;
  }

  return (
    <div className="play-page">
      <div className="play-container">
        <div className="play">
          <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
      </div>
      <div className="save-container">
        <SavePgnToDatabase pgn={game.pgn()} />
      </div>
    </div>
  );
}

export default Play;
