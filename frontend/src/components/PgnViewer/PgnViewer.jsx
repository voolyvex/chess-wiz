import React, { useLayoutEffect } from 'react'
import Children from 'react-children-utilities'
import * as uuid from 'uuid'
import { pgnView } from '@mliebelt/pgn-viewer'
import '../../pages/HomePage/Home.css'

function PGNViewer(props) {
  const gameDecription = Children.onlyText(props.children)
  const id = 'board-' + uuid.v4()

  useLayoutEffect(() => {
    pgnView(id,
      {
        pgn: gameDecription,
        position: 'start', showCoords: true, orientation: 'white', theme: 'green', pieceStyle: 'merida', showResult: true, locale: 'en', timerTime: '', boardSize: '564px', layout: 'top', movesHeight: '180px', movesWidth: '500px', showFen: false, coordsInner: false, headers: true, coordsFactor: '1', coordsFontSize: '14', colorMarker: 'any', startPlay: '1', hideMovesBefore: false, notation: 'short', notationLayout: 'inline',
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