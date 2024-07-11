import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminMainPage()
{
    const navigate=useNavigate();
    console.log("here");
    function All_user()
    {
       navigate('/admin_show_user');
    }
    function All_company()
    {
        navigate('/admin_show_company');
    }
    const [notification, setNotification] = useState([]);
    const [reported_videos,setReported_videos]=useState([]);
    const [deletedVideos, setDeletedVideos] = useState([]);
    useEffect(() => {
    fetch('http://localhost:5000/Admin_Panel_problem')
      .then((res) => res.json())
      .then((notification) => setNotification(notification));
    }, []);
    useEffect(() => {
        fetch('http://localhost:5000/Admin_Panel_reports')
          .then((res) => res.json())
          .then((reported_videos) => setReported_videos(reported_videos));
        }, []);
    // useEffect(() => {
    //     fetch('http://localhost:5000/Admin_get_videos')
    //         .then((res) => res.json())
    //         .then((singlevideourl) => setsinglevideourl(singlevideourl));
    //     }, []);
    // function getVideos(VIDEOID) {
    //     fetch('http://localhost:5000/Admin_get_videos',{
    //       method:'POST',
    //       body:JSON.stringify({
              
    //           video_url:VIDEOID,
    //       }),
    //       headers: {
    //           'Content-Type': 'application/json',                 
    //           'Accept': '*/*' 
    //        }, 

    //   }).then((res)=>res.json())
    //     .then((singlevideourl) => setReported_videos(singlevideourl));
    //   }


      const [expandedVideoId, setExpandedVideoId] = useState(null);


      function handleVideoClick(videoId) {
        if (expandedVideoId === videoId) {
            setExpandedVideoId(null); // Collapse the video if it's already expanded
        } else {
            setExpandedVideoId(videoId); // Expand the clicked video
        }
    }


    function handleAdminDelete(VIDEOID, USERID) {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
    
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
    
        const warningInput = document.createElement('input');
        warningInput.type = 'text';
        warningInput.placeholder = 'Enter a warning message (optional)';
        warningInput.className = 'warning-input';
    
        const okButton = document.createElement('button');
        okButton.innerText = 'OK';
        okButton.className = 'modal-button';
    
        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancel';
        cancelButton.className = 'modal-button';
    
        okButton.addEventListener('click', () => {
            const warningMessage = warningInput.value;
            if (warningMessage !== '') {
                fetch('http://localhost:5000/Admin_delete', {
                    method: 'POST',
                    body: JSON.stringify({
                        videoid: VIDEOID,
                        warningMessage: warningMessage,
                        userid: USERID,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error(`Server returned an error: ${res.status}`);
                    }
                })
                .then((data) => {
                    if (data) {
                        console.log(data);
                        
                    }
                    else{
                        console.log("ghorar dim");
                    }
                    setDeletedVideos([...deletedVideos, VIDEOID]);
                    closeModal();
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                    setDeletedVideos([...deletedVideos, VIDEOID]);
                    closeModal();
                    //closeModal();
                });
            } else {
                closeModal();
            }
        });
    
        cancelButton.addEventListener('click', () => {
            closeModal();
        });
    
        modalContent.appendChild(warningInput);
        modalContent.appendChild(okButton);
        modalContent.appendChild(cancelButton);
    
        modalContainer.appendChild(modalContent);
    
        document.body.appendChild(modalContainer);
    
        function closeModal() {
            document.body.removeChild(modalContainer);
        }
    }
    
    function handle()
{
    navigate('/signin');
}
    
    
    return(
        <div className="AdminMainPage">
        <div className="comuse">
            <button className="adbt1" onClick={All_user}>Users</button>
            <button className="adbt1" onClick={All_company}>Companies</button>
        </div>
            <div className="notification_bx">
                <h1 style={{fontSize:'35px',fontFamily:'sans-serif'}}>Notifications </h1>
                <h3>Problem Box:</h3>
                <ul>
                    {notification.map((e, index) => (
                        <div className="problems" key={index}>
                            <p>Name: {e.USERID}</p>
                            <p>Description: {e.PROBLEM_DESCRIPTION}</p>
                        </div>
                    ))}
                </ul>
                <h3>Reported Videos :</h3>
                <ul>
                    {reported_videos.map((e, index) => (
                        <div className="reports_on_videos" key={index}>
                            <p>
                                Name: {e.USERID} has reported this {" "}
                                <a href="#" onClick={() => handleVideoClick(e.VIDEOID)}>
                                    video
                                </a>
                            </p>
                            {deletedVideos.includes(e.VIDEOID) ? (
                                <p>Video has been deleted, and a warning sent to the user.</p>
                            ) : (
                                expandedVideoId === e.VIDEOID && (
                                    <div>
                                        <p>Description: {e.NOTES}</p>
                                        <p>video id:{e.VIDEOID}</p>
                                        <video src={`http://localhost:5000${e.VIDEOURL}`} controls autoplay  style={{width:'100%'}}></video>
                                        <button onClick={() => handleAdminDelete(e.VIDEOID,e.USERID)}>
                                            Delete
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </ul>
            </div>
            <div>
                <button className="adbt1" style={{position:'absolute',right:'50px',top:'40px'}} onClick={handle}>
                    Log Out
                </button>
            </div>
        </div>
    )
}
export default AdminMainPage;