import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { parseISO, formatDistanceToNow ,format} from 'date-fns';
function History()
{
    const {currentUser}=useSelector(state=>state.user);
    const [data,setdata]=useState(null);
    const [groupedData, setGroupedData] = useState({}); 
    // useEffect(()=>{
    //     if(currentUser){
    //         fetch(`http://localhost:5000/get_history/${currentUser.USERID}`)
    //         .then((res)=>{
    //             return res.json()
    //         }).then((data)=>{
                
    //             const updatedData = data.map((item) => {
    //                 const parsedDate = parseISO(item.VIEWED_AT);
    //                 const formattedDate = format(parsedDate, "do MMMM, yyyy");
    //                 console.log(formattedDate);
    //                 return {
    //                   ...item,
    //                   FORMATTED_DATE: formattedDate 
    //                 };
    //               });
    //               setdata(updatedData);
                  
    //             })
    //             .catch((error) => {
    //               console.error("Error fetching data:", error);
    //             });
    //         }
    //     },[])
        useEffect(() => {
            if (currentUser) {
                fetch(`http://localhost:5000/get_history/${currentUser.USERID}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const updatedData = data.map((item) => {
                            const parsedDate = parseISO(item.VIEWED_AT);
                            const formattedDate = format(parsedDate, "do MMMM, yyyy");
                            const parsedCreatedAt = parseISO(item.CREATED_AT);
                            const formattedCreatedDate = formatDistanceToNow(parsedCreatedAt, { addSuffix: true });
                            return {
                                ...item,
                                FORMATTED_DATE: formattedDate,
                                SHOW_CREATED_DATE: formattedCreatedDate
                            };
                           
                           
                        });
        
                        // Group data by formatted date
                        const groupedData = updatedData.reduce((groups, item) => {
                            if (!groups[item.FORMATTED_DATE]) {
                                groups[item.FORMATTED_DATE] = [];
                            }
                            groups[item.FORMATTED_DATE].push(item);
                            return groups;
                        }, {});
        
                        setGroupedData(groupedData);
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });
            }
        }, []);
        
    
    if(currentUser){
        return(
        //     <>
        //     <p style={{fontSize:'20px'}}>Watch History</p>
        //    { data && data.map((e,index)=>{
        //         return(
                    // <>
                   
                    // <div className="mainwatch">
                        
                    // {/* <Link to={`/bigscreen/${e.VIDEOID}`} style={{textDecoration:'none',color:'inherit'}} > */}
                    //  <div className="submain">
                    //     <div className="vidcont">
                    //        <video controls autoplay poster={e.POSTER}>
                    //              <source src={`http://localhost:5000${e.VIDEOURL}`} poster={e.POSTER} type="video/mp4"></source>
                    //        </video>
                    //     </div>
                    //     <div className="otherwatch">
                    //         {e.FORMATTED_DATE}
                    //        {/* <div><p>{e.USERID}</p></div>
                    //        <div><span>{e.VIEWS} views</span><span>.</span><span>{create[index]}</span></div> 
                    //        <div className="imwatch"><img src={e.USERLOGO}></img></div> */}
                    //     </div>
                    //     {/* <div className="iconthr">
                    //         <MoreVertIcon onClick={(a)=>handle(a,index)}></MoreVertIcon>
                    //         {watchlater[index] && <div className="removewatchlat">
                            
                    //          <button onClick={(a)=>handleremove(e.VIDEOID,index,a)}>Remove from watch later</button>
                             
                    //        </div>}
                    //     </div> */}
                    // </div>
                    // {/* </Link> */}
                    // </div>
                    // </>
                    <div className="his">
                    <p style={{ fontSize: '40px',fontWeight:'bolder' }}>Watch History</p>
                    {groupedData && Object.entries(groupedData).map(([formattedDate, videos]) => (
                        <div key={formattedDate}>
                            <p style={{fontWeight:'bolder',fontSize:'30px',marginLeft:'45px'}}>{formattedDate}</p>
                            <div className="mainwatch3">
                                {videos.map((e, index) => (
                                    <div key={index} className="submain3" style={{cursor:'pointer'}}>
                                        <video controls autoplay poster={e.POSTER} style={{width:'250px',height:'150px',borderRadius:'10px'}}>
                                  <source src={`http://localhost:5000${e.VIDEOURL}`} poster={e.POSTER} type="video/mp4"></source>
                           </video>     
                                        <div className="allback" style={{display:'flex',flexDirection:'column'}}>
                                          <p style={{fontSize:'20px',fontWeight:'bolder',marginLeft:'15px',marginBottom:'0px'}}>{e.VIDEO_TITLE}</p>
                                          <p style={{fontSize:'15px',marginLeft:'15px',fontWeight:'bold',marginBottom:'0px'}}>{e.VIEWS} views</p>
                                          <p style={{fontSize:'15px',marginLeft:'15px',fontWeight:'bold',marginBottom:'0px'}}>{e.SHOW_CREATED_DATE}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
    
                )
            }
        //    </>
        // )
        
        
       }
    
       
    

export default History;
