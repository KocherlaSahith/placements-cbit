const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://sahithkocherla:abcdef1234@cluster0.aj9bc3p.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Define student schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  branch: String,
  company: String,
  ctc: String,
  stipend:String,
  section:String,
  PCName:String
});

const Student = mongoose.model('Student', studentSchema);

const companySchema = new mongoose.Schema({
  companyName: String,
  ctc: String,
  stipend: String,
  hireDate: Date,
});

const Company = mongoose.model('Company', companySchema);
app.post('/api/add-company', async (req, res) => {
  try {
    const { companyName, ctc, stipend, hireDate } = req.body;
    const newCompany = new Company({
      companyName,
      ctc,
      stipend,
      hireDate,
    });
    await newCompany.save();
    res.status(201).json({ message: 'Company added successfully' });
  } catch (error) {
    console.error('Error adding company:', error);
    res.status(500).json({ error: 'Failed to add company' });
  }
});
// Route to handle adding a student
app.post('/api/add-student', async (req, res) => {
  try {
    const { name, rollNo, branch, company, ctc,stipend,section,pcName} = req.body;
    const newStudent = new Student({ name, rollNo, branch, company, ctc, stipend,section, pcName});
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});
app.get('/api/placed-students', async (req, res) => {
    try {
      const placedStudents = await Student.find({ company: { $exists: true }, ctc: { $exists: true } });
      res.json(placedStudents);
    } catch (error) {
      console.error('Error fetching placed students:', error);
      res.status(500).json({ error: 'Failed to fetch placed students' });
    }
  });
  app.get('/api/company-names', async (req, res) => {
    try {
      const companies = await Company.find({}); // Fetch all company fields
      res.status(200).json(companies);
    } catch (error) {
      console.error('Error fetching company data:', error);
      res.status(500).json({ error: 'Failed to fetch company data' });
    }
  });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
