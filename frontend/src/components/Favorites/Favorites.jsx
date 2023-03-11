import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GameFeedMapper from '../GameFeed/GameFeedMapper';
import '../GameFeed/gamefeed.css'


const Favorites = (props) => {

    const [games, setGames] = useState([])

    useEffect(() => {

        async function getAllFavorites() {
            // fetch games from django backend
            try {
                let response = await axios
                    .get(`http://127.0.0.1:8000/api/pgn/favorites/`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
                setGames(response.data);

            } catch (error) {
                console.log(error.message)
            }
        };

        getAllFavorites()
    }, []);

    return (
        <div id='game-feed'>


            <GameFeedMapper games={games} />
        </div>
    )
}

export default Favorites;