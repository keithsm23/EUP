import React, { useEffect, useState } from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/News.css";
import ss from "../assets/ss.png";
import books from '../assets/books2.avif';
import u86 from '../assets/u86.png';
import useFullPageLoader from '../hooks/useFullPageLoader';
import ReactPaginate from 'react-paginate';
import { FaCalendar, FaUser } from "react-icons/fa";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";

export default function News() {
  let PageSize = 10;
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const[blogs, setBlogs] = useState([]);
  const[totalCount, setTotalCount]=useState(null);
  const[page, setPage]=useState(0);
  const[input,setInput] = useState({
    title:"",
    slug:"",
    authorName:"",
    publicationDate:"",
    content:"",
    status:"",
    accessLevel:"",
    seoTitle:"", 
    seoDescription:"",
    seoKeywords:"",
    commentsEnabled:"",
    commentsCount:"",
    featuredImage:""
  });
  
//fetch data
const getAllData = async (offset=0,limit=3)=>{

  const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/blog/allBlog?offset=${offset}&limit=${limit}`)
    .then((res) => { 
     
    setBlogs(res.data.data.reverse());
    hideLoader();
    if(res && res.data && res.data.totalCount)
    {
      setTotalCount(Math.ceil(res.data.totalCount/3));
    }
    console.log(res);
    })
    .catch((err) =>{
    } );      
  };

   //pagination
   const handlePageClick = (event) => {
    setPage(event.selected);
    let count = event.selected*3;
    getAllData(count, count+3);     
  };


  //display user list
  useEffect(()=>{
    showLoader();
    
    getAllData();
  },[]);

  return(
    <>
    <div> 

      {/* <img className="bg-img1" src={ss}>
         <p className='md'>NEWS</p>
         <p className='md-1'>Home/Blog</p> 
       </img> */}
    <div className='wrappermain'>


    {
          blogs && blogs.map((blog,i)=>{
          let data=JSON.parse(blog.content)
          console.log(blog);
          const htmlPuri = draftToHtmlPuri(data);
          console.log(htmlPuri);

          return(
            
            
          <tr key={i}>
          {/* <td>{user.id}</td> */}   
          <div style={{
                   backgroundImage: `url(${page && page.image})`,
                   height: "200px",
                   width: "100%",
                  }} className='bg-img1'
                  >
                  <p className="md">{page.title}</p> {" "}
                  <p className="md-1">Home/{page.title}</p>
               </div>

            <img  className='featuredImage' src={blog.featuredImage} /> 
        


          <div className='title'><h2><td><Link style={{"text-decoration":"none"}} to="/SingleNews">{blog.title}</Link></td></h2> </div>  
    
       <div className='author'><h5> <td> <FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser>&nbsp; 
       {blog.authorName} &nbsp;<FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;
       {blog.publicationDate}</td> </h5>
       </div> 
   <br></br>
           <div className='newscontent'><tr><div dangerouslySetInnerHTML={{ __html: htmlPuri }}/></tr></div>
        

          </tr>         
          );
        })
   }
   
  
<br></br><br></br><br></br>
    <div style={{display: 'flex', marginTop:"96px"}}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalCount}
        previousLabel="<"
        previousClassName={"previousClassName"}
        nextClassName={"nextClassName"}
        pageClassName={"pageClassName"}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        activeClassName={"activeClassName"}
        forcePage={page}
       /> 
      </div>
    
      </div>
      {loader}
  </div> 
   </>       
  );
}
