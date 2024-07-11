import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Watchwithoutlogin from "./Watchwithoutlogin";
import { Link } from "react-router-dom";
import Resultcontext from "../contextprovider/context";
import { parseISO,formatDistanceToNow } from "date-fns";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Watchlater(){
    const {currentUser}=useSelector(state=>state.user);
    const [data,setdata]=useState(null);
    const {save,setsave}=useContext(Resultcontext);
    const [create,setcreate]=useState([]);
    const [watchlater,setwatchlater]=useState({});
    const [remove,setremove]=useState(false);
    useEffect(()=>{
        
       if(currentUser){
        fetch(`http://localhost:5000/watchlater/${currentUser.USERID}`)
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            const formattedDates = data.map((item) => {
                const created_at = item.CREATED_AT;
                const parsedDate = parseISO(created_at);
                return formatDistanceToNow(parsedDate, { addSuffix: true });
              });
              setcreate(formattedDates);
              setdata(data);
        })
    }

    })
    useEffect(()=>{
        if(remove){
            fetch(`http://localhost:5000/watchlater/${currentUser.USERID}`)
            .then((res)=>{
                return res.json()
            }).then((data)=>{
                const formattedDates = data.map((item) => {
                    const created_at = item.CREATED_AT;
                    const parsedDate = parseISO(created_at);
                    return formatDistanceToNow(parsedDate, { addSuffix: true });
                  });
                  setcreate(formattedDates);
                  setdata(data);
            })
        setremove(!remove);
    }

    },[remove])
    function handleremove(id,index,a){
        a.preventDefault();
        setwatchlater({...watchlater,[index]:!watchlater[index]});
        fetch(`http://localhost:5000/removewatchlater/${currentUser.USERID}`,{
            method:'POST',
            body:JSON.stringify({
                
                videoid:id,
               
  
            }),
            headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
             }, 
  
        }).then((res)=>res.json())
        .then((data)=>{
            setdata(data);
            
           // console.log("current",currentUser._id);
           
           
        })
        setremove(!remove);
    }
        
    
      
       

        


    function handle(a,index)
    {
        a.preventDefault();
        setwatchlater({...watchlater,[index]:!watchlater[index]});
    }
    
    
       if(currentUser){
        return(
            <>
            <p style={{fontSize:'20px'}}>My Watchlater Videos...</p>
           { data && data.map((e,index)=>{
                return(
                    <>
                   
                    <div className="mainwatch">
                        
                    <Link to={`/bigscreen/${e.VIDEOID}`} style={{textDecoration:'none',color:'inherit'}} >
                     <div className="submain">
                        <div className="vidcont">
                           <video controls autoplay poster={e.POSTER}>
                                 <source src={`http://localhost:5000${e.VIDEOURL}`} poster={e.POSTER} type="video/mp4"></source>
                           </video>
                        </div>
                        <div className="otherwatch">
                           <div><p>{e.USERID}</p></div>
                           <div><span>{e.VIEWS} views</span><span>.</span><span>{create[index]}</span></div> 
                           <div className="imwatch"><img src={e.USERLOGO}></img></div>
                        </div>
                        <div className="iconthr">
                            <MoreVertIcon onClick={(a)=>handle(a,index)}></MoreVertIcon>
                            {watchlater[index] && <div className="removewatchlat">
                            
                             <button onClick={(a)=>handleremove(e.VIDEOID,index,a)}>Remove from watch later</button>
                             
                           </div>}
                        </div>
                    </div>
                    </Link>
                    </div>
                    </>
    
                )
            })}
           </>
        )
        
        
       }
    
       
    
}
export default Watchlater;
