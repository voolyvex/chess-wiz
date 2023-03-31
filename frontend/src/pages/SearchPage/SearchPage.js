import axios from "axios";
import React, { useState } from "react";
import ThirdPartyMapper from "../../components/GameFeed/ThirdPartyMapper";
import SearchForm from "../../components/SearchForm/SearchForm";
import "../../components/GameFeed/gamefeed.css"

const SearchPage = (props) => {
  const [games, setGames] = useState([]);
  const [username, setUsername] = useState("MagnusCarlsen");
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("02");

  // GET request to chess.com api
  const getPgnByPlayer = async (username, year, month) => {
    try {
      let response = await axios.get(
        `https://api.chess.com/pub/player/${username}/games/${year}/${month}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      setGames(response.data.games);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="search-page">

    <div className="search-game-feed" id="game-feed-container">
      <h3 className="feed-title-1">Search</h3>
      
      <SearchForm handleSearch={getPgnByPlayer} username={username} year={year} month={month} setUsername={setUsername} setYear={setYear} setMonth={setMonth}/>
      <div id="s-game-feed">
        <ThirdPartyMapper games={games} username={username} year={year} month={month}/>
      </div>
    </div>
    </div>
  );
};

export default SearchPage;
