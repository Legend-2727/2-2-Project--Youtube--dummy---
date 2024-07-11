import React, { useEffect, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess } from "../redux/videoslice";
import { likes, loginSuccess ,dislikes} from "../redux/userslicer";
function Bigscreen(){
    const {currentUser}=useSelector(state=>state.user);
    const {videoid}=useParams();
    console.log(videoid,123);
    
    const [data,setdata]=useState({});
    const [subscribe,setsubscribe]=useState("Subscribe");
    const [like,setlike]=useState(0);
    const [colorlike,setcolorlike]=useState([]);
    const [comment,setcomment]=useState("")
    const dispatch=useDispatch();
    
   
    useEffect(()=>{
        
        
        fetch(`http://localhost:5000/get_a_video/${videoid}`)
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            
            setdata(data);
            // if(currentUser && data.subscribeduser.some(el=>el.userid==currentUser._id)){
            //     setsubscribe('Subscribed');
            // }
            console.log(data,data[0]);
        })
        

    },[])
    // function handlelike(){
    //     console.log(currentUser);
    //     fetch(`http://localhost:5000/like/${id}`,{
    //         method:'POST',
    //         body:JSON.stringify({
                
    //             id:currentUser._id,
               
  
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',                 
    //             'Accept': '*/*' 
    //          }, 
  
    //     }).then((res)=>res.json())
    //     .then((data)=>{
            
    //         setlike(data.likes);
    //         dispatch(loginSuccess(data));
    //         // dispatch(likes(id));
    //         console.log(currentUser);
           
    //     })
       

    // }
    // function handledislike(){
    //     console.log(currentUser);
        
    //     fetch(`http://localhost:5000/dislike/${id}`,{
    //         method:'POST',
    //         body:JSON.stringify({
                
    //             id:currentUser._id,
               
  
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',                 
    //             'Accept': '*/*' 
    //          }, 
  
    //     }).then((res)=>res.json())
    //     .then((data)=>{
            
    //         setlike(data.likes);
    //         dispatch(loginSuccess(data));
    //         // dispatch(dislikes(id));
    //     })
        

    // }
    
    
    // function handlesubscribe(){
        
    //       console.log(subscribe,typeof(subscribe));
    //     //   if(subscribe==='Subscribe'){
    //     fetch(`http://localhost:5000/addtosubscribe/${id}`,{
    //       method:'POST',
    //       body:JSON.stringify({
              
    //           id:currentUser._id,
             

    //       }),
    //       headers: {
    //           'Content-Type': 'application/json',                 
    //           'Accept': '*/*' 
    //        }, 

    //   }).then((res)=>res.json())
    //   .then((data)=>{
          
    //       console.log(data);
         
    //   })
    //     setsubscribe("Subscribed");


    // }
    // function handlecomment(e){
    //     if(e.key==='Enter'){
    //     fetch(`http://localhost:5000/addcomment/${id}`,{
    //       method:'POST',
    //       body:JSON.stringify({
              
    //           id:currentUser._id,
    //           comment:comment
             

    //       }),
    //       headers: {
    //           'Content-Type': 'application/json',                 
    //           'Accept': '*/*' 
    //        }, 

    //   }).then((res)=>res.json())
    //   .then((data)=>{
          
    //       console.log(data);
         
    //   })
    //   setcomment("");
    // }

    // }
    return(
        <div className="bigscreen">
            <div className="video">
                <video src={`http://localhost:5000${data[0].VIDEOURL}`} controls autoplay poster={data[0].POSTER} style={{width:'100%'}}></video>
            </div>
            <div className="other">
                <div className="chnlname">
                    {data&&<><p>{data.title}</p>
                    <p>2 subscribers</p></>}
                </div>
               {/* { currentUser&&<div className="subbutton">
               {data && data.subscribeduser?.some(el=>el.userid==currentUser._id)?<button >Subscribed</button>
               :<button onClick={handlesubscribe}>{subscribe}</button>}
                </div>}
                {currentUser &&
                <div className="likedislike">
                    <span>{data.likes}</span> <ThumbUpIcon className="iconbig" onClick={handlelike} style={{color:(currentUser.likedvideos&&currentUser.likedvideos.includes(id) )? 'blue':'black'}}/>
                    <span>{data.dislikes}</span> <ThumbDownAltIcon  className="iconbig" onClick={handledislike} style={{color: (currentUser.dislikedvideos&&currentUser.dislikedvideos.includes(id) )? 'blue':'black'}}/>
                </div>} */}
            </div>
            {/* <div className="inputcomment">
                <input type="text" placeholder="Comment.." value={comment} onChange={(e)=>setcomment(e.target.value)} onKeyDown={(e)=>handlecomment(e)}></input>
                
            </div>
            {data.comments && data.comments.map((e)=>{
                 return(
                    <div className="comsec">
                      <h3>{e.name}</h3>
                       <p>{e.comment}</p>
                   </div>
                 )
            })
            
            } */}
        </div>
    )
}
export default Bigscreen;