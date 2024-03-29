// import React from "react";
// import "./home.scss"; // Import the home page styling
// import { menu } from "../../../data.js"; // Import the menu data

// // Import your icon images here
// import homeIcon from "../../../../public/home.png";
// // import addIcon from "../../icons/add.png";
// // import userIcon from "../../icons/user.svg";
// // // Import other icon images similarly

// const Home = () => {
//   return (
//     <div className="home">
//       <div className="menu-grid">
//         {menu.map((menuItem) => (
//           <div key={menuItem.id} className="menu-item">
//             <ul>
//             <h2>{menuItem.title}</h2>
//               {menuItem.listItems.map((listItem) => (
//                 <li key={listItem.id}>
//                   <a href={listItem.url}>
//                     {getIcon(listItem.icon)}
//                     {listItem.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Function to render icon based on the icon name
// function getIcon(iconName) {
//   switch (iconName) {
//     case "home.png":
//       return <img src={homeIcon} alt="Home" />;
//     // case "add.png":
//     //   return <img src={addIcon} alt="Add" />;
//     // case "user.svg":
//     //   return <img src={userIcon} alt="User" />;
//     // Add other cases for icons
//     default:
//       return null;
//   }
// }

// export default Home;
import React, { useEffect, useState } from "react";
import "./home.scss";
import { menu } from "../../../data.js";

// Import your icon images here
import homeIcon from "../../../../public/home.png";
import addIcon from "../../../../public/add.png";
import userIcon from "../../../../public/user.svg";

const Home = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Retrieve user role from local storage
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  // Function to render icon based on the icon name
  const getIcon = (iconName) => {
    switch (iconName) {
      case "home.png":
        return <img src={homeIcon} alt="Home" />;
      case "add.png":
        return <img src={addIcon} alt="Add" />;
      case "user.svg":
        return <img src={userIcon} alt="User" />;
      // Add other cases for icons
      default:
        return null;
    }
  };

  return (
    <div className="home">
      <div className="menu-grid">
        {userRole &&
          menu[userRole].map((menuItem) => (
            <div key={menuItem.id} className="menu-item">
              <ul>
                <h2>{menuItem.title}</h2>
                {menuItem.listItems.map((listItem) => (
                  <li key={listItem.id}>
                    <a href={listItem.url}>
                      {getIcon(listItem.icon)}
                      {listItem.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
