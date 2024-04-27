import "./navbar.scss";
import React from "react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigateTo = useNavigate();

  const handleLogout = () => {
    // Display a confirmation prompt
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    // Check if the user confirmed the logout
    if (confirmLogout) {
      // Clear localStorage
      localStorage.clear();
      // Redirect to the login page
      navigateTo('/login');
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="favicon.png" alt=""/>
        <span>EduProctor</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src="profile.svg" alt=""/>
          <span>User</span>
          <button onClick={handleLogout}>
            <img src="logout.png" alt=""/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;




  // const [username, setUsername] = useState(""); // State to store the username

  // useEffect(() => {
  //   fetchUsername(); // Fetch the username when the component mounts
  // }, []);

  // const fetchUsername = async () => {
  //   try {
  //     const token = `Token ${localStorage.getItem("token")}`;
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/clgadmin/get_users",
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       // Assuming the username is the first item in the array
  //       setUsername(data.length > 0 ? data[0].username : "");
  //     } else {
  //       console.error("Failed to fetch username");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };