import React, {useEffect, useState, useMemo} from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/News.css";
import books from '../assets/books2.avif';
import u86 from '../assets/u86.png';
import ReactPaginate from 'react-paginate';
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

import { darken } from '@mui/system';



export default function News() {
  const[blogs, setBlogs] = useState([]);
  const[totalCount, setTotalCount]=useState(null);
  const[page, setPage]=useState(0);
  const[input,setInput] = useState({
    title:"",
    slug:"",
    author:"",
    content:"",
    status:"",
    accessLevel:"",
    seoTitle:"", 
    seoDescription:"",
    seoKeywords:"",
    commentsEnabled:"",
    commentsCount:"",
    featuredImage:""
  });
  
//fetch data
const getAllData = async (offset=0,limit=10)=>{

    const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/blog/getData?slug=ss`)
    .then((res) => { 
    setBlogs(res.data.data.reverse());
    })
    .catch((err) =>{
    } );      
  };

   //pagination
   const handlePageClick = (event) => {
    setPage(event.selected);
    let count = event.selected*10;
    getAllData(count, count+10);     
  };


  //display user list
  useEffect(()=>{
    
    getAllData();
  },[]);

  return(
    <div > 
    <div className='pic' >
    <div className='text'>
    <p  style={{color:" white" }} >
    <h1>News</h1>
   <h4>Home/News</h4></p>
    </div>
   </div>
    
    <div id="wrapper1">
    <div id="u86" class="ax_default image">
         <p></p>
        </div>
    
     <div id="one1" className="box1">
      
      <img id="u86_img" alt="" className="img " src={u86}></img>
      
    </div> 
    { ( blogs && blogs.map((blog,i)=>
    {

     <div id="two1" className="box1">
     <p> 
     <Link style={{textDecoration:"none", fontWeight:"bold"}} to="/SingleNews"> {blog.title} </Link>
     <h6>25 Dec 2018 &nbsp;&nbsp;&nbsp; {blog.author}</h6></p>
     <p>
      {blog.content}
     </p>
    </div>  

      }
     )
    )} 
    </div>



    <div id="wrapper2">
    <div id="u86" class="ax_default image">
    
          <p></p>
        </div>
    
     <div id="one2" className="box2">
      
      <img id="u86_img" className="img " src={u86}></img>
      
    </div>
     <div id="two2" className="box2">
     <p><span>Few tips to get better results in examination</span>
     <h6>25 Dec 2018 &nbsp;&nbsp;&nbsp; Mark Anthem</h6></p>
     <p>
     Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci 
     elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus 
     a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus .
     </p>
    </div>   
    </div>


    <div id="wrapper3">
    <div  id="u86" class="ax_default image">
    
          <p></p>
        </div>
    
     <div id="one3" className="box3">
      
      <img id="u86_img" className="img " src={u86}></img>
      
    </div>
     <div id="two3" className="box3">
     <p><span>Few tips for get better results in examination</span>
     <h6>25 Dec 2018 &nbsp;&nbsp;&nbsp; Mark Anthem</h6></p>
     <p>
     Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci 
     elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus 
     a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus .
     </p>
    </div>   
    </div>
    <div style={{display: 'flex'}}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={totalCount}
        previousLabel="previous"
        previousClassName={"previousClassName"}
        nextClassName={"nextClassName"}
        pageClassName={"pageClassName"}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        activeClassName={"activeClassName"}
        forcePage={page}
       /> 
      </div>
    
    
  </div>          
  );
}
