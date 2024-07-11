import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function Alladvideo()
{
    const {videoid}=useParams();
    console.log(videoid);
    const [video,setvideo]=useState(null);
    const [mainvideo,setmainvideo]=useState(null);
    const [poster,setposter]=useState('');
    const [showchange,setshowchange]=useState(false);
    useEffect(()=>{
        fetch("http://localhost:5000/all_ad_video")
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            setvideo(data);
            
            
        })
        fetch(`http://localhost:5000/get_a_video/${videoid}`)
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            setmainvideo(data);
            console.log(data,123456);
            
        })


    },[])
    useEffect(()=>{
      console.log("lokiol");
      fetch(`http://localhost:5000/get_a_video/${videoid}`)
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            setmainvideo(data);
            // console.log(data,123456);
            
        })
    },[showchange])
    const [selectedVideos, setSelectedVideos] = useState([]);

  const handleCheckboxChange = (event, videoId) => {
    if (event.target.checked) {
      // Check if the number of selected videos is less than two
      if (selectedVideos.length < 2) {
        setSelectedVideos((prevSelectedVideos) => [...prevSelectedVideos, videoId]);
      } else {
        // If already two videos are selected, prevent selecting more
        event.target.checked = false;
      }
    } else {
      setSelectedVideos((prevSelectedVideos) =>
        prevSelectedVideos.filter((id) => id !== videoId)
      );
    }
  };
  function handleonclick()
  {
    window.alert("Ad added successfully");
    fetch('http://localhost:5000/videowithad',{
      method:'POST',
      body:JSON.stringify({
          
        selectedVideos: selectedVideos,
        videoid: videoid,
         

      }),
      headers: {
          'Content-Type': 'application/json',                 
          'Accept': '*/*' 
       }, 

  }).then((res)=>res.json())
  .then((data)=>{
    
      console.log(data);
     
  })
  }
  function handlethumb()
  {
    setshowchange(!showchange);
  }
  function changethumb()
  {
     window.alert("Thumbnail changed successfully");
    setshowchange(!showchange);
    fetch('http://localhost:5000/changethumbnail',{
      method:'POST',
      body:JSON.stringify({
          
       
        videoid: videoid,
        poster:poster
         

      }),
      headers: {
          'Content-Type': 'application/json',                 
          'Accept': '*/*' 
       }, 

  }).then((res)=>res.json())
  .then((data)=>{
    
      console.log(data);
     
  })
  }

  return (
    <div className="alladcon">
        <div className="mainvid">
            {mainvideo && mainvideo?.map((e)=>{
                return(
                 <div className="mcon">
                       <video src={`http://localhost:5000${e.VIDEOURL}`} controls poster={e.POSTER}></video>
                       <div className="detailscontainer">
                       <Link to={`/statistics/${videoid}`} style={{textDecoration:'none',color:'inherit'}}> <button className="statistics-button">Statistics</button></Link>
                        <button className="thumbnail-button" style={{marginRight:'50px'}} onClick={handlethumb}>Change Thumbnail</button>
                       {showchange && <div className="thumbcon">
                        <input
                        type="text"
                        placeholder="Poster Link"
                        value={poster}
                        onChange={(e) => setposter(e.target.value)}
                    />
                      <button onClick={changethumb}>Change</button>
                        </div>}
                       </div>
                    </div>
                )
            })
            
        }
        <p>Select maximum two adds for this video..</p>
        </div>
        <div className="mdc">
      {video && video?.map((e) => {
        const videoId = e.ADID;
        return (
          <div key={videoId} className="im2">
            <video src={`http://localhost:5000${e.ADURL}`} controls />
            <div className="mainf">
              <div className="f1">
                <input
                  type="checkbox"
                  value={videoId}
                  checked={selectedVideos.includes(videoId)}
                  onChange={(event) => handleCheckboxChange(event, videoId)}
                />
              </div>
              <div className="f2">
                <p>{e.COMPANY_NAME}</p>
                <p>{e.TOTALVIEW} views</p>
              </div>
            </div>
          </div>
        );
      })}
      </div>
      <div className="adbuttons">
      <button 
  onClick={handleonclick} 
  style={{
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    width:'100px'
  }}
>
  Add Ad
</button>
</div>
{/* {showchange && <div className="thumbcon">
                        <input
                        type="text"
                        placeholder="Poster Link"
                        value={poster}
                        onChange={(e) => setposter(e.target.value)}
                    />
                      <button onClick={changethumb}>Change</button>
                        </div>} */}
    </div>

  );
}
export default Alladvideo;