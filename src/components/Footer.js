import React, { useState, useEffect } from "react";
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import "../styles/Footer.css";
import { Link, useNavigate } from "react-router-dom";
import draftToHtmlPuri from "draftjs-to-html";
import useFullPageLoader from "../hooks/useFullPageLoader";


function Footer() {
  const navigate = useNavigate();
  const[footer, setFooter] = useState([]);
  const[linkgroups, setLinkGroups] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const[settings, setSettings] = useState([]);
  const [primarylinkgroups, setPrimaryLinkGroups] = useState([]);
  
  
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


  // const ScrollUp=()=>{
  //   window.scrollTo({
  //     top: 0
  //   })
  // }

  const NewPage=async(pageSelect)=>{
    window.scrollTo({
      top: 0
    })
    // primarylinkgroups &&
    // primarylinkgroups.data &&
    // primarylinkgroups.data.map((data, index) => { 
    //             console.log("data", data);         
    //             return (  
    //               <div>  if(data.urlSelected===null){
    //                 navigate('/page')
    //               }  <Link to={data.urlSelected}></Link> </div>                                  

                        
    // );
    // })
    navigate('/page');
    showLoader();
    localStorage.setItem('Page', pageSelect)
    hideLoader();
  }

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
   
        {/* <Link to="/" onClick={ScrollUp} > HOME </Link> */}
        {linkgroups &&
      linkgroups.data &&
      linkgroups.data.slice(0,8).map((data, index) => { 
        console.log("data", data);         
        return (                                   
          <div className="apifooter">
            <Link className="aaa" to={data.urlSelected===null ? '/page' :data.urlSelected}  onClick={()=>{NewPage(data.pageSelect)}}>
            {data.menuTitle}</Link>      
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