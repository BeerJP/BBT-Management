import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { React } from 'react';
// import axios from 'axios';
import './assets/style/app.css';
import './assets/style/layout.css';
import NavBar from './layouts/navbar';
import Overview from './pages/overview';
import Employee from './pages/employee';
import TimeSheet from './pages/timesheet';
import Calendar from './pages/calendar';
import Leave from './pages/leave';


function App() {

  document.title = "BBTE Management";

  return (
    <BrowserRouter>
      <NavBar>
        <Routes>
          <Route path="/" element={<Overview/>}/>
          <Route path="/employee" element={<Employee/>}/>
          <Route path="/timesheet" element={<TimeSheet/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/leave" element={<Leave/>}/>
        </Routes>
      </NavBar>
    </BrowserRouter>
  );
};

export default App;
