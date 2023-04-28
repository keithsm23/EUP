import React, {useEffect, useState, useMemo} from 'react';
import { Link,  Navigate,  useNavigate } from "react-router-dom";
import axios from 'axios';
import useFullPageLoader from '../hooks/useFullPageLoader';
import '../styles/Page.css';
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import swal from 'sweetalert';


  
const Page = () => {
    // console.log("props", props);
    const navigate = useNavigate();
    const [isFirstLoad, setIsFirstLoad] = useState(true)
const [isVisible, setVisible] = useState(false)
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const[settings, setSettings]=useState([]);
    const[page, setPage] = useState([]);
    const[input,setInput] = useState({
      title:"",
      slug:"",
      author:"",
      description:"",
      content:"",
      status:0,
      accessLevel:"",
      seoTitle:"",
      seoDescription:"",
      seoKeywords:"",
      parentId:0,
      publicationDate:""
      });

  const getAllData = async ()=>{
    let getId = localStorage.getItem('Page');
    let id = getId;
    console.log("Page", id);
     const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/page/editData/${id}`)
    .then((res) => { 
      console.log(res); 
      setPage([res.data.message]); 
      hideLoader();
})
    .catch((err) =>{
      navigate("/");
    } );      
  };

  useEffect(()=>{
    if (!isFirstLoad) {
      window.location.reload();
  } else {
      setIsFirstLoad(true)
      showLoader();
      getAllData();
  }
},[isVisible]);
  


    return (
      <div>  
       <section>     
        { ( page   && 
            page.map((page,i)=>
           {
           let data=JSON.parse(page.description);
           const htmlPuri = draftToHtmlPuri(data);
            console.log(htmlPuri);  
            console.log(page);
            return(      
              <div className='about12'>
            
                <div style={{
                   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${page && page.image})`,
                   height: "200px",
                   width: "1359px",
                  }}
                  >
                  <p className="mda">{page.title}</p>{" "}
                  <p className="md-1a">Home/{page.title}</p>
               </div>
               <br></br>
               <br></br>
              <div className='aboutcontent13'>
              <tr>  
              <Link to={page.slug}>hello</Link>    
               <div dangerouslySetInnerHTML={{ __html: htmlPuri }}/>  
              </tr>
              </div>
             
              </div>
              )
            }
           )
         )}
        </section>
        {loader}
      </div>
      
    );
    
  };

  export default Page;