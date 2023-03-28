import './App.css';
import React, { useEffect, useState } from  'react';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Home from "./components/Home";
import News from './components/News';
import Navbar from './components/Navbar';
import Header from './components/Header';
import SingleNews from './components/SingleNews'
import Contact from './components/Contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import axios from 'axios';

function App() {

  
  return (  
    <div className='app'>
    <BrowserRouter>
    <Header />
       <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />  
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singlenews" element={<SingleNews />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
 );
}

export default App;