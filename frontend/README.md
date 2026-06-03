# Chess Wiz — Frontend

React app for Chess Wiz. Built with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

- [Node.js](https://nodejs.org/) (includes npm). Node 16 or newer is recommended.

## Install

From this directory (`frontend/`):

```bash
npm install
```

## Run (development)

```bash
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000). The page reloads when you save changes.

## Backend

Login, saved games, and other account features call the Django API at `http://127.0.0.1:8000`. Start the backend separately for those features. Chess.com search and the analyze/play boards work without the backend.
