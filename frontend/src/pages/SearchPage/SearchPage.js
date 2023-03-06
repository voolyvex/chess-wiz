import axios from "axios";
import React, { useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";


const SearchPage = (props) => {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("Grischuk");
    
    const handleSubmit = (e) => {
        // e.preventDefault()
        // getAllGames()
        // console.log(games);
        return;
    }




    async function getAllGames() {
        // fetch games from django backend
        try {
            let response = await axios
            .get(`http://127.0.0.1:8000/api/pgn/`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
            setGames(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.message)
        }
    };
    
  return (
    <div className="search-page">
        <h1 className="search-title">Start your search here</h1>
        <div className="search-form-container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className="search-form"
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm} required={false} />
                <button className="search-button" type='submit'><HiArrowNarrowRight /> </button>
            </form>
        </div>
        {games}
    </div>
)
};

export default SearchPage;
