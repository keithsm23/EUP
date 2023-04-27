import './App.css';
import React, { useEffect, useState,  Suspense } from  'react';
import { CSpinner } from '@coreui/react'
import Header from './components/Header';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Footer from "./components/Footer";
import PublicRoutes from './components/PublicRoutes';
import {  useNavigat } from "react-router-dom";


const Home = React.lazy(() => import('./components/Home'))
const AboutUs = React.lazy(() => import('./components/AboutUs'))
const Services = React.lazy(() => import('./components/Services'))
const News = React.lazy(() => import('./components/News/News'))
const SingleNews = React.lazy(() => import('./components/News/SingleNews'))
const Contact = React.lazy(() => import('./components/Contact'))
const Page = React.lazy(() => import('./components/Page'))
function App() {

  
  return (  
    <div className='app'>
     
    <BrowserRouter>
    <Suspense fallback={<CSpinner color="primary"/>}>
    <Header />    
    <Routes>
        <Route path="/" element={<Home />}  />               
        <Route path="/news" element={<News />} />
        <Route path="/News/singlenews" element={<SingleNews />} />   
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/page" element={<Page />} /> 
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} /> */}
      </Routes>  
      <Footer />
      </Suspense>
    </BrowserRouter>
    </div>
 );
}

export default App;