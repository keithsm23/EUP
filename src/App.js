import './App.css';
import React, { useEffect, useState } from  'react';
import About from './components/About';
import Courses from './components/Courses';
import Home from "./components/Home";
import News from './components/News';
import Navbar from './components/Navbar';
import Header from './components/Header';
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
        <Route path="/"  element={<Home />} /> 
        <Route path="/about" element={<About/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
 );
}

export default App;