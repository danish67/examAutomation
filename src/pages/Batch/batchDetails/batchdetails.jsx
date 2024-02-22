import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function BatchDetails() {
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const[batches, setBatches] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchBatches();
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
        console.log("Yaha aarha");
        console.log(departments);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBatches = async () => {
    if (department !== null && department !== undefined){
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
          console.log(data.result)
          setBatches(data.result);
          
        } else {
          console.error("Failed to fetch Batches");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//   };

  return (
    <form >
      <div className="mt-10 ml-10 space-y-12">
        <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
          Batch Details
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
                console.log(selectedDepartment);
                setDepartment(selectedDepartment);
                fetchBatches();
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

        <div className="batchDetails"
        hidden={!department}>
          <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    {/* <TableCell>Department ID</TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Batch Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {batches.map((batch, index) => (
                    <TableRow key={index}>
                      {/* <TableCell>{department.value}</TableCell> */}
                      <TableCell>{batch.label}</TableCell>
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

export default BatchDetails;
