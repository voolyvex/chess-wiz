import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import PGNViewer from "../../components/PgnViewer/PgnViewer";
import './Home.css'

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user] = useAuth();
  const [studentStatus, setStudentStatus] = useState("user");
  console.log(user);
  useEffect(() => {
    if (user.is_coach) {
      setStudentStatus("Coach");
    } else {
      setStudentStatus("Student");
    }
  }, [user]);
  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);

  //This will be your api response
  let pgn =
    `[White "Peregrine"]
    [Black "program"]
    [Date "Fri Mar 03 2023 00:40:05 GMT-0600 (Central Standard Time)"]
    
    1. h3 a6 2. a3 e5 3. a4 Qf6 4. h4 g6 5. a5 Ke7 6. h5 h6 7. Na3 Qc6 8. g4 Kf6`;
  // Use .replace to remove all instances of \r,\n, and \
  try {
    pgn = pgn.replace(/\r/g, "");
    pgn = pgn.replace(/\n/g, "");
    pgn = pgn.replace(/\\/g, "");
  } catch (ex) {
    console.log(ex);
  }

  return (
    <div className="container">
      <div id="fade-out">
        <h1>Welcome back, {user.username}!</h1>
      </div>
        <PGNViewer>{pgn}</PGNViewer>
    </div>
  );
};

export default HomePage;
