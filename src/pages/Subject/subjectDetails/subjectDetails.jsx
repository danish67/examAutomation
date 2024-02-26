import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function SubjectDetails() {
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [maxValue, setMaxValue] = useState();
  const [semester, setSemester] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [department]);

  useEffect(() => {
    setMaxValuefunction();
  }, [department]);

  const fetchDepartments = async () => {
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/ViewDepartment/",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
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

  const fetchSubjects = async () => {
    setSubjects([]);
    if (department !== null && department !== undefined) {
      try {
        const token = `Token ${localStorage.getItem("token")}`;
        const response = await fetch(
          "http://127.0.0.1:8000/clgadmin/viewSubjects/",
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
          const newSubjects = data.result.map((subject) => ({
            value: subject.value,
            label: subject.label,
            semester: subject.semester,
          }));
          console.log(newSubjects);
          setSubjects(newSubjects);
          
        } else {
          console.error("Failed to fetch Subjects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const setMaxValuefunction = () => {
    console.log("yeh department hai" + department);

    // console.log("yeh department hai" + departments[6][label]);

    try {
      if (departments[department - 1].label === "Architecture") {
        setMaxValue(10);
      } else {
        setMaxValue(8);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dropdownOptions = [];
  for (let i = 1; i <= maxValue; i++) {
    dropdownOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <form>
      <div className="mt-10 ml-10 space-y-12">
        <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
          Subject Details
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
        <div className="sm:col-span-3">
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
              disabled={!department}
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Semester</option>
              {dropdownOptions}
            </select>
          </div>
        </div>

        <div className="subjectDetails" hidden={!department}>
          <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Subject Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Semester</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects
                    .filter(
                      (subject) =>
                        semester === "" ||
                        subject.semester === semester
                    )
                    .map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell>{subject.label}</TableCell>
                        <TableCell>{subject.semester}</TableCell>
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

export default SubjectDetails;
