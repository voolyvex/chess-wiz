import React, {useLayoutEffect} from 'react'
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
        timerTime: '1',
        locale: 'en',
        startPlay: 1,
        showResult: true,
        boardSize: '564',
        showFen: true,
        pieceStyle: 'merida'
      }
    )
  })

  return (
    <div className="board-container" id={id}></div>
  )
}

// Usage



export default PGNViewer;