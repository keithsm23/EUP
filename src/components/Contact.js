import React, {useEffect, useState, useMemo} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/AboutUs.css';
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import useFullPageLoader from '../hooks/useFullPageLoader';
import '../styles/contact.css';


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


// const data = [

// {

//         question: "What is Lorem Ipsum?",

//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

//     },

//     {

//         question: "What is Lorem Ipsum?",

//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

//     },

//     {

//         question: "What is Lorem Ipsum?",

//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

//     },
// {
// question: "What is Lorem Ipsum?",
// answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
// },
// ]


const Contact = () => {
const[contacts, setContacts] = useState([]);
const [loader, showLoader, hideLoader] = useFullPageLoader();
const[input,setInput] = useState({

});

const getAllData = async ()=>{

const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/page/get?slug=contact`)
.then((res) => {
console.log(res.data.data);
setContacts([res.data.data]);
hideLoader();
})
.catch((err) =>{
}); 
};

useEffect(()=>{
  showLoader();

//   let getToken = localStorage.getItem('token');
//   const config={
//   headers:{
//       token: `${getToken}`,
//       "Content-Type":"application/json",
//   }
//   };

getAllData();
},[]);

//   const myStyle={

//     backgroundImage: "https://i.pinimg.com/originals/f0/da/44/f0da44dc8397004b068f49242b24ee74.jpg",

//     height:'100vh',

//     marginTop:'-70px',

//     fontSize:'50px',

//     backgroundSize: 'cover',

//     backgroundRepeat: 'no-repeat',

// };
return (
<div>
  <section className="bg-img">
  {/* <div
  
            style={{
  
              backgroundImage: `url(data:image/png;base64,${
  
                contacts && contacts[0].image
  
              })`,
  
            }}
  
          >
  
              <p className="md">Contact</p>  <p className="md-1">Home/Contact</p>
  
          </div> */}
  <p className="md">Contact</p>{" "}
  <p className="md-1">Home/Contact</p>
  
  </section>
  <br></br>
  <section>
  {contacts && contacts.map((contact, i) => {
  let data = JSON.parse(contact.description);
  const htmlPuri = draftToHtmlPuri(data);
  // console.log(htmlPuri);
  console.log('contact', contact);
  return (
  <div className="container3">
  <p>
  
{/* <Link style={{textDecoration:"none", fontWeight:"bold"}} to="/SingleNews"> {blog.title} </Link> */}
  
<h2>{contact.title}</h2>
  
</p>
<div
 style={{backgroundImage: `url(data:image/png;base64,${contact && contact.image})`,
 height: "400px",
 width: "400px",
  }} 
>

  
  </div>
 
  
  <div dangerouslySetInnerHTML={{ __html: htmlPuri }} />
  {" "}

  </div>
  );
  })}
  </section>
  {loader}
  </div>
);
};
export default Contact;