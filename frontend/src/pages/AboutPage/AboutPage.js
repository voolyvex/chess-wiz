import React from "react";
import './About.css'

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <div className="titles">
            <h1 id="fade-in">A web tool geared for chess students </h1>
            <h1 className="delay" id="fade-in">and their coaches...</h1>
        </div>
        <p id="about-about">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
          ornare nunc. Nunc egestas diam est, vel mollis arcu elementum vel.
          Praesent sed velit quam. Pellentesque sagittis justo id lectus
          condimentum, sed maximus nisi accumsan. Integer bibendum arcu ac est
          viverra, eget congue nisi tristique. Donec viverra elit eu lacus
          tempor accumsan vitae a odio. </p>
          <p id="about-about">Etiam nec urna imperdiet, accumsan ex
          et, malesuada leo. Curabitur neque odio, commodo ac mi sit amet,
          tristique aliquet ligula. Maecenas tincidunt lacus non magna dignissim
          cursus at vel est. Fusce eleifend imperdiet consectetur. Etiam
          scelerisque rhoncus elit quis finibus. Maecenas interdum molestie
          porta. Ut et nisi malesuada, facilisis dui quis, vehicula eros. </p>
          <p id="about-about">Mauris
          a nibh vel dolor ultrices gravida. Nam ac consectetur odio. Nullam non
          laoreet erat. Pellentesque dapibus et odio quis luctus. Quisque
          lacinia neque diam, quis sodales nulla pulvinar sed. Sed malesuada non
          arcu sit amet tincidunt. Duis at lacus semper, dictum massa quis,
          aliquam sapien. Aenean blandit lacus diam.
        </p>
      </div>
    </div>
  );
};
export default AboutPage;
