import React,{ useEffect, useState }from "react";
import '../styles/Home.css';
import axios from 'axios';
import ss from '../assets/ss.png';
import useFullPageLoader from '../hooks/useFullPageLoader';
import student from '../assets/student.png';
import { Link, useNavigate} from "react-router-dom";
import { CButton } from '@coreui/react'
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { FaCalendar } from "react-icons/fa";


const Home = () => {
  const[settings, setSettings] = useState([]);
  const[pageData, setpageData]= useState([]);
  const navigate = useNavigate()
  const[pages,setPages]=useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const[input,setInput] = useState({
    slug:"",
    siteTitle:"",
    copyrightText:"",
    logo:"",
    heroBanner:"",
    publicationDate:"",
    title:"",
    description:""
  });

  //fetch data
  const getAllData = async ()=>{
   
    const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?id=1&slug=newPage`)
      .then((res) => { 
 
      setSettings(res.data.data.reverse());
      setSettings(res.data.latestNews.reverse());
    setSettings(res.data.pageData.reverse());
      hideLoader();
      })
      .catch((err) =>{
      } );      
    };

  //display user list
  useEffect(()=>{
    showLoader();
    getAllData();
  },[]);


  const AboutUs=async(e)=>{
    e.preventDefault();
    navigate('/about');
  }

  return ( <div> 
  {
          settings && settings.map((home,i)=>{
          //let data=JSON.parse(home.content)
          console.log(home);
          console.log(pageData.description)
          const htmlPuri = draftToHtmlPuri(home);
          console.log(htmlPuri);

          return(
            
          <tr key={i}>
          {/* <td>{user.id}</td> */}
       
          <img width="1348px" height="470px"  src={`data:image/png;base64,${home.heroBanner}`} />
      


          <div id="wrapper">
          <div id="one"  className="box">
            <h3>About Us</h3>
            <h1>{home.slug}</h1>
            <p>     
           {home.description} 
            </p>
            <br>
            </br>
            <div className="btn">
              <CButton type="button" onClick={AboutUs} className="button1">Learn More</CButton>
            </div>
          </div> 


          <div id="two" className="box">
    
            <h1  className="text01">Latest News </h1> 
    
            <h6 className="text01"><FaCalendar></FaCalendar>&nbsp;&nbsp;&nbsp;{home.publicationDate}</h6>  
            <h2 className="text1">{home.title}</h2>
            <hr width="90%" 
            size="1" 
            align="center"  color="grey"></hr>
{/*    
            <h6 className="text02"><FaCalendar></FaCalendar>&nbsp;&nbsp;&nbsp;4 Feb 2019</h6> 
            <h2 className="text2">Tech Summit</h2>
            <hr width="90%" 
              size="1" 
              align="center"  color="grey"></hr>

            <h6 className="text03"><FaCalendar></FaCalendar>&nbsp;&nbsp;&nbsp;9 May 2019 </h6> 
            <h2 className="text3">Environment Conference</h2> */}

          </div> 


          <div id="three" className="box">
          <img src={student} width="410px" height="610px"  alt="">
          </img>
          </div>     
          </div>
          </tr>                  
          );
        })
        
   }
   {loader}
</div>
  );
}

export default Home;

