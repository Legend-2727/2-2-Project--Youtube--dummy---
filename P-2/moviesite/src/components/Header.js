import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Signin from "./Signin";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStart, fetchSuccess ,fetchOut} from "../redux/videoslice";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notify from "./Notification";

function Header() {
    const dispatch = useDispatch();
    const [notificationCount, setNotificationCount] = useState(0);
    const [search, setSearch] = useState("");
    const [showNotify, setShowNotify] = useState(false); // State to control the Notify panel
    const { currentUser } = useSelector(state => state.user);
    const [note,setnote]=useState(false);
    const navigate = useNavigate();

    function handle(e) {
        if (e.key === 'Enter') {
            dispatch(fetchStart());
            fetch(`http://localhost:5000/search?q=${search}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    dispatch(fetchSuccess(data));
                })
            navigate('/search');
        }
    }

    function blur() {
        dispatch(fetchOut());
    }
    useEffect(()=>{
        if(currentUser && note){
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

    }})
    useEffect(() => {
        if (currentUser) {
            fetch("http://localhost:5000/notification_count", {
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
                    setNotificationCount(data[0].NOTIFICATION_COUNT);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [currentUser]);

    // Function to toggle Notify visibility
    function toggleNotify() {
        setnote(true);
        setNotificationCount(0);
        setShowNotify(prevShowNotify => !prevShowNotify);
    }

    return (
        <header className="head">
            <div className="logo">
                <img src="./images/logotube2.jpg" alt="Logo"  style={{width:'350px',height:'100px'}}/>
               {currentUser && <div className="notify-icon-container">
                {notificationCount !== 0 && <div className="notify-badge">{notificationCount}</div>}
                    <NotificationsIcon
                        style={{ fontSize: '60px', color: 'white',cursor:'pointer' }}
                        onClick={toggleNotify} 
                    />
                </div>}
            </div>

            <div className="searchbar">
                <input type="search" placeholder="Search.." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => handle(e)} />
                <SearchIcon className="icon" />
            </div>

            {currentUser && currentUser?.USERID ? (
                <div className="logoimboss">
                    <div className="logoim">
                        <p style={{ color: 'white' }}>{currentUser.USERID}</p>
                    </div>
                    <div className="logoim">
                        <Link to='/whole' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img src={currentUser.USERLOGO} alt="User Logo" />
                        </Link>
                    </div>
                </div>
            ) : (
                <Link to='/signin' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button className="signin">
                        <AccountCircleIcon />Sign in
                    </button>
                </Link>
            )}

            {/* The Notify panel */}
            <div className={`notify-panel ${showNotify ? 'open' : ''}`}>
                <Notify toggleNotify={toggleNotify} /> 
            </div>
        </header>
    )
}

export default Header;
