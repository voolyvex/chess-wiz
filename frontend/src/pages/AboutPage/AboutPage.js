import React from "react";
import "./About.css";
import gearedIcon from "./geared.png";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <div className="titles">
          <h1 className="fade-in">A cloud-based</h1>{" "}
          <h1 className="delay1 fade-in">platform</h1>
          <h1 className="delay2 fade-in">
            <i>geared</i>
          </h1>
          <h1 className="delay3 fade-in">for</h1>
          <div className="stage">
            <div className="brain bounce-7">
              <img
                src={gearedIcon}
                alt="icon with gears inside a brain"
                className="gear-icon"
              />
            </div>
          </div>
          <h1 className="delay3 fade-in">chess students</h1>
          <h1 className="delay4 fade-in">and their coaches...</h1>
        </div>
        <p id="about-about">
          Welcome to ChessWiz, the ultimate chess app for both students and
          coaches! <i>Dad jokes aside</i>, our app is designed to help you
          improve your game, whether you're a beginner or a seasoned player.
          With a Django backend, REST API endpoints, and a React frontend, our
          fullstack application provides a seamless user experience that's both
          intuitive and easy to use.
        </p>
        <p id="about-about">
          For students of chess, ChessWiz offers a variety of features to help
          you keep track of your games. The 'MyGames' page allows you to see all
          the games you've played, while the 'Favorites' page lets you bookmark
          your most important games. You can also see games assigned to you by
          your coach on the 'Assigned' page. With our custom API and third-party
          API integration, you can search for games to study and analyze.
        </p>
        <div className="titles">
          <h1>Game Analysis</h1>
        </div>
        <p id="about-about">
          For coaches or students looking to improve their game, our Analyze
          page is the perfect tool. With its own board and save location tied to
          your user account, you can enter tournament or practice games and
          analyze them in-depth. Coaches can also assign games to students for
          them to study, making it easy to give personalized feedback.
        </p>
        <p id="about-about">
          But that's not all – ChessWiz also offers a Play page where you can
          challenge an AI opponent that makes random moves. And in future
          versions, ChessWiz will have improved AI opponents and UCI Engine
          support, so you can take your game to the next level!
        </p>
        <p id="about-about">
          At ChessWiz, our goal is to provide you with the tools you need to
          become a master chess player. Whether you're looking to study games,
          analyze your own play, or challenge an AI opponent, our app has
          everything you need to improve your game. So why wait? Sign up for
          ChessWiz today and start your journey towards chess mastery!
        </p>

        <div className="titles">
          <h1>What is a PGN?</h1>
        </div>
        <p id="about-about">
          ChessWiz uses the Portable Game Notation (PGN) format for representing
          chess games and moves. PGN is a standard way of recording chess games
          in plain text, and it allows users to easily share, analyze, and
          review games. In PGN, each move is represented by a unique code that
          includes the piece moved, the starting and ending squares, and any
          additional information such as captures or promotions. ChessWiz also
          supports variations, annotations, and other PGN features, making it a
          versatile tool for both learning and analyzing chess games.
        </p>
        <div className="about-cta">
          <a href="/login">
            <button>Login!</button>
          </a>
          <a href="/register">
            <button>Create Account!</button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
