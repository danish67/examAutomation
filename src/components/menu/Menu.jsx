// import { Link } from "react-router-dom";
// import "./menu.scss";
// import { menu } from "../../data";
// const Menu = () => {
//     return (<div className="menu">
//       {menu.map((item) => (<div className="item" key={item.id}>
//           <span className="title">{item.title}</span>
//           {item.listItems.map((listItem) => (<Link to={listItem.url} className="listItem" key={listItem.id}>
//               <img src={listItem.icon} alt=""/>
//               <span className="listItemTitle">{listItem.title}</span>
//             </Link>))}
//         </div>))}
//     </div>);
// };
// export default Menu;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './menu.scss';
// import { menu } from '../../data';

// const Menu = () => {
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleItemClick = (itemId) => {
//     setSelectedItem(itemId);
//     window.scrollTo(0, 0);

//   };

//   return (
//     <div className="menu">
//       {menu.map((item) => (
//         <div className="item" key={item.id}>
//           <span className="title">{item.title}</span>
//           {item.listItems.map((listItem) => (
//             <Link
//               to={listItem.url}
//               className={`listItem ${selectedItem === listItem.title ? 'selected' : ''}`}
//               onClick={() => handleItemClick(listItem.title)}
//               key={listItem.id}
//             >
//               <img src={listItem.icon} alt="" />
//               <span className="listItemTitle">{listItem.title}</span>
//             </Link>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Menu;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Retrieve user role from local storage
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    window.scrollTo(0, 0);
  };

  // Determine which menu to display based on user role
  let userMenu = [];
  if (userRole === "admin") {
    userMenu = menu.admin;
  } else if (userRole === "student") {
    userMenu = menu.student;
  } else if (userRole === "faculty") {
    userMenu = menu.faculty;
  }

  return (
    <div className="menu">
      {userMenu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              to={listItem.url}
              className={`listItem ${
                selectedItem === listItem.title ? "selected" : ""
              }`}
              onClick={() => handleItemClick(listItem.title)}
              key={listItem.id}
            >
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
