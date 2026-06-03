import React, { useLayoutEffect, useState } from 'react'
import Children from 'react-children-utilities'
import * as uuid from 'uuid'
import { pgnView } from '@mliebelt/pgn-viewer'
import { normalizePgn } from '../../utils/normalizePgn'
import '../../pages/HomePage/Home.css'

function PGNViewer(props) {
  const gameDecription = normalizePgn(Children.onlyText(props.children))
  const [boardId] = useState(() => 'board-' + uuid.v4())

  useLayoutEffect(() => {
    if (!gameDecription) return

    const container = document.getElementById(boardId)
    if (container) {
      container.innerHTML = ''
    }

    pgnView(boardId,
      {
        pgn: gameDecription,
        lazyLoad: true,
        theme: 'brown',
        width: '600',
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
        colorMarker:  'square',
        hideMovesBefore: false,
        notation: 'short',
        notationLayout: 'inline',
        movable: { free: false }, // no documentation
        highlight: { lastMove: false }, // no documentation
        viewOnly: true, // no documentation
        resizable: false,
        manyGames: false,
      }
    )
  }, [boardId, gameDecription])

  if (!gameDecription) {
    return null
  }

  return (
    <div id='board-matte'>
      <div className="board-container" id={boardId}></div>
    </div>
  )
}

export default PGNViewer;