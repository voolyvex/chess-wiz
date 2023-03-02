import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import './Save.css'

const SavePgnToDatabase =({pgn}) => {

    const [PGN, setPGN] = useState(pgn)

useEffect(()=> {
    setPGN(pgn)
}, [pgn]);

    // make axios post request to the django backend
    const postPGN = async () => {
        let pgn = {
            "pgn": PGN
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/pgn/", pgn, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
            console.log(response.status)
        } catch (error) {
            console.log(error)
        }
    };
    const handleSubmit = (e) => {
        postPGN();
        
    }
    return (
        <div className='form-container'>
            <form className="save-form" onSubmit={(e) => handleSubmit(e)}>
                <label className='save-label'>
                    <textarea className="form-textarea" name="post" value={PGN}
                        onChange={e => setPGN(e.target.value)}
                        required={true} />
                    <button className='save-button' type='submit'>
                        <HiArrowNarrowRight />
                    </button>
                    <h4 className='form-title'>Save Game in PGN Format</h4>
                </label>
            </form>
        </div >
    )
}
export default SavePgnToDatabase;