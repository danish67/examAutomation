import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const SectionDetails = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/ViewSection/",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSections(data.result);
      } else {
        console.error("Failed to fetch sections");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="sectdetails">
      <h1 style={{ fontSize: "24px", marginTop: "20px", marginLeft: "20px" }}>
        School Details
      </h1>
      <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                {/* <TableCell>Section ID</TableCell> */}
                <TableCell sx={{ fontWeight: "bold" }}>School Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sections.map((section, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{section.value}</TableCell> */}
                  <TableCell>{section.label}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default SectionDetails;
