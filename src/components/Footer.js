import React from "react";
// import InstagramIcon from "@material-ui/icons/Instagram";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { SocialIcon } from 'react-social-icons';
import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (   

    <div className="footer">
    <div className="icons">
    <SocialIcon  style={{ height: 35, width: 35 }} bgColor="blue" fgColor ="white" url="https://facebook.com" />
    <SocialIcon  style={{ height: 35, width: 35 }} url="https://twitter.com" />
    <SocialIcon  style={{ height: 35, width: 35 }} url="https://google.com" />
    <SocialIcon  style={{ height: 35, width: 35 }} url="https://instagram.com" />
    </div>
    <div className="rightSide">
        <Link to="/home"> HOME </Link>
        <Link to="/aboutus"> ABOUT US </Link>
        <Link to="/"> COURSES </Link>
        <Link to="/news"> NEWS </Link>
        <Link to="/contact"> CONTACT </Link>
      </div>
    </div>

  );
}

export default Footer;