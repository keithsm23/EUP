import React, { useState, useEffect } from "react";
// import Logo from "../assets/react.png";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import { FaPhoneAlt } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';
import { blue } from "@mui/material/colors";
import draftToHtmlPuri from "draftjs-to-html";



function Header() {
  const [openLinks, setOpenLinks] = useState(false);
  const[settings, setSettings] = useState([]);
  const[input,setInput] = useState({
    slug:"",
    siteTitle:"",
    facebookLink:"",
    twitterLink:"",
    youtubeLink:"",
    linkedLink:"",
    copyrightText:"",
    phoneNumber:"",
    email:"",
    logo:""
  });


  //fetch data
  const getAllData = async ()=>{
   
    const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?id=1&slug=newPage`)
      .then((res) => { 
        console.log(res)
      setSettings(res.data.data.reverse());
     
      })
      .catch((err) =>{
      } );      
    };

  //display user list
  useEffect(()=>{
    
    getAllData();
  },[]);
  return ( <div>
     {
        settings && settings.map((home,i)=>{
        console.log(home);
        const htmlPuri = draftToHtmlPuri(home);
        console.log(htmlPuri);

        return(
            
        <tr key={i}>
        {/* <td>{user.id}</td> */}
        <div className="navbar1">
          <div className="leftSide2">
              <GoMail style={{ height: 35, width: 35, color: " #CDCDCD"}}/>
              <h4 style={{color:" #CDCDCD",  }}>&nbsp;{home.email}</h4>
             &nbsp;&nbsp;&nbsp;
              <FaPhoneAlt style={{ height: 24, width: 24, color:" #CDCDCD"}} />
              <h4 style={{color:" #CDCDCD"}}> &nbsp;{home.phoneNumber}</h4>
           
          </div>


          <div className="rightSide1">
            <h4 style={{color:" #CDCDCD" }}>Follow Us:</h4>
            <SocialIcon bgColor="transparent" fgColor ="white" style={{ height: 30, width: 30 }} url={home.facebookLink}/>
            <SocialIcon bgColor="transparent"  fgColor ="white" style={{ height: 30, width: 30 }} url={home.twitterLink} />
            <SocialIcon bgColor="transparent"  fgColor ="white" style={{ height: 30, width: 30 }} url={home.youtubeLink}/>
            <SocialIcon bgColor="transparent"  fgColor ="white" style={{ height: 30, width: 30 }} url={home.linkedLink}/>
            <h4  style={{color:"rgb(221, 182, 10)" }}>&nbsp;&nbsp;&nbsp;&nbsp; Admission</h4>   &nbsp;&nbsp;
          </div>
        </div>
      </tr>          
      );
      })
   }
      </div>
  );
}

export default Header;