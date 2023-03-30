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
     <h4  style={{color:" #CDCDCD" }}>support@yourmail.com</h4>
     <div className="leftSide1">
     <FaPhoneAlt style={{ height: 24, width: 24, color:" #CDCDCD"}} />
  
      <h4 style={{color:" #CDCDCD"}}> 2244556677</h4>
     </div>
    
     </div>
      <div className="rightSide">
      <h4 style={{color:" #CDCDCD" }}>Follow Us:</h4>
      <SocialIcon bgColor="transparent" fgColor ="white" style={{ height: 30, width: 30 }} url="https://facebook.com" />
    <SocialIcon bgColor="transparent"  fgColor ="white" style={{ height: 30, width: 30 }} url="https://twitter.com" />
    <SocialIcon bgColor="transparent"  fgColor ="white" style={{ height: 30, width: 30 }} url="https://google.com" />
    <SocialIcon bgColor="transparent"  fgColor ="white" style={{ height: 30, width: 30 }} url="https://instagram.com" />
    <h4  style={{color:"rgb(221, 182, 10)" }}>Admission</h4>
        
      </div>
    </div>
  );
}

export default Header;