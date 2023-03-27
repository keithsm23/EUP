import React, { useState } from "react";
// import Logo from "../assets/react.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from '../assets/edubin.png'


function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
     <div className="leftSide">
     <img src={logo}  style={{ width: 140 , height: 60 }} ></img>
     </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/"> Courses </Link>
        <Link to="/news"> News </Link>
        <Link to="/contact"> Contact </Link>
        
      </div>
    </div>
  );
}

export default Navbar;