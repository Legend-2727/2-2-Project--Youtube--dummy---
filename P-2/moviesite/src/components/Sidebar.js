import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userslicer";
import Subscriptionwithoutlogin from "./Subwithoutlogin";
import { fetchOut } from "../redux/videoslice";
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import UploadIcon from '@mui/icons-material/Upload';
import LogoutIcon from '@mui/icons-material/Logout';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HistoryIcon from '@mui/icons-material/History';
import DuoIcon from '@mui/icons-material/Duo';
function Sidebar(){
    const {currentUser}=useSelector(state=>state.user);
    const dispatchvideo=useDispatch();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [data,setdata]=useState(null);
    function handlelogout(){
        dispatch(logout());
        navigate('/');

    }
    useEffect(()=>{
        if(currentUser){
        fetch("http://localhost:5000/subscribed_channel",{
            method:'POST',
            body:JSON.stringify({
                   
                userid:currentUser.USERID,
                
            }),
            headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
             }, 
      
        }).then((res)=>res.json())
        .then((data)=>{
            
           
           setdata(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        }); 
      
        
      
        }},[])

    
    return(
        <sidebar className="sidebar">
       { currentUser?
       <>
             <Link to={'/'} style={{textDecoration:'none',color:'inherit'}} {...dispatch(fetchOut())}><button className="side"><HomeIcon style={{marginRight:'10px'}}/>Home</button></Link>
            
            <Link to={'/subscribe'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><SubscriptionsIcon style={{marginRight:'10px'}}/>Subscribed Video</button></Link>
            <Link to={'/shorts'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><DuoIcon style={{marginRight:'10px'}}/>Shorts</button></Link>
            <Link to={'/watchlater'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><WatchLaterIcon style={{marginRight:'10px'}}/>Watch Later</button></Link>
            <Link to={'/history'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><HistoryIcon style={{marginRight:'10px'}}/>History</button></Link>
            {/* <Link to={'/liked'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><ThumbUpIcon style={{marginRight:'10px'}}/>Liked Video</button></Link> */}
            <Link to={'/upload'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><UploadIcon style={{marginRight:'10px'}}/>Upload Video</button></Link>
            <Link to={'/settings'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><UploadIcon style={{marginRight:'10px'}}/>Settings</button></Link>
            <button className="side" onClick={handlelogout}><LogoutIcon style={{marginRight:'10px'}}/>Log out</button>
            
            <button className="side" ><YouTubeIcon style={{marginRight:'10px'}}/>Subscription</button>
            <div className="s_channel">
                {
                 currentUser  &&   data?.map((e)=>{
                        return(
                            <Link to={`/eachvideo/${e.USERID}`} style={{textDecoration:'none',color:'inherit'}} ><div className="e_c">
                                <img src={e.USERLOGO}></img>
                                <p>{e.USERID}</p>
                            </div></Link> 
                        )
                    })
                }
            </div>
            </>
           :  <><Link to={'/'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><HomeIcon style={{marginRight:'10px'}}/>Home</button></Link>
            <Link to={'/subscribewithoutlogin'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><SubscriptionsIcon style={{marginRight:'10px'}}/>Subscription</button></Link>
            <Link to={'/watchwithoutlogin '} style={{textDecoration:'none',color:'inherit'}}><button className="side"><WatchLaterIcon style={{marginRight:'10px'}}/>Watch Later</button></Link>
            <Link to={'/upload'} style={{textDecoration:'none',color:'inherit'}}><button className="side"><UploadIcon style={{marginRight:'10px'}}/>Upload Video</button></Link></>

       }
        </sidebar>
        
    )
}
export default Sidebar;