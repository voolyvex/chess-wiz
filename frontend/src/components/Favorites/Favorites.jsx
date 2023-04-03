import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GameFeedMapper from '../GameFeed/GameFeedMapper';
import '../GameFeed/gamefeed.css'
import useFetchFavorites from './useFetchFavorites';


const Favorites = (props) => {
    
    const {games,refetch} = useFetchFavorites()
    

    return games && (
        <div id='game-feed'>
            <h3 className='feed-title-3'>
                Favorites
            </h3>
            <GameFeedMapper games={games} />
        </div>
    )
}

export default Favorites;

