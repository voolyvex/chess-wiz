import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GameFeedMapper from '../GameFeed/GameFeedMapper';
import '../GameFeed/gamefeed.css'


const MyGames = (props) => {

    const [games, setGames] = useState([])

    useEffect(() => {

        async function getAllMyGames() {
            // fetch games from django backend
            try {
                let response = await axios
                    .get(`http://127.0.0.1:8000/api/pgn/mygames/`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
                setGames(response.data);

            } catch (error) {
                console.log(error.message)
            }
        };

        getAllMyGames()
    }, []);

    return (
        <div id='game-feed'>

            <GameFeedMapper games={games} />

        </div>
    )
}

export default MyGames;