import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Subscriptionvideo(){
    const [data,setdata]=useState(null);
    const {currentUser}=useSelector(state=>state.user);
    useEffect(() => {
        console.log("lol");
        fetch(`http://localhost:5000/all_subscribe_video/${currentUser.USERID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            setdata(data);
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching video data:', error);
        });
    }, []);
    
    return(
        <>
        <div className="latest"><p>Latest</p></div>
        <div className="cardcontainer">
            
             
          
            {
                data&& data.map((e)=>{
                    return(
                        <div className="im">
                        <Link to={`/bigscreen/${e.VIDEOID}`} style={{textDecoration:'none',color:'inherit'}} >
                        <video src={`http://localhost:5000${e.VIDEOURL}`} controls autoplay poster={e.POSTER}>
                        </video>
                         {/* <p>{e.title}</p> */}
                         {/* <p>Views:400</p> */}
                         </Link>
                         </div>
                    )

                })
            }
           
            
        </div>
        </>
    )
}
export default Subscriptionvideo;