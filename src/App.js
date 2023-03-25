import './App.css';
import React from 'react';
import Home from "./Home";
import News from './components/News';
import Navbar from './components/Navbar'
import Contact from './components/Contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";




function App() {

  return (  
    <div className='app'>
    <BrowserRouter>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
