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

function AssignExamStudent() {
  const [batch, setBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [semester, setSemester] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     fetchDepartment();
  //   }, []);
  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/student/show_batches_to_students/",
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // setBatches(data.result);
        const batchesArray = Array.isArray(data.result)
          ? data.result
          : [data.result];
        setBatches(batchesArray);
        console.log(batches);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (batch) {
      // setLoading(true);

      try {
        const token = `Token ${localStorage.getItem("token")}`;
        const response = await fetch(
          "http://127.0.0.1:8000/student/assign_exam_regular/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              batch: batch,
              semester: semester,
            }),
          }
        );

        if (response.ok) {
          alert("Successfully Enrolled in Exam");
        } else {
          const data = await response.json();
        //   console.error("Failed to enroll in Exam:", data.Error);

          alert(`Failed to enroll in Exam: ${data.error}`);
        }
      } catch (error) {
        console.error("Error:", error);

        alert("An error occurred while processing your request.");
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

  // const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  // };

  // const indexOfLastStudent = (page + 1) * rowsPerPage;
  // const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  // const currentStudents = students.slice(
  //     indexOfFirstStudent,
  //     indexOfLastStudent
  // );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 ml-10 space-y-12">
        <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
          Enroll into an Exam
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
              //   disabled={!department}
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
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
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            // onClick={clearAll}
            //   hidden={!course}
          >
            Clear All
          </button>
          <button
            type="submit"
            //   hidden={!course}
            // onClick={}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enroll in Exam
          </button>
        </div>
      </div>
    </form>
  );
}

export default AssignExamStudent;
