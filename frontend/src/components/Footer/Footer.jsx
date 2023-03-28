import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaHatWizard, FaChessRook } from "react-icons/fa"


const Footer = () => {
  return (
    <footer>
      <div className="footer-container">

        
        <div className="bottom-brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <div className="icons">

            <FaChessRook className="icon-rook" />
            <FaHatWizard className="icon-hat" />
          </div>
          <h2>Chess<b className="italic">Wiz</b></h2>
          </Link>
        </div>
        <div className="copyright-text">
          <h6>
            © 2023
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
