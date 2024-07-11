import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminShowCompany() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [companyAds, setCompanyAds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Admin_Show_Company")
      .then((res) => res.json())
      .then((rows) => {
        setRows(rows);
        setFilteredRows(rows); // Initially, show all rows
      });
  }, []);

  // Function to filter rows based on search text
  useEffect(() => {
    const filtered = rows.filter((row) =>
      row.COMPANY_NAME.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchText, rows]);

  function fetchCompanyAds(companyname) {
    fetch("http://localhost:5000/admin_show_ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyname: companyname }),
    })
      .then((res) => res.json())
      .then((ads) => {
        setCompanyAds(ads);
      })
      .catch((error) => console.error("Error fetching company ads:", error));
  }

  function toggleCompanyAds(companyName) {
    if (expandedCompany === companyName) {
      setExpandedCompany(null); // Collapse if it's already expanded
    } else {
      fetchCompanyAds(companyName); // Fetch ads if expanded
      setExpandedCompany(companyName);
    }
  }

  return (
    <div className="AdminShowCompany">
      <h1>All Companies</h1>
      <input
        type="text"
        placeholder="Search by Company Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="company-grid">
        {filteredRows.map((company, index) => (
          <div key={index}>
            <div className="company-card">
              <p>Name: {company.COMPANY_NAME}</p>
              <p>Email: {company.EMAIL}</p>
              <p>Deadline: {company.DEADLINE}</p>
              {/* <p>Due: {company.DUE}</p> */}
              <button
                className="ads-button"
                onClick={() => toggleCompanyAds(company.COMPANY_NAME)}
              >
                {expandedCompany === company.COMPANY_NAME ? "Hide Ads" : "All Ads"}
              </button>
            </div>
            {expandedCompany === company.COMPANY_NAME && (
              <div className="ads-grid">
                {companyAds.map((ad, adIndex) => (
                  <div className="ad-card" key={adIndex}>
                  <video src={`http://localhost:5000${ad.ADURL}`} controls autoplay  style={{width:'100%'}}></video>

                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminShowCompany;
