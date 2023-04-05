import React, {useEffect, useState, useMemo} from 'react';
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios';
import useFullPageLoader from '../hooks/useFullPageLoader';
import '../styles/AboutUs.css';

import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";

const data = [
  {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
]

const Services = () => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const[courses, setCourses] = useState([]);
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
        const res=await axios.get(`http://api-cms-poc.iplatformsolutions.com/api/page/get?slug=newPage`)
       .then((res) => { 
        console.log(res.data.data);
        setCourses([res.data.data]);
        hideLoader();
})
        .catch((err) =>{
         } );      
       };

       useEffect(()=>{
        showLoader();
        getAllData();
       },[]);

  return (
     <div>
      {/* <section className="bg-img">
         <p className='md'>SAMPLE PAGE</p>
         <p className='md-1'>Home/Sample Page</p>
       </section> */}
      
       <br></br>
       <section >
       { ( courses && courses.map((course,i)=>
           {
            let data=JSON.parse(course.description)
           const htmlPuri = draftToHtmlPuri(data);
            console.log(htmlPuri);
            console.log(course);
            return(
              
           
              <div>
                 <div style={{
                    backgroundImage: `url(data:image/png;base64,${course && course.image})`,
                    height: "200px",
                    width: "100%",
                  }}
                 >
                 <p className="md">{course.title}</p> {" "}
                 <p className="md-1">Home/{course.title}</p>
               </div>
               <br></br>
               <br></br>
              {/* <p> */}
              {/* <Link style={{textDecoration:"none", fontWeight:"bold"}} to="/SingleNews"> {blog.title} </Link> */}
              {/* <h2 className='container2'> {course.title}</h2></p> */}
              <td className='container3'><div dangerouslySetInnerHTML={{ __html: htmlPuri }}/></td>
              </div>
              )
            }
           )
         )}
        </section>
        {loader}
     </div>
  )
};

export default Services;
