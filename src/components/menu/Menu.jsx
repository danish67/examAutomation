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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menu.scss';
import { menu } from '../../data';

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    window.scrollTo(0, 0);

  };

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              to={listItem.url}
              className={`listItem ${selectedItem === listItem.title ? 'selected' : ''}`}
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
