import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PGNViewer from './PgnViewer';
import axios from 'axios';
import CoachAssignPGN from '../CoachAssign/CoachAssign';
import useAuth from "../../hooks/useAuth";
import { normalizePgn } from '../../utils/normalizePgn';


const defaultPgn =
    `[Event "Paris"]
  [Site "Paris FRA"]
  [Date "1858.??.??"]
  [EventDate "?"]
  [Round "?"]
  [Result "1-0"]
  [White "Paul Morphy"]
  [Black "Duke Karl / Count Isouard"]
  [ECO "C41"]
  [WhiteElo "?"]
  [BlackElo "?"]
  [PlyCount "33"]

  1.e4 e5 2.Nf3 d6 3.d4 Bg4 {This is a weak move already.--Fischer} 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7
  8.Nc3 c6 9.Bg5 {Black is in what's like a zugzwang position here. He can't develop the [Queen's] knight because the pawn is hanging, the bishop is blocked because of the Queen.--Fischer} b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8
  13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8# 1-0`;

const PgnLoader = ({ props }) => {
  const [user] = useAuth();
  const { id } = useParams();
  const [pgn, setPgn] = useState(defaultPgn);

  const location = useLocation();

  const idChecker = (paramId = "") => {
    return paramId.length > 32;
  }

  useEffect(() => {
    if (!id) {
      setPgn(defaultPgn);
      return;
    }

    if (!idChecker(id)) {
      const fetchPgn = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/pgn/${id}/`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
          });
          setPgn(normalizePgn(response.data.pgn) || defaultPgn);
        } catch (error) {
          console.log(error.message);
          setPgn(defaultPgn);
        }
      };
      fetchPgn();
    } else {
      // pgn is from Chess.com
      try {
        const regex = /(\{[^}]*\})|(\d+\.\.\.)|(\d+\.)|(\.\.\.)/gm;
        const userClickedPgn = location.state?.game?.pgn;
        if (!userClickedPgn) {
          setPgn(defaultPgn);
          return;
        }
        const formattedPgn = userClickedPgn
          .replace(regex, '')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        setPgn(normalizePgn(formattedPgn));
      } catch (error) {
        console.log(error.message);
        setPgn(defaultPgn);
      }
    }
  }, [id, location.state]);

  const viewerKey = id || 'default';

  return <>

    {user && user.is_coach ? <CoachAssignPGN pgn={pgn} /> : null}
    <PGNViewer key={viewerKey}>{pgn}</PGNViewer>
  </>
};

export default PgnLoader;
