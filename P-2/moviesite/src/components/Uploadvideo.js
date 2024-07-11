import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
// import './Uploadvideo.css'; // Import your custom CSS file for styling

function Uploadvideo() {
    const [file, setfile] = useState(null);
    const [shortsfile,setshortsfile]=useState(null);
    const [title, settitle] = useState('');
    const [shortstitle,setshortstitle]=useState('');
    const { currentUser } = useSelector(state => state.user);
    const [poster, setposter] = useState('');
    const [upload,setupload]=useState(false);
    useEffect(()=>{
        if(upload)
        {
            window.alert("Video uploaded successfully");
        }
    },[upload]);

    function handleUploadfile(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('video', file);
        data.append('title', title);
        data.append('poster', poster);
        window.alert("Video uploaded successfully");

        fetch(`http://localhost:5000/upload/${currentUser.USERID}`, {
            method: 'POST',
            body: data
        }).then((response) => {
            return response.json();
        }).then((data)=>{
            if (data.status === 200) {
                setupload(true);
                console.log(data.status);
                
            } 
           
           
           
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        
    }
    function handleUploadshorts(event)
    {
        event.preventDefault();
        const data = new FormData();
        data.append('video', shortsfile);
        data.append('title', shortstitle);
        window.alert("Shorts uploaded successfully");

        fetch(`http://localhost:5000/uploadshorts/${currentUser.USERID}`, {
            method: 'POST',
            body: data
        }).then((response) => {
            return response.json();
        }).then((data)=>{
            if (data.status === 200) {
                setupload(true);
                console.log(data.status);
                
            } 
           
           
           
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

    return (
        <div className="upload-container">
           
            {currentUser ? (
                <>
                <div className="upload-form">
                    <h2>Upload a Video</h2>
                    <input
                        type="text"
                        placeholder="Video Title"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Poster Link"
                        value={poster}
                        onChange={(e) => setposter(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setfile(e.target.files[0])}
                    />
                    <button onClick={handleUploadfile}>Upload</button>
                </div>
                 <div className="upload-form">
                 <h2>Upload Shorts</h2>
                 <input
                     type="text"
                     placeholder="Shorts Title"
                     value={shortstitle}
                     onChange={(e) => setshortstitle(e.target.value)}
                 />
                
                 <input
                     type="file"
                     accept="video/*"
                     onChange={(e) => setshortsfile(e.target.files[0])}
                 />
                 <button onClick={handleUploadshorts}>Upload</button>
             </div>
             </>
            ) : (
                <div className="without-log">
                    <h1>Sign in to upload videos</h1>
                    <p>and enjoy...</p>
                    <Link to='/signin' className="sign-in-link">
                        <button className="sign-in-btn">
                            <AccountCircleIcon />
                            Sign in
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Uploadvideo;
