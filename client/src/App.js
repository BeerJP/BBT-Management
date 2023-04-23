import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { React } from 'react';
import './assets/style/app.css';
import './assets/style/layout.css';
import Login from './pages/login';
import NavBar from './layouts/navbar';
import Overview from './pages/overview';
import Employee from './pages/employee';
import TimeSheet from './pages/timesheet';
import Calendar from './pages/calendar';
import Leave from './pages/leave';
import Report from './pages/report';


function App() {

  document.title = "BBTE Management";

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route key='1' path="/login" element={<Login/>}/>
        <Route key='2' path="/" element={<Overview/>}/>
        <Route key='3' path="/employee" element={<Employee/>}/>
        <Route key='4' path="/timesheet" element={<TimeSheet/>}/>
        <Route key='5' path="/calendar" element={<Calendar/>}/>
        <Route key='6' path="/leave" element={<Leave/>}/>
        <Route key='7' path="/report" element={<Report/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
