import axios from "axios";
import React, { useState } from "react";
import ThirdPartyMapper from "../../components/GameFeed/ThirdPartyMapper";
import SearchForm from "../../components/SearchForm/SearchForm";
import "../../components/GameFeed/gamefeed.css"

const SearchPage = (props) => {
  const [games, setGames] = useState([]);

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
      <h3 className="searchfeed-title">Search</h3>
      <h1>Chess.com Players</h1>
      <SearchForm handleSearch={getPgnByPlayer} />
      <div id="game-feed">
        <ThirdPartyMapper games={games} />
      </div>
    </div>
  );
};

export default SearchPage;
