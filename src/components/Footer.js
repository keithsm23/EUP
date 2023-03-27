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
    <SocialIcon bgColor="blue" fgColor ="white" url="https://facebook.com" />
    <SocialIcon url="https://twitter.com" />
    <SocialIcon url="https://google.com" />
    <SocialIcon url="https://instagram.com" />
    </div>
      <Link  to="/" href="#top"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/"> Courses </Link>
        <Link to="/news"> News </Link>
        <Link to="/contact"> Contact </Link>
      <p> </p>
    </div>

  );
}

export default Footer;