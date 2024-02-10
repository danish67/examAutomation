// import Home from "./pages/home/Home";
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Users from "./pages/users/Users";
// import Products from "./pages/products/Products";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import Menu from "./components/menu/Menu";
// import Login from "./pages/login/Login";
// import "./styles/global.scss";
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

import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const Layout = () => {
        const navigate = useNavigate(); // move inside Layout component
        return (
            <div className="main">
                <Navbar />
                <div className="container">
                    <div className="menuContainer">
                        <Menu />
                    </div>
                    <div className="contentContainer">
                        <QueryClientProvider client={queryClient}>
                            <Outlet />
                        </QueryClientProvider>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: isLoggedIn ? <Layout />:  <Login />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/users",
                    element: <Users />,
                },
                {
                    path: "/products",
                    element: <Products />,
                },
            ],
        },
    ]);

    const handleLogin = () => {
        // Perform login logic, set isLoggedIn to true if login is successful
        setIsLoggedIn(true);
        navigate("/");
    };

    return (
        <RouterProvider router={router}>
            {!isLoggedIn && <Login onLogin={handleLogin} />}
        </RouterProvider>
    );
}

export default App;

