import React, {useEffect, useState, useMemo} from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import useFullPageLoader from '../hooks/useFullPageLoader';
import '../styles/Page.css';
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

  
const Page = () => {
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
    let getId = localStorage.getItem('Page');
    let id = getId;
    console.log("Page", id);
  
     const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/page/get?slug=${id}`)
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
      
    
      <div>
      
       <section >
       
        { ( pages && pages.map((page,i)=>
           {
          let data=JSON.parse(page.description)
           const htmlPuri = draftToHtmlPuri(data);
            console.log(htmlPuri); 
            console.log(page);
            return(

           
              <div className='about12'>
                {/* <section>
                <img className='bg-img' src={`data:image/png;base64,${page.image}`} />

                <p className='md'>{page.title}</p>
                </section> */}
                <div style={{
                   backgroundImage: `url(${page && page.image})`,
                   height: "200px",
                   width: "1359px",
                  }}
                  >
                  <p className="mda">{page.title}</p>{" "}
                  <p className="md-1a">Home/{page.title}</p>
               </div>
              {/* <p>
              <Link style={{textDecoration:"none", fontWeight:"bold"}} to="/SingleNews"> {blog.title} </Link> 
               <h2 className='container2'> {page.title}</h2></p> */}
               <br></br>
               <br></br>
              <div className='aboutcontent13'>
              <tr>
        
              <div className='ac13' dangerouslySetInnerHTML={{ __html: htmlPuri }}/> 
              </tr>
              </div>

              </div>
              )
            }
           )
         )}
        </section>
        {loader}
      </div>
      
    );
    
  };

  export default Page;