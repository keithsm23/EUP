import './App.css';
import React, { useEffect, useState } from  'react';
// import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Home from "./components/Home";
import News from './components/News';
import Header from './components/Header';
import SingleNews from './components/SingleNews'
import Contact from './components/Contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import AboutUs from './components/AboutUs';
import { Link, useNavigate } from "react-router-dom";



import axios from 'axios';

function App() {
  const [menus, setMenus] = useState([]);


  //fetch link
  // const getAllData = async () => {
  //   const res = await axios
  //     .get(
  //       `http://api-cms-poc.iplatformsolutions.com/api/cmsMenu/fetch`
  //     )
  //     .then((res) => {
        
  //       console.log(res.data);
  //       setMenus(res.data);
       
  //     })
  //     .catch((err) => {});
  // };

  // //display user list
  // useEffect(() => {
    
  //   getAllData();
  // }, []);

  
  return (  
    <div className='app'>
     
    <BrowserRouter>
    <Header />    
    <Routes>
        <Route exact path="/" element={<Home />} />    
        <Route path="/services" element={<Services/>} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/singlenews" element={<SingleNews />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
 );
}

export default App;