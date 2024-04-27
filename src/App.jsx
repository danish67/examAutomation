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
import Login from "./pages/Admin/login/Login";
import AddExam from "./pages/Admin/Exam/addExam/addExam";
import Home from "./pages/Admin/home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthRequired from "./AuthRequired";
import AddStudent from "./pages/Admin/Student/addStudent/addStudent";
import AddBatchForm from "./pages/Admin/Batch/addBatch/addBatchForm";
import AddDepartmentForm from "./pages/Admin/Department/addDepartment/addDeptForm";
import AddSectionForm from "./pages/Admin/Section/addSection/addSection";
import AddManually from "./components/Student/addStudent/addManually";
import AddExcel from "./components/Student/addStudent/addExcel";
import AddSubject from "./pages/Admin/Subject/addSubject/addSubject";
import AssignExam from "./pages/Admin/Exam/assignExam/assignExam";
import StudentDetails from "./pages/Admin/Student/studentDetails/studentDetails";
import PageNotFound from "./pages/Admin/Erropages/pageNotFound";
import SectionDetails from "./pages/Admin/Section/sectionDetails/sectionDetails";
import DeptDetails from "./pages/Admin/Department/departmentDetails/deptDetails";
import BatchDetails from "./pages/Admin/Batch/batchDetails/batchdetails";
import SubjectDetails from "./pages/Admin/Subject/subjectDetails/subjectDetails";
import FacultyDetails from "./pages/Admin/Faculty/facultydetails";
import AddCurriculum from "./pages/Admin/Curriculum/addCurriculum/addCurriculum";
import AssignExamStudent from "./pages/Student/Exam/ExamAssign/AssignExam";
import AddSubjectStudent from "./pages/Student/Subject/AddSubjects/AddSubjects";
import ViewStudents from "./pages/Faculty/Student/ViewStudents/ViewStudents";
import ViewSubject from "./pages/Student/Subject/AddSubjects/ViewSubjects";
import CourseDetails from "./pages/Faculty/Courses/ViewCourses/ViewCourses";

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
          <Route path="/admin/*" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="addStudent/*" element={<AddStudent />}>
              <Route path="addManually" element={<AddManually />} />
              <Route path="addExcel" element={<AddExcel />} />
            </Route>
            <Route path="studentDeatils" element={<StudentDetails />} />
            <Route path="addBatch" element={<AddBatchForm />} />
            <Route path="addDepartment" element={<AddDepartmentForm />} />
            <Route path="addSection" element={<AddSectionForm />} />
            <Route path="addExam" element={<AddExam />} />
            <Route path="addSubject" element={<AddSubject />} />
            <Route path="addCurriculum" element={<AddCurriculum />} />
            <Route path="assignExam" element={<AssignExam />} />
            <Route path="sectionDetails" element={<SectionDetails />} />
            <Route path="deptDetails" element={<DeptDetails />} />
            <Route path="batchDetails" element={<BatchDetails />} />
            <Route path="fetchSubjects" element={<SubjectDetails />} />
            <Route path="facultyDetails" element={<FacultyDetails />} />
            <Route path="curriculumDetails" element={<FacultyDetails />} />
          </Route>
        </Route>
        <Route element={<AuthRequired />}>
          <Route path="/faculty/*" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="viewStudents" element={<ViewStudents />} />
            <Route path="courseDetails" element={<CourseDetails/>} />
          </Route>
        </Route>
        <Route element={<AuthRequired />}>
          <Route path="/student/*" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="viewSubject" element={<ViewSubject/>} />
            <Route path="example3" element={<AddSubjectStudent />} />
          </Route>
        </Route>
        <Route path="/*" element={<Navigate to="/404" />} />
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
