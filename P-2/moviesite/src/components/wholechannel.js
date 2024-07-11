import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Videoplayer from "./Videoplayer";
import DeleteIcon from '@mui/icons-material/Delete';
import Alladvideo from "./Allad";
import { Link ,useLocation} from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Adminnotification from "./Admin_notification";
function FullChannel()
{
    
    const {currentUser}=useSelector(state=>state.user);
    const [video,setvideo]=useState(null);
    const [deletes,setdelete]=useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState({});
    const [vidid,setvidid]=useState("");
    const [note,setnote]=useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const location=useLocation();
    useEffect(()=>{
        if(currentUser && note){
            console.log("reduce");
        fetch("http://localhost:5000/reduce_admin_notification_count",{
        method:'POST',
        body:JSON.stringify({ 
            userid:currentUser.USERID ,
        }),
        headers: {
            'Content-Type': 'application/json',                 
            'Accept': '*/*' 
         }, 
  
    }).then((res)=>res.json())
    .then((data)=>{
        
       //console.log(data);
    
      
       
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

    }})
    useEffect(() => {
        if (currentUser) {
            console.log("n_count");
            fetch("http://localhost:5000/admin_notification_count", {
                method: 'POST',
                body: JSON.stringify({
                    userid: currentUser.USERID
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setNotificationCount(data[0].ADMIN_NOTIFICATION_COUNT);
                    console.log('notify count is ', notificationCount);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [currentUser]);
    useEffect(()=>{
        //console.log("Hello");

        fetch("http://localhost:5000/all_vid_user",{
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
            setvideo(data);
            //console.log(data);
           
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    })
    useEffect(()=>{
        console.log("ki");
        if(deletes)
        {
            console.log("Lo");
            fetch("http://localhost:5000/delete_a_vid",{
                method:'POST',
                body:JSON.stringify({
                    
                    videoid:vidid,
                    userid:currentUser.USERID
                   
      
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
       
        setdelete(!deletes);
        }

    },[deletes,vidid])
    function toggleNotify() {
        setnote(true);
        setNotificationCount(0);
        setShowNotify(prevShowNotify => !prevShowNotify);
    }
    function handleDelete(index) {
        setDeleteConfirmation({
          ...deleteConfirmation,
          [index]: true,
        });
      }
    
      function handleConfirmDelete(index,videoid) {
       
        setDeleteConfirmation({
          ...deleteConfirmation,
          [index]: false,
        });
        setvidid(videoid);
        setdelete(true);
        console.log("made");
      }
    
      function handleCancelDelete(index) {
        setDeleteConfirmation({
          ...deleteConfirmation,
          [index]: false,
        });
      }

   
    
      return(
        <div className="m_container">
            {
                currentUser && <div className="d1">
                <img src={currentUser.USERLOGO}></img>
                <p>{currentUser.USERID}</p>
                <p style={{color:'black'}}>Subscribers:{currentUser.NO_OF_SUBSCRIBER}</p>
                {currentUser && <div className="notify-icon-container">
                {notificationCount !== 0 && <div className="notify-badge">{notificationCount}</div>}
                    <NotificationsIcon
                        style={{ fontSize: '60px', color: 'black',cursor:'pointer' }}
                        onClick={toggleNotify} 
                    />
                </div>}
            </div>
            }
            <div className="headingofviews">
                <p>Video</p>
                <p>Delete</p>
                <p>Views</p>
                <p>Likes</p>
                <p>Dislikes</p>
                <p>Date</p>
            </div>
            <div className="allvidcon">
                {
                video && video?.map((e,index)=>{
                    return(
                        <div className="particular">
                            <div className="videoc">
                            <Link to={`/all_ad/${e.VIDEOID}`} style={{textDecoration:'none',color:'inherit'}}><video src={`http://localhost:5000${e.VIDEOURL}`} controls autoplay poster={e.POSTER}>
                             </video></Link>
                            </div>
                            <div className="del">
                                  <DeleteIcon style={{ fontSize: '3rem' ,cursor:'pointer'}} onClick={(e)=>handleDelete(index)}/>
                                  
                                  {deleteConfirmation[index] && <div className="ensuredel">
                                    <p>Are you sure,you want to delete this video?</p>
                                    <div className="ensuredelbut">
                                    <button onClick={() => handleConfirmDelete(index,e.VIDEOID)}>Yes</button>
                                    <button onClick={() => handleCancelDelete(index)}>No</button>
                                    </div>
                                    </div>
                                    }
                                    
                            
                                  
                            </div>
                           
                            <div className="views">{e.VIEWS}</div>
                            <div className="likes">{e.LIKES}</div>
                            <div className="dislikes">{e.DISLIKES}</div>
                        </div>


                    )
                })
            }
            <div className={`notify-panel2 ${showNotify ? 'open' : ''}`}>
                <Adminnotification toggleNotify={toggleNotify} /> 
            </div>
            
            </div>
            
            
        </div>

    )
}
export default FullChannel;
