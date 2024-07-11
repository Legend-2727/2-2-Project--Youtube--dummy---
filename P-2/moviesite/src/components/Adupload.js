import React from "react";
import { useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Adupload(){
const [file,setfile]=useState();
    const {currentCompany}=useSelector(state=>state.company);
    console.log("lki",1234);
   
    function handleUploadfile (event)  {
        event.preventDefault();
        const data = new FormData();
        data.append('video',file );
        console.log(data);
       
        fetch(`http://localhost:5000/uploadad/${currentCompany.COMPANY_NAME}`, {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'enctype':"multipart/form-data",
                
             },
             body: data
        }).then((response) =>  {
           return response.json();
        })
    }
    return (
        <div className="adupload-container">
          {currentCompany ? (
            <>
            <div className="adupload-content">
              <h2>Upload Ad Video</h2>
              <input
                type="file"
                name="video"
                onChange={(e) => setfile(e.target.files[0])}
              />
              <button className="upload-button" onClick={handleUploadfile}>
                Submit
              </button>
            </div>
           <Link to={'/company'} ><button
  style={{
    width: '100px',
    height: '50px',
    position: 'absolute',
    right: '30px',
    top: '80px',
    backgroundColor: '#3498db', // Blue color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  }}
>
  Back
</button></Link>
            </>
          ) : (
            <div className="adupload-content">
              <h1>Sign in to upload videos</h1>
              <p>and enjoy...</p>
              <Link to="/signin" className="signin-link">
                <button className="signin-button">
                  <AccountCircleIcon />
                  Sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      );
    
}
export default Adupload;


