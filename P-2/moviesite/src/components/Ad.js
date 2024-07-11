import React from "react";
import { useState,useEffect } from "react";
function Adcomponent({onClose})
{
   const [adplay,setadplay]=useState(true);
   useEffect(()=>{
    setTimeout(()=>{
        setadplay(false);
    },30000);
   },[]);

   function handleadfinish()
   {
    setadplay(false);
    onClose();
   }
   return(
    <div>
        {adplay && 
        
            <div>
                {/* <video controls>
             <source src="http://localhost:5000/public/videos/L10_2Feb (1).mp4" type="video/mp4" />
           
                </video> */}
                {/* <button onClick={handleadfinish}>Close ad</button> */}
            </div>
        
        }
    </div>
   )
}
 export default Adcomponent;