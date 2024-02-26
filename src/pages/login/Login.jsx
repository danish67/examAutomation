import React from "react";
import Content from "../../components/Login/Content";
import LoginFormSection from "../../components/Login/LoginFormSection";

export default function Login() {
  return (
    <div>
      <div className="flex justify-start items-center mt-5 ml-5 font-bold bg-white">
        <img src="favicon.png" alt="" />
        <span className="pl-2 text-2xl">EduProctor</span>
      </div>
      <div className="bg-loginbackground">
        <Content />
        <LoginFormSection />
      </div>
    </div>
  );
}
