import React, {useEffect, useState, useMemo} from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/SingleNews.css";
import u86 from '../../assets/u86.png';
import book from '../../assets/book.jpg';
import laptop from '../../assets/laptop.png';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import swal from 'sweetalert';

import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { FaCalendar,  FaUser  } from "react-icons/fa";
import { SocialIcon } from 'react-social-icons';
import books from '../../assets/books2.avif';
import {
  CButton,
  CCard,
  CCardHeader,
  CCol,
  CFormTextarea,
  CRow,
  CTable,
  CTableRow,
  CFormSelect,
} from '@coreui/react'




export default function SingleNews() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const[blogs, setBlogs] = useState([]);
  const [settings, setSettings] = useState([]);
  const[posts, setPosts] = useState(null);
  const[news, setNews] = useState([]);
  const[comment, setComment] = useState([]);
  const[render,setRender]=useState(false);
  const[input,setInput] = useState({
    comments:"",
    content:"",
    facebookLink:"",
    twitterLink:"",
    youtubeLink:"",
    linkedLink:"",
    commentType: 1,
    commentDate:"",
    commentAuthorName:"",
    commentAuthorEmail:"",
    contentId: "",
    featuredImage: "",
    title: "",
    publicationDate: "",
    authorName: "",
    image: "",
    slug: ""
  });

  const getCommentData = async ()=>{
    let getId = localStorage.getItem('ID');
    let id = getId;
    console.log("slug id", id);
  
    const res=await axios
    .get(
      `http://api-cms-poc.iplatformsolutions.com/api/blog/getCommentData?contentId=${id} `
      )
    .then((res) => {
      console.log(res.data.data); 
    setComment(res.data.data);
    hideLoader();
    })
    .catch((err) =>{} );      
  }; 

  const getNewsData = async (offset=0,limit=1)=>{

  
    const res=await axios
    .get(
      `http://api-cms-poc.iplatformsolutions.com/api/blog/allBlog?offset=${offset}&limit=${limit} `
      )
    .then((res) => {
      console.log(res.data.data); 
    setNews(res.data.data);
    hideLoader();
    })
    .catch((err) =>{} );  
  };

//fetch data
const getAllData = async ()=>{
    let getId = localStorage.getItem('SLUG');
    let id = getId;
    console.log("slug id", id);
    const res=await axios
    .get(
      `http://api-cms-poc.iplatformsolutions.com/api/blog/getData?slug=${id}`
      )
    .then((res) => {
      console.log(res.data.data); 
    setBlogs([res.data.data]);
    setPosts(res.data.popularNews);
    hideLoader();
    })
    .catch((err) =>{} );      
  };

  const getSettingsData = async () =>{
    const res=await axios
    .get(
      `http://api-cms-poc.iplatformsolutions.com/api/generalSettings/getData?slug=page2`
    )
    .then((res) => {
      console.log(res);
      setSettings(res.data.data.reverse());
    })
    .catch((err) => {});
   };


  //display blogs and comments
  useEffect(()=>{
    let getId = localStorage.getItem('ID');
    setInput(JSON.parse(getId));
    showLoader();
    getAllData();
    getCommentData();
    getNewsData();
    getSettingsData();
  },[]);

  let getId = localStorage.getItem('ID');
  let id = JSON.parse(getId);

    const config = {
       headers: {
        // "token": `${getId}`,
         "Content-Type": "application/json",
        }
      };

      const handleSubmit= async(e)=>{ 
       if(input.commentAuthorName === '' || input.commentAuthorEmail === '' || input.comments === '')
       {
        swal('Please enter all the fields');
       }
        else{
        showLoader();
        let allDetails = {...input, contentId:id, commentType: 1}
      await axios.post(`http://api-cms-poc.iplatformsolutions.com/api/blog/addComment`,allDetails,config)
      .then((res ) =>{
        // navigate("/SingleNews"); 
        hideLoader();
        console.log('res', res)
        setInput({ ...input,
          commentAuthorName: "",
          commentAuthorEmail: "",
          comments: ""
         })
       getCommentData();
       swal('Comment is added Successfully');
        // setcomment(res.data.data);
      }) 
      .catch((err) => {
        if(err.response.data.error)
              {
                swal(err.response.data.error[0])
              }
        hideLoader();
      })
      // console.log('id', getToken);
      setRender(true); 
    } 
     };

     const convertTime = (time) =>{
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      if(time.length > 1) {
        time = time.slice (1);
        time[5] = +time[0] < 12 ? 'AM' : 'PM';
        time[0] = +time[0] % 12 || 12;
      }
      return time.join ('');
      };
      const formateHour = (blog) =>{
        var d = blog;
        let Date = d.split(' ')[0];
        d = d.split(' ')[1];
        let time = convertTime (d)
        return Date+' '+ time.split(':')[0]+ ':'+time.split(':')[1]+time.split(':')[2].substring(2, 4);
      };

      const formateData = (blog) =>{ 
        var d = blog;
        let Date = d.split(' ')[0];
        let year = Date.split('-')[0];
        let month = Date.split('-')[1];
        let day = Date.split('-')[2];
        let month_names_short =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let getMonth = month_names_short.filter((mon, i) =>{
        if(month == i+1){
        return mon;
        }
        });
        
        let convertedData = day+" "+getMonth[0]+" "+year;
        return convertedData;
        
        };

        const formatInfo = (blog) =>{ 
          var d = blog;
          let Date = d.split(' ')[0];
          let year = Date.split('-')[0];
          let month = Date.split('-')[1];
          let day = Date.split('-')[2];
          let month_names =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          let getMonth = month_names.filter((mon, i) =>{
          if(month == i+1){
          return mon;
          }
          });
          
          let convertedData = getMonth[0]+""+day+", "+year;
          return convertedData;
          
          };
    
     
  return ( 
  
    <div> 


         {/* <section className="bg-img2">
         <p className='md'>NEWS</p>
         <p className='md-1'>Home/Blog</p>
         </section>  */}
         {( news && news.map((newss, i) => 
            {
              console.log("newss", newss);
              return(
                <div style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${newss && newss.featuredImage})`,
                  height: "200px",
                  width: "1359px",
                  backgroundRepeat:"no-repeat",
                 }} className='bg-img2' 
                 >
 {blogs.length > 0 ? <p className='heading1'>{blogs[0].title}</p>:null}
                 <p className="heading2">Home/ News/ {blogs[0].title}</p>
       </div>
              )
            }))}

         
{/*          
      {(
          blogs && blogs.map((blog,i)=>
        {
          console.log("blog", blog);
          const htmlPuri = draftToHtmlPuri(blog);
          console.log(htmlPuri);

          return(
            
          <tr key={i}>
          <td>{blog.title}</td>
          </tr>         
          );
        })
        )
     }     */}

  {/* {( blogs && blogs.map((blog,i) =>
  {
    let data=JSON.parse(blog.content)
    const htmlPuri = draftToHtmlPuri(data);
     console.log(htmlPuri);
     console.log(blog);
     return(
      <div>
      <img  className='featuredImage' src={blog.featuredImage} /> 
      <br></br>
      <div>
        <p>{blog.title}</p>
        <br></br>
        <div>
          <p>{blog.publicationDate}</p>
          <p>{blog.authorName}</p>
          </div>
          <div>
            <td><div dangerouslySetInnerHTML={{ __html: htmlPuri }}/></td>
            </div>
      </div>
      </div>
    )
  }
 )
)} */}

   <div className='wrapper12'>
    <section className='posts'>
    <h2 className='heading'>Popular Posts</h2>
   { ( posts && posts.map((post,i) =>
      {
        console.log("popular",post); 
        let publishTime = formateData(post.publicationDate);
       return(
          <div>
            <section className='image3' >
          <img id='image2' src={post.featuredImage} />
           
          </section>
          <section className='title2'>
          <p className='title1'>{post.title}</p>
          <p className='pdate'>{publishTime}</p>
          
          </section>
            </div>
           )
        }
       )
      )
   } 
      </section>

   {/* <div id="onesn"  className="boxsn">
   <img id="u86_img1" alt="" className="img1" src={u86}></img> 
  
   
   
  </div> 
   <div id="twosn" className="boxsn">
    
    <h1 style={{ color:"darkblue"}}   className="text1">Popular Posts </h1> 
    
    <img id="book" style={{float:"left"}} alt="" className="img3" src={book}></img>  
    <h2 style={{float:"right"}}  className="text2">Introduction to <br></br>languages</h2> 
    <h5 style={{float:"right"}}  className="text3">25 Dec 2018 </h5>  
  
    <img id="book2" style={{float:"left"}} alt="" className="img3" src={laptop}></img> 
     <h2 style={{float:"right"}}  className="text4">How to build <br></br>a game with Java</h2> 
     <h5 style={{float:"right"}}  className="text5">25 Dec 2018 </h5>  

     <img id="book3" style={{float:"left"}} alt="" className="img3" src={book}></img> 
     <h2 style={{float:"right"}}  className="text6">How to build <br></br>a game with Java</h2> 
     <h5 style={{float:"right"}}  className="text7">25 Dec 2018 </h5>  

  </div>   */}
  <div className='blogs'>
   {/* <p> 
     <h2 > Few tips to get better results in examination</h2>
     <h5><FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;25 Dec 2018 &nbsp;&nbsp;&nbsp;<FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser>  Mark Anthem</h5></p>
     <p>
      
      Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci 
     elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus 
     a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus .
      <br></br><br></br>
     gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons equat
      ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
       Morbi accumsan ipsum velit. Nam nec tellus .<br></br><br></br>
  
    gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons equat ipsutis 
    sem nibh id elit.Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan
    ipsum velit. Nam nec tellus .
     </p>  */}
     {blogs.length > 0 ?( blogs && blogs.map((blog,i) =>
   {
    console.log(blog);
    let publishTime = formateData(blog.publicationDate);
    let data=JSON.parse(blog.content)
    const htmlPuri = draftToHtmlPuri(data);
     console.log(htmlPuri);
     
     return(
       <div>
      <img className='image1' src={blog.featuredImage} /> 
      <br></br>
      <div>
        <p className='title'>{blog.title}</p>
        <div>
          <p className='author'><FaCalendar style={{color:" rgb(247, 205, 18)"}}></FaCalendar>&nbsp;{publishTime}
          &nbsp;&nbsp;&nbsp;&nbsp;<FaUser style={{color:" rgb(247, 205, 18)"}}></FaUser>&nbsp;{blog.authorName}</p>
         
          </div>
          <div>
            <td><div className='comments' dangerouslySetInnerHTML={{ __html: htmlPuri }}/></td>
            </div>
            
      </div>
      </div>
    )
  }
 )
):null }

  <br>
  </br>
  <br></br>
  {( settings && settings.map((icon,i) =>
   {
    console.log(icon);
    
    return(
  <p className='share'>Share: &nbsp;
  <SocialIcon bgColor="darkblue" fgColor ="white" style={{ height: 35, width: 35 }} url={icon.facebookLink} />&nbsp;&nbsp;
    <SocialIcon bgColor="#00CED1"  fgColor ="white" style={{ height: 35, width: 35 }} url={icon.twitterLink} />&nbsp;&nbsp;
    <SocialIcon bgColor="red "  fgColor ="white" style={{ height: 35, width: 35 }} url={icon.youtubeLink} />&nbsp;&nbsp;
    <SocialIcon bgColor="#0077B5"  fgColor ="white" style={{ height: 35, width: 35 }} url={icon.linkedLink} />&nbsp;&nbsp;
  </p>  
   )
  }
 )
)}
 

  </div>  
  <div>
  <hr className='line' ></hr>
    <h2 className='comments1'>Comments</h2>
    {/* <h5>25 Dec 2018 &nbsp;&nbsp;&nbsp;  Bobby Aktar</h5>
    
    <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons
     equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
      Morbi accumsan ipsum velit. Nam nec tellus .
    </p>
    <br></br>
   
    <h5>25 Dec 2018 &nbsp;&nbsp;&nbsp;  Bobby Aktar</h5>
    <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons
     equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
      Morbi accumsan ipsum velit. Nam nec tellus .
      </p>  */}
     {comment.length > 0 ? ( comment && comment.map((page,i)=>
           { 
          //   let data=JSON.parse(page.comments)
          //  const htmlPuri = draftToHtmlPuri(data);
          //   console.log(htmlPuri);
            console.log(page); 
            let publishTime = formatInfo(page.commentDate);
            return(
            page.status === 2?
              <div >
                <div>
                
                <p className='author1'>{page.commentAuthorName}</p>
                <p className='date1'>{publishTime}</p>
                </div>
                <br></br>
                <div> 
                {/* <td className='container3'><div dangerouslySetInnerHTML={{ __html: htmlPuri }}/></td> */}
                <p className='comments2'>{page.comments}</p>
                </div>
              </div>
             :null
            )
           }
      )
      ):null}
      <hr className='line'></hr>
      <br></br>
      
     {/* <hr className='line'></hr>
      */}
     </div>  
  <div id='leaveacomment'>
    <h2>Leave  a Comment:</h2>
    <br></br>
  
    <input
    className='author2' 
     name='commentAuthorName'
     onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
     value={input.commentAuthorName}
      type="text" 
      placeholder="Name">
    </input>
    &nbsp;
    &nbsp;
    <input
    name='commentAuthorEmail' 
    onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
    value={input.commentAuthorEmail}
      type="text" 
      placeholder='email'>
      </input>
      {/* <input
    name='contentId' 
    onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
      type="text" 
      aria-describedby='disabled'>
      </input>  */}
    <br>
    </br><br></br>
    <CFormTextarea  
    width="200px"  
    className='commentfield' 
    placeholder='comment'
    name='comments'
    value={input.comments}
    onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
    >
    </CFormTextarea>
    <br></br> 
    <br></br>
    <CButton onClick={handleSubmit} className='button01'>Submit</CButton>
  </div>
  </div>
  {loader}
</div>

);
    }
