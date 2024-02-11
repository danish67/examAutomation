import React from "react";
import { useState, useContext } from "react";
// import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "C:/Work/examautomation/src/store/auth-context";
// import { useHistory } from 'react-router-dom';
const LoginFormSection = ({ onToggleForm }) => {
  const AuthCtx = useContext(AuthContext);

  const navigate = useNavigate();
  // let history = useHistory();
  const [value1, setValue] = useState("faculty");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true); // State to track email validity
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true); // State to track password validity
  const [remember, setRemember] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const changeValue = (value) => {
    setValue(value);
    console.log(value);
  };
  // const handleEmail = event => {
  //   setEmail(event.target.value)
  // };
  const handleEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailValid(validateEmail(newEmail));
  };
  // const handlePass = event => {
  //   setPassword(event.target.value)
  // };
  const handlePass = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  const handleRem = () => {
    setRemember(!remember);
  };

  const validateEmail = (email) => {
    // You can implement your own email validation logic here
    return email.length > 0; // For example, check if the email is not empty
  };

  const validatePassword = (password) => {
    // You can implement your own password validation logic here
    return password.length >= 8; // For example, check if the password has at least 8 characters
  };

  const loginApi = () => {
    if (value1 === "faculty") {
      console.log("faculty me hai");
    } else if (value1 === "student") {
      console.log("student me hai");
    } else if (value1 === "admin") {
      if (isLogin) {
      } else {
        console.log("able else me ja bhi rha hai lya");
        // axios.post('http://127.0.0.1:8000/clgadmin/login/',JSON.stringify({
        //   username :email,
        //   password: password,
        // }),{
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // }
        // }).then(res=>{
        //   console.log(res)
        // }).catch(err=>console.log(err))
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
          console.log(res.text);
          if (res.ok) {
            await res.json().then((data) => {
              var token = data["token"];
              console.log(token);
              AuthCtx.login(token);
              navigate("/users", { state: { token: token } });
              // navigate("/dashboard");
            });
          } else {
            return await res.json().then((data) => {
              let errorMessage = "Authentication Failed";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
          }
          // return res.json();
        });
      }
      console.log(email);
    }

    // Show an alert with the form data
    const formData = {
      role: value1,
      email: email,
      password: password,
      remember: remember,
    };

    alert(JSON.stringify(formData, null, 2));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   loginApi();
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check email and password validity before submitting
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
    <div className="top-[175px] right-[81px] h-[60vh] w-[42vw] overflow-hidden font-roboto nl:w-screen nl:h-auto sl:h-auto mb-4 sl:px-4 sl:w-screen nl:px-24 lg:fixed">
      <div className="relative h-full p-8 bg-white shadow-md ">
        {/* <h2 className="text-3xl font-semibold mb-4">Login</h2> */}
        {/* <form onSubmit={(e) => {
  e.preventDefault();
  LoginApi()}}> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex justify-between text-mediumslateblue-300">
              <label className="border bor p-2 w-1/4  rounded-lg bg-loginbackground ">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  className="mr-2"
                  checked={value1 === "admin"}
                  onChange={() => {
                    changeValue("admin");
                  }}
                />
                Admin
              </label>

              <label className="border p-2 w-1/4 rounded-lg bg-loginbackground ">
                <input
                  type="radio"
                  id="faculty"
                  name="role"
                  value="faculty"
                  className="mr-2"
                  checked={value1 === "faculty"}
                  onChange={() => {
                    changeValue("faculty");
                  }}
                />
                Faculty
              </label>

              <label className="border p-2 w-1/4 rounded-lg bg-loginbackground">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  className="mr-2"
                  checked={value1 === "student"}
                  onChange={() => {
                    changeValue("student");
                  }}
                />
                Student
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              // type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border border-slate-300 rounded-md w-full focus:border-mediumslateblue-200 focus:outline-none ring-0 "
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
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 border border-slate-300 rounded-md w-full focus:border-mediumslateblue-200 focus:outline-none ring-0 "
              placeholder="Enter your password"
              onChange={handlePass}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="mr-2"
              onChange={handleRem}
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <p
            className="cursor-pointer hover:font-bold text-left mb-4 text-sm text-gray-600 "
            onClick={() => {}}
          >
            Forgot Password ?
          </p>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-mediumslateblue-200 text-white rounded-md hover:bg-mediumslateblue-300 focus:outline-none focus:ring focus:ring-mediumslateblue-100"
          >
            Sign In
          </button>
          {value1 === "faculty" && (
            <p className="text-center mt-4 text-sm text-gray-600">
              Faculty, Don't have an Account?{" "}
              <span
                className="cursor-pointer text-mediumslateblue-200"
                onClick={onToggleForm}
              >
                Register
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginFormSection;
