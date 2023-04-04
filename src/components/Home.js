import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import axios from "axios";
import ss from "../assets/ss.png";
import useFullPageLoader from "../hooks/useFullPageLoader";
import student from "../assets/student.png";
import { Link, useNavigate } from "react-router-dom";
import { CButton } from "@coreui/react";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { FaCalendar } from "react-icons/fa";

const Home = () => {
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
    const res = await axios
      .get(
        `http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?id=1&slug=EUBIN`
      )
      .then((res) => {
        console.log(res.data);
        setSettings(res.data);
        hideLoader();
      })
      .catch((err) => {});
  };

  //display user list
  useEffect(() => {
    showLoader();
    getAllData();
  }, []);

  const AboutUs = async (e) => {
    e.preventDefault();
    navigate("/about");
  };

  return (
    <div className="home">
      { settings &&
        settings.pageData &&
        settings.pageData.map((home, i) => {
          let data = JSON.parse(home.description);
          console.log("home", home, data);
          const htmlPuri = draftToHtmlPuri(data);
          return (
            <tr key={i}>
              {/* <td>{user.id}</td> */}
              <div className="body">
           <img
                style={{ width: "1359px", height: "550px", position:"absolute"}}
                src={`data:image/png;base64,${home.image}`}
              />  

              
             <div id="one" className="box">
                  <h3>About Us</h3>
                  <h1>{home.slug}</h1>
                  <tr>
                    <div
                      style={{ maxHeight: "400px", overflow: "scroll", marginTop:"-14px"}}
                      dangerouslySetInnerHTML={{ __html: htmlPuri }}
                    />
                  </tr>

                  <br></br>
                  <div className="btn">
                    <CButton
                      type="button"
                      onClick={AboutUs}
                      className="button1"
                    >
                      Learn More
                    </CButton>
                  </div>
                </div> 
                {settings.latestNews.map((news, index) => { 
                    console.log("news", news);         
                    return (  
      
                      <div id="two" className="box">
                     <br></br><h1 className="newshead">Latest News</h1>

                      <div className="textt">
                        
                        <h5><FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;&nbsp;&nbsp;
                          {news.publicationDate}
                        </h5> 
                      
                        <h2>{news.title}</h2>
                               
                      </div>
                     
                     {/* <hr
                            className="line"
                            width="70%"
                            size="1"
                            align="center"
                            color="grey"
                          >
                       </hr>                     */}
                      </div>                  
                    );
                  })} 
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
