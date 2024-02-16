import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const DeptDetails = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const token = `Token ${localStorage.getItem('token')}`;
            const response = await fetch("http://127.0.0.1:8000/clgadmin/ViewDepartment/", {
                headers: {
                    'Authorization': `${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setDepartments(data.result);
            } else {
                console.error('Failed to fetch departments');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="deptdetails">
            <h1 style={{ fontSize: '24px' ,marginTop: '20px', marginLeft:'20px'}}>Department Details</h1>
            <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
                <TableContainer>
                    <Table>
                        <TableHead style={{ backgroundColor: '#f0f0f0' }}>
                            <TableRow>
                                {/* <TableCell>Department ID</TableCell> */}
                                <TableCell sx={{ fontWeight: 'bold' }}>Department Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((department, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell>{department.value}</TableCell> */}
                                    <TableCell>{department.label}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default DeptDetails;
