import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import * as XLSX from 'xlsx';

const ExcelComparator = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [columnOptions, setColumnOptions] = useState([]);
  const [similarRows, setSimilarRows] = useState([]);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const handleInstructionsOpen = () => {
    setInstructionsOpen(true);
  };

  const handleInstructionsClose = () => {
    setInstructionsOpen(false);
  };

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target.result;
      const workbook = XLSX.read(fileData, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      if (sheetData.length > 0) {
        const columnNames = Object.keys(sheetData[0]);
        setColumnOptions(columnNames);
      } else {
        console.log('The uploaded file is empty.');
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const compareRows = () => {
    if (!file1 || !file2 || !selectedColumn) {
      console.log(file1);
      console.log(file2);
      console.log(selectedColumn);
      console.log('Please provide both Excel files and select a column.');
      return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = (event) => {
      const fileData1 = event.target.result;
      const workbook1 = XLSX.read(fileData1, { type: 'array' });
      const sheetName1 = workbook1.SheetNames[0];
      const sheetData1 = XLSX.utils.sheet_to_json(workbook1.Sheets[sheetName1]);

      reader2.onload = (event) => {
        const fileData2 = event.target.result;
        const workbook2 = XLSX.read(fileData2, { type: 'array' });
        const sheetName2 = workbook2.SheetNames[0];
        const sheetData2 = XLSX.utils.sheet_to_json(workbook2.Sheets[sheetName2]);

        const similarRows = [];

        for (const row1 of sheetData1) {
          for (const row2 of sheetData2) {
            if (row1[selectedColumn] === row2[selectedColumn]) {
              similarRows.push({ column: row1[selectedColumn], branch: row1.Branch });
            }
          }
        }

        setSimilarRows(similarRows);
      };

      reader2.readAsArrayBuffer(file2);
    };

    reader1.readAsArrayBuffer(file1);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Excel Comparator
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Choose Column to Compare</InputLabel>
            <Select value={selectedColumn} onChange={handleColumnChange}>
              {columnOptions.map((column, index) => (
                <MenuItem key={index} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <input type="file" accept=".xlsx" onChange={handleFile1Change} style={{ marginBottom: '10px' }} />
          <input type="file" accept=".xlsx" onChange={handleFile2Change} style={{ marginBottom: '20px' }} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={compareRows} style={{ marginRight: '10px', backgroundColor: '#1976D2', color: 'white' }}>
            Compare
          </Button>
          <Button variant="contained" onClick={() => setSimilarRows([])} style={{ backgroundColor: '#F44336', color: 'white' }}>
            Clear
          </Button>
          <Button variant="outlined" onClick={handleInstructionsOpen} style={{ marginLeft: '10px', borderColor: '#1976D2', color: '#1976D2' }}>
            Instructions
          </Button>
          <Dialog open={instructionsOpen} onClose={handleInstructionsClose}>
            <DialogTitle>Instructions to Use</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* Add your instructions here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula eu arcu luctus pharetra in eu justo.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleInstructionsClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          {similarRows.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Similar Rows:
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Column Value</TableCell>
                      <TableCell>Branch</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {similarRows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.column}</TableCell>
                        <TableCell>{row.branch}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExcelComparator;
