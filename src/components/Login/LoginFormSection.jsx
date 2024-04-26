// import React from "react";
// import { useState, useContext } from "react";
// // import axios from "axios";
// import { Navigate, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import AuthContext from "../../store/auth-context";
// // import { useHistory } from 'react-router-dom';
// const LoginFormSection = ({ onToggleForm }) => {
//   const AuthCtx = useContext(AuthContext);

//   const navigate = useNavigate();
//   // let history = useHistory();
//   // const [value1, setValue] = useState("admin");
//   const [email, setEmail] = useState("");
//   const [emailValid, setEmailValid] = useState(true); // State to track email validity
//   const [password, setPassword] = useState("");
//   const [passwordValid, setPasswordValid] = useState(true); // State to track password validity
//   const [remember, setRemember] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   // const changeValue = (value) => {
//   //   setValue(value);
//   //   console.log(value);
//   // };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };
//   // const handleEmail = event => {
//   //   setEmail(event.target.value)
//   // };
//   const handleEmail = (event) => {
//     const newEmail = event.target.value;
//     setEmail(newEmail);
//     setEmailValid(validateEmail(newEmail));
//   };
//   // const handlePass = event => {
//   //   setPassword(event.target.value)
//   // };
//   const handlePass = (event) => {
//     const newPassword = event.target.value;
//     setPassword(newPassword);
//     setPasswordValid(validatePassword(newPassword));
//   };

//   const handleRem = () => {
//     setRemember(!remember);
//   };

//   const validateEmail = (email) => {
//     // You can implement your own email validation logic here
//     return email.length > 0; // For example, check if the email is not empty
//   };

//   const validatePassword = (password) => {
//     // You can implement your own password validation logic here
//     return password.length >= 8; // For example, check if the password has at least 8 characters
//   };

//   // const loginApi = () => {
//   //   // if (value1 === "faculty") {
//   //   //   console.log("faculty me hai");
//   //   // } else if (value1 === "student") {
//   //   //   console.log("student me hai");
//   //   // } else if (value1 === "admin") {
//   //     if (isLogin) {
//   //     } else {
//   //       console.log("able else me ja bhi rha hai lya");
//   //       fetch("http://127.0.0.1:8000/clgadmin/login/", {
//   //         method: "POST",
//   //         body: JSON.stringify({
//   //           username: email,
//   //           password: password,
//   //         }),
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }).then(async (res) => {
//   //         console.log(res.text);
//   //         if (res.ok) {
//   //           await res.json().then((data) => {
//   //             var token = data["token"];
//   //             console.log(token);
//   //             // AuthCtx.login(token);
//   //             localStorage.setItem("token", token);
//   //             // localStorage.setItem("role",value1);
//   //             const expirationTime = new Date().getTime()  + 10 * 60 * 60 * 1000;
//   //             localStorage.setItem('tokenExpiration', expirationTime);
//   //             navigate("/admin", { state: { token: token } });
//   //           });
//   //         } else {
//   //           return await res.json().then((data) => {
//   //             let errorMessage = "Authentication Failed";
//   //             if (data && data.error && data.error.message) {
//   //               errorMessage = data.error.message;
//   //             }
//   //             alert(errorMessage);
//   //           });
//   //         }
//   //       });
//   //     }
//   //     console.log(email);
//   //   // }
//   //   // const formData = {
//   //   //   role: value1,
//   //   //   email: email,
//   //   //   password: password,
//   //   //   remember: remember,
//   //   // };

//   //   // alert(JSON.stringify(formData, null, 2));
//   // };
//   const loginApi = () => {
//       fetch("http://127.0.0.1:8000/clgadmin/login/", {
//         method: "POST",
//         body: JSON.stringify({
//           username: email,
//           password: password,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }).then(async (res) => {
//         if (res.ok) {
//           await res.json().then((data) => {
//             const token = data["token"];
//             localStorage.setItem("token", token);
//             const expirationTime = new Date().getTime() + 10 * 60 * 60 * 1000;
//             localStorage.setItem("tokenExpiration", expirationTime);
//             // Check user roles and navigate accordingly
//             const isAdmin = data["is_admin"];
//             const isStaff = data["is_staff"];
//             if (isAdmin) {
//               navigate("/admin", { state: { token: token } });
//               localStorage.setItem("role", "admin");
//             } else if (isStaff) {
//               navigate("/faculty", { state: { token: token } });
//               localStorage.setItem("role", "faculty");
//             } else {
//               navigate("/student", { state: { token: token } });
//               localStorage.setItem("role", "student");
//             }
//           });
//         } else {
//           return await res.json().then((data) => {
//             let errorMessage = "Authentication Failed";
//             if (data && data.error && data.error.message) {
//               errorMessage = data.error.message;
//             }
//             alert(errorMessage);
//           });
//         }
//       });
    
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (emailValid && passwordValid) {
//       loginApi();
//     } else {
//       let errorMessage = "Please correct the following issues:\n";
//       if (!emailValid) {
//         errorMessage += "- Invalid email format\n";
//       }
//       if (!passwordValid) {
//         errorMessage += "- Password must have at least 8 characters\n";
//       }
//       alert(errorMessage);
//     }
//   };

//   return (
//     <div className="top-[205px] right-[81px] h-[40vh] w-[42vw] overflow-hidden font-roboto nl:w-screen nl:h-auto sl:h-auto mb-4 sl:px-4 sl:w-screen nl:px-24 lg:fixed">
//       <div className="relative h-full p-8 bg-loginbackground rounded-lg shadow-xl ">
//         <form onSubmit={handleSubmit}>
//           {/* <div className="mb-4">
//             <div className="flex justify-between text-mediumslateblue-300">
//               <label className="border bor p-2 w-1/4  rounded-lg bg-blackd ">
//                 <input
//                   type="radio"
//                   id="admin"
//                   name="role"
//                   value="admin"
//                   className="mr-2"
//                   checked={value1 === "admin"}
//                   onChange={() => {
//                     changeValue("admin");
//                   }}
//                 />
//                 Admin
//               </label>

//               <label className="border p-2 w-1/4 rounded-lg bg-loginbackground ">
//                 <input
//                   type="radio"
//                   id="faculty"
//                   name="role"
//                   value="faculty"
//                   className="mr-2"
//                   checked={value1 === "faculty"}
//                   onChange={() => {
//                     changeValue("faculty");
//                   }}
//                 />
//                 Faculty
//               </label>

//               <label className="border p-2 w-1/4 rounded-lg bg-loginbackground">
//                 <input
//                   type="radio"
//                   id="student"
//                   name="role"
//                   value="student"
//                   className="mr-2"
//                   checked={value1 === "student"}
//                   onChange={() => {
//                     changeValue("student");
//                   }}
//                 />
//                 Student
//               </label>
//             </div>
//           </div> */}
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-600"
//             >
//               Email
//             </label>
//             <input
//               // type="email"
//               id="email"
//               name="email"
//               className="mt-1 p-2 border border-slate-300 rounded-md w-full focus:border-mediumslateblue-200 focus:outline-none ring-0 "
//               placeholder="Enter your email"
//               onChange={handleEmail}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-600"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"} // Show password if showPassword is true
//                 id="password"
//                 name="password"
//                 className="mt-1 p-2 border border-slate-300 rounded-md w-full focus:border-mediumslateblue-200 focus:outline-none ring-0"
//                 placeholder="Enter your password"
//                 onChange={handlePass}
//               />
//               {/* Eye icon button */}
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>
//           {/* <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               id="remember"
//               name="remember"
//               className="mr-2"
//               onChange={handleRem}
//             />
//             <label htmlFor="remember" className="text-sm text-gray-600">
//               Remember me
//             </label>
//           </div> */}
//           <p
//             className="cursor-pointer hover:font-bold text-left mb-4 text-sm text-gray-600 "
//             onClick={() => {}}
//           >
//             Forgot Password ?
//           </p>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-mediumslateblue-200 text-white rounded-md hover:bg-mediumslateblue-300 focus:outline-none focus:ring focus:ring-mediumslateblue-100"
//           >
//             Sign In
//           </button>
//           {/* {value1 === "faculty" && (
//             <p className="text-center mt-4 text-sm text-gray-600">
//               Faculty, Don't have an Account?{" "}
//               <span 
//                 className="cursor-pointer text-mediumslateblue-200"
//                 onClick={onToggleForm}
//               >
//                 Register
//               </span>
//             </p>
//           )} */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginFormSection;

import React from "react";
import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../../store/auth-context";
// import Loader from "react-loader-spinner";
import CircularProgress from "@mui/material/CircularProgress"; 

const LoginFormSection = ({ onToggleForm }) => {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailValid(validateEmail(newEmail));
  };

  const handlePass = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  const handleRem = () => {
    setRemember(!remember);
  };

  const validateEmail = (email) => {
    return email.length > 0;
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const loginApi = () => {
    setIsLoading(true); // Start loading animation
    fetch("http://127.0.0.1:8000/clgadmin/login/", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      setIsLoading(false); // Stop loading animation
      if (res.ok) {
        // Handle successful login
        await res.json().then((data) => {
          const token = data["token"];
          localStorage.setItem("token", token);
          const expirationTime = new Date().getTime() + 10 * 60 * 60 * 1000;
          localStorage.setItem("tokenExpiration", expirationTime);
          const isAdmin = data["is_admin"];
          const isStaff = data["is_staff"];
          if (isAdmin) {
            navigate("/admin", { state: { token: token } });
            localStorage.setItem("role", "admin");
          } else if (isStaff) {
            navigate("/faculty", { state: { token: token } });
            localStorage.setItem("role", "faculty");
          } else {
            navigate("/student", { state: { token: token } });
            localStorage.setItem("role", "student");
          }
        });
      } else {
        // Handle login failure
        return await res.json().then((data) => {
          let errorMessage = "Authentication Failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailValid && passwordValid) {
      loginApi();
    } else {
      let errorMessage = "Please correct the following issues:\n";
      if (!emailValid) {
        errorMessage += "- Invalid email format\n";
      }
      if (!passwordValid) {
        errorMessage += "- Password must have at least 8 characters\n";
      }
      alert(errorMessage);
    }
  };

  return (
    <div className="top-[205px] right-[81px] h-[40vh] w-[42vw] overflow-hidden font-roboto nl:w-screen nl:h-auto sl:h-auto mb-4 sl:px-4 sl:w-screen nl:px-24 lg:fixed">
      <div className="relative h-full p-8 bg-loginbackground rounded-lg shadow-xl ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              className="mt-1 p-2 border border-slate-300 rounded-md w-full focus:border-mediumslateblue-200 focus:outline-none ring-0"
              placeholder="Enter your email"
              onChange={handleEmail}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 p-2 border border-slate-300 rounded-md w-full focus:border-mediumslateblue-200 focus:outline-none ring-0"
                placeholder="Enter your password"
                onChange={handlePass}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <p
            className="cursor-pointer hover:font-bold text-left mb-4 text-sm text-gray-600 "
            onClick={() => {}}
          >
            Forgot Password ?
          </p>
          <div style={{ position: "relative" }}>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-mediumslateblue-200 text-white rounded-md hover:bg-mediumslateblue-300 focus:outline-none focus:ring focus:ring-mediumslateblue-100"
              disabled={isLoading}
              style={{ position: "relative", width: "100%" }}
            >
              {isLoading && <CircularProgress size={20} color="inherit" />}
              {!isLoading && "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormSection;
