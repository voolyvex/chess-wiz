import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GameFeedMapper from '../GameFeed/GameFeedMapper';
import '../GameFeed/gamefeed.css'


const Assigned = (props) => {

    const [games, setGames] = useState([])

    useEffect(() => {

        async function getAllAssigned() {
            // fetch games from django backend
            try {
                let response = await axios
                    .get(`http://127.0.0.1:8000/api/pgn/assigned/`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
                setGames(response.data);

            } catch (error) {
                console.log(error.message)
            }
        };

        getAllAssigned()
    }, []);

    return (
        <div id='game-feed'>
            <h3 className='feed-title'>
                Assigned
            </h3>
            <GameFeedMapper games={games} />

        </div>
    )
}

export default Assigned;