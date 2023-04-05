import React, { useState } from "react";
// import Logo from "../assets/react.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from '../assets/edubin.png'
import { fontSize, fontStyle } from "@mui/system";


function Navbar() {
  // const [openLinks, setOpenLinks] = useState(false);

  // const toggleNavbar = () => {
  //   setOpenLinks(!openLinks);
  // };
  return (
    <div className="navbar">
      <div className="leftSide1">
      <a href="/"  rel="stylesheet"> <img src={logo} alt=""  style={{ width: 200 , height: 50 }} ></img></a>
      </div>
      <div className="rightSide1">
        <Link style={{color:"#FFAC00", fontWeight:700 }} to="/"> HOME </Link>
        <Link to="/about"> ABOUT US</Link>
        <Link to="/services"> COURSES </Link>
        <Link to="/news"> NEWS </Link>
        <Link to="/contact"> CONTACT </Link>    
      </div>
    </div>
  );
}

export default Navbar;