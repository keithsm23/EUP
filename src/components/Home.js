import React from "react";
import '../styles/Home.css';
import ss from '../assets/ss.png'

const Home = () => {
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
  </div>
   <div id="two" className="box">
    <h1>Latest News </h1>
    <h2>Campus Clean Workshop</h2>
  <br></br>
    <h2>Tech Summit</h2>
<br></br>
    <h2>Environment Conference</h2>

  </div>   
  </div>
</div>
 
};

export default Home;
