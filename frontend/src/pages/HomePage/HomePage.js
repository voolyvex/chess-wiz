import React from "react";
import useAuth from "../../hooks/useAuth";
import MyGames from "../../components/MyGames/MyGames";
import "./Home.css";
import "../../components/GameFeed/gamefeed.css"
import Assigned from "../../components/Assigned/Assigned";
import Favorites from "../../components/Favorites/Favorites";
import PgnLoader from "../../components/PgnViewer/PgnLoader";

const HomePage = () => {
 
  const [user] = useAuth();
  

  return (
    <div className="container">
      <div id="fade-out">
        <h1>Welcome back, {user.username}!</h1>
      </div>
      <div className="outer-board-container">
        <PgnLoader />
      </div>
    <div className="outer-feeds-container">
      <div id="game-feed-container">
        <MyGames />
      </div>
      <div id="game-feed-container">
        <Favorites />
      </div>
      <div id="game-feed-container">
        <Assigned />
      </div>
    </div>
    </div>
  );
};

export default HomePage;

