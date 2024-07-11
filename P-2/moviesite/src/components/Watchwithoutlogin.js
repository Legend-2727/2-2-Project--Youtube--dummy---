import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
function Watchwithoutlogin(){
    return(
        <div className="withoutlog">
            <WatchLaterIcon style={{fontSize:'100px',marginTop:'30px'}}/>
            <h1>Sign in to watch videos</h1><br/>
            <h1>and enjoy..</h1><br/>
            <Link to='/signin' style={{textDecoration:'none',color:'inherit'}} ><button className="signin"><AccountCircleIcon/>Sign in </button></Link>
            
        </div>
    )
}
export default Watchwithoutlogin;