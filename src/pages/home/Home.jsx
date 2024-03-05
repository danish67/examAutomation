import React from "react";
import "./home.scss"; // Import the home page styling
import { menu } from "../../data.js"; // Import the menu data

// Import your icon images here
import homeIcon from "../../../public/home.png";
// import addIcon from "../../icons/add.png";
// import userIcon from "../../icons/user.svg";
// // Import other icon images similarly

const Home = () => {
  return (
    <div className="home">
      <div className="menu-grid">
        {menu.map((menuItem) => (
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

// Function to render icon based on the icon name
function getIcon(iconName) {
  switch (iconName) {
    case "home.png":
      return <img src={homeIcon} alt="Home" />;
    // case "add.png":
    //   return <img src={addIcon} alt="Add" />;
    // case "user.svg":
    //   return <img src={userIcon} alt="User" />;
    // Add other cases for icons
    default:
      return null;
  }
}

export default Home;
