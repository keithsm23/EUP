import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import "../styles/Header.css";
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import { FaPhoneAlt } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';
import draftToHtmlPuri from "draftjs-to-html";
import useFullPageLoader from "../hooks/useFullPageLoader";
import { useSyncExternalStore } from "react";
import swal from 'sweetalert';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu
} from '@coreui/react';
const routes=["Home", "AboutUs", ""];

function Header(props) {
  const location= useLocation();
  const navigate = useNavigate();
  const[page, setPage] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [menus, setMenus] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [linkgroups, setLinkGroups] = useState([]);
  const [primarylinkgroups, setPrimaryLinkGroups] = useState([]);
  const [openLinks, setOpenLinks] = useState(false);
  const[settings, setSettings] = useState([]);
  const[headermenu, setHeaderMenu]=useState([]);
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


    //fetch top link
    const getLinkGroups = async () => {
      const res = await axios
        .get(
          `http://api-cms-poc.iplatformsolutions.com/api/cmsMenu/fetchLinkGroups?menuGroupName=TOP LINK`
        )
        .then((res) => {
          
          // console.log(res.data);
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
        .then(async(res)  => {           
            setPrimaryLinkGroups(res.data); 
             let getIndex = localStorage.getItem('currentIndex');
             if(getIndex !== null){
              let value = JSON.parse(getIndex);
              if(location.pathname === '/'){
                setSelectedButton(0)
                localStorage.setItem('currentIndex', JSON.stringify(0))
              }
              else if(location.pathname === '/AboutUs'){
                
                setSelectedButton(2);
                localStorage.setItem('currentIndex', JSON.stringify(2))
              }
              
              else{
                setSelectedButton(value)
              }
             }else{
               selectedButton(0)
             }    
        })
        .catch((err) => {});
    };
  
    //display user list
    useEffect(() => {
      getPrimaryLinkGroups();
    }, [location.key]);



  //fetch page data
  const getAllData = async ()=>{
    // let getId = localStorage.getItem('PAGESLUG');
    // let id = getId;
    // console.log("slug id",id);
     const res=await axios
    .get(`http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?slug=page2`
    )
      .then((res) => { 
        // console.log(res)
      setSettings(res.data.data);
     
      })
      .catch((err) =>{
      } );      
    };

  //display user list
  useEffect(()=>{
    getAllData();
  },[]);
  
  //go to new page
  const NewPage=async(pageSelect)=>{  
      navigate(`/page`);
      showLoader(); 
      localStorage.setItem('Page', pageSelect);
      hideLoader();
  }

  const handleItemClick = (data) => {
    setSelectedButton(data);
    localStorage.setItem('currentIndex', JSON.stringify(data))
  };


  

 
  return ( <div>
     {
        settings && 
        settings.map((home,i)=>{
        {/* console.log(home); */}
        const htmlPuri = draftToHtmlPuri(home);
        {/* console.log(htmlPuri); */}

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
           
          {linkgroups &&
            linkgroups.data &&
            linkgroups.data.slice(0,4).map((data, index) => { 
              {/* console.log("data", data);          */}
              return ( 
                                     
              <div className="menutitlee">
                  <h4><Link style={{color:"rgb(221, 182, 10)" }} to={data.pageSelect===null ? data.urlSelected : data.pageSelect} onClick={()=>{NewPage(data.pageSelect)}}>
                  {data.menuTitle}</Link> </h4>            
               </div>  
              
         
            );
            })}
          </div> 
        </div>


    
        <div className="navbar">
        <div className="leftSide3">
        <a href="/"  rel="stylesheet">
        <img src={home.logo} alt=""  style={{  width: "100%", height: 50 }} ></img>
        </a>
        </div>  
        <div className="rightSide3"  >  
            {
            primarylinkgroups &&
            primarylinkgroups.data &&
            primarylinkgroups.data.slice(0,8).map((data, index) => { 
             {/* console.log("index === selectedButton", index, selectedButton)    */}
            return (       
                                         
              <div className="toplinkc1" data-toggle="collapse" data-target="#myNavbar">
          
              
                <Link  className="lin" style={{ color: index === selectedButton ? " #FFAC00 " : "black" }}
                to={data.urlSelected===null ? data.pageSelect :data.urlSelected} 
                onClick={()=>{NewPage(data.pageSelect);handleItemClick(index)}}>
                {data.menuTitle} 
    
              </Link> 
      
             
          
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