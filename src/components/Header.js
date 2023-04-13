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
import logo from '../assets/edubin.png';
import useFullPageLoader from "../hooks/useFullPageLoader";

function Header() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [menus, setMenus] = useState([]);
  const [menugroups, setMenuGroups] = useState([]);
  const [linkgroups, setLinkGroups] = useState([]);
  const [primarylinkgroups, setPrimaryLinkGroups] = useState([]);
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


  //Fetch menus
  const getMenus = async () => {
    const res = await axios
      .get(
        `http://api-cms-poc.iplatformsolutions.com/api/cmsMenu/fetch`
      )
      .then((res) => {
        
        console.log(res.data);
        setMenus(res.data);
        hideLoader();
      })
      .catch((err) => {});
  };

  //display user list
  useEffect(() => {
    showLoader();
    getMenus();
  }, []);



    //fetch top link
    const getLinkGroups = async () => {
      const res = await axios
        .get(
          `http://api-cms-poc.iplatformsolutions.com/api/cmsMenu/fetchLinkGroups?menuGroupName=TOP LINK`
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


     //fetch primary link
     const getPrimaryLinkGroups = async () => {
      const res = await axios
        .get(
           `http://api-cms-poc.iplatformsolutions.com/api/cmsMenu/fetchLinkGroups?menuGroupName=PRIMARY LINK`
        )
        .then((res) => {
          
          console.log(res.data);
          setPrimaryLinkGroups(res.data);
        })
        .catch((err) => {});
    };
  
    //display user list
    useEffect(() => {
      getPrimaryLinkGroups();
    }, []);




  // //fetch menu groups
  // const getMenuGroups = async () => {
  //   const res = await axios
  //     .get(
  //       `http://api-cms-poc.iplatformsolutions.com/api/menuGroup/fetch`
  //     )
  //     .then((res) => {
        
  //       console.log(res.data);
  //       setMenuGroups(res.data);
  //       hideLoader();
  //     })
  //     .catch((err) => {});
  // };

  // //display user list
  // useEffect(() => {
  //   showLoader();
  //   getMenuGroups();
  // }, []);





  //fetch data
  const getAllData = async ()=>{
   
     const res=await axios
    .get(`http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?slug=page2`
    )
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
            <SocialIcon bgColor="transparent" fgColor ="#CDCDCD" style={{ height: 30, width: 30 }} url={home.facebookLink}/>
            <SocialIcon bgColor="transparent"  fgColor ="#CDCDCD" style={{ height: 30, width: 30 }} url={home.twitterLink} />
            <SocialIcon bgColor="transparent"  fgColor ="#CDCDCD" style={{ height: 30, width: 30 }} url={home.youtubeLink}/>
            <SocialIcon bgColor="transparent"  fgColor ="#CDCDCD" style={{ height: 30, width: 30 }} url={home.linkedLink}/>
            {/* <h4  style={{color:"rgb(221, 182, 10)" }}>&nbsp;&nbsp;&nbsp;&nbsp;  
              Admission
            </h4> &nbsp;&nbsp; */}
            
          {linkgroups &&
            linkgroups.data &&
            linkgroups.data.map((data, index) => { 
              console.log("data", data);         
              return (    
                                       
              <div className="menutitlee">
                  <h4  style={{color:"rgb(221, 182, 10)" }}>{data.menuTitle} </h4>
               </div>  
          
            );
            })}    
          </div>  
        </div>

        
      <div className="navbar">
      <div className="leftSide3">
        <a href="/"  rel="stylesheet">
        <img src={home.logo} alt=""  style={{ width: 180 , height: 80 }} ></img>
        </a>
      </div>
      <div className="rightSide3">
          
      
        {/* <Link style={{color:"#FFAC00", fontWeight:700 }} to="/"> HOME </Link> */}
     
       <Link style={{color:"#FFAC00", fontWeight:700 }} to="/"> HOME </Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/services"> COURSES </Link>
            <Link to="/news"> NEWS </Link>
            <Link to="/contact"> CONTACT </Link>  
            {
          primarylinkgroups &&
          primarylinkgroups.data &&
          primarylinkgroups.data.map((data, index) => { 
                      console.log("data", data);         
                      return (                                    
            <div className="toplinkc1"> 
              {data.menuTitle}
            </div>                        
          );
          })
        }   
           
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