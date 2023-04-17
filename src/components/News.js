import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "../styles/News.css";
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

  const getSlug = (id, slug) => {
    
    localStorage.setItem('ID', JSON.stringify(id))
    showLoader();
    localStorage.setItem('SLUG', slug)
    hideLoader();
  }
  
//fetch data
const getAllData = async (offset=0,limit=3)=>{

  const res=await axios
  .get(
     `http://api-cms-poc.iplatformsolutions.com/api/blog/allBlog?offset=${offset}&limit=${limit}`
    )
    .then((res) => { 
     
    setBlogs(res.data.data);
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
    showLoader();
    setPage(event.selected);
    let count = event.selected*3;
    getAllData(count);   
  };


  //display user list
  useEffect(()=>{
    showLoader();
    getAllData();
  },[]);

  return(
    <>
    
  {/* <section className="bg-img1">
         <p className='md'>NEWS</p>
         <p className='md-1'>Home/Blog</p>
         </section>   */}
    <div className='wrappermain' >
      <div className='bg-img1'>
      {
        blogs && blogs.map((blog,i)=>{
        return( 
        <div style={{
                   backgroundImage: `url(${blog && blog.featuredImage})`,
                   height: "200px",
                   width: "100%",
                   backgroundRepeat:"no-repeat",
                  }} className='bg-img1' 
                  >
                  <p className="mdd">NEWS</p>{" "}
                  <p className="mdd-1">Home/News</p>
        </div>
        );
        })
      }  
      </div>
    {
        blogs && blogs.map((blog,i)=>{
        let data=JSON.parse(blog.content)
        console.log(blog);
        const htmlPuri = draftToHtmlPuri(data);
        console.log(htmlPuri);

       

        return(       
          <tr key={i}>
          {/* <td>{user.id}</td> */}   
          
   
            <div><img  className='featuredImage' src={blog.featuredImage} /> </div>  
        


            <div className='title11'><h2><td><Link onClick={()=>getSlug(blog.id, blog.slug)} style={{"text-decoration":"none"}} to="/SingleNews">{blog.title}</Link></td></h2> </div>  
    
             <div className='author11'><h5> <td> <FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser>&nbsp; 
            {blog.authorName} &nbsp;<FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;
            {blog.publicationDate}</td> </h5>
            </div>       
            <br></br>
            <div className='newscontent'><tr><div dangerouslySetInnerHTML={{ __html: htmlPuri }}/></tr></div>
           <br></br>

          </tr>         
          );
        })
   }
   
  
    <div style={{display: 'flex', marginTop:"96px"}}>
    
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"    
        onPageChange={handlePageClick}
        pageRangeDisplayed={9}
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
   </>       
  );
}
