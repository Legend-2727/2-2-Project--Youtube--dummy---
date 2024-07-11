import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
function Adminnotification({toggleNotify})
{
    const [data,setdata]=useState(null);
    const {currentUser}=useSelector(state=>state.user);
    useEffect(() => {
        
        if (currentUser) {
          fetch("http://localhost:5000/get_admin_notify", {
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
                setdata(data);
                console.log(data,"amar");
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      }, [currentUser]);
      
    // useEffect(()=>{
    //     if(currentUser){
    //     fetch("http://localhost:5000/reduce_admin_notification_count",{
    //     method:'POST',
    //     body:JSON.stringify({ 
    //         userid:currentUser.USERID ,
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json',                 
    //         'Accept': '*/*' 
    //      }, 
  
    // }).then((res)=>res.json())
    // .then((data)=>{
        
    //    console.log(data);
    
      
       
    // })
    // .catch((error) => {
    //     console.error("Error fetching data:", error);
    // });

    // }},[])
    const handleNotificationClick = () => {
        toggleNotify(); 
    };

    return(
        data?.map((e)=>{
            return(
                <>
                   
                <div className="mainwatch2" onClick={handleNotificationClick}>
                    
                      <p>{e.NOTIFICATION}</p>
                </div>
                </>
            )
        })

    )
}
export default Adminnotification;