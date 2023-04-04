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
      <section className="left-section">
        <div className="left-outer-feeds-container">
          <div className="search-feed-container">
            <SearchPage />
          </div>

          {user ? (
            <div id="game-feed-container">
              <MyGames />
            </div>
          ) : null}
        </div>
      </section>
      <section className="center-section">
        {user && user.is_coach ? (
          <div className="welcome-text">
            <h1 className="welcome-text">Welcome, Coach {user.username}!</h1>
          </div>
        ) : user ? (
          <div className="welcome-text">
            <h1 className="welcome-text">Welcome, {user.username}!</h1>
          </div>
        ) : null}
        <div className="board-feed-container">
          <div className="outer-board-container">
            <PgnLoader />
          </div>
        </div>
      </section>
      <section className="right-section">
        <div className="outer-feeds-container">
          {user ? (
            <div className="fav-game-feed" id="game-feed-container">
              <Favorites />
            </div>
          ) : null}
          {user ? (
            <div className="assigned-game-feed" id="game-feed-container">
              <Assigned />
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
