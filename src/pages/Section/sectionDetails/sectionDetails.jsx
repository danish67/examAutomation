import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SectionDetails = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
      try {
          const token = 'Token dfe67482210e4e03090e4dc53cb7486a3aa526651e1910b3bd808eb4a329fddf'; 
          const response = await fetch("http://127.0.0.1:8000/clgadmin/ViewSection/", {
              headers: {
                  'Authorization': `${token}`
              }
          });
          if (response.ok) {
              const data = await response.json();
              setSections(data.result);
          } else {
              console.error('Failed to fetch sections');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };

    return (
        <div className="home">
            <h1>Section Details</h1>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Section ID</TableCell>
                                <TableCell>Section Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sections.map((section, index) => (
                                <TableRow key={index}>
                                    <TableCell>{section.value}</TableCell>
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
