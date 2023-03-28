import React, {useEffect, useState, useMemo} from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/News.css";
import books from '../assets/books2.avif'

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
  CFormSelect
} from '@coreui/react'



export default function SingleNews() {
  const[blogs, setBlogs] = useState([]);
  
//fetch data
const getAllData = async (offset=0,limit=10)=>{

  let getToken = localStorage.getItem('token');
          
  const config={
    headers:{
        token: `${getToken}`,
        "Content-Type":"application/json",
    }
  };
    const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/getCommentData?contentId=11`,config)
    .then((res) => { 
    setBlogs(res.data.data.reverse());
    })
    .catch((err) =>{
    } );      
  };



  //display user list
  useEffect(()=>{
    let getToken = localStorage.getItem('token');
        
    const config={
    headers:{
        token: `${getToken}`,
        "Content-Type":"application/json",
    }
    }; 
    getAllData();
  },[]);

  return(
    <div className='container'>
    <img src={books} alt="hello" width="1348px" height="200px">
  </img>
    <div className="name"><h3>Comments</h3>
    </div>
      <div className="news data">
              {/* <CTableHeaderCell  width="160px" scope="col">#</CTableHeaderCell> */}
              <h1> Author</h1>
             <h1>Comment</h1>
             <h1>Date</h1>       
             
  
         {
            blogs && blogs.map((blog,i)=>{
                return(
                 
                  <tr key={i}>
                  {/* <td>{user.id}</td> */}
                  <td>{blog.commentAuthorName}</td>
                  <td>{blog.comments}</td>
                  <td>{blog.commentDate}</td>
                  </tr>           
                );
              })
         }
        </div>
        </div>             
  );
}
