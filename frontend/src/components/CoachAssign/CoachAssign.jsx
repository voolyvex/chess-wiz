import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Dropdown from '../Dropdown/Dropdown';
import '../Dropdown/Dropdown.css';
import './coach.css'


const CoachAssignPGN = ({ pgn, id }) => {
    
    const [PGN, setPGN] = useState(pgn);
    const [PGNid, setPGNid] = useState(id);
    const [studentId, setStudentId] = useState(10);
    const [selectedValue, setSelectedValue] = useState({ value: '' });
    const [students, setStudents] = useState([]);

    async function fetchStudents() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/auth/", { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
            setStudents(response.data.filter(student => student.is_student));
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchStudents();
        console.log(PGNid)
    }, []);

    const options = students.map(student => ({ value: student.username, label: student.first_name + student.last_name }));

    const postPGN = async () => {
        let pgn = { "pgn": PGN }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/pgn/", pgn, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } }).then(function (response) {
                const pgnId = response.data.id
                patchPGN(studentId, pgnId);
            });

        } catch (error) {
            console.log(error.message)
        }
    };

    async function patchPGN(studentId, pgnId) {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/pgn/assign/${studentId}/${pgnId}/`, {}, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } });
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        !PGNid ? postPGN() :
            patchPGN(studentId, PGNid);
    }

    useEffect(() => {
        setPGN(pgn)
    }, [pgn]);

    useEffect(() => {
        setStudentId(selectedValue.value);
    }, [selectedValue]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='assign-button-text-container'>

                    <div className='button-text'>
                        <>Submit Assignment for
                        <div className='student-selected'>{studentId}</div>
                        </>
                    </div>
                        <button className='assign-button' type='submit'>
                            <HiArrowNarrowRight style={{ fontSize: "20px" }} />
                        </button>
                </div>
                    <h4 className='assign-title'>Select Student from Dropdown Menu </h4>

                    <div className="assign-dropdown">
                        <Dropdown placeHolder="Select..." options={options} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                    </div>
            </form>
        </div>
    );
}

export default CoachAssignPGN;
