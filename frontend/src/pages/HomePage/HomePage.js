import React from "react";
import useAuth from "../../hooks/useAuth";
import MyGames from "../../components/MyGames/MyGames";
import "./Home.css";
import "../../components/GameFeed/gamefeed.css";
import Assigned from "../../components/Assigned/Assigned";
import Favorites from "../../components/Favorites/Favorites";
import PgnLoader from "../../components/PgnViewer/PgnLoader";
import SearchPage from "../SearchPage/SearchPage";

const HomePage = () => {
  const [user] = useAuth();

  return (
    <main>
      <section>
        <div className="left-outer-feeds-container">
          <div id="search-feed-container">
            <SearchPage />
          </div>

          <div id="game-feed-container">
            <MyGames />
          </div>
        </div>
      </section>
      <section className="center-section">
        {user ?
        <div id="fade-out">
          <h1 className="welcome">Welcome back, {user.username}!</h1>
        </div> : null}
        <div className="board-feed-container">
          <div className="outer-board-container">
            <PgnLoader />
          </div>
        </div>
      </section>
      <section>
        <div className="outer-feeds-container">
          <div id="game-feed-container">
            <Favorites />
          </div>
          <div id="game-feed-container">
            <Assigned />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
