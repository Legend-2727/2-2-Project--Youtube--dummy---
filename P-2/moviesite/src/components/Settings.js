// import React from "react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// function Settings() {
//     const [newPassword, setNewPassword] = useState('');
    
//     const {currentUser}=useSelector(state=>state.user);
  
//     const handlePasswordChange = () => {
//         fetch("http://localhost:5000/changepassword",{
//             method:'POST',
//             body:JSON.stringify({
                
                
//                 userid:currentUser.USERID,
//                 password:newPassword

               
  
//             }),
//             headers: {
//                 'Content-Type': 'application/json',                 
//                 'Accept': '*/*' 
//              }, 
  
//         }).then((res)=>res.json())
//         .then((data)=>{
           
//             console.log(data);
           
//         })
//         .catch((error) => {
//             console.error("Error fetching data:", error);
//         });
//         window.alert("Password changed successfully");
       
//     }
    
//   function handleHelp(){

//   }
    
    
  
//     return (
//         <div className="fulllength">
//       <div className="settings-container">
//         <h1>Settings</h1>
//         <div className="input-container">
//           <label htmlFor="newPassword">New Password:</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <button onClick={handlePasswordChange}>Change Password</button>
//         </div>
//          <div className="no">
//           <button onClick={handleHelp}>Ask for help</button>
//          </div>
//       </div>
//       <div className="buofback">
//         <Link to={'/'}><button>Back</button></Link>
//       </div>
//       </div>
//     );
//   }
// export default Settings;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Settings() {
  const [newPassword, setNewPassword] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [problemDescription, setProblemDescription] = useState("");
  const { currentUser } = useSelector(state => state.user);

  const handlePasswordChange = () => {
    // Your password change logic
    // ...
    fetch("http://localhost:5000/changepassword",{
            method:'POST',
            body:JSON.stringify({
                userid:currentUser.USERID,
                password:newPassword
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
        window.alert("Password changed successfully");
  }

  const handleHelp = () => {
    setShowHelpModal(true);
  }

  const handleCloseHelpModal = () => {
    setShowHelpModal(false);
    setProblemDescription(''); // Clear the input field
  }

  const handleSendHelpRequest = () => {
    // Handle sending help request with problemDescription
    // ...
    fetch("http://localhost:5000/problem_box",{
            method:'POST',
            body:JSON.stringify({
                userid:currentUser.USERID,
                msg:problemDescription,
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
    console.log("Problem Description:", problemDescription);
    window.alert("Thanks for your feedback .We are looking into this matter.");
    handleCloseHelpModal(); // Close the modal after sending
  }

  return (
    <div className="fulllength">
      <div className="settings-container">
        <h1>Settings</h1>
        <div className="input-container">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Change Password</button>
        </div>
        <div className="no">
          <button onClick={handleHelp}>Ask for help</button>
        </div>
      </div>
      <div className="buofback">
        <Link to={'/'}><button>Back</button></Link>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="help-modal" style={{marginLeft:'550px'}}>
          <div className="help-modal-content">
            <h2>Ask for Help</h2>
            {/* <label htmlFor="problemDescription">Problem Description:</label> */}
            <textarea
  placeholder='Enter your description here'
  id="problemDescription"
  value={problemDescription}
  onChange={(e) => setProblemDescription(e.target.value)}
  style={{
    width: '500px', // Adjust the width as needed
    height: '100px', // Adjust the height as needed
    resize: 'vertical', // Allow vertical resizing only (you can use 'none' or 'horizontal' if needed)
  }}
/>
            <div className="help-modal-buttons">
              <button onClick={handleSendHelpRequest}>OK</button>
              <button onClick={handleCloseHelpModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
