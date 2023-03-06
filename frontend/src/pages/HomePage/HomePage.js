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
    `[Event "ICC 15 5"]
    [Site "Internet Chess Club"]
    [Date "2012.06.13"]
    [Round "-"]
    [White "JosephW"]
    [Black "kanvamuni"]
    [Result "1-0"]
    [ICCResult "Black resigns"]
    [WhiteElo "2069"]
    [BlackElo "1881"]
    [Opening "French: Tarrasch"]
    [ECO "C03"]
    [NIC "FR.14"]
    [Time "21:14:07"]
    [TimeControl "900+5"]
    
    1. e4 e6 2. d4 d5 3. Nd2 Be7 4. e5 c5 5. c3 cxd4 6. cxd4 Nc6 7. Nb3 a5 8. a4
    Bb4+ 9. Bd2 Nge7 10. Bb5 O-O 11. Nf3 Qb6 12. O-O Nf5 13. g4 Nfxd4 14. Nfxd4
    Nxd4 15. Bxb4 Nxb3 16. Bxf8 Nxa1 17. Bd6 {Black resigns} 1-0`;
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
