import axios from "axios";
import React, { useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

const SearchPage = (props) => {

    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("Grischuk");
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchGames(searchTerm);
    }
    async function fetchGames(searchTerm) {
        try {
            await axios
                .get(
                    `https://explorer.lichess.ovh/masters/pgn/aAbqI4ey`)
                .then(response => setGames(response.data.items));
        } catch (error) {
            console.log(error);
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
                    value={searchTerm} required={true} />
                <button className="search-button" type='submit'><HiArrowNarrowRight /> </button>
            </form>
        </div>
        {games}
    </div>
)
};

export default SearchPage;
