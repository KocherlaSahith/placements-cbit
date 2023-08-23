import React, { useState, useEffect } from 'react';
import {
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
  Pagination,
} from '@mui/material';
import * as XLSX from 'xlsx';

const PlacedStudents = () => {
  const [placedStudents, setPlacedStudents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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
            {filteredStudents
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.company}</TableCell>
                  <TableCell>{student.stipend}</TableCell>
                  <TableCell>{student.ctc}</TableCell>
                  <TableCell>
                    {parseFloat(student.ctc) > 7 && parseFloat(student.ctc) < 12
                      ? parseFloat(student.ctc) * 1.5
                      : parseFloat(student.ctc) * 1.25}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredStudents.length / rowsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default PlacedStudents;
