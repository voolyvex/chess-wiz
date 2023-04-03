import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'

const useFetchFavorites = () => {
    const [user, token] = useAuth()
    const [games, setGames] = useState([])
    
    useEffect(() => {
        async function getAllFavorites() {
            // fetch games from django backend
            try {
            
                let response = await axios
                    .get(`http://127.0.0.1:8000/api/pgn/favorites/`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
                // const data = response.data.map((pgn) => {
                //         pgn.is_favorite = true;
                //         return pgn;
                //       });
                setGames(response.data);
                console.log(response)
            } catch (error) {
                console.log(error.message)
            }
        };

        getAllFavorites()
    }, [token])
    const refetch = async () => {
        // fetch games from django backend
        try {
            let response = await axios
                .get(`http://127.0.0.1:8000/api/pgn/favorites/`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
            // const data = response.data.map((pgn) => {
            //         pgn.is_favorite = true;
            //         return pgn;
            //       });
            
            setGames(response.data);
            console.log(response)
        } catch (error) {
            console.log(error.message)
        }
    }
    return { games, refetch }
}
export default useFetchFavorites