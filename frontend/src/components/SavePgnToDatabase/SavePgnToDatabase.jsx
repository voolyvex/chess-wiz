import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Dropdown from '../Dropdown/Dropdown';
import './Save.css'
import '../Dropdown/Dropdown.css'


const SavePgnToDatabase =({ headers, pgn }) => {
    
    const [PGN, setPGN] = useState(pgn);
    


    useEffect(()=> {
        setPGN(pgn)
      
    }, [pgn]);

    // make axios POST request
    const postPGN = async () => {
        let pgn = { "pgn": PGN }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/pgn/", pgn, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
            console.log(response.status)
        } catch (error) {
            console.log(error.message)
        }
    };
    const handleSubmit = (e) => {
        postPGN(); 
    }

    const options = [
        { value: "my_games", label: "My Games"},
        { value: "favorites", label: "Favorites"},
        { value: "assigned", label: "Assigned"}
    ];

    return (
        <div className='form-container'>
            <form className="save-form" spellCheck="false" onSubmit={(e) => handleSubmit(e)}>
                <label className='save-label'>
                    <textarea className="form-textarea" name="post" value={PGN}
                        onChange={e => setPGN(e.target.value)}
                        required={true} />
                        <div className='save-div'>
                            <h4 className='form-title'>Select Location to Save</h4>
                            <button className='save-button' type='submit'>
                                <HiArrowNarrowRight style={{fontSize: "20px"}}/>
                            </button>

                        </div>
                </label>
            </form>
            <div className="save-dropdown">
                <Dropdown placeHolder="Select..." options={options} />
            </div>
        </div >
    )
}
export default SavePgnToDatabase;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { HiArrowNarrowRight } from 'react-icons/hi';
// import './Save.css'


// const SavePgnToDatabase =({pgn}) => {
    
//     const url = 'http://127.0.0.1:8000/api/pgn/';
//     const [PGN, setPGN] = useState(pgn);
//     const [success, setSuccess] = useState(false);

    

//     const cleanPgn = (pgn) => {
//         // Use .replace to remove all instances of \r,\n, and \
//         pgn = pgn.replace(/\r/g, "");
//         pgn = pgn.replace(/\n/g, "");
//         pgn = pgn.replace(/\\/g, "");
//         return pgn
//     }

// useEffect(()=> {
//     setPGN()
// }, [pgn]);

//     // make axios post request to django api
//     const postPGN = async () => {
//         let pgn = {
//             "pgn": cleanPgn(PGN)
//         }
        
//         await axios.post(url, pgn, { headers: 
//             { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } 
//         })
//             .then((response) => {
//                 console.log(response.data)
//                 setSuccess(true)
//         })
//             .catch((error) => {
//                 console.log(error.message)
                
//         });
//     }

//     const handleSubmit = (e) => {
//         console.log("before: " + success)
//         postPGN();
//         console.log("after: " + success)
//     }
//     return (
//         <div className='form-container'>
//             <form className="save-form" onSubmit={(e) => handleSubmit(e)}>
//                 <label className='save-label'>
//                     <textarea className="form-textarea" name="post" value={PGN}
//                         onChange={e => setPGN(e.target.value)}
//                         required={true} />
//                     <h4 className='form-title'>Save Game in PGN Format</h4>
//                     <button className='save-button' type='submit'>
//                         <HiArrowNarrowRight />
//                     </button>
//                 </label>
//             </form>
//             <div>
//             {success && <h5 className='success'>Game saved to DB</h5>}
//             </div>
//         </div >
//     )
// }
// export default SavePgnToDatabase;