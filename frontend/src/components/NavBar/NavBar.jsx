import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import { FaHatWizard, FaChessRook } from "react-icons/fa"

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul className="nav-items">
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>

            <FaChessRook className="icon-rook" />
            <FaHatWizard className="icon-hat" />
            <h2>Chess<b className="italic">Wiz</b></h2>
          </Link>
        </li>
        <div className="navlinks">
          <Link to='/' style={{ textDecoration: "none", color: "white" }}>
            <li className="navlink">Home</li>
          </Link>
          <Link to='/search' style={{ textDecoration: "none", color: "white" }}>
            <li className="navlink">Search</li>
          </Link>
          <Link to='/analyze' style={{ textDecoration: "none", color: "white" }}>
            <li className="navlink">Analyze</li>
          </Link>
          <Link to='/play' style={{ textDecoration: "none", color: "white" }}>
            <li className="navlink">Play</li>
          </Link>
          <Link to='/about' style={{ textDecoration: "none", color: "white" }}>
            <li className="navlink">About</li>
          </Link>
        </div>
        <div className="logged">
          <li className="loggedin">
            {user ? (
              <h6 style={{ textDecoration: "none", color: "black", opacity: "66%", paddingright: "1em" }}>Logged in as <p style={{ color: "darkblue", fontSize: "medium" }}>{user.username}</p>
              </h6>) : ("")}
          </li>
          <li>
            {user ? (
              <button onClick={logoutUser}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
