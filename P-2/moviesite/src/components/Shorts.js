import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function Shorts()
{
    const {currentUser}=useSelector(state=>state.user);
    const [data,setdata]=useState(null);
    useEffect(()=>{
        fetch("http://localhost:5000/getshorts")
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            setdata(data);
        })

    },[])
    return(
        <>
        {
            currentUser && 
           data?.map((e)=>{
            return(
                <>
             <div className="whole_shorts">
               <div className="sh_video">
                 <video src={`http://localhost:5000${e.SHORTURL}`} controls autoPlay muted>
                 </video>
                 
                 
                
               </div>
                <div className="video-icons"> 
                <ThumbUpIcon className="like-icon" style={{ fontSize: '60px', cursor:'pointer' }}/>
                <ThumbDownIcon className="dislike-icon" style={{ fontSize: '60px', cursor:'pointer' }}/>
                <p>{e.UPLOADED_BY}</p>
             </div>
             </div>
             </>
            )
           })
        }
        </>

    )
}
export default Shorts;