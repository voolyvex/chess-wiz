import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Dropdown from '../Dropdown/Dropdown';
import './Save.css'
import '../Dropdown/Dropdown.css'

const SavePgnToDatabase = ({ headers, pgn }) => {

    const [PGN, setPGN] = useState(pgn);
    const [saveLocation, setSaveLocation] = useState('');

    useEffect(() => {
        setPGN(pgn)
    }, [pgn]);

    const postPGN = async () => {
        let pgn = { "pgn": PGN }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/pgn/", pgn, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
            console.log(response.data.id)
            // assuming the response contains the pgn id
            const pgnId = response.data.id;
            patchPGN(saveLocation, pgnId);
        } catch (error) {
            console.log(error.message)
        }
    };

    const patchPGN = async (saveLocation, pgnId) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/pgn/${saveLocation}/${pgnId}/`, {}, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postPGN();
    }

    const handleLocationChange = (selectedOption) => {
        setSaveLocation(selectedOption.value);
    };

    const options = [
        { value: "my_games", label: "My Games" },
        { value: "favorites", label: "Favorites" },
        { value: "assigned", label: "Assigned" }
    ];

    return (
        <div className='form-container'>
            <form className="save-form" spellCheck="false" onSubmit={handleSubmit}>
                <label className='save-label'>
                    <textarea className="form-textarea" name="post" value={PGN}
                        onChange={e => setPGN(e.target.value)}
                        required={true} />
                    <div className='save-div'>
                        <h4 className='form-title'>Select Location to Save </h4>
                        <button className='save-button' type='submit'>
                            <HiArrowNarrowRight style={{ fontSize: "20px" }} />
                        </button>

                    </div>
                </label>
            </form>
            <div className="save-dropdown">
                <Dropdown placeHolder="Select..." options={options} onChange={handleLocationChange} />
            </div>
        </div>
    )
}
export default SavePgnToDatabase;
