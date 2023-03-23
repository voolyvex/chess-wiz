import React from 'react';
import './notfound.css'

const NotFound = () => {
  return (
    <div id="centered">
      <h1>404: Page Not Found!</h1>
      <img src="/not-found-error-404.png" alt="Robot 404" />
      <p>Looks like you took a wrong turn, human. The page you are looking for doesn't exist. Did you try turning it off and on again?</p>
    </div>
  );
}

export default NotFound;
