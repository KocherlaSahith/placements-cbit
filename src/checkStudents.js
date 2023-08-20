import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import Navbar from './Navbar';
import * as XLSX from 'xlsx';


const PlacedStudents = () => {
  const [placedStudents, setPlacedStudents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    async function fetchPlacedStudents() {
      try {
        const response = await fetch('/api/placed-students');
        if (response.ok) {
          const data = await response.json();
          setPlacedStudents(data);
        } else {
          console.error('Failed to fetch placed students.');
        }
      } catch (error) {
        console.error('Error fetching placed students:', error);
      }
    }

    fetchPlacedStudents();
  }, []);

  const filteredStudents = placedStudents.filter((student) => {
    if (selectedBranch && student.branch !== selectedBranch) {
      return false;
    }
    if (selectedSection && student.section !== selectedSection) {
      return false;
    }
    return true;
  });

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Placed Students');
    XLSX.writeFile(workbook, 'placed_students.xlsx');
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        List of Placed Students
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <FormControl style={{ width: '48%' }}>
          <InputLabel>Filter by Branch</InputLabel>
          <Select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
           <MenuItem value="">All</MenuItem>
    <MenuItem value="CSE">CSE</MenuItem>
    <MenuItem value="IT">IT</MenuItem>
    <MenuItem value="EEE">EEE</MenuItem>
    <MenuItem value="ECE">ECE</MenuItem>
    <MenuItem value="MECH">MECH</MenuItem>
    <MenuItem value="CIVIL">CIVIL</MenuItem>
    <MenuItem value="CHEMICAL">CHEMICAL</MenuItem>
    <MenuItem value="MTECH">MTECH</MenuItem>
            {/* ... Add other branch options */}
          </Select>
        </FormControl>
        <FormControl style={{ width: '48%' }}>
          <InputLabel>Filter by Section</InputLabel>
          <Select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            {/* ... Add other section options */}
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" color="primary" onClick={handleExportExcel}>
        Export to Excel
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Stipend</TableCell>
              <TableCell>CTC of Current Company</TableCell>
              <TableCell>Eligible CTC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.company}</TableCell>
                <TableCell>{student.stipend}</TableCell>
                <TableCell>{student.ctc}</TableCell>
                <TableCell>{parseFloat(student.ctc) * 1.25}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PlacedStudents;
