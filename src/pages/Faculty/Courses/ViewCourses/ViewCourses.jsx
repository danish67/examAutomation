import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function CourseDetails() {
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, [semester]);


  const fetchCourses = async () => {
    if (semester) {
      setCourses([])
      try {
        const token = `Token ${localStorage.getItem("token")}`;
        const response = await fetch(
          "http://127.0.0.1:8000/faculty/show_course_of_faculty/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              semester: semester,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data.result);
        } else {
          console.error("Failed to fetch Courses");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form>
      <div className="mt-10 ml-10 space-y-12">
        <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
          Course Details
        </h2>
        <div className="mt-10 sm:col-span-3">
          <label
            htmlFor="semester"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Semester
          </label>
          <div className="mt-2">
            <select
              id="semester"
              name="semester"
              value={semester}
              onChange={(e) => {
                const selectedSemester = e.target.value;
                setSemester(selectedSemester);
                fetchCourses();
              }}
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="CourseDetails" hidden={!semester}>
          <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Course Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Course Code
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Course ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </form>
  );
}

export default CourseDetails;
