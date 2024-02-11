// import Home from "./pages/home/Home";
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Users from "./pages/users/Users";
// import Products from "./pages/products/Products";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import Menu from "./components/menu/Menu";
// import Login from "./pages/login/Login";
// import User from "./pages/user/User";
// import Product from "./pages/product/Product";
// import { QueryClient, QueryClientProvider, } from "react-query";
// const queryClient = new QueryClient();
// function App() {
//     const Layout = () => {
//         return (<div className="main">
//         <Navbar />
//         <div className="container">
//           <div className="menuContainer">
//             <Menu />
//           </div>
//           <div className="contentContainer">
//             <QueryClientProvider client={queryClient}>
//               <Outlet />
//             </QueryClientProvider>
//           </div>
//         </div>
//         <Footer />
//       </div>);
//     };
//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element: <Layout />,
//             children: [
//                 {
//                     path: "/",
//                     element: <Home />,
//                 },
//                 {
//                     path: "/users",
//                     element: <Users />,
//                 },
//                 {
//                     path: "/products",
//                     element: <Products />,
//                 },
//                 {
//                     path: "/users/:id",
//                     element: <User />,
//                 },
//                 {
//                     path: "/products/:id",
//                     element: <Product />,
//                 },
//             ],
//         },
//         {
//             path: "/login",
//             element: <Login />,
//         },
//     ]);
//     return <RouterProvider router={router}/>;
// }
// export default App;

import "./styles/global.scss";
import "./index.css";
// import Home from "./pages/home/Home";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   useNavigate,
// } from "react-router-dom";
// // import Users from "./pages/users/Users";
// // import Products from "./pages/products/Products";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import Menu from "./components/menu/Menu";
// import Login from "./pages/login/Login";
// import AddExam from "./pages/Exam/addExam/addExam";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { useState } from "react";

// // const queryClient = new QueryClient();

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const Layout = () => {
//     const navigate = useNavigate();
//     return (
//       <div className="main">
//         <Navbar />
//         <div className="container">
//           <div className="menuContainer">
//             <Menu />
//           </div>
//           <div className="contentContainer">
//             <Outlet />
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout /> ,

//       children: [
//         {
//           path: "/",
//           element: <Home />,

//         },
//         {
//           path: "/addExam",
//           element: <AddExam/>,
//         },
//         {
//           path: "/products",
//           element: <Home />,
//         },
//       ],
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//   ]);
//   const handleLogin = () => {
//     // Perform login logic, set isLoggedIn to true if login is successful
//     setIsLoggedIn(true);
//     navigate("/")

// };

// return (
//     <RouterProvider router={router}>
//         {!isLoggedIn && <Login onLogin={handleLogin} />}
//     </RouterProvider>
// );
// }

// export default App;
// import React, { useState } from 'react';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Navbar from './components/navbar/Navbar';
// import Footer from './components/footer/Footer';
// import Menu from './components/menu/Menu';
// import Login from './pages/login/Login';
// import AddExam from './pages/Exam/addExam/addExam';
// import Home from './pages/home/Home';
// import { QueryClient, QueryClientProvider } from 'react-query';

// const queryClient = new QueryClient();

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const Layout = () => (
//         <div className="main">
//             <Navbar />
//             <div className="container">
//                 <div className="menuContainer">
//                     <Menu />
//                 </div>
//                 <div className="contentContainer">
//                     <Outlet />
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );

//     const isLoggedInCheck = (params) => {
//         if (!isLoggedIn && params.nextPath !== '/login') {
//             return '/login'; // Redirect to login page if not logged in
//         }
//     };

//     const router = createBrowserRouter([
//         {
//             path: '/',
//             element: <Layout />,
//             canActivate: (params) => isLoggedInCheck(params),
//             children: [
//                 {
//                     path: '/',
//                     element: <Home />,
//                 },
//                 {
//                     path: '/addExam',
//                     element: <AddExam />,
//                 },
//                 {
//                     path: '/products',
//                     element: <Home />,
//                 },
//             ],
//         },
//         {
//             path: '/login',
//             element: <Login onLogin={() => setIsLoggedIn(true)} />, // Pass onLogin function to handle successful login
//         },
//     ]);

//     return (
//         <RouterProvider router={router}>
//             <QueryClientProvider client={queryClient}>
//                 {!isLoggedIn && <Login onLogin={() => setIsLoggedIn(true)} nextPath="/" />} {/* Show Login component if not logged in */}
//             </QueryClientProvider>
//         </RouterProvider>
//     );
// }

// export default App;
import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
  Route,
  Link,
  RouterProvider,
  Outlet,
  Router,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import AddExam from "./pages/Exam/addExam/addExam";
import Home from "./pages/home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthRequired from "./AuthRequired";
const queryClient = new QueryClient();

function App() {
  const Layout = () => (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );

  //   const router = createBrowserRouter(
  //     createRoutesFromElements(
  //       <Route path="/" element={<Home />}>
  //         <Route path="/login" element={<Login />} />
  //         <Route index element={<h1>Home page</h1>} />

  //         <Route element={<AuthRequired />}>
  //           <Route path="protected" element={<Layout />} />
  //         </Route>
  //       </Route>
  //     )
  //   );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRequired />}>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         // Check if the user is already logged in when the component mounts
//         const isUserLoggedIn = localStorage.getItem('isLogin');
//         console.log("yeh hai loggin staus"+isUserLoggedIn);
//         if (isUserLoggedIn === 'true') {
//             setIsLoggedIn(true);
//         }
//     }, []); // Empty dependency array ensures the effect runs only once

//     const Layout = () => (
//         <div className="main">
//             <Navbar />
//             <div className="container">
//                 <div className="menuContainer">
//                     <Menu />
//                 </div>
//                 <div className="contentContainer">
//                     <Outlet />
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );

//     const isLoggedInCheck = () => {
//         if (!isLoggedIn) {
//             return '/'; // Redirect to login page if not logged in
//         }
//     };

//     const router = createBrowserRouter([
//         {
//             path: '/home',
//             element: <Layout />,
//             canActivate: isLoggedInCheck,
//             children: [
//                 {
//                     path: '/home',
//                     element: <Home />,
//                 },
//                 // {
//                 //     path: '/addExam',
//                 //     element: <AddExam />,
//                 // },
//                 // {
//                 //     path: '/products',
//                 //     element: <Home />,
//                 // },
//             ],
//         },
//         {
//             path: '/',
//             element: <Login onLogin={() => setIsLoggedIn(true)} />, // Pass onLogin function to handle successful login
//         },
//     ]);

//     return (
//         <RouterProvider router={router}>
//             <QueryClientProvider client={queryClient}>
//                 {!isLoggedIn && <Login onLogin={() => setIsLoggedIn(true)} />} {/* Show Login component if not logged in */}
//             </QueryClientProvider>
//         </RouterProvider>
//     );
// }
