import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import Placements from './placementAdd';
import PlacedStudents from './checkStudents';
import AddCompany from './addCompany'
import Footer from './Footer'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function Index() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<App />}/>
          <Route path="/placements" element={<Placements />} />
          <Route path="/sdata" element={<PlacedStudents />} />
          <Route path="/addCompany" element={<AddCompany />} />
      </Routes>
   
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
