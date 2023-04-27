import React, {useEffect, useState, useMemo} from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import useFullPageLoader from '../hooks/useFullPageLoader';
import '../styles/AboutUs.css';
// import useFullPageLoader from "src/hooks/useFullPageLoader";

import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";

import Footer from './Footer';

import {
  CButton,
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
} from '@coreui/react'

  
const AboutUs = () => {
    // console.log("props", props);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const[settings, setSettings]=useState([]);
    const[pages, setPages] = useState([]);
    const[input,setInput] = useState({
      title:"",
      slug:"",
      author:"",
      description:"",
      content:"",
      status:0,
      accessLevel:"",
      seoTitle:"",
      seoDescription:"",
      seoKeywords:"",
      parentId:0,
      publicationDate:""
      });

  const getAllData = async ()=>{
    // let getId = localStorage.getItem('PAGESLUG');
    // let id = getId;
    // console.log("slug id",id);
     const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/page/get?slug=page2`)
    .then((res) => { 
      console.log(res.data.data);
    setPages([res.data.data]);
    hideLoader();
    })
    .catch((err) =>{
    } );      
  };

  useEffect(()=>{
   showLoader();
   getAllData();
  },[]);

  return ( 
      <div >
        { ( pages && pages.map((page,i)=>
           {
          let data=JSON.parse(page.description)
           const htmlPuri = draftToHtmlPuri(data);
            console.log(htmlPuri); 
            console.log(page);
            return(
              <tr key={i} >       
              
                <div style={{
                   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${page && page.image})`,
                   height: "200px",
                   width: "1359px",
                   marginTop:"-20px"
                  }}
                  >
                  <p className="md">About Us</p>{" "}
                  <p className="md-1">Home/About Us</p>
               </div>
               </tr>
               );
        })
      )}    
      
      { ( pages && pages.map((page,i)=>
           {
          let data=JSON.parse(page.description)
           const htmlPuri = draftToHtmlPuri(data);
            console.log(htmlPuri); 
            console.log(page);

            return(
              <div className='aboutcontent'>
              <tr>
              <div  dangerouslySetInnerHTML={{ __html: htmlPuri }}/> 
              </tr>
              </div>
    
              )
            }
           )
         )}
  
        {loader}
      </div>    
    ); 
  };

  export default AboutUs;
