import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const AddCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyCTC, setCompanyCTC] = useState('');
  const [companyStipend, setCompanyStipend] = useState('');
  const [hireDate, setHireDate] = useState('');

  const [companiesData, setCompaniesData] = useState([]);

  const handleAddCompany = async () => {
    try {
      const response = await fetch('/api/add-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          ctc: companyCTC,
          stipend: companyStipend,
          hireDate,
        }),
      });

      if (response.ok) {
        setCompanyName('');
        setCompanyCTC('');
        setCompanyStipend('');
        setHireDate('');
        console.log('Company added successfully.');
      } else {
        console.error('Failed to add company.');
      }
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  useEffect(() => {
    async function fetchCompaniesData() {
      try {
        const response = await fetch('/api/company-names');
        if (response.ok) {
          const data = await response.json();
          setCompaniesData(data);
          console.log(data);
        } else {
          console.error('Failed to fetch company data.');
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    }

    fetchCompaniesData();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            label="Company Name"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="CTC"
            fullWidth
            value={companyCTC}
            onChange={(e) => setCompanyCTC(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Stipend"
            fullWidth
            value={companyStipend}
            onChange={(e) => setCompanyStipend(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hire Date"
            fullWidth
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleAddCompany}
            style={{ backgroundColor: '#1976D2', color: 'white' }}
          >
            Add Company
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>CTC</TableCell>
                  <TableCell>Stipend</TableCell>
                  <TableCell>Hire Date</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {companiesData.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell>{company.companyName}</TableCell>
                    <TableCell>{company.ctc}</TableCell>
                    <TableCell>{company.stipend}</TableCell>
                    <TableCell>
                      {new Date(company.hireDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddCompany;
