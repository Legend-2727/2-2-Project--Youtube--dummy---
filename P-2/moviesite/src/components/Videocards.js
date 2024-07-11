import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Searchoutput from "./Searchoutput";
import { fetchOut } from "../redux/videoslice";
import { Link } from "react-router-dom";
import Resultcontext from "../contextprovider/context";
import MoreVertIcon from '@mui/icons-material/MoreVert';
function Videocards(){
    const {currentUser}=useSelector(state=>state.user);
    const [video,setvideo]=useState(null);
    const [loading,setloading]=useState(false);
    const [button,setbutton]=useState("Save to watch later");
    const [open,setOpen]=useState({});
    const [threedots,setthreedots]=useState({});
    const [wt,setwt]=useState(false);
    const [wlid,setwlid]=useState("");
    
    // console.log(currentVideo);
    const dispatch=useDispatch();
    useEffect(()=>{
        
        dispatch(fetchOut());
        //if(currentUser){
        fetch("http://localhost:5000/all")
        .then((res)=>{
            
            return res.json()
        }).then((data)=>{
            setvideo(data);
            
            setloading(true);
        })
   // }
        // if(video.watchlateruser){
        // console.log(video.watchlateruser);}
       
    },[])
    useEffect(()=>{
        if(wt)
        {
            
            fetch("http://localhost:5000/add_to_watchlater",{
                method:'POST',
                body:JSON.stringify({
                    
                    
                    userid:currentUser.USERID,
                    videoid:wlid

                   
      
                }),
                headers: {
                    'Content-Type': 'application/json',                 
                    'Accept': '*/*' 
                 }, 
      
            }).then((res)=>res.json())
            .then((data)=>{
                setvideo(data);
                console.log(data);
               
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            setwt(false);
        }
    })

function handlethree(e,index)
{
    e.preventDefault();
    e.stopPropagation();
    setthreedots({...threedots,[index]:!threedots[index]});
}
function handlewatchlater(e,videoid,index)
{
    e.preventDefault();
    e.stopPropagation();
    setwlid(videoid);
    console.log(videoid,"yes");
     setwt(true);
     
     setthreedots({...threedots,[index]:!threedots[index]});
}

// const handleClick = (id) => () => {
//     setOpen(open => ({
//       ...open,
//       [id]: !open[id],
//     }));
//   };
    // if(!currentVideo){
    return(
            <>
            {
                 loading && video?.map((e,index)=>{
                    return(
                        <div className="im">
                       <Link to={`/bigscreen/${e.VIDEOID}`} style={{textDecoration:'none',color:'inherit'}} >
                        <video src={`http://localhost:5000${e.VIDEOURL}`} controls autoplay poster={e.POSTER} preload="auto">
                        </video>
                       <div className="mainf">
                        <div class="f1">
                        <Link to={`/eachvideo/${e.USERID}`} onClick={(event) => event.stopPropagation()}><img src={e.USERLOGO}></img></Link>
                        </div>
                         <div className="f2">
                            <p style={{fontWeight:'bolder',overflow:'hidden'}}>{e.VIDEO_TITLE}</p>
                            <div className="idview" style={{display:'flex'}}>
                            <p style={{marginRight:'10px',fontWeight:'bolder'}}>{e.USERID}</p>
                            <p>{e.VIEWS} views</p>
                            </div>
                           
                            
                         </div>
                         <div className="f3">
                           <div className="threedot"><MoreVertIcon onClick={(e)=>{handlethree(e,index)}}></MoreVertIcon> </div>
                           {threedots[index] && currentUser && <div className="watchlat">
                            
                             <button className="watch-later-btn" onClick={(a)=>{handlewatchlater(a,e.VIDEOID,index)}}>Save to watch later</button>
                             
                           </div>
                            }
                         </div>
                         </div>
                         
                         </Link>
                        
                            
                       
                        
                       
                        
                        
                        </div>
                         
                    )
                })
           
           }
           </>
           
       
    )}
   
export default Videocards;
