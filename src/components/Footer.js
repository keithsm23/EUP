import React, { useState, useEffect } from "react";
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import "../styles/Footer.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import draftToHtmlPuri from "draftjs-to-html";
import useFullPageLoader from "../hooks/useFullPageLoader";
const routes=["Home", "AboutUs", ""];

function Footer(props) {
  let location= useLocation();
  const navigate = useNavigate();
  const[footer, setFooter] = useState([]);
  const[linkgroups, setLinkGroups] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const[settings, setSettings] = useState([]);
  const [primarylinkgroups, setPrimaryLinkGroups] = useState([]);
  
  
   //fetch footer link
   const getLinkGroups = async () => {
    const res = await axios
      .get(
         `http://api-cms-poc.iplatformsolutions.com/api/cmsMenu/fetchLinkGroups?menuGroupName=FOOTER LINK`
      )
      .then(async(res)  => {           
        setLinkGroups(res.data); 
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
    getLinkGroups();
  }, [location.key]);


  //fetch data
  const getAllData = async ()=>{
    // let getId = localStorage.getItem('PAGESLUG');
    // let id = getId;
    // console.log("slug id",id);
    const res=await axios
    .get(
       `http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?slug=page2`
    )
    .then((res) => { 
      // console.log(res)
    setFooter(res.data.data);
   
    })
    .catch((err) =>{
    } );      
    };

  //display user list
  useEffect(()=>{
    getAllData();
  },[]);


  // const ScrollUp=()=>{
  //   window.scrollTo({
  //     top: 0
  //   })
  // }

  const NewPage=async(pageSelect)=>{
    window.scrollTo({
      top: 0
    })
  
    navigate('/page');
    showLoader();
    localStorage.setItem('Page', pageSelect)
    hideLoader();
  }

  const handleItemClick = (data) => {
    setSelectedButton(data);
    localStorage.setItem('currentIndex', JSON.stringify(data))
  };

  return (   
   
  <div>
  {
    footer && footer.map((footer,i)=>{
    {/* console.log(footer); */}
    const htmlPuri = draftToHtmlPuri(footer);
    {/* console.log(htmlPuri); */}

     

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
   
        {/* <Link to="/" onClick={ScrollUp} > HOME </Link> */}
        {linkgroups &&
      linkgroups.data &&
      linkgroups.data.slice(0,8).map((data, index) => { 
        {/* console.log("index === selectedButton", index, selectedButton)    */}
        return (                                   
          <div className="apifooter">
            <Link className="aaa" 
            style={{ color: index === selectedButton ? " #FFAC00 " : "white" }}
            to={data.urlSelected===null ? data.pageSelect :data.urlSelected}   
            onClick={()=>{NewPage(data.pageSelect);handleItemClick(index)}}>
            {data.menuTitle}
            </Link>     
          </div>        
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