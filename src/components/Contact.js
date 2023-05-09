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



const Contact = () => {
const[contacts, setContacts] = useState([]);
const [loader, showLoader, hideLoader] = useFullPageLoader();
const[input,setInput] = useState({

});

const getAllData = async ()=>{

const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/page/get?slug=contacts`)
.then((res) => {
// console.log(res.data.data);
setContacts([res.data.data]);
hideLoader();
})
.catch((err) =>{
}); 
};

useEffect(()=>{
showLoader();
getAllData();
},[]);


return (
<div>
  <section>
  
  </section>
  <br></br>
  <section>
  {contacts && contacts.map((contact, i) => {
  let data = JSON.parse(contact.description);
  const htmlPuri = draftToHtmlPuri(data);
  // console.log(htmlPuri);
  {/* console.log('contact', contact); */}
  return (
  <div>
  <p>
  
{/* <Link style={{textDecoration:"none", fontWeight:"bold"}} to="/SingleNews"> {blog.title} </Link> */}
  
{/* <h2>{contact.title}</h2> */}
  
</p>
<div
 style={{backgroundImage: `url(data:image/png;base64,${contact && contact.image})`,
 height: "200px",
 width: "100%",
  }} 
>
                  <p className="md">{contact.title}</p> {" "}
                  <p className="md-1">Home/{contact.title}</p>
               </div>
  
 <td className='container3'><div dangerouslySetInnerHTML={{ __html: htmlPuri }} /></td>
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