import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";


function StudentDetails() {
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [department]);

  useEffect(() => {
    fetchStudents();
  }, [batch]);

  const fetchDepartments = async () => {
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch("http://127.0.0.1:8000/clgadmin/ViewDepartment/", {
        headers: {
          'Authorization': `${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDepartments(data.result);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBatches = async () => {
    if (department !== "") {
      try {
        const token = `Token ${localStorage.getItem('token')}`;
        const response = await fetch(
          "http://127.0.0.1:8000/clgadmin/ViewBatches/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`
            },
            body: JSON.stringify({
              department: department,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBatches(data.result);
        } else {
          console.error("Failed to fetch batches");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
//
  const fetchStudents = async () => {
    setStudents([])
    if (department !== "" && batch !== "") {
      setLoading(true);
      try {
        const token = `Token ${localStorage.getItem("token")}`;
        const response = await fetch(
          "http://127.0.0.1:8000/clgadmin/ViewStudentsFromBatches/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              batch: batch,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setStudents(data.result);
        } else {
          console.error("Failed to fetch students");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (department && batch) {
      fetchStudents(department, batch);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastStudent = (page + 1) * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 ml-10 space-y-12">
        <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
          Student Details
        </h2>
        <div className="mt-10 sm:col-span-3">
          <label
            htmlFor="department"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Department
          </label>
          <div className="mt-2">
            <select
              id="department"
              name="department"
              value={department}
              onChange={(e) => {
                const selectedDepartment = e.target.value;
                setDepartment(selectedDepartment);
              }}
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.value} value={department.value}>
                  {department.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10 sm:col-span-3">
          <label
            htmlFor="batch"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Batch
          </label>
          <div className="mt-2">
            <select
              id="batch"
              name="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              disabled={!department}
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.value} value={batch.value}>
                  {batch.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <div className="studentDetails" hidden={!batch}>
          <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Student Type</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Roll No</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentStudents.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.first_name}</TableCell>
                      <TableCell>{student.last_name}</TableCell>
                      <TableCell>{student.student_type}</TableCell>
                      <TableCell>{student.category}</TableCell>
                      <TableCell>{student.roll_no}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={6}
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div> */}
        <div className="studentDetails" hidden={!batch}>
          <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
            {loading ? ( 
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <TableContainer>
                  <Table>
                    <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          First Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Last Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Student Type
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Category
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Roll No
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Gender
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentStudents.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student.first_name}</TableCell>
                          <TableCell>{student.last_name}</TableCell>
                          <TableCell>{student.student_type}</TableCell>
                          <TableCell>{student.category}</TableCell>
                          <TableCell>{student.roll_no}</TableCell>
                          <TableCell>{student.gender}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={6}
                  count={students.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            )}
          </Paper>
        </div>
      </div>
    </form>
  );
}

export default StudentDetails;