import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import PGNViewer from "../../components/PgnViewer/PgnViewer";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [studentStatus, setStudentStatus] = useState("user");
  console.log(user);
  useEffect(() => {
    if (user.is_coach) {
      setStudentStatus("Coach");
    } else {
      setStudentStatus("Student");
    }
  }, []);
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
    ' [Event "EU-ch U12"]\r\n[Site "Peniscola ESP"]\r\n[Date "2002.10.03"]\r\n[EventDate "2002.09.29"]\r\n[Round "5"]\r\n[Result "1-0"]\r\n[White "Ian Nepomniachtchi"]\r\n[Black "Magnus Carlsen"]\r\n[ECO "B04"]\r\n[WhiteElo "2306"]\r\n[BlackElo "2214"]\r\n[PlyCount "81"]\r\n\r\n1. e4 Nf6 2. e5 Nd5 3. Nf3 d6 4. d4 dxe5 5. Nxe5 g6 6. Bc4 c6\r\n7. Nc3 Be6 8. O-O Nd7 9. Qf3 Bg7 10. Re1 O-O 11. Qg3 Nxe5\r\n12. dxe5 Nxc3 13. Qxc3 Bxc4 14. Qxc4 Qd5 15. Qe2 Rad8 16. Bg5\r\nQe6 17. Qe3 b6 18. a4 Rd5 19. Bf4 Qf5 20. Qe4 Qd7 21. c3 Rd8\r\n22. h3 Qe6 23. Qe2 Rd3 24. a5 b5 25. a6 c5 26. Qe4 Qd5\r\n27. Qxd5 R3xd5 28. Ra5 c4 29. Kf1 e6 30. Be3 R8d7 31. Bd4 Bf8\r\n32. Rb1 Be7 33. b3 Bd8 34. Ra2 Rxd4 35. cxd4 c3 36. b4 Bg5\r\n37. Rd1 Rc7 38. Rc2 Be7 39. d5 Bxb4 40. d6 Rc8 41. Rb1 1-0';
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
      <h1>
        Welcome to Home Page for {studentStatus} {user.username}!
      </h1>
      <PGNViewer>{pgn}</PGNViewer>
    </div>
  );
};

export default HomePage;
