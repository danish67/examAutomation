import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";
const Menu = () => {
    return (<div className="menu">
      {menu.map((item) => (<div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (<Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt=""/>
              <span className="listItemTitle">{listItem.title}</span>
            </Link>))}
        </div>))}
    </div>);
};
export default Menu;
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Menu.scss";
// import { menu } from "../../data";
// const Menu = () => {
//   const [expandedItem, setExpandedItem] = useState(null);
//   const toggleItem = (itemId) => {
//     if (expandedItem === itemId) {
//       setExpandedItem(null);
//     } else {
//       setExpandedItem(itemId);
//     }
//   };
//   return (
//     <div className="menu">
//       {menu.map((item) => (
//         <div className={`item ${expandedItem === item.id ? 'expanded' : ''}`} key={item.id}>
//           <span className={`title ${expandedItem === item.id ? 'expanded' : ''}`} onClick={() => toggleItem(item.id)}>
//             {item.title}
//           </span>
//           {item.listItems.map((listItem) => (
//             <Link to={listItem.url} className="listItem" key={listItem.id}>
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
