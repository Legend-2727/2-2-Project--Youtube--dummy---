import React, { createContext, useContext, useState } from "react";


const Resultcontext=createContext();
export const Resultcontextprovider=({children})=>{
    const[save,setsave]=useState({});
    
    
   
    return(
        <Resultcontext.Provider value={{save,setsave}}>
            {children}
        </Resultcontext.Provider>
    )

}
export default Resultcontext;
