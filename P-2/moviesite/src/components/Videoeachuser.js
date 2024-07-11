import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from 'date-fns';
function Eachvideo()
{
    const [data,setdata]=useState(null);
    const {userid}=useParams();
    const [activeButton, setActiveButton] = useState("Latest");

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
      if(buttonName=="Popular")
      {
        fetch("http://localhost:5000/all_vid_popular",{
            method:'POST',
            body:JSON.stringify({
                   
                
                userid:userid
            }),
            headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
             }, 
        
        }).then((res)=>res.json())
        .then((data)=>{
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
      else if(buttonName=="Latest")
      {
        fetch("http://localhost:5000/all_vid_user",{
            method:'POST',
            body:JSON.stringify({
                   
                
                userid:userid
            }),
            headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
             }, 
        
        }).then((res)=>res.json())
        .then((data)=>{
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
      else{
        fetch("http://localhost:5000/all_vid_old",{
            method:'POST',
            body:JSON.stringify({
                   
                
                userid:userid
            }),
            headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
             }, 
        
        }).then((res)=>res.json())
        .then((data)=>{
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
    };
    useEffect(()=>{
        fetch("http://localhost:5000/all_vid_user",{
            method:'POST',
            body:JSON.stringify({
                   
                
                userid:userid
            }),
            headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
             }, 
        
        }).then((res)=>res.json())
        .then((data)=>{
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
          
        

    },[userid])
    return(
        <>
        <div className="userdet">
              <button>Latest</button>
              <button>Popular</button>
              <button>Oldest</button>

        </div>
        <div className="cardcontainer">
        <div className="userdet" style={{width:'100%',marginBottom:'15px'}}>
              <button style={{
          background: activeButton === "Latest" ? "black" : "lightgray",
          color: activeButton === "Latest" ? "white" : "black",
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
        onClick={() => handleButtonClick("Latest")}>Latest</button>
              <button
              style={{
                background: activeButton === "Popular" ? "black" : "lightgray",
                color: activeButton === "Popular" ? "white" : "black",
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
              onClick={() => handleButtonClick("Popular")}>Popular</button>
              <button
              style={{
                background: activeButton === "Oldest" ? "black" : "lightgray",
                color: activeButton === "Oldest" ? "white" : "black",
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
              onClick={() => handleButtonClick("Oldest")}>Oldest</button>
              </div>
            {
                data&& data.map((e)=>{
                    return(
                        <div className="im">
                        <Link to={`/bigscreen/${e.VIDEOID}`} style={{textDecoration:'none',color:'inherit'}} >
                        <video src={`http://localhost:5000${e.VIDEOURL}`} controls autoplay poster={e.POSTER}>
                           
                        </video>
                        <div className="viewdate">
                            <p style={{marginRight:'10px'}}>{e.VIEWS} views </p>
                            <p>{e.showDate}</p>
                        </div>
                         </Link>
                         </div>
                    )

                })
            }
           
            
        </div>
        </>


    )
}
export default Eachvideo;