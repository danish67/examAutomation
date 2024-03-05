import "./styles/global.scss";
import "./index.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  RouterProvider,
  Outlet,
  Router,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import AddExam from "./pages/Exam/addExam/addExam";
import Home from "./pages/home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthRequired from "./AuthRequired";
import AddStudent from "./pages/Student/addStudent/addStudent";
import AddBatchForm from "./pages/Batch/addBatch/addBatchForm";
import AddDepartmentForm from "./pages/Department/addDepartment/addDeptForm";
import AddSectionForm from "./pages/Section/addSection/addSection";
import AddManually from "./components/Student/addStudent/addManually";
import AddExcel from "./components/Student/addStudent/addExcel";
import AddSubject from "./pages/Subject/addSubject/addSubject";
import AssignExam from "./pages/Exam/assignExam/assignExam";
import StudentDetails from "./pages/Student/studentDetails/studentDetails";
import PageNotFound from "./pages/Erropages/pageNotFound";
import SectionDetails from "./pages/Section/sectionDetails/sectionDetails";
import DeptDetails from "./pages/Department/departmentDetails/deptDetails";
import BatchDetails from "./pages/Batch/batchDetails/batchdetails";
import SubjectDetails from "./pages/Subject/subjectDetails/subjectDetails";
import FacultyDetails from "./pages/Faculty/facultydetails";

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AuthRequired />}>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/addStudent" element={<AddStudent />}>
              <Route path="/addStudent/addManually" element={<AddManually />} />
              <Route path="/addStudent/addExcel" element={<AddExcel />} />
            </Route>
            <Route path="/studentDeatils" element={<StudentDetails />} />
            <Route path="/addBatch" element={<AddBatchForm />} />
            <Route path="/addDepartment" element={<AddDepartmentForm />} />
            <Route path="/addSection" element={<AddSectionForm />} />
            <Route path="/addExam" element={<AddExam />} />
            <Route path="/addSubject" element={<AddSubject />} />
            <Route path="/assignExam" element={<AssignExam />} />
            <Route path="/sectionDetails" element={<SectionDetails />} />
            <Route path="/deptDetails" element={<DeptDetails />} />
            <Route path="/batchDetails" element={<BatchDetails />} />
            <Route path="/fetchSubjects" element={<SubjectDetails />} />
            <Route path="/facultyDetails" element={<FacultyDetails />} />
          </Route>
        </Route>
        <Route element={<AuthRequired />}>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
        <Route element={<AuthRequired />}>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
        <Route path="/*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
