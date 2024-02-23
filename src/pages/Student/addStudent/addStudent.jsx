import React from "react";
// import "./home.scss"
import NavTabs from "../../../components/Student/addStudent/navTabs";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function AddStudent() {
  return (
    <div className="navTabs">
      <h1 className="mt-10 ml-10 text-base font-semibold text-xl leading-7 text-gray-900">
            Add Student
            </h1>
      <NavTabs />
      <div className="content">
          <Outlet />
      </div>
    </div>
  );
};
