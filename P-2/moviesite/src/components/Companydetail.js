import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

function Company() {
  const [ad, setad] = useState(null);
  const { currentCompany } = useSelector((state) => state.company);
  const [dueText, setDueText] = useState("Due Payment");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [totalViewsString, setTotalViewsString] = useState("");
  const [change,setchange]=useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/all_ad", {
      method: "POST",
      body: JSON.stringify({
        company_name: currentCompany.COMPANY_NAME,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setad(data);
        const totalViewsSum = data.reduce((accumulator, row) => accumulator + row.TOTALVIEW, 0);
        setTotalViewsString(totalViewsSum.toString() * 2 + " Dollars Only");
      });
  });

  const handleHover = () => {
    setDueText(totalViewsString); // Update the text on hover
  };

  const handleMouseLeave = () => {
    setDueText("  Due  Payment"); // Reset the text on mouse leave
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleSubmitPayment = () => {
    // Implement your payment logic here
    console.log("Phone Number:", phoneNumber);
    console.log("Pin Code:", pinCode);
    fetch("http://localhost:5000/payment", {
      method: "POST",
      body: JSON.stringify({
        company_name: currentCompany.COMPANY_NAME,
        phoneNumber: phoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response from the payment endpoint if needed
        console.log("Payment response:", data);
        window.location.reload();
        setchange(!change);
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
      });

    // Reset the payment modal fields
    setPhoneNumber("");
    setPinCode("");

    // Close the payment modal after payment is processed
    closePaymentModal();
  };
  const handlePayment = () => {
    openPaymentModal(true);
  };

  return (
    <div className="maincompany2">
      <header className="company-header">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} style={{ fontSize: '30px' }}>
              {dueText}
            </li>
            <li className="nav-item" style={{ fontSize: '30px' }}>
              <Link to="/uploadad" className="nav-link">
                Upload Ad
              </Link>
            </li>
            <li className="nav-item" style={{ fontSize: '30px' }}>
              <Link to="/" className="nav-link">
                Log out
              </Link>
            </li>
            <button className="adbt1" onClick={handlePayment}>Pay</button>
          </ul>
        </nav>
        <p className="company-name">{currentCompany.COMPANY_NAME}</p>
      </header>
      <div className="ad-list">
        {ad && ad.length > 0 ? (
          ad.map((e) => (
            <div className="ad-container" key={e.ADID}>
              <video src={`http://localhost:5000${e.ADURL}`} controls autoPlay>
                Your browser does not support the video tag.
              </video>
              <div className="ad-info">
                <div className="ad-logo"></div>
                <div className="ad-details">
                  <p style={{fontSize:'20px'}}>{e.COMPANY_NAME}</p>
                  <p style={{fontSize:'20px'}}>{e.TOTALVIEW} views</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="noad">
            <p className="noad-text">No uploaded Ads yet..</p>
            <SentimentSatisfiedAltIcon className="noad-icon" />
          </div>
        )}
      </div>
      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="payment-modal" style={{marginTop:'50px'}}>
          <div className="payment-modal-content">
            <h2>Payment Details</h2>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <label htmlFor="pinCode">Pin Code:</label>
            <input type="password" id="pinCode" placeholder="Enter your pin code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
            <div className="payment-modal-buttons">
              <button className="adbt1" onClick={handleSubmitPayment}>Okay</button>
              <button className="adbt1" onClick={closePaymentModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Company;
