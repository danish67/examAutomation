import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const FacultyDetails = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/fetch_faculty/",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFaculties(data.result);
        console.log("data.result" + data.result);
      } else {
        console.error("Failed to fetch sections");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="factdetails">
      <h1 style={{ fontSize: "24px", marginTop: "20px", marginLeft: "20px" }}>
        Faculty Details
      </h1>
      <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                {/* <TableCell>Section ID</TableCell> */}
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faculties.map((faculty, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{section.value}</TableCell> */}
                  <TableCell>
                    {`${faculty.firstname} ${faculty.lastname}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default FacultyDetails;
