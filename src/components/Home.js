import React,{ useEffect, useState }from "react";
import '../styles/Home.css';
import axios from 'axios';
import ss from '../assets/ss.png';
import student from '../assets/student.png';
import { Link } from "react-router-dom";
import { CButton } from '@coreui/react'
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { FaCalendar } from "react-icons/fa";


const Home = () => {
  const[settings, setSettings] = useState([]);
  const[input,setInput] = useState({
    slug:"",
    siteTitle:"",
    facebookLink:"",
    twitterLink:"",
    youtubeLink:"",
    linkedLink:"",
    copyrightText:"",
    phoneNumber:"",
    email:"",
    logo:""
  });

  //fetch data
  const getAllData = async ()=>{
   
    const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?id=1&slug=newPage`)
      .then((res) => { 
        console.log(res)
      setSettings(res.data.data.reverse());
     
      })
      .catch((err) =>{
      } );      
    };

  //display user list
  useEffect(()=>{
    
    getAllData();
  },[]);

  return <div> 
  <img src={ss} width="1348px" height="470px"  alt="">
  </img>
  <div id="wrapper">
   <div id="one"  className="box">
   <h3>About Us</h3>
    <h1>Welcome To Edubin</h1>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, 
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
      containing Lorem Ipsum passages,and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <br>
    </br>
    <div className="btn">
    <CButton className="button1">Learn More</CButton>
    </div>
  </div> 
   <div id="two" className="box">
    
    <h1  className="text01">Latest News </h1> 
    
    <h6 className="text01"><FaCalendar></FaCalendar>&nbsp;&nbsp;&nbsp;25 Dec 2018</h6>  
    <h2 className="text1">Campus Clean Workshop</h2>
    <hr width="90%" 
        size="1" 
        align="center"  color="grey"></hr>
   
    <h6 className="text02"><FaCalendar></FaCalendar>&nbsp;&nbsp;&nbsp;4 Feb 2019</h6> 
    <h2 className="text2">Tech Summit</h2>
    <hr width="90%" 
        size="1" 
        align="center"  color="grey"></hr>

    <h6 className="text03"><FaCalendar></FaCalendar>&nbsp;&nbsp;&nbsp;9 May 2019 </h6> 
    <h2 className="text3">Environment Conference</h2>

  </div> 
  <div id="three" className="box">
  <img src={student} width="410px" height="610px"  alt="">
  </img>
  </div>     
  </div>
</div>
 
};

export default Home;
