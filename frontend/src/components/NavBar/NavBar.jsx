import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>ChessPrep</b>
          </Link>
        </li>
        <Link to='/' style={{ textDecoration: "none", color: "white" }}>
          <li className="navlinks">Home</li>
        </Link>
        <Link to='/search' style={{ textDecoration: "none", color: "white" }}>
          <li className="navlinks">Search</li>
        </Link>
        <Link to='/play' style={{ textDecoration: "none", color: "white" }}>
          <li className="navlinks">Play</li>
        </Link>
        <li className="loggedin">
          {user ? (
            <h6 style={{ textDecoration: "none", color: "black", opacity: "66%", paddingright: "1em" }}>Logged in as <h4 style={{ color: "darkblue" }}>{user.username}</h4>
            </h6>) : ("")}
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
