import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import axios from "axios";
import useFullPageLoader from "../hooks/useFullPageLoader";
import student from "../assets/student.png";
import { Link, useNavigate } from "react-router-dom";
import { CButton } from "@coreui/react";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { FaCalendar } from "react-icons/fa";
import swal from 'sweetalert';
import { fontFamily } from "@mui/system";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [settings, setSettings] = useState([]);
  const [pageData, setpageData] = useState([]);
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [input, setInput] = useState({
    slug: "",
    siteTitle: "",
    copyrightText: "",
    logo: "",
    heroBanner: "",
    publicationDate: "",
    title: "",
    description: "",
  });



  //fetch data
  const getAllData = async () => {
    // let getId = localStorage.getItem('PAGESLUG');
    // let id = getId;
    // console.log("slug id",id);
    const res = await axios  
      .get(
         `http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?slug=page2`
      )
      .then((res) => {     
        // console.log(res.data);
        setSettings(res.data);
        hideLoader();
      })
      .catch((err) => {
       swal('Page Not found')
      });
  };

  //display user list
  useEffect(() => {
    showLoader();
    getAllData();
  }, []);




 

  const AboutUs = async (id, slug) => {
    window.scrollTo({
      top: 0
    })
    localStorage.setItem('AboutID', JSON.stringify(id))
    showLoader();
    localStorage.setItem('AboutSLUG', slug)
    hideLoader();
    
    navigate("/AboutUs");
    // localStorage.setItem('PageID', JSON.stringify(id))
    // showLoader();
    // localStorage.setItem('PAGESLUG', slug)
    // hideLoader();
  };

  //time format
  const formateData = (blog) =>{
    var d = blog;
    let Date = d.split(' ')[0];
    let year = Date.split('-')[0];   
    let month = Date.split('-')[1]; 
    let day = Date.split('-')[2];
    let month_names_short =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let getMonth = month_names_short.filter((mon, i) => {
    if(month == i+1){ 
      return mon;
    } 
   });
    let convertedData = day+" "+getMonth[0]+" "+year;
    return convertedData; 
  };


  return (
    <div>
      { settings &&
        settings.pageData &&
        settings.pageData.map((home, i) => {
          let data = JSON.parse(home.description);
          {/* console.log("home", home, data); */}
          const htmlPuri = draftToHtmlPuri(data);
          return (
            <tr key={i}>
            
              {/* <td>{user.id}</td> */}
              <div className="body">
              
              {settings.data.map((data, index) => { 
                      {/* console.log("data", data);          */}
                      return (     
                        document.title = data.siteTitle,                          
           <img
                alt="" style={{ width: "1349px", height: "550px", position:"absolute"}}
                src={data.heroBanner}
              />             
            );
            })}   
               
              
             <div id="one" className="box">
                  <h3 style={{color:"rgba(7, 41, 77, 1)", fontFamily:"Roboto"}}>About Us</h3>
                  <h1 className="abouttitle">{home.title}</h1>
                  <tr>
                  
                    <div
                    
                      style={{ maxHeight: "400px", marginTop:"-14px"}}
                      dangerouslySetInnerHTML={{ __html: htmlPuri }}
                    />
                  </tr>

                  <br></br>
                 
                </div> 
               
                <div className="btn3">
                    <CButton
                      type="button"
                      onClick={()=>AboutUs(home.id, home.slug)}
                      className="button1"
                    >
                      Learn More
                    </CButton>
                  </div>

                <div className="latestnews">
                <br></br>
                <h1 style={{fontSize:"40px", marginLeft:"-15px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Latest News</h1>
                { settings && settings.latestNews && settings.latestNews.map((news, index) => { 
                  {/* console.log("news", news);  */}
                  let publishTime = formateData(news.publicationDate);   
                    return (
                      <div>                     
                        <div className="t">
                          <h5 style={{color:"#909090"}}><FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;&nbsp;&nbsp;
                            {publishTime}
                          </h5> 
                        
                           <h2 className="ti1">{news.title}</h2>  
                          <hr
                            className="line11"
                            width="80%"
                            size="1"
                            align="center"
                            color="lightgrey"
                          ></hr>                           
                        </div>
                      </div>                  
                      );
                  })
                
                }     
                </div>
               
                  <div id="three" className="box">
                        <img
                        src={student}
                        width="400px"
                        height="509px"
                        alt=""
                        ></img>
                  </div>                     
              </div>             
            </tr>
          );
        })}
      {loader}
    </div>
  );
};

export default Home;
