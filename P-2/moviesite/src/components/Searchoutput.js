import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Searchoutput({title}){
    const {currentVideo}=useSelector(state=>state.video);

                    return (
                        <div className='cardcontainer'>
                        {
                            currentVideo&&currentVideo.map((e)=>{
                                return(
                                    <div className="im">
                                    <Link to={`/bigscreen/${e.VIDEOID}`} style={{textDecoration:'none',color:'inherit'}} >
                                    <video src={`http://localhost:5000${e.VIDEOURL}`} controls autoplay poster={e.POSTER}>
                                    </video>
                                     <p>{e.VIDEO_TITLE}</p>
                                     <p>{e.VIEWS}</p>
                                     </Link>
                                     </div>
                                )
                            })
                        }
                        </div>
                    ) 
         
           
       
    
}
export default Searchoutput;