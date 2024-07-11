import React, { useEffect, useState } from "react";

function AdminShowUser() {
  const [rows, setRows] = useState([]);
  const [userVideos, setUserVideos] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [searchText, setSearchText] = useState(""); // State to store the search text

  useEffect(() => {
    fetch("http://localhost:5000/Admin_Show_User")
      .then((res) => res.json())
      .then((rows) => setRows(rows));
  }, []);

  useEffect(() => {
    if (expandedUser) {
      // Fetch user-specific videos when a user is expanded
      fetch("http://localhost:5000/user_videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: expandedUser }),
      })
        .then((res) => res.json())
        .then((videos) => setUserVideos(videos))
        .catch((error) => console.error("Error fetching user videos:", error));
    } else {
      // Clear user-specific videos when no user is expanded
      setUserVideos([]);
    }
  }, [expandedUser]);

  // Filter users based on the search text
  const filteredUsers = rows.filter((user) =>
    user.USERID.toLowerCase().includes(searchText.toLowerCase())
  );

  function showAllVideosofUser(UserId) {
    setExpandedUser(UserId === expandedUser ? null : UserId);
  }

  return (
    <div className="AdminShowUser">
      <h1>All users</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <div className="per_user" key={index}>
            <p>Name: {user.USERID}</p>
            <p>Email: {user.EMAIL}</p>
            <p>Ad_count: {user.AD_COUNT}</p>
            <p>      </p>
            <p>      </p>
            <button
              className="button-container"
              onClick={() => showAllVideosofUser(user.USERID)}
            >
              {expandedUser === user.USERID ? "Hide Videos" : "All Videos"}
            </button>
            {expandedUser === user.USERID && (
              <div className="user-videos">
                <h3>Videos:</h3>
                <div className="video-grid">
                  {userVideos.map((video, videoIndex) => (
                    <div className="user-video" key={videoIndex}>
                      <p>Title: {video.VIDEO_TITLE}</p>
                      <video src={`http://localhost:5000${video.VIDEOURL}`} controls autoplay  style={{width:'100%'}}></video>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AdminShowUser;
