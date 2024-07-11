import React, { useRef, useState, useEffect } from "react";
import Adcomponent from "./Ad";
import { useParams } from "react-router-dom";
import { parseISO, formatDistanceToNow ,format} from 'date-fns';
import { useSelector } from "react-redux";
import NotificationsIcon from '@mui/icons-material/Notifications';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {ColorRing} from 'react-loader-spinner';
import { Link } from "react-router-dom";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


 import delay from "./delay"; 
function Videoplayer() {
  const {videoid}=useParams();
    console.log(videoid,123);
    const[ad_vid,set_ad_vid]=useState(null);
    const {currentUser}=useSelector(state=>state.user);
    const [subscribe,setsubscribe]=useState("Subscribe");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [option,setoption]=useState(false);
    const [data,setdata]=useState({});
    const [loading, setLoading] = useState(true);
    const [signin,setsignin]=useState(false);
    const [comment,setcomment]=useState(null);
  const mainVideoRef = useRef(null);
  const adVideoRef1 = useRef(null); 
  const adVideoRef2 = useRef(null); 
  const [videoplay, setVideoplay] = useState(false);
  const [showAd1, setShowAd1] = useState(false);
  const [showAd2, setShowAd2] = useState(false);
  const [mainVideoTime, setMainVideoTime] = useState(0);
  const [adDuration, setAdDuration] = useState(0);
  const [showdate,setshowdate]=useState("");
  const [viewvideo,setviewvideo]=useState([]);
  const [suborunsub,setsuborunsub]=useState(false);
  const [subchannel,setsubchannel]=useState([]);
  const [isbuttonclicked,setisbuttonclicked]=useState(false);
  const [showcomment,setshowcomment]=useState(false);
  const [useeffects,setuseeffects]=useState(false);
  const [commentdata,setcommentdata]=useState(null);
  const adPlayedRef1 = useRef(false); 
  const adPlayedRef2 = useRef(false); 
  const [replyOpenArray, setReplyOpenArray] = useState([]);
  const [reply,setreply]=useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [, forceUpdate] = useState(false);
  const [replyDropdownOpenArray, setReplyDropdownOpenArray] = useState([]);
  const [rvideo,setrvideo]=useState(null);
  const [report,setreport]=useState(null);
  const [like,setlike]=useState(0);
  const [likedvideo,setlikedvideo]=useState([]);
  const [localLikedVideos, setLocalLikedVideos] = useState([]);
  const [selectedReason, setSelectedReason] = useState("");



  const toggleReplyDropdown = (index) => {
    const newReplyDropdownOpenArray = [...replyDropdownOpenArray];
    newReplyDropdownOpenArray[index] = !newReplyDropdownOpenArray[index];
    setReplyDropdownOpenArray(newReplyDropdownOpenArray);
  };

  
  useEffect(() => {
    delay(1500).then(() => {
      setLoading(false);
    });
  }, []);
  useEffect(()=>{
    if(currentUser){
    fetch("http://localhost:5000/getlikedvideo",{
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
      
    const likedVideoIds = data.map(item => item.LIKEDVIDEO);
    setlikedvideo(likedVideoIds);
     
  })
  .catch((error) => {
      console.error("Error fetching data:", error);
  }); 
}


  },[]);
  useEffect(() => {
    const likedVideosFromStorage = localStorage.getItem('likedVideos');
    if (likedVideosFromStorage) {
      setLocalLikedVideos(JSON.parse(likedVideosFromStorage));
    }
  
    // ... rest of the useEffect code remains the same
  }, []);
  
  

  // Rest of your component logic to display the selected video

  useEffect(()=>{
    //  if(useeffects){
     // console.log("Ki vai");
    fetch("http://localhost:5000/get_comment",{
      method:'POST',
      body:JSON.stringify({
             
          video:videoid,
          
      }),
      headers: {
          'Content-Type': 'application/json',                 
          'Accept': '*/*' 
       }, 

  }).then((res)=>res.json())
  .then((data)=>{
      
     
     setcommentdata(data);
     setshowcomment(true);
  })
  .catch((error) => {
      console.error("Error fetching data:", error);
  }); 

  

  },[])
  useEffect(()=>{
    if (currentUser) {
      fetch(`http://localhost:5000/get_history/${currentUser.USERID}`)
          .then((res) => res.json())
          .then((data) => {
             

              setrvideo(data);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  }

  })
  useEffect(()=>{
    if(currentUser){
    const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }).split(',')[0];
console.log(currentDate);
    fetch("http://localhost:5000/perdayview",{
      method:'POST',
      body:JSON.stringify({
             
          videoid:videoid,
          date:currentDate
      }),
      headers: {
          'Content-Type': 'application/json',                 
          'Accept': '*/*' 
       }, 

  }).then((res)=>res.json())
  .then((data)=>{
      
     
    
  })
  .catch((error) => {
      console.error("Error fetching data:", error);
  }); 
}


  },[])
 

  const fetchComments = async (videoid) => {
    try {
      //console.log("biis");
      const response = await fetch("http://localhost:5000/get_comment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          video: videoid
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching comments:', error);
    }
  };

  const fetchReplies = async (commentId) => {
    try {
    //  console.log(commentId,12345678);
      const response = await fetch("http://localhost:5000/get_reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ commentId }), // Send commentId in the request body
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching replies:", error);
  }
  };

  useEffect(() => {
   // const videoid = videoid; 
    if(videoid){
    fetchComments(videoid)
      .then((commentData) => {
        setComments(commentData);
        return Promise.all(commentData.map(comment => fetchReplies(comment.COMM_ID)));
      })
      .then((repliesData) => setReplies(repliesData))
      .catch((error) => console.error('Error fetching data:', error));
  }},[replies]);

  useEffect(() => {
    if (showAd1 && !adPlayedRef1.current) {
      adVideoRef1.current.currentTime = 0; 
      adVideoRef1.current.play();
      adPlayedRef1.current = true; 
    }
  }, [showAd1]);

  useEffect(() => {
    if (showAd2 && !adPlayedRef2.current) {
      adVideoRef2.current.currentTime = 0; 
      adVideoRef2.current.play();
      adPlayedRef2.current = true; 
    }
  }, [showAd2]);
  useEffect(()=>{
        
        
    fetch(`http://localhost:5000/get_a_video/${videoid}`)
    .then((res)=>{
        return res.json()
    }).then((data)=>{
      const created_at = data[0].CREATED_AT;
       const parsedDate = parseISO(created_at);
       const formattedDate = formatDistanceToNow(parsedDate, { addSuffix: true });
     
       setshowdate(formattedDate);
        setdata(data);
       
    })
    fetch('http://localhost:5000/ad_for_video',{
          method:'POST',
          body:JSON.stringify({
              
              videoid:videoid
             

          }),
          headers: {
              'Content-Type': 'application/json',                 
              'Accept': '*/*' 
           }, 

      }).then((res)=>res.json())
      .then((data)=>{
       
         set_ad_vid(data);
         console.log(data,"ad");
      })

    

},[])
function handlebig(videoid)
{
  fetch(`http://localhost:5000/get_a_video/${videoid}`)
  .then((res)=>{
      return res.json()
  }).then((data)=>{
    const created_at = data[0].CREATED_AT;
     const parsedDate = parseISO(created_at);
     const formattedDate = formatDistanceToNow(parsedDate, { addSuffix: true });
   
     setshowdate(formattedDate);
      setdata(data);
      
     
  })
  
}

useEffect(() => {
  if(currentUser?.USERID){
  fetch(`http://localhost:5000/get_subscribed_channel/${currentUser.USERID}`)
    .then(res => res.json())
    .then(data => {
      setsubchannel(data);
    })
    .catch(error => {
      console.error("Error fetching subscribed channel data:", error);
    });
  }
}, []);

useEffect(() => {
  if (subchannel.length > 0) {
    fetch(`http://localhost:5000/get_a_video/${videoid}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const c = subchannel.some(item => item.SUBSCRIBE_ID === data[0].USERID);
          if (c) {
            console.log("Hello");
            setsuborunsub(true);
            setsubscribe("Subscribed");
          }
        } else {
          console.log("No video data found.");
        }
      })
      .catch(error => {
        console.error("Error fetching video data:", error);
      });
  }
}, [subchannel]);

// useEffect(()=>{
  
//  if(currentUser?.USERID){
//   fetch('http://localhost:5000/get_viewed_video',{
//     method:'POST',
//     body:JSON.stringify({
        
//         userid:currentUser.USERID
//     }),
//     headers: {
//         'Content-Type': 'application/json',                 
//         'Accept': '*/*' 
//      }, 

// }).then((res)=>res.json())
// .then((data)=>{
 
//    setviewvideo(data);
//    console.log(data,"ador");
//    console.log(videoid);
//    if (!Array.isArray(data) || !data.some((innerArray) => innerArray.includes(videoid))) {
//     console.log("klop");
//     fetch("http://localhost:5000/update_view",{
//       method:'POST',
//       body:JSON.stringify({
             
//           videoid:videoid
//       }),
//       headers: {
//           'Content-Type': 'application/json',                 
//           'Accept': '*/*' 
//        }, 

//   }).then((res)=>res.json())
//   .then((data)=>{
      
//      console.log(data);
//   })
//   .catch((error) => {
//       console.error("Error fetching data:", error);
//   });
//   fetch("http://localhost:5000/add_in_recentview",{
//       method:'POST',
//       body:JSON.stringify({
             
//           videoid:videoid,
//           userid:currentUser.USERID
//       }),
//       headers: {
//           'Content-Type': 'application/json',                 
//           'Accept': '*/*' 
//        }, 

//   }).then((res)=>res.json())
//   .then((data)=>{
      
//      console.log(data);
//   })
//   .catch((error) => {
//       console.error("Error fetching data:", error);
//   });  
// }
  
// })
//  }
 
// },[])
useEffect(()=>{
  if(currentUser)
  {
    fetch("http://localhost:5000/update_view",{
      method:'POST',
      body:JSON.stringify({
             
          videoid:videoid
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
  }

},[])

useEffect(() => {
  if (currentUser?.USERID) {
      fetch(`http://localhost:5000/get_history/${currentUser.USERID}`)
          .then((res) => res.json())
          .then((data) => {
              const videoExists = data.some((item) => item.VIDEOID === videoid);

              if (videoExists) {
                console.log("videoexists");                  // Video exists in history
                  const today = new Date();
                  const formattedToday = format(today, 'd MMMM, yyyy');
                  console.log(formattedToday);
                  const videoWithSameDate = data.find((item) => {
                      const parsedViewedAt = parseISO(item.VIEWED_AT);
                      const formattedViewedAt = format(parsedViewedAt, 'd MMMM, yyyy');
                      console.log(formattedViewedAt);
                      return item.VIDEOID === videoid && formattedViewedAt === formattedToday;
                  });

                  if (!videoWithSameDate) {
                    console.log("Not posss");
                     
                      fetch("http://localhost:5000/add_to_history", {
                          method: "POST",
                          body: JSON.stringify({
                              videoid: videoid,
                              userid: currentUser.USERID
                          }),
                          headers: {
                              'Content-Type': 'application/json',
                              'Accept': '*/*'
                          },
                      }).then((res) => res.json())
                      .then((data) => {
                          console.log(data);
                      })
                      .catch((error) => {
                          console.error("Error fetching data:", error);
                      });
                  }
              } else {
                console.log("Not exists");
                  // Video doesn't exist in history, add it
                  fetch("http://localhost:5000/add_to_history", {
                      method: "POST",
                      body: JSON.stringify({
                          videoid: videoid,
                          userid: currentUser.USERID
                      }),
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': '*/*'
                      },
                  }).then((res) => res.json())
                  .then((data) => {
                      console.log(data);
                  })
                  .catch((error) => {
                      console.error("Error fetching data:", error);
                  });
              }
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  }
}, []);


useEffect(()=>{
  if(option){
    console.log("no way");
  fetch("http://localhost:5000/reduce_sub",{
    method:'POST',
    body:JSON.stringify({
           
        
        subscribeid:data[0].USERID
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
  }
},[option])


function incrementAD(VIDEOURL,ADID)
 {
      fetch("http://localhost:5000/increment_AD", {
        method: "POST",
        body: JSON.stringify({
            videourl: VIDEOURL,
            adid : ADID
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
    }).then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
 }

  function handleTimeUpdate() {
    if (!mainVideoRef.current) {
      return; 
    }
    console.log(23456);
    if(adVideoRef2==null)
    {
      return;
    }
    if (!ad_vid || ad_vid.length === 0) {
      return; 
    }
    const currentTime = mainVideoRef.current.currentTime;
    if (currentTime >= 20 && currentTime < 7 * 60 && !showAd1 && !adPlayedRef1.current) {
      setShowAd1(true);
      
      setMainVideoTime(currentTime);
      mainVideoRef.current.pause();
    } else if (currentTime >= 7 * 60 && !showAd2 && !adPlayedRef2.current && ad_vid[1]) {
      setShowAd2(true);
     
      setMainVideoTime(currentTime);
      mainVideoRef.current.pause();
    }
  }

  function handleAdFinish1() {
    incrementAD(data[0].VIDEOURL, ad_vid[0].ADID);
    setShowAd1(false);
    mainVideoRef.current.currentTime = mainVideoTime + adDuration; 
    mainVideoRef.current.play();
    
  }

  function handleAdFinish2() {
    incrementAD(data[0].VIDEOURL, ad_vid[1].ADID);
    setShowAd2(false);
    mainVideoRef.current.currentTime = mainVideoTime + adDuration;
    mainVideoRef.current.play();
    
  }
  function handlesubscribe(userid)
  {
    setisbuttonclicked(!isbuttonclicked);
    setsuborunsub(true);
    fetch("http://localhost:5000/add_to_subscription",{
      method:'POST',
      body:JSON.stringify({
             
          subscribeid:userid,
          subscriberid:currentUser.USERID
      }),
      headers: {
          'Content-Type': 'application/json',                 
          'Accept': '*/*' 
       }, 

  }).then((res)=>res.json())
  .then((data)=>{
      
     console.log(data);
     setsubscribe("Subscribed");
     
  })
  .catch((error) => {
      console.error("Error fetching data:", error);
  });
    
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
   
    console.log(`Selected option: ${option}`);
    console.log(currentUser.USERID,data[0].USERID);
   
    setIsDropdownOpen(false);
    if(option=='2')
    {
      setsuborunsub(false);
      setoption(true);
      fetch("http://localhost:5000/unsubscribe",{
        method:'POST',
        body:JSON.stringify({
               
            subscribeid:data[0].USERID,
            subscriberid:currentUser.USERID
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
    }
    if(option=='1')
    {
     
      fetch("http://localhost:5000/add_notify",{
        method:'POST',
        body:JSON.stringify({
          
            tonotify:currentUser.USERID ,
            notification_from:data[0].USERID
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
    }
    if(option=='3')
    {
      setreport(true);
    }
  };
  function handlesignin()
  {
      setsignin(!signin);
  }
  function handlekey(e)
  {
    if(e.key=='Enter')
    {
      
      fetch("http://localhost:5000/add_comment",{
        method:'POST',
        body:JSON.stringify({
               
            commentedby:currentUser.USERID,
            video:videoid,
            comment:comment
        }),
        headers: {
            'Content-Type': 'application/json',                 
            'Accept': '*/*' 
         }, 
  
    }).then((res)=>res.json())
    .then((data)=>{
        
       console.log(data,"mon");
      
       //setuseeffects(!useeffects);
       
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
    console.log(useeffects);
    
    console.log(useeffects);
    setcomment("");
    }
    
    
  }
  function handlekeyreply(index)
  {
    const newReplyOpenArray = [...replyOpenArray];
    newReplyOpenArray[index] = !newReplyOpenArray[index];
    setReplyOpenArray(newReplyOpenArray);
  }
  function replysubmit(commentId) {
    const newReply = {
      USERID: currentUser.USERID,
      REPLY: reply,
    };
  
  
    const commentIndex = comments.findIndex((comment) => comment.COMM_ID === commentId);
  
    if (commentIndex !== -1) {
      
      const updatedComments = [...comments];
  
      const updatedComment = { ...updatedComments[commentIndex] };
  
      
      if (!updatedComment.replies) {
        updatedComment.replies = [];
      }
  
     
      const updatedReplies = [...updatedComment.replies, newReply];
  
      
      updatedComment.replies = updatedReplies;
  
      updatedComments[commentIndex] = updatedComment;
  
      setComments(updatedComments);
  
      setreply("");
    }

    setReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: [...(prevReplies[commentId] || []), newReply],
    }));
    forceUpdate(true);
  
    // Send the new reply to the server
    fetch("http://localhost:5000/add_reply", {
      method: 'POST',
      body: JSON.stringify({
        repliedby: currentUser.USERID,
        commentid: commentId,
        reply: reply,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "mon");
        // If needed, you can update the UI based on the server response here
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const handleBigVideoClick = (event, videoId) => {
    event.preventDefault(); // Prevent default video play behavior
    window.location.href = `/bigscreen/${videoId}`; // Change URL and reload
  };
  
  
  
  
  
function handleReport()
{
    fetch("http://localhost:5000/report_video", {
      method: 'POST',
      body: JSON.stringify({
        userid: currentUser.USERID,
        videoid: videoid,
        notes: selectedReason 
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
    })
      .then((res) => res.json())
      .then((data) => {
            console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      setreport(false);
}
  
const [localdisLikedVideos, setLocaldisLikedVideos] = useState([]);
  
const handlelike = () => {
  const videoId = videoid;
const updatedLikedVideos = [...localLikedVideos];
const updatedDislikedVideos = [...localdisLikedVideos]; 


if (localLikedVideos.includes(videoId)) {
 
  updatedLikedVideos.splice(updatedLikedVideos.indexOf(videoId), 1);
} else {
 
  updatedLikedVideos.push(videoId);

 
  const indexInDisliked = updatedDislikedVideos.indexOf(videoId);
  if (indexInDisliked !== -1) {
    updatedDislikedVideos.splice(indexInDisliked, 1);
  }
}

setLocalLikedVideos(updatedLikedVideos);
setLocaldisLikedVideos(updatedDislikedVideos); 
localStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
localStorage.setItem('dislikedVideos', JSON.stringify(updatedDislikedVideos));

 
  fetch("http://localhost:5000/like", {
    method: 'POST',
    body: JSON.stringify({
      userid: currentUser.USERID,
      videoid: videoId,
     
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
  })
    .then((res) => res.json())
    .then((data) => {
     
      const likedVideoIds = data.map(item => item.LIKEDVIDEO);
      setlikedvideo(likedVideoIds);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
const handledislike = () => {
  console.log("go for it");
  const videoId = videoid;
  const updatedLikedVideos = [...localLikedVideos];
  const updatedDislikedVideos = [...localdisLikedVideos]; 

  
  if (localdisLikedVideos.includes(videoId)) {
   
    updatedDislikedVideos.splice(updatedDislikedVideos.indexOf(videoId), 1);
  } else {
   
    updatedDislikedVideos.push(videoId);

    
    const indexInLiked = updatedLikedVideos.indexOf(videoId);
    if (indexInLiked !== -1) {
      updatedLikedVideos.splice(indexInLiked, 1);
    }
  }

  setLocalLikedVideos(updatedLikedVideos);
  setLocaldisLikedVideos(updatedDislikedVideos); 
  localStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
  localStorage.setItem('dislikedVideos', JSON.stringify(updatedDislikedVideos));

  
  fetch("http://localhost:5000/dislike", {
    method: 'POST',
    body: JSON.stringify({
      userid: currentUser.USERID,
      videoid: videoId,
      
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
  })
    .then((res) => res.json())
    .then((data) => {
      
      const dislikedVideoIds = data.map(item => item.DISLIKEDVIDEO);
      setlikedvideo(dislikedVideoIds);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
  
  
 

  return (
    <>
     {loading? <div className="loader">
  <ColorRing color="black" height={100} width={100} />
</div>
:
  <div className="wholelandr">
  <div className="lside">
    <div className="bigscreen">
     
    <div className="video">
      {data && data[0] && (
        <div className="allofvideo">
          <video
            ref={mainVideoRef}
            controls
            onTimeUpdate={handleTimeUpdate}
            style={{ display: showAd1 || showAd2 ? "none" : "block" }}
          >
            <source src={`http://localhost:5000${data[0].VIDEOURL}`} controls autoplay poster={data[0].POSTER} style={{ width: '80%' }} />
          </video>
          {ad_vid && ad_vid[0] &&
            <video
              ref={adVideoRef1}
              controls
              onEnded={handleAdFinish1}
              style={{ display: showAd1 ? "block" : "none" }}
            >
              <source src={`http://localhost:5000${ad_vid[0].ADURL}`} controls/>
            </video>}
          {ad_vid && ad_vid[1] &&
            <video
              ref={adVideoRef2}
              controls
              onEnded={handleAdFinish2}
              style={{ display: showAd2 ? "block" : "none" }}
            >
              <source src={`http://localhost:5000${ad_vid[1].ADURL}`} controls/>
            </video>}
          {showAd1 && <Adcomponent onClose={handleAdFinish1} />}
          {showAd2 && <Adcomponent onClose={handleAdFinish2} />}
          <div className="chnlname">
            <div className="logohold">
            <Link to={`/eachvideo/${data[0].USERID}`}><img src={data[0].USERLOGO} style={{ width: '60px', height: '60px', borderRadius: '50%' }} alt="User Logo" /></Link>
            </div>
            <div className="otherinfo">
              <p>{data[0].USERID}</p>
              <p>{data[0].NO_OF_SUBSCRIBER} subscribers</p>
              <p>{showdate}</p>
              <p>{data[0].VIEWS} views</p>
              
            </div>
             {currentUser?
              !suborunsub ?
              <>
            <div className="buttonsubs"><button onClick={()=>handlesubscribe(data[0].USERID)} >Subscribe</button></div>
            <div className="likeb" style={{display:'flex',alignItems:'centre',marginLeft:'100px'}}>
            <ThumbUpIcon
  onClick={handlelike}
  style={{
    fontSize: '30px',
    marginRight: '20px',
    cursor: 'pointer',
    marginLeft: '200px',
    color: localLikedVideos.includes(videoid) ? 'blue' : 'black',
  }}
/>
<ThumbDownIcon
  onClick={handledislike}
  style={{
    fontSize: '30px',
    cursor: 'pointer',
    color: localdisLikedVideos.includes(videoid) ? 'red' : 'black', 
  }}
/>
            </div>
            </> 
            :<> <div className="buttonsubsec"><button onClick={toggleDropdown} style={{width:'180px'}}><span style={{marginRight:'10px',marginLeft:'5px'}}><NotificationsIcon/></span><span style={{fontSize:'15px',fontWeight:'bolder'}}>Subscribed</span><span style={{marginRight:'10px',marginLeft:'5px'}}><KeyboardArrowDownIcon/></span></button></div>
               <div className="likeb" style={{display:'flex',alignItems:'flex-start',marginLeft:'100px'}}>
               <ThumbUpIcon
  onClick={handlelike}
  style={{
    fontSize: '30px',
    marginRight: '20px',
    cursor: 'pointer',
    marginLeft: '200px',
    color: localLikedVideos.includes(videoid) ? 'blue' : 'black',
  }}
/>
<ThumbDownIcon
  onClick={handledislike}
  style={{
    fontSize: '30px',
    cursor: 'pointer',
    color: localdisLikedVideos.includes(videoid) ? 'red' : 'black', 
  }}
/>
            </div>
              </>
            : <div className="buttonsubs"><button onClick={handlesignin} >Subscribe</button></div>
           
            
             } 
              {
              signin && <div className="si">
                <p style={{fontSize:'20px'}}>Want to subscribe to this channel?</p>
                <p>Sign in to subscribe to this channel</p>
                <Link to='/signin' style={{textDecoration:'none',color:'inherit'}} ><p style={{color:'blue',fontSize:'15px'}}>Sign in</p></Link>
              </div>
            }
             {isDropdownOpen && (
        <div className="dropdown-content">
          <a href="#" onClick={() => handleOptionClick('1')}>
            <NotificationsIcon  style={{marginRight:'8px'}}/> All
          </a>
          <a href="#" onClick={() => handleOptionClick('2')}>
            <UnsubscribeIcon  style={{marginRight:'8px'}}/> Unsubscribe
          </a>
          <a href="#" onClick={() => handleOptionClick('3')}>
            <NotInterestedIcon style={{marginRight:'8px'}}/>Report
          </a>
          
        </div>
      )}
             
          </div>
        </div>
      )}
    </div>
  </div>
  {currentUser && <div className="commentsec">
       <AccountCircleIcon style={{fontSize:'70px',marginRight:'10px'}}/>
       <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setcomment(e.target.value)} onKeyDown={(e)=>handlekey(e)}></input>
  </div>}
  {
    showcomment && 
    <div className="allcom">
        {showcomment &&  comments && comments.length > 0 &&(
            <div className="allcom">
              {comments?.map((comment, index) => (
                <div className="comment-container" key={index}>
                  {/* Comment */}
                  <div className="wholewithreply">
                    <div className="wholecomm">
                      <div className="logocomm">
                        <img src={comment.USERLOGO} alt="User Logo" />
                      </div>
                      <div className="eachcomm">
                        <p style={{fontWeight:'bolder'}}>@{comment.USERID}</p>
                        <p>{comment.COMMENT_DESCRIPTION}</p>
                        <button
                          className="combut"
                          onClick={() => handlekeyreply(index)}
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                    {replyOpenArray[index] && (
                      <div className="commentsec2">
                        <div className="replyinput">
                          <input
                            type="text"
                            placeholder="Add a reply..."
                            value={reply}
                            onChange={(e) => setreply(e.target.value)}
                            style={{ width: '100%' }}/>
                        </div>
                        <div className="subreply">
                          <button
                            className="rbut"
                            style={{backgroundColor:'blue'}}
                            onClick={() => handlekeyreply(index)}
                          >
                            Cancel
                          </button>
                          <button
                            className="rbut"
                            style={{backgroundColor:'blue',marginLeft:'30px'}}
                            onClick={() => replysubmit(comment.COMM_ID)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  

                  {/* Replies */}
                  {/* {replies[index] && ( */}
                  {replies[index]?.length > 0 && (
                  <div className="buttonsubsec">
                <button
                  onClick={() => toggleReplyDropdown(index)}
                  // style={{ width: '180px' }}
                  style={{ backgroundColor: 'transparent', color: 'black' }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 'bolder' ,color:'blue' }}>
                    Total
                  </span>
                  <span style={{ marginRight: '10px', marginLeft: '5px' }}>
                    {replyDropdownOpenArray[index] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </span>
                </button>
              </div>)}
              <div
                className="replies-container"
                style={{
                  // maxHeight: replyDropdownOpenArray[index] ? 100 : 0,
                  height: replyDropdownOpenArray[index] ? 'auto' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out',
                }}
              >
                      <ul>
                        {replies[index]?.map((reply, replyIndex) => (
                          <li key={replyIndex}>
                            <div className="wholewithreply">
                              <div className="wholecomm">
                                <div className="logocomm">
                                  <img
                                    src={reply.USERLOGO}
                                    alt="User Logo"
                                  />
                                </div>
                                <div className="eachcomm">
                                  <p style={{fontWeight:'bolder'}}>@{reply.USERID}</p>
                                  <p>{reply.REPLY}</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  {/* )} */}
                </div>
              ))}
                </div>
          )}
    </div>
  }
  </div>
  <div className="rside">
  <p style={{fontWeight:'bolder',marginLeft:'100px',fontSize:'30px'}}>Recently Watched...</p>
     {
      
      rvideo?.map((e)=>{
        return(
            <div className="rinsider">
{/*               
              <Link
              to={`/bigscreen/${e.VIDEOID}`}
              style={{ textDecoration: "none", color: "inherit" }} */}
              <video src={`http://localhost:5000${e.VIDEOURL}`} controls autoplay poster={e.POSTER} preload="auto"  onClick={(event) => handleBigVideoClick(event, e.VIDEOID)}></video>
              </div>
        )
      })
     }
  </div>
  </div>
  }
  
{report && (
  <div className="report-modal">
    <div className="report-content">
      <h2>Report Video</h2>
      <p>Please select the reason for reporting this video:</p>
      <div className="radio-options">
        <label>
          <input type="radio" name="reportReason" value="inappropriateContent" 
            onChange={() => setSelectedReason("Inappropriate Content")}
          />
          Inappropriate Content
        </label>
        <label>
          <input type="radio" name="reportReason" value="spam" 
            onChange={() => setSelectedReason("Spam or Misleading")}
          />
          Spam or Misleading
        </label>
        <label>
          <input type="radio" name="reportReason" value="hateSpeech" 
            onChange={() => setSelectedReason("Hate Speech")}
          />
          Hate Speech or Harassment
        </label>
        <label>
          <input type="radio" name="reportReason" value="violence" 
            onChange={() => setSelectedReason("Violence or Threatening")}
          />
          Violence or Threatening
        </label>
        <label>
          <input type="radio" name="reportReason" value="copyright" 
            onChange={() => setSelectedReason("Copyright infringement")}
          />
          Copyright Violation
        </label>
        <label>
          <input type="radio" name="reportReason" value="other" 
          onChange={() => setSelectedReason("No reason")}
          />
          Other
        </label>
      </div>
      <div className="report-buttons">
        <button className="cancel-button" onClick={() => setreport(false)}>Cancel</button>
        <button className="report-button" onClick={handleReport}>Report</button>
      </div>
    </div>
  </div>
)}

  </>

    
  );


}

export default Videoplayer;
