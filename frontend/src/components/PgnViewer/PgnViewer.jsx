import React, { useLayoutEffect } from 'react'
import Children from 'react-children-utilities'
import * as uuid from 'uuid'
import { pgnView } from '@mliebelt/pgn-viewer'
import { eco } from 'chess-eco-codes'
import '../../pages/HomePage/Home.css'

function PGNViewer(props) {
  const gameDecription = Children.onlyText(props.children)
  const id = 'board-' + uuid.v4()

  // const data = eco('rnbqkbnr/pppppppp/8/8/6P1/8/PPPPPP1P/RNBQKBNR b KQkq g3 0 1');
  // console.log(data);

  useLayoutEffect(() => {
    pgnView(id,
      {
        pgn: gameDecription,
        lazyLoad: true,
        theme: 'brown',
        width: '580px',
        boardSize: '580px',
        position: 'start',
        showCoords: true,
        orientation: 'white',
        pieceStyle: 'alpha',
        showResult: true,
        locale: 'en',
        timerTime: '500',
        layout: 'top',
        movesHeight: '180px',
        movesWidth: '500px',
        showFen: false,
        headers: true,
        coordsInner: false,
        coordsFactor: '1',
        coordsFontSize: '10',
        colorMarker: 'circle',
        startPlay: '1',
        hideMovesBefore: false,
        notation: 'short',
        notationLayout: 'inline',
        movable: { free: false }, // no documentation
        highlight: { lastMove: true }, // no documentation
        viewOnly: true, // no documentation
        resizable: false,
        manyGames: false,
      }
    )
  })

  return (
    <div id='board-matte'>
      <div className="board-container" id={id}></div>

    </div>
  )
}


export default PGNViewer;