import React, {useEffect, useState } from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/News.css";
import books from '../assets/books2.avif';
import u86 from '../assets/u86.png';
import ReactPaginate from 'react-paginate';
import { FaCalendar, FaUser } from "react-icons/fa";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";

export default function News() {
  let PageSize = 10;
  
  const[blogs, setBlogs] = useState([]);
  const[totalCount, setTotalCount]=useState(null);
  const[page, setPage]=useState(0);
  const[input,setInput] = useState({
    title:"",
    slug:"",
    author:"",
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
const getAllData = async (offset=0,limit=6)=>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/blog/allBlog?offset=0&limit=3`,config)
    .then((res) => { 
      console.log(res)
    setBlogs(res.data.data.reverse());
    if(res && res.data && res.data.totalCount)
    {
      setTotalCount(Math.ceil(res.data.totalCount/10));
    }
    console.log(res);
    })
    .catch((err) =>{
    } );      
  };

   //pagination
   const handlePageClick = (event) => {
    setPage(event.selected);
    let count = event.selected*10;
    getAllData(count, count+10);     
  };


  //display user list
  useEffect(()=>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    getAllData();
  },[]);

  return(
    <div > 
     <section className="bg-img1">
         <p className='md'>NEWS</p>
         <p className='md-1'>Home/Blog</p>
       </section>
    <div className='wrappermain'>




    <div id="wrapper1">
    {
            blogs && blogs.map((blog,i)=>{
            let data=JSON.parse(blog.content)
            console.log(blog);
              const htmlPuri = draftToHtmlPuri(data);
            console.log(htmlPuri);

                return(
                 
                  <tr key={i}>
                  {/* <td>{user.id}</td> */}
            <h1><td>{blog.title}</td></h1> 
            <h1> <td>{blog.commentAuthorName}</td> </h1>
            <td><div dangerouslySetInnerHTML={{ __html: htmlPuri }}/></td>
                <td>{blog.commentDate}</td>
                  </tr>           
                );
              })
   }
    {/* <div id="u86" class="ax_default image">
         <p></p>
    </div>
    
    <div id="one1" className="box1">
      
      <img id="u86_img" alt="" className="img " src={u86}></img>
      
    </div>  */}
   

     {/* <div id="two1" className="box1">
     <p> 
     <Link style={{textDecoration:"none", fontSize:"20px", fontWeight:"bold"}} to="/SingleNews">  </Link>
     <h5><FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;25 Dec 2018 &nbsp;&nbsp;&nbsp;
     <FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser>  Mark Anthem</h5></p>
     <p>
      
      Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci 
     elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus 
     a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus .
     </p>
    </div>    */}

     
    </div>
   
    












    {/* <div id="wrapper2">
      <div id="u86" class="ax_default image">
          <p></p>
      </div>
      <div id="one2" className="box2">      
        <img id="u86_img" className="img " src={u86}></img> 
      </div>
    
      <div id="two2" className="box2">
      <p><span style={{textDecoration:"none", fontSize:"20px", fontWeight:"bold"}}>Few tips to get better results in examination</span>
      <h5><FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;25 Dec 2018 &nbsp;&nbsp;&nbsp; 
      <FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser> Mark Anthem</h5></p>
      <p>
        Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci 
        elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus 
        a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus .
      </p>
    </div>   

    </div> */}


    {/* <div id="wrapper3">
    <div  id="u86" class="ax_default image">
    
          <p></p>
        </div>
    
     <div id="one3" className="box3">
      
      <img id="u86_img" className="img " src={u86}></img>
      
    </div>
     <div id="two3" className="box3">
     <p><span style={{textDecoration:"none", fontSize:"20px", fontWeight:"bold"}}>Few tips for get better results in examination</span>
     <h5><FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;25 Dec 2018 &nbsp;&nbsp;&nbsp;
     <FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser>  Mark Anthem</h5></p>
     <p>
     Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci 
     elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus 
     a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus .
     </p>
    </div>   
    </div> */}
    <div style={{display: 'flex'}}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
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
  </div>          
  );
}
