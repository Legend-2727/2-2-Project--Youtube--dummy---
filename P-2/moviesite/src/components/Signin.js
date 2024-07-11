import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "../redux/userslicer";
import { useAsyncError, useNavigate } from "react-router-dom";
import { companyStart, companySuccess } from "../redux/companyslicer";
import Modal from "react-modal";
function Signin(){
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [confirmpass,setConfirmPass]=useState("");
    const [companyConfirmPass,setCompanyConfirmPas] = useState("");
    const [userid,setuserid]=useState("");
    const [logo,setlogo]=useState("");
    const [emaillog,setemaillog]=useState("");
    const [passwordlog,setpasswordlog]=useState("");
    const [comemail,setcomemail]=useState("");
    const [compassword,setcompassword]=useState("");
    const [comuserid,setcomuserid]=useState("");
    const [comemaillog,setcomemaillog]=useState("");
    const [compasswordlog,setcompasswordlog]=useState("");
    const [error, setError] = useState(null);
    const [comerror,setComerror] = useState(null);
    const [confirmpasserror,setConfirmPasserror] = useState(null);
    const [companyconfirmpasserror,setCompanyConfirmPasserror] = useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [photo, setPhoto] = useState(null);

    function handlesignin() {
        dispatch(loginStart());
        setError(null); // Reset error message
    
        fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify({
            email: emaillog,
            password: passwordlog,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              throw new Error("Invalid email or password"); // Handle other status codes if needed
            }
          })
          .then((data) => {
            dispatch(loginSuccess(data));
            console.log(data);
            navigate("/");
          })
          .catch((error) => {
            setError(error.message); // Set the error message
          });
      }
    function handlecomsignin(){
        setComerror(null);
        dispatch(companyStart());
        fetch('http://localhost:5000/companylogin',{
          method:'POST',
          body:JSON.stringify({
              
              email:comemaillog,
              password:compasswordlog
             

          }),
          headers: {
              'Content-Type': 'application/json',                 
              'Accept': '*/*' 
           }, 

      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Invalid email or password"); // Handle other status codes if needed
        }
      })
      .then((data) => {
        dispatch(companySuccess(data));
        console.log(data);
        navigate('/company');
      })
      .catch((error) => {
        setComerror(error.message); // Set the error message
      });
    //   .then((res)=>res.json())
    //   .then((data)=>{
    //     dispatch(companySuccess(data));
    //       console.log(data);
         
    //   })
    //   navigate('/company');
      
    }
    function handlesignup(){
        if (password !== confirmpass) {
            setConfirmPasserror("Passwords do not match.");
            return; // Exit the function if passwords don't match
          }
        dispatch(loginStart());
        setConfirmPasserror(null);
          fetch('http://localhost:5000/signup',{
            method:'POST',
            body:JSON.stringify({
                userid: userid,
                  email: email,
                 password: password,
                 userlogo: logo, // Include the userlogo field
                   no_of_subscriber: 0, // Include the no_of_subscriber field
                 ad_count: 0, // Include the ad_count field
                  ad_on: 0,
               

            }),
            headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
             }, 

        }).then((res)=>res.json())
        .then((data)=>{
            dispatch(loginSuccess(data));
            console.log(data);
           
        })
        navigate('/');
    }
    function handlecomsignup(){
        if (compassword !== companyConfirmPass) {
            setCompanyConfirmPasserror("Passwords do not match.");
            return; // Exit the function if passwords don't match
          }
        dispatch(companyStart());
          fetch('http://localhost:5000/companysignup',{
            method:'POST',
            body:JSON.stringify({
                companyname: comuserid,
                  email: comemail,
                 password: compassword,
                 due:0,
                 deadline:"2000-05-29"
                 
            }),
            headers: {
                'Content-Type': 'application/json',                 
                'Accept': '*/*' 
             }, 

        }).then((res)=>res.json())
        .then((data)=>{
            dispatch(companySuccess(data));
            console.log(data);
           
        })
        navigate('/company');
        console.log(90);
        
    }
    function handleadmin()
    {
        navigate('/adminpage');
    }
    const modalStyles = {
        content: {
          width: "400px",
          height: "400px",
          margin: "auto", // Center the modal horizontally
        },
    };
    function handlePhotoUpload(event) {
        // Handle the photo upload here and store the file object in the 'photo' state
        const selectedPhoto = event.target.files[0];
        setPhoto(selectedPhoto);
        setShowPhotoModal(false);
        handlesignup(); // Close the modal after selecting a photo
      }
      function handleSkipPhotoUpload() {
        setShowPhotoModal(false);
        handlesignup();
      }
    return(
            <div className="signincon">
              <div className="signincontainer user-container">
                <p>User</p>
                <input type="email" placeholder="Email" onChange={(e) => setemaillog(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setpasswordlog(e.target.value)} />
                <button className="signin-btn" onClick={handlesignin}>
                  Sign In
                </button>
                {error && <p className="error-message" style={{color:'red'}}>{error}</p>} {/* Display error message */}
                <p>or</p>
                <input type="text" placeholder="User Name.." value={userid} onChange={(e) => setuserid(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmpass} onChange={(e) => setConfirmPass(e.target.value)}/>
                {/* <input type="text" placeholder="Channel logo" value={logo} onChange={(e) => setlogo(e.target.value)} /> */}
                <button className="signup-btn" onClick={() => setShowPhotoModal(true)}>
                    Sign Up
                </button>                
                {confirmpasserror && <p className="error-message" style={{ color: 'red' }}>{confirmpasserror}</p>}
                <Modal
                    isOpen={showPhotoModal}
                    onRequestClose={() => setShowPhotoModal(false)} // Close modal when clicking outside or pressing ESC
                    contentLabel="Photo Upload Modal"
                    style={modalStyles}
                    >
                    <h2>Upload Your Photo</h2>
                     <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                    <button className="adb1" onClick={handleSkipPhotoUpload}>Skip</button>
                </Modal>
            </div>
            <div className="signincontainer company-container">
                <p>Ad-Company</p>
                <input type="email" placeholder="Email" onChange={(e) => setcomemaillog(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setcompasswordlog(e.target.value)} />
                <button className="signin-btn" onClick={handlecomsignin}>Sign In</button>
                {comerror && <p className="error-message" style={{color:'red'}}>{comerror}</p>}
                <p>or</p>
                <input type="text" placeholder="Company Name.." value={comuserid} onChange={(e) => setcomuserid(e.target.value)} />
                <input type="email" placeholder="Email" value={comemail} onChange={(e) => setcomemail(e.target.value)} />
                <input type="password" placeholder="Password" value={compassword} onChange={(e) => setcompassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmpass} onChange={(e) => setCompanyConfirmPas(e.target.value)}/>

                <button className="signup-btn" onClick={handlecomsignup}>Sign Up</button>
                {companyconfirmpasserror && <p className="error-message" style={{ color: 'red' }}>{companyconfirmpasserror}</p>}

            </div>
            <div className="adminbut">
                <button onClick={handleadmin}>Admin</button>
            </div>
        </div>
          );
    
    
}
export default Signin;