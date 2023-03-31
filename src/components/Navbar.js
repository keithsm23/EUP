import React, { useState } from "react";
// import Logo from "../assets/react.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from '../assets/edubin.png'


function Navbar() {
  // const [openLinks, setOpenLinks] = useState(false);

  // const toggleNavbar = () => {
  //   setOpenLinks(!openLinks);
  // };
  return (
    <div className="navbar">
      <div className="leftSide">
      <a href="/"> <img src={logo} alt=""  style={{ width: 200 , height: 50 }} ></img></a>
      </div>
      <div  className="rightSide">
        <Link to="/"> HOME </Link>
        <Link to="/about"> ABOUT US</Link>
        <Link to="/services"> COURSES </Link>
        <Link to="/news"> NEWS </Link>
        <Link to="/contact"> CONTACT </Link>    
      </div>
    </div>
  );
}

export default Navbar;