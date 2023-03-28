import React, {useEffect, useState, useMemo} from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/AboutUs.css';
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


// const data = [
//     {
//         question: "What is Lorem Ipsum?",
//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//     },
//     {
//         question: "What is Lorem Ipsum?",
//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//     },
//     {
//         question: "What is Lorem Ipsum?",
//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//     },
//     {
//         question: "What is Lorem Ipsum?",
//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//     },
//   ]

  
const AboutUs = () => {
    // console.log("props", props);
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

  //     // let getToken = localStorage.getItem('token');
              
  //     // const config={
  //     //   headers:{
  //     //       token: `${getToken}`,
  //     //       "Content-Type":"application/json",
  //     //   }
  //     // };

      const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/page/view?slug=mklp`)
    .then((res) => { 
    setPages(res.data.data.reverse());
    })
    .catch((err) =>{
    } );      
  };

  useEffect(()=>{
  //   let getToken = localStorage.getItem('token');
        
  //   const config={
  //   headers:{
  //       token: `${getToken}`,
  //       "Content-Type":"application/json",
  //   }
  //   }; 
   getAllData();
  },[]);
  
//   const myStyle={
//     backgroundImage: "https://i.pinimg.com/originals/f0/da/44/f0da44dc8397004b068f49242b24ee74.jpg",
//     height:'100vh',
//     marginTop:'-70px',
//     fontSize:'50px',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
// };

    return (
      
    
      <div>
       <section className="bg-img">
         <p className='md'>SAMPLE PAGE</p>
         <p className='md-1'>Home/Sample Page</p>
       </section>
        <section >
        {/* { data.map((news, i) => {
          return (
            <div >
              <p className="container2">{news.question}</p>
              <p className="container3">{news.answer}</p>
            </div>
          );
        })} */}
        { ( pages && pages.map((page,i)=>
           {
              <div id="two1" className="box1">
              <p>
              {/* <Link style={{textDecoration:"none", fontWeight:"bold"}} to="/SingleNews"> {blog.title} </Link> */}
              <h6> {page.title}</h6></p>
              <p>{page.content}</p>
              </div>
            }
           )
         )}
        </section>
      </div>
    );
    
  };

  export default AboutUs;