import React from 'react';
// import PGNViewer from './PgnViewer';

const PgnLoader = (props) => {
    return (
        <></>
        // <PGNViewer>
        //     [Result "1-0"] [White "Adolf Anderssen"] [Black "Dufresne"]1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 { This is the Evan's Gambit in the Giuco Piano, a violent opening leading to attacks that was popular in Anderssen's time. } 4...Bxb4 { Accepting gambits was a manly thing to do } 5.c3 Ba5 6.d4 { Gaining more time } 6...exd4 7.O-O d3 { Wasting time } 8.Qb3 { Threatening Bxf7 } 8...Qf6 9.e5 Qg6 { Black does not capture because he would open the e-file } 10.Re1! Nge7 11.Ba3 b5 { Trying to counterattack?! } 12.Qxb5 Rb8 13.Qa4 Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 { Note that the king is still stuck in the center } 16.Bxd3 { Threatening a discovery with Nd6+, winning the queen } 16...Qh5 17.Nf6+ { Forces a capture of the knight. After gxf6 exf6, white rooks will be able to attack down the e-file at blacks exposed king. That is why you have to castle early! } 17...gxf6 18.exf6 Rg8 19.Rad1! { Getting another rook in the fight. } 19...Qxf3 { Oh no! Black threatens mate by Qxg2 and the g pawn is pinned. } 20.Rxe7+ Nxe7 { Forced checkmate for white now } 21.Qxd7+!! { White has to keep on checking since black is threatening mate. } 21...Kxd7 ( 21...Kf8 22.Qxe7# ) 22.Bf5+ { The king has to move because of double check } 22...Ke8 { Now can you see it? } ( 22...Kc6 { allows an immediate } 23.Bd7# ) 23.Bd7+ Kf8 ( { or } 23...Kd8 ) 24.Bxe7# { Mate!! }  1-0
        // </PGNViewer>
    )
}
export default PgnLoader;