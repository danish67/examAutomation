import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

function ViewMarks() {
  const [semester, setSemester] = useState("");
  
  const [typeOfMarks, setTypeOfMarks] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Static data for demonstration
  const marksData = [
    { course: "Distributed Computing", marks: 65 },
    { course: "Deep Learning", marks: 68 },
    { course: "Entrepreneurs Development Management", marks: 52 },
    { course: "Social Media Analytics", marks: 75 },
    { course: "Honours", marks: 68 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchTypeOfMarks = async () => {
    if (semester) {
      setTypeOfMarks([]);
      try {
        const token = `Token ${localStorage.getItem("token")}`;
        const response = await fetch(
          "http://127.0.0.1:8000/faculty/show_type_of_marks/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              course_id: course,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTypeOfMarks(data.result);
        } else {
          console.error("Failed to fetch Courses");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const indexOfLastMark = (page + 1) * rowsPerPage;
  const indexOfFirstMark = indexOfLastMark - rowsPerPage;
  const currentMarks = marksData.slice(indexOfFirstMark, indexOfLastMark);

  return (
    <div className="mt-10 ml-10 space-y-12">
      <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
        View Marks
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
            onChange={(e) => setSemester(e.target.value)}
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
      <div className="mt-10 sm:col-span-3">
        <label
          htmlFor="typeOfMarks"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Type of Marks
        </label>
        <div className="mt-2">
          <select
            id="typeOfMarks"
            name="typeOfMarks"
            value={typeOfMarks}
            onChange={(e) => setTypeOfMarks(e.target.value)}
            className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="">Select Type of Marks</option>
            {/* Add options for different types of marks */}
            <option value="Quiz">Internal Assessment-1</option>
            <option value="Quiz">Internal Assessment-2</option>
            <option value="Midterm">End Sem</option>
            <option value="Final">Oral Practical</option>
          </select>
        </div>
      </div>
      <div className="mt-10">
        <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentMarks.map((mark, index) => (
                  <TableRow key={index}>
                    <TableCell>{mark.course}</TableCell>
                    <TableCell>{mark.marks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={6}
            count={marksData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default ViewMarks;
