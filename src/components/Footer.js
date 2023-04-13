import React, { useState, useEffect } from "react";
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import draftToHtmlPuri from "draftjs-to-html";



function Footer() {

  const[footer, setFooter] = useState([]);
  const[linkgroups, setLinkGroups] = useState([]);

  //fetch data
  const getAllData = async ()=>{
    const res=await axios
    .get(
       `http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?slug=page2`
    )
    .then((res) => { 
      console.log(res)
    setFooter(res.data.data.reverse());
   
    })
    .catch((err) =>{
    } );      
    };

  //display user list
  useEffect(()=>{
    getAllData();
  },[]);
  



   //fetch footer link
   const getLinkGroups = async () => {
    const res = await axios
      .get(
         `http://api-cms-poc.iplatformsolutions.com/api/cmsMenu/fetchLinkGroups?menuGroupName=FOOTER LINK`
      )
      .then((res) => {
        
        console.log(res.data);
        setLinkGroups(res.data);
      })
      .catch((err) => {});
  };

  //display user list
  useEffect(() => {
    getLinkGroups();
  }, []);
  return (   
   
<div>
{
    footer && footer.map((footer,i)=>{
    console.log(footer);
    const htmlPuri = draftToHtmlPuri(footer);
    console.log(htmlPuri);

     

    return(       
        <tr key={i}>
    <div className="footer">
    <div className="icons">
    <SocialIcon  style={{ height: 35, width: 35 }} bgColor="rgba(2, 29, 58, 1)" fgColor ="white" url={footer.facebookLink} />
    <SocialIcon  style={{ height: 35, width: 35 }} bgColor="rgba(2, 29, 58, 1)" fgColor ="white" url={footer.twitterLink}  />
    <SocialIcon  style={{ height: 35, width: 35 }} bgColor="rgba(2, 29, 58, 1)" fgColor ="white" url={footer.youtubeLink}  />
    <SocialIcon  style={{ height: 35, width: 35 }} bgColor="rgba(2, 29, 58, 1)" fgColor ="white" url={footer.linkedLink}  />
    </div>
    <div className="rightSide">
   
        <Link to="/"  style={{color:"#FFAC00", fontWeight:700 }}> HOME </Link>
        <Link to="/about"> ABOUT US </Link>
        <Link to="/services"> COURSES </Link>
        <Link to="/news"> NEWS </Link>
        <Link to="/contact"> CONTACT </Link>
        {linkgroups &&
      linkgroups.data &&
      linkgroups.data.map((data, index) => { 
                      console.log("data", data);         
                      return (                                    
          <div className="apifooter">{data.menuTitle}</div>
               
            );
            })}   
      </div>
      
    </div>
    <div className="footer2">
      <h4 style={{color:"white", justifyContent:"center"}}>{footer.copyrightText}</h4>
    </div>

 
    </tr>         
    );
  })
  }
  </div>
  );
}

export default Footer;