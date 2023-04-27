import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/News.css";
import useFullPageLoader from '../../hooks/useFullPageLoader';
import ReactPaginate from 'react-paginate';
import { FaCalendar, FaUser } from "react-icons/fa";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import swal from 'sweetalert';

export default function News() {
  let PageSize = 10;
  const navigate = useNavigate();
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
      swal('Blogs not found');
      navigate("/");
    } );      
  };

   //display user list
   useEffect(()=>{
    showLoader();
    getAllData();
  },[]);

   //pagination
   const handlePageClick = (event) => {
    showLoader();
    setPage(event.selected);
    let count = event.selected*3;
    getAllData(count);   
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

  return(
    <>
    <div className='wrappermain' >
      <div className='bg-img1'>
      {
        blogs && blogs.map((blog,i)=>{
        return( 
        <div style={{
                  backgroundImage:  `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${blog && blog.featuredImage})`, 
                  backgroundRepeat:"no-repeat",
                  }} className='bg-img1' 
                  >      
                  <p className="mdd11">NEWS</p>{" "}
                  <p className="mdd-11">Home/News</p>                      
        </div>
        );
        })
      }  
      </div>
    {
      blogs.length > 0 ? ( blogs && blogs.map((blog,i)=>{
        let publishTime = formateData(blog.publicationDate);
        let data=JSON.parse(blog.content)
        console.log(blog);
        const htmlPuri = draftToHtmlPuri(data);
        console.log(htmlPuri);

        return(       
          <tr key={i}>
          {/* <td>{user.id}</td> */}   
            <div><img  className='featuredImage' src={blog.featuredImage} /> </div>  

            <div className='title11'><h2><td><Link onClick={()=>getSlug(blog.id, blog.slug)} style={{"text-decoration":"none", color:"black"}} to="/News/SingleNews">{blog.title}</Link></td></h2> 
            </div>  
    
            <div className='author11'><h5> <td> <FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;
            {publishTime} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser>&nbsp;
            {blog.authorName}</td> </h5>
            </div>       
            <br></br>
            <div className='newscontent'><tr><div dangerouslySetInnerHTML={{ __html: htmlPuri }}/></tr></div>
           <br></br>

          </tr>         
          );
        })
      ) :null  
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
