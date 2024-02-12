import React from "react";
import "./home.scss"
import NavTabs from "../../../components/Student/addStudent/navTabs";
import { Outlet } from "react-router-dom";

export default function AddStudent() {
  return (
    <div className="navTabs">
      <NavTabs />
      <div className="content">
          <Outlet />
      </div>
    </div>
  );
};
