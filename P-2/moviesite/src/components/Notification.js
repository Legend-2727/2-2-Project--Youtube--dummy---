import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from 'date-fns';
function Notify({ toggleNotify })
{
    const [data,setdata]=useState(null);
    const {currentUser}=useSelector(state=>state.user);
    useEffect(() => {
        console.log("koi");
        if (currentUser) {
          fetch("http://localhost:5000/get_notify", {
            method: 'POST',
            body: JSON.stringify({ 
              notify: currentUser.USERID,
            }),
            headers: {
              'Content-Type': 'application/json',                 
              'Accept': '*/*' 
            },
          }).then((res) => res.json())
            .then((data) => {
              const updatedData = data.map((item) => {
                const parsedDate = parseISO(item.CREATED_AT);
                const formattedDate = formatDistanceToNow(parsedDate, { addSuffix: true });
                return {
                  ...item,
                  showDate: formattedDate 
                };
              });
              setdata(updatedData);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      }, [currentUser]);
      
    useEffect(()=>{
        if(currentUser){
        fetch("http://localhost:5000/reduce_notification_count",{
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
        
       console.log(data);
    
      
       
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

    }},[])
    const handleNotificationClick = () => {
        toggleNotify(); 
    };

    return(
        data?.map((e)=>{
            return(
                <>
                   
                <div className="mainwatch2">
                    
                <Link to={`/bigscreen/${e.VIDEOID}`} style={{textDecoration:'none',color:'inherit'}} 
                onClick={handleNotificationClick} >
                 <div className="submain2">
                 <div className="otherwatch">
                      <div className="imwatch"><img src={e.USERLOGO}></img></div>
                      
                    </div>
                    <div className="otherwatch">
                    <div className="createtime">{e.showDate}</div>
                    <div className="createtime">{e.VIDEO_TITLE}</div>
                    </div>
                    <div className="vidcont2">
                       <video controls autoplay poster={e.POSTER}>
                             <source src={`http://localhost:5000${e.VIDEOURL}`} poster={e.POSTER} type="video/mp4"></source>
                       </video>
                    </div>
                   
                   
                </div>
                </Link>
                </div>
                </>
            )
        })

    )
}
export default Notify;