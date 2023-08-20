import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Placements = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState('');
  const [company, setCompany] = useState('');
  const [ctc, setCtc] = useState('');
  const [section, setSection] = useState('');
  const [pcName, setPcName] = useState('');
  const [companyOptions, setCompanyOptions] = useState([]);

  const [stipend, setStipend] = useState('');

  const setDefaultRollNumber = (selectedBranch) => {
    if (selectedBranch === 'CSE') {
      setRollNo('160120733');
    } else if (selectedBranch === 'IT') {
      setRollNo('160120737');
    } 
    else if (selectedBranch === 'ECE') {
      setRollNo('160120735');
    }else {
      setRollNo('');
    }
  };



  const setAutopopulatedData = (selectedCompany) => {
    const selectedCompanyData = companyOptions.find(company => company.companyName === selectedCompany);
    if (selectedCompanyData) {
    
      setCtc(selectedCompanyData.ctc)
      setStipend(selectedCompanyData.stipend);
    } else {
      setCtc('');
      setStipend('');
    }
  };

  useEffect(() => {
    async function fetchCompanyNames() {
      try {
        const response = await fetch('/api/company-names');
        if (response.ok) {
          const data = await response.json();
          setCompanyOptions(data);
          console.log(data);
        } else {
          console.error('Failed to fetch company names.');
        }
      } catch (error) {
        console.error('Error fetching company names:', error);
      }
    }

    fetchCompanyNames();
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await fetch('/api/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rollNo, branch, company, ctc,stipend, section, pcName }),
      });

      if (response.ok) {
        setName('');
        setRollNo('');
        setBranch('');
        setCompany('');
        setCtc('');
        setSection('');
        setPcName('');
        console.log('Student added successfully.');
      } else {
        console.error('Failed to add student.');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const pcNameOptions = [
    'Sahith Kocherla',
    'Poojitha Reddy',
    'Archith Gandla',
    'Harshith Muthyala',
    'Jabili Bandaru',
    'Saideep',
    'Eeshwar',
    'Vaishnavi M',
    'Manoj',
  ];

  const branchOptions = [
    'CSE',
    'IT',
    'ECE',
    'EEE',
    'MECH',
    'CIVIL',
    'CHEMICAL',
    'MTECH',
    'MBA',
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Student
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Branch</InputLabel>
            <Select
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                setDefaultRollNumber(e.target.value);
            
              }}
            >
              {branchOptions.map((branch, index) => (
                <MenuItem key={index} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Roll No"
            fullWidth
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Select
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setAutopopulatedData(e.target.value);
              }}
            >
              {companyOptions.map((company, index) => (
                <MenuItem key={index} value={company.companyName}>
                  {company.companyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="CTC"
            fullWidth
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Stipend"
            fullWidth
            value={stipend}
            onChange={(e) => setStipend(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Section</InputLabel>
            <Select
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>PC Name</InputLabel>
            <Select
              value={pcName}
              onChange={(e) => setPcName(e.target.value)}
            >
              {pcNameOptions.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleAddStudent}
            style={{ backgroundColor: '#1976D2', color: 'white' }}
          >
            Add Student
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Placements;
