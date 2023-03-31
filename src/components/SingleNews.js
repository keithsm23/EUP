import React, {useEffect, useState, useMemo} from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/SingleNews.css";
import u86 from '../assets/u86.png';
import book from '../assets/book.jpg';
import laptop from '../assets/laptop.png';
import useFullPageLoader from '../hooks/useFullPageLoader';
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { FaCalendar,  FaUser  } from "react-icons/fa";
import { SocialIcon } from 'react-social-icons';
import books from '../assets/books2.avif';
import {
  CButton,
  CCard,
  CCardHeader,
  CCol,
  CFormTextarea,
  CRow,
  CTable,
  CTableRow,
  CFormSelect,
} from '@coreui/react'




export default function SingleNews() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const[blogs, setBlogs] = useState([]);
  const[input,setInput] = useState({
    title:"",
    slug:"",
    authorName:"",
    publicationDate:"",
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
const getAllData = async ()=>{

  
    const res=await axios
    .get(
      `http://api-cms-poc.iplatformsolutions.com/api/blog/getData?slug=Education/blog`
      )
    .then((res) => {
      console.log(res); 
    setBlogs(res.data);
    })
    .catch((err) =>{} );      
  };



  //display blogs and comments
  useEffect(()=>{

    getAllData();
  },[]);

  return ( 
  
    <div> 


        <section className="bg-img2">
         <p className='md'>NEWS</p>
         <p className='md-1'>Home/Blog</p>
         </section>

      {
          blogs && blogs.map((blog,i)=>{
          console.log("blog", blog);
          const htmlPuri = draftToHtmlPuri(blog);
          console.log(htmlPuri);

          return(
            
          <tr key={i}>
       <td>{blog.title}</td>
          </tr>         
          );
        })
     }   



   <div id="wrapper11">
   <div id="onesn"  className="boxsn">
   <img id="u86_img1" alt="" className="img1" src={u86}></img> 
  
   
 
  </div> 
   <div id="twosn" className="boxsn">
    
    <h1 style={{ color:"darkblue"}}   className="text1">Popular Posts </h1> 
    
    <img id="book" style={{float:"left"}} alt="" className="img3" src={book}></img>  
    <h2 style={{float:"right"}}  className="text2">Introduction to <br></br>languages</h2> 
    <h5 style={{float:"right"}}  className="text3">25 Dec 2018 </h5>  
  
    <img id="book2" style={{float:"left"}} alt="" className="img3" src={laptop}></img> 
     <h2 style={{float:"right"}}  className="text4">How to build <br></br>a game with Java</h2> 
     <h5 style={{float:"right"}}  className="text5">25 Dec 2018 </h5>  

     <img id="book3" style={{float:"left"}} alt="" className="img3" src={book}></img> 
     <h2 style={{float:"right"}}  className="text6">How to build <br></br>a game with Java</h2> 
     <h5 style={{float:"right"}}  className="text7">25 Dec 2018 </h5>  

  </div> 
  <div id="threesn" className="boxsn">
  <p> 
     <h2 > Few tips to get better results in examination</h2>
     <h5><FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;25 Dec 2018 &nbsp;&nbsp;&nbsp;<FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser>  Mark Anthem</h5></p>
     <p>
      
      Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci 
     elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus 
     a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus .
      <br></br><br></br>
     gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons equat
      ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
       Morbi accumsan ipsum velit. Nam nec tellus .<br></br><br></br>
  
    gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons equat ipsutis 
    sem nibh id elit.Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan
    ipsum velit. Nam nec tellus .
     </p>
  <br>
  </br>
  <br></br>

  <p style={{ fontWeight:"bold"}}>&nbsp;&nbsp;&nbsp;&nbsp;Share: &nbsp;
  <SocialIcon bgColor="darkblue" fgColor ="white" style={{ height: 35, width: 35 }} url="https://facebook.com" />&nbsp;&nbsp;
    <SocialIcon bgColor="#00CED1"  fgColor ="white" style={{ height: 35, width: 35 }} url="https://twitter.com" />&nbsp;&nbsp;
    <SocialIcon bgColor="red"  fgColor ="white" style={{ height: 35, width: 35 }} url="https://google.com" />&nbsp;&nbsp;
    <SocialIcon bgColor="#B94366 "  fgColor ="white" style={{ height: 35, width: 35 }} url="https://instagram.com" />&nbsp;&nbsp;
    <SocialIcon bgColor="#0077B5"  fgColor ="white" style={{ height: 35, width: 35 }} url="https://linkedin.com" />&nbsp;&nbsp;
  </p>   

  </div>  
  <div id="comment" className="boxsn">
  <hr width="98%" 
        size="1" 
        align="left"  color="grey"></hr>
    <h2>Comment(3)</h2>
    <h5>25 Dec 2018 &nbsp;&nbsp;&nbsp;  Bobby Aktar</h5>
    
    <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons
     equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
      Morbi accumsan ipsum velit. Nam nec tellus .
    </p>
    <br></br>
   
    <h5>25 Dec 2018 &nbsp;&nbsp;&nbsp;  Bobby Aktar</h5>
    <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons
     equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
      Morbi accumsan ipsum velit. Nam nec tellus .
      </p>
      <hr width="80%" 
        size="1" 
        align="left"  color="grey"></hr>
  </div> 
  <div id="leaveacomment" className="boxsn">
    <h2>Leave  a Comment:</h2>
    <br></br>
  
    <input 
      type="text" 
      placeholder="Name">
    </input>
    &nbsp;
    &nbsp;
    <input 
      type="text" 
      placeholder='email'>
      </input>
    <br>
    </br><br></br>
    <CFormTextarea  width="200px"  className='commentfield' placeholder='comment'></CFormTextarea>
    <br></br> 
    <br></br>
    <CButton className='button'>Submit</CButton>
  </div>  
  </div>
 
</div>
         
  );
}
