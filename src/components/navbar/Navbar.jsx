import "./navbar.scss";
import { useState, useEffect } from "react";

function Navbar() {
  const [username, setUsername] = useState(""); // State to store the username

  useEffect(() => {
    fetchUsername(); // Fetch the username when the component mounts
  }, []);

  const fetchUsername = async () => {
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/get_users",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Assuming the username is the first item in the array
        setUsername(data.length > 0 ? data[0].username : "");
      } else {
        console.error("Failed to fetch username");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };




    return (<div className="navbar">
      <div className="logo">
        <img src="favicon.png" alt=""/>
        <span>EduProctor</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src="profile.png" alt=""/>
          <span>Zishan</span>
        </div>
        
      </div>
    </div>);
};
export default Navbar;
