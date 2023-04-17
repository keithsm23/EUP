import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import axios, { all } from 'axios';
import { SocialIcon } from 'react-social-icons';
import { FaPhoneAlt } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';
import draftToHtmlPuri from "draftjs-to-html";
import useFullPageLoader from "../hooks/useFullPageLoader";
import { useSyncExternalStore } from "react";

function Header() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [menus, setMenus] = useState([]);
  const [selectedButton, setSelectedButton] = useState("");
  // const [menugroups, setMenuGroups] = useState([]);
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

  // var btnToggle = true;
  // var upVoteBtn = document.getElementById("upVote");

  // const colour=()=>{
  //   if(btnToggle){
  //     upVoteBtn.style.color = "red";
  //     btnToggle = true;
  //   // document.getElementById("demo").style.color = "yellow";
  //   }
  //   if(!btnToggle){
  //     upVoteBtn.style.color = null;
  //     btnToggle = false;
  //   }
  // }
  // const colour2=()=>{
  //   document.getElementById("demo2").style.color = "yellow";
  // }


  const getPageSlug = (id, slug) => {
    
    localStorage.setItem('PageID', JSON.stringify(id))
    showLoader();
    localStorage.setItem('PAGESLUG', slug)
    hideLoader();
  }


  return ( <div>
     {
        settings && 
        settings.map((home,i)=>{
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
                  <h4><Link style={{color:"rgb(221, 182, 10)" }} to={data.urlSelected}>{data.menuTitle}</Link> </h4>
               </div>  
         
            );
            })}       
          </div>  
        </div>

        
      <div className="navbar">
      <div className="leftSide3">
        <a href="/"  rel="stylesheet">
        <img src={home.logo} alt=""  style={{ width: 170 , height: 50 }} ></img>
        </a>
      </div>  
      <div className="rightSide3">
          
      
        {/* <Link style={{color:"#FFAC00", fontWeight:700 }} to="/"> HOME </Link> */}
            {/* <Link  className="mystyle" id="btn1" onClick={myFunction(1)} to="/about">ABOUT</Link> */}
            {/* <Link to="/services" > COURSES </Link> */}
            {/* <Link  onClick={myFunction(-1)} className="mystyle1" id="btn2"  to="/news"> NEWS </Link> */}
            {/* <Link to="/contact"> CONTACT </Link>   */}
            {
          primarylinkgroups &&
          primarylinkgroups.data &&
          primarylinkgroups.data.map((data, index) => { 
                      console.log("data", data);         
                      return (                                    
            <div className="toplinkc1"> 
             <Link  className="lin" id="success" to={data.urlSelected}>
              {data.menuTitle}</Link>
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