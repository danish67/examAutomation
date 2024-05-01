// import { useState, useEffect } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TablePagination from "@mui/material/TablePagination";
// import CircularProgress from "@mui/material/CircularProgress";

// function StudentDetails() {
//   const [department, setDepartment] = useState("");
//   const [batch, setBatch] = useState("");
//   // const [departments, setDepartments] = useState([]);
//   const [batches, setBatches] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [typeOfMarks, setTypeOfMarks] = useState([]);
//   const [typeOfMark, setTypeOfMark] = useState([]);
//   const [course, setCourse] = useState("");
//   const [students, setStudents] = useState([]);
//   const [semester, setSemester] = useState();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDepartment();
//   }, []);

//   useEffect(() => {
//     fetchCourses();
//   }, [semester]);

//   useEffect(() => {
//     fetchBatches();
//   }, [department]);

//   useEffect(() => {
//     fetchStudents();
//   }, [course]);

//    useEffect(() => {
//      fetchTypeOfMarks();
//    }, [course]);

//   const fetchDepartment = async () => {
//     try {
//       const token = `Token ${localStorage.getItem("token")}`;
//       const response = await fetch(
//         "http://127.0.0.1:8000/faculty/show_department_to_faculty/",
//         {
//           method:"POST",
//           headers: {
//             Authorization: `${token}`,
//           },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setDepartment(data.result);
//       } else {
//         console.error("Failed to fetch departments");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const fetchBatches = async () => {
//     if (department !== "") {
//       try {
//         const token = `Token ${localStorage.getItem("token")}`;
//         const response = await fetch(
//           "http://127.0.0.1:8000/clgadmin/ViewBatches/",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `${token}`,
//             },
//             body: JSON.stringify({
//               department: department,
//             }),
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setBatches(data.result);
//         } else {
//           console.error("Failed to fetch batches");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };
//     const fetchCourses = async () => {
//       if (semester) {
//         setCourses([]);
//         try {
//           const token = `Token ${localStorage.getItem("token")}`;
//           const response = await fetch(
//             "http://127.0.0.1:8000/faculty/show_course_of_faculty/",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `${token}`,
//               },
//               body: JSON.stringify({
//                 semester: semester,
//               }),
//             }
//           );
//           if (response.ok) {
//             const data = await response.json();
//             setCourses(data.result);
//           } else {
//             console.error("Failed to fetch Courses");
//           }
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       }
//     };

//     const fetchTypeOfMarks = async () => {
//       if (semester) {
//         setTypeOfMarks([]);
//         try {
//           const token = `Token ${localStorage.getItem("token")}`;
//           const response = await fetch(
//             "http://127.0.0.1:8000/faculty/show_type_of_marks/",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `${token}`,
//               },
//               body: JSON.stringify({
//                 course_id: course,
//               }),
//             }
//           );
//           if (response.ok) {
//             const data = await response.json();
//             setTypeOfMarks(data.result);
//             console.log(data.result);
//           } else {
//             console.error("Failed to fetch Courses");
//           }
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       }
//     };

//   //
//   const fetchStudents = async () => {
//     setStudents([]);
//     if (course !== "" && batch !== "") {
//       setLoading(true);
//       console.log(semester);
//       try {
//         const token = `Token ${localStorage.getItem("token")}`;
//         const response = await fetch(
//           "http://127.0.0.1:8000/faculty/show_students_to_faculty/",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `${token}`,
//             },
//             body: JSON.stringify({
//               batch: batch,
//               semester: semester,
//               course_id: course,
//             }),
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setStudents(data.result);
//         } else {
//           console.error("Failed to fetch students");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (department && batch) {
//       fetchStudents(department, batch);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const indexOfLastStudent = (page + 1) * rowsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mt-10 ml-10 space-y-12">
//         <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
//           Student Details
//         </h2>
//         <div className="mt-10 sm:col-span-3">
//           <label
//             htmlFor="batch"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Batch
//           </label>
//           <div className="mt-2">
//             <select
//               id="batch"
//               name="batch"
//               value={batch}
//               onChange={(e) => setBatch(e.target.value)}
//               disabled={!department}
//               className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//             >
//               <option value="">Select Batch</option>
//               {batches.map((batch) => (
//                 <option key={batch.value} value={batch.value}>
//                   {batch.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="mt-10 sm:col-span-3">
//           <label
//             htmlFor="semester"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Semester
//           </label>
//           <div className="mt-2">
//             <select
//               id="semester"
//               name="semester"
//               value={semester}
//               onChange={(e) => {
//                 const selectedSemester = e.target.value;
//                 setSemester(selectedSemester);
//                 fetchCourses();
//               }}
//               className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//             >
//               <option value="">Select Semester</option>
//               {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//                 <option key={sem} value={sem}>
//                   {sem}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="mt-10 sm:col-span-3">
//           <label
//             htmlFor="course"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Course
//           </label>
//           <div className="mt-2">
//             <select
//               id="course"
//               name="course"
//               value={course}
//               onChange={(e) => setCourse(e.target.value)}
//               // disabled={!department}
//               className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//             >
//               <option value="">Select course</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.code}>
//                   {course.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="mt-10 sm:col-span-3">
//           <label
//             htmlFor="typeOfMarks"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             typeOfMarks
//           </label>
//           <div className="mt-2">
//             <select
//               id="typeOfMarks"
//               name="typeOfMarks"
//               value={typeOfMark}
//               onChange={(e) => setTypeOfMark(e.target.value)}
//               className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//             >
//               <option value="">Select typeOfMarks</option>
//               {typeOfMarks.map((typeOfMark) => (
//                 <option key={typeOfMark} value={typeOfMark}>
//                   {typeOfMark}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="studentDetails" hidden={!course}>
//           <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
//             {loading ? (
//               <div style={{ textAlign: "center" }}>
//                 <CircularProgress />
//               </div>
//             ) : (
//               <div>
//                 <TableContainer>
//                   <Table>
//                     <TableHead style={{ backgroundColor: "#f0f0f0" }}>
//                       <TableRow>
//                         <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {currentStudents.map((student, index) => (
//                         <TableRow key={index}>
//                           <TableCell>{student.Name}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <TablePagination
//                   rowsPerPageOptions={[5, 10, 25]}
//                   colSpan={6}
//                   count={students.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//               </div>
//             )}
//           </Paper>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default StudentDetails;
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
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [typeOfMarks, setTypeOfMarks] = useState([]);
  const [typeOfMark, setTypeOfMark] = useState([]);
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [semester, setSemester] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  useEffect(() => {
    fetchDepartment();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [semester]);

  useEffect(() => {
    fetchBatches();
  }, [department]);

  useEffect(() => {
    fetchStudents();
  }, [course]);

  useEffect(() => {
    fetchTypeOfMarks();
  }, [course]);

  const fetchDepartment = async () => {
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/faculty/show_department_to_faculty/",
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDepartment(data.result);
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
        const token = `Token ${localStorage.getItem("token")}`;
        const response = await fetch(
          "http://127.0.0.1:8000/clgadmin/ViewBatches/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
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

  const fetchCourses = async () => {
    if (semester) {
      setCourses([]);
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

  const fetchStudents = async () => {
    setStudents([]);
    if (course !== "" && batch !== "") {
      setLoading(true);
      try {
        const token = `Token ${localStorage.getItem("token")}`;
        const response = await fetch(
          "http://127.0.0.1:8000/faculty/show_students_to_faculty/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              batch: batch,
              semester: semester,
              course_id: course,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setStudents(data.result);
          console.log(students[0]["assign_exam_id"]);
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
      setLoading(true);
      const marksData = currentStudents.map((student) => ({
        exam_assign: student.assign_exam_id, // Assuming student.id holds the exam_assign id
        marks: parseInt(student.marks),
      }));

      try {
        const token = `Token ${localStorage.getItem("token")}`;
        const response = await fetch(
          "http://127.0.0.1:8000/faculty/add_marks_to_students/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              details: marksData,
              course_id: selectedCourseId,
              type_of_exam: typeOfMark,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStudents(data.result);
        } else {
          console.error("Failed to add marks");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // const add_marks_to_students = async (event) => {
  //    try {
  //         const token = `Token ${localStorage.getItem("token")}`;
  //         const response = await fetch(
  //           "http://127.0.0.1:8000/faculty/add_marks_to_students/",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `${token}`,
  //             },
  //             body: JSON.stringify({
  //               batch: batch,
  //               type_of_exam: typeOfMark,
  //               course_id: course,
  //             }),
  //           }
  //         );
  //         if (response.ok) {
  //           const data = await response.json();
  //           setStudents(data.result);
  //         } else {
  //           console.error("Failed to fetch students");
  //         }
  //       } catch (error) {
  //         console.error("Error:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastStudent = (page + 1) * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 ml-10 space-y-12">
        <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
          Student Details
        </h2>
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
        <div className="mt-10 sm:col-span-3">
          <label
            htmlFor="course"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Course
          </label>
          <div className="mt-2">
            <select
              id="course"
              name="course"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                // Find the selected course object
                const selectedCourse = courses.find(
                  (c) => c.code === e.target.value
                );
                // Update the selectedCourseId with the course ID
                setSelectedCourseId(selectedCourse ? selectedCourse.id : "");
              }}
              // disabled={!department}
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="">Select course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.code}>
                  {course.name}
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
            typeOfMarks
          </label>
          <div className="mt-2">
            <select
              id="typeOfMarks"
              name="typeOfMarks"
              value={typeOfMark}
              onChange={(e) => setTypeOfMark(e.target.value)}
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="">Select typeOfMarks</option>
              {typeOfMarks.map((typeOfMark) => (
                <option key={typeOfMark} value={typeOfMark}>
                  {typeOfMark}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="studentDetails" hidden={!course}>
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
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Marks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentStudents.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student.Name}</TableCell>
                          <TableCell>
                            <input
                              type="text"
                              value={student.marks || ""}
                              onChange={(e) => {
                                const newStudents = [...students];
                                newStudents[index].marks = e.target.value;
                                setStudents(newStudents);
                              }}
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "8px",
                                width: "80px", // Adjust the width as needed
                              }}
                            />
                          </TableCell>
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
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            // onClick={clearAll}
            hidden={!course}
          >
            Clear All
          </button>
          <button
            type="submit"
            hidden={!course}
            // onClick={}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Marks
          </button>
        </div>
      </div>
    </form>
  );
}

export default StudentDetails;
