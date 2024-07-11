import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [emaillog, setEmailLog] = useState("");
  const [passwordlog, setPasswordLog] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  function handleAdminSignIn() {
    // Reset error message
    setError(null);

    fetch("http://localhost:5000/Admin_Signin", {
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
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // Successful login, show confirmation code input
          setShowConfirmation(true);
        } else {
          // Login failed, display error message
          setError("Wrong email or password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setError("An error occurred. Please try again later.");
      });
  }

  function handleConfirmation() {
    // Check the confirmation code here
    // You can make a similar fetch request to verify the code

    // For example, check if the confirmation code is '1234'
    if (confirmationCode === "1234") {
      navigate("/admin_main_page");
    } else {
      setError("Invalid confirmation code. Please try again.");
    }
  }

  return (
    <div className="admin-signin-container">
      <input
        type="email"
        placeholder="Email"
        value={emaillog}
        onChange={(e) => setEmailLog(e.target.value)}
        className={error ? "highlight-input" : ""}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordlog}
        onChange={(e) => setPasswordLog(e.target.value)}
        className={error ? "highlight-input" : ""}
      />
      <button onClick={handleAdminSignIn} className="sign-in-button">
        Sign in
      </button>
      {showConfirmation && (
        <>
          <input
            type="number"
            placeholder="Confirmation Code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="confirmation-code-input"
          />
          <button onClick={handleConfirmation} className="confirm-button">
            Confirm
          </button>
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AdminPage;
