import React, { useState } from "react";
// import Logo from "../assets/react.png";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { SocialIcon } from 'react-social-icons';
import { FaPhoneAlt } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';
import { blue } from "@mui/material/colors";




function Header() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar1">
     <div className="leftSide">
     <GoMail style={{ height: 35, width: 35, color: " #CDCDCD" }} />
     {/* <SocialIcon style={{ height: 40, width: 40 }} network="email" label="defefewf" aria-label="hello" /> */}
     <h3  style={{color:" #CDCDCD" }}>support@impelsys.com</h3>
     <div className="leftSide1">
     <FaPhoneAlt style={{ height: 24, width: 24, color:" #CDCDCD"}} />
  
      <h4 style={{color:" #CDCDCD"}}> 2244556677</h4>
     </div>
    
     </div>
      <div className="rightSide">
      <h6 style={{color:" #CDCDCD" }}>Follow Us:</h6>
      <SocialIcon bgColor="blue" fgColor ="white" style={{ height: 35, width: 35 }} url="https://facebook.com" />
    <SocialIcon style={{ height: 35, width: 35 }} url="https://twitter.com" />
    <SocialIcon style={{ height: 35, width: 35 }} url="https://google.com" />
    <SocialIcon style={{ height: 35, width: 35 }} url="https://instagram.com" />
    <h4 style={{color:" #CDCDCD" }}>Admission</h4>
        
      </div>
    </div>
  );
}

export default Header;