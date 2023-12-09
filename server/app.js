const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require("cors");
const auth = require('./handlers/auth');
const get = require('./handlers/getdata');
const insert = require('./handlers/insertdata');
const update = require('./handlers/updatedata');


const conn = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "rsw_management",
  timezone: 'Z'
});

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));


// -------------------- เข้าสู่ระบบ --------------------
app.post('/login', function(request, response) {
  const username = request.body.username;
	const password = request.body.password;
  response.send(auth.login(conn, username, password))
});

// -------------------- ตรวจสอบสถานะการเข้าสู่ระบบ --------------------

app.post('/session', function(request, response) {
  try {
    const token = request.body.token;
    response.send(auth.session(token));
  } catch(error) {
    response.send(error);
  }
});


// -------------------- แสดงข้อมูล --------------------

// แสดงข้อมูลสรุป
app.get('/overview', (request, response) => {
  response.send(get.overview(conn));
});

// แสดงข้อมูลสรุปสำหรับพนักงงาน
app.post('/overview_user', (request, response) => {
  const id = request.body.id;
  response.send(get.overview_user(conn, id));
});

// แสดงข้อมูล Department
app.get('/department', (request, response) => {
  response.send(get.department(conn))
});

// แสดงข้อมูล User Type
app.get('/type', (request, response) => {
  response.send(get.type(conn))
});

// แสดงข้อมูล Employee info
app.post('/employee_info', (request, response) => {
  const id = request.body.id;
  response.send(get.employee_info(conn, id));
});

// แสดงข้อมูล Employee table
app.get('/employee_table', (request, response) => {
  response.send(get.employee_table(conn))
});

app.post('/employee_table_by_dept', (request, response) => {
  const dept = request.body.dept;
  response.send(get.employee_table_by_dept(conn, dept));
});

// แสดงข้อมูล User
app.get('/user', (request, response) => {
  response.send(get.user(conn))
});

// แสดงข้อมูล User ID
app.get('/emp_id', (request, response) => {
  response.send(get.emp_id(conn))
});

// แสดงข้อมูล Leave Day ทั้งหมด
app.get('/leave', (request, response) => {
  response.send(get.leave(conn))
});

app.post('/leave_by_dept', (request, response) => {
  const dept = request.body.dept;
  response.send(get.leave_by_dept(conn, dept))
});

// แสดงข้อมูล Leave Day ยังไม่อนุมัติ
app.get('/leavepending', (request, response) => {
  response.send(get.leavepending(conn))
});

app.post('/leavepending_by_dept', (request, response) => {
  const dept = request.body.dept;
  response.send(get.leavepending_by_dept(conn, dept))
});

// แสดงข้อมูล Leave Day อนุมัติแล้ว
app.get('/leaveapprove', (request, response) => {
  response.send(get.leaveapprove(conn))
});

app.post('/leaveapprove_by_dept', (request, response) => {
  const dept = request.body.dept;
  response.send(get.leaveapprove_by_dept(conn, dept))
});

// แสดงข้อมูล Leave Day ทั้งหมดแบบเจาะจง
app.post('/leave_emp', (request, response) => {
  const id = request.body.id;
  response.send(get.leave_emp(conn, id))
});

// แสดงข้อมูล Leave Day ยังไม่อนุมัติแบบเจาะจง
app.post('/leavepending_emp', (request, response) => {
  const id = request.body.id;
  response.send(get.leavepending_emp(conn, id))
});

// แสดงข้อมูล Leave Day อนุมัติแล้วแบบเจาะจง
app.post('/leaveapprove_emp', (request, response) => {
  const id = request.body.id;
  response.send(get.leaveapprove_emp(conn, id))
});

// แสดงข้อมูล Leave Day สรุปประจำวัน
app.post('/leave_date', (request, response) => {
  const date = request.body.date;
  const dept = request.body.dept;
  response.send(get.leaveapprove_emp(conn, date, dept))
});

// แสดงข้อมูล Leave Day สรุปของพนักงานประจำปี
app.post('/leave_year', (request, response) => {
  const id = request.body.id;
  response.send(get.leave_year(conn, id))
});

// แสดงข้อมูล Work Day สำหรับปฏิทิน
app.get('/workday', (request, response) => {
  response.send(get.workday(conn))
});

// แสดงข้อมูล Work Day สำหรับพนักงาน
app.post('/workday_emp', (request, response) => {
  const id = request.body.id;
  response.send(get.workday_emp(conn, id))
});

// แสดงข้อมูล Holiday
app.get('/holiday', (request, response) => {
  response.send(get.holiday(conn))
});

// แสดงข้อมูล Time Attendance
app.get('/time', (request, response) => {
  response.send(get.time(conn))
});

// แสดงจำนวน Time Attendance & Leave Day
app.get('/timecount', (request, response) => {
  response.send(get.timecount(conn))
});


// แสดงข้อมูล Time Attendance แบบเจาะจง
app.post('/timesheet', (request, response) => {
  const id = request.body.id;
  response.send(get.timesheet(conn, id))
});

app.post('/timesheet_current', (request, response) => {
  const id = request.body.id;
  response.send(get.timesheet_current(conn, id))
});

// แสดงข้อมูล Report
app.get('/report_date', (request, response) => {
  response.send(get.report_date(conn))
});

app.post('/report_emp', (request, response) => {
  const id = request.body.id;
  const date = request.body.date;
  response.send(get.report_emp(conn, id, date))
});

app.get('/report_year', (request, response) => {
  response.send(get.report_year(conn))
});

app.post('/report_year_emp', (request, response) => {
  const id = request.body.id;
  const cid = request.body.cid;
  response.send(get.report_year_emp(conn, id, cid))
});

app.get('/report', (request, response) => {
  response.send(get.report(conn))
});


// -------------------- เพิ่มข้อมูล --------------------

// เพิ่มข้อมูล Employee
app.post("/add_employee", (request, response) => {
  const id = request.body.id;
  const name = request.body.name;
  const surname = request.body.surname;
  const gender = request.body.gender;
  const birthdate = request.body.birth;
  const mac = request.body.mac;
  const startdate = request.body.start;
  const department = request.body.dept;
  response.send(insert.add_employee(conn, id, name, surname, gender, birthdate, mac, startdate, department))
});

// เพิ่มข้อมูล User
app.post("/add_user", (request, response) => {
  const id = request.body.id;
  const user = request.body.username;
  const password = request.body.password;
  const type = request.body.type;
  response.send(auth.add_user(conn, id, user, password, type))
});

// เพิ่มข้อมูล Workday
app.post("/add_work", (request, response) => {
  const id = request.body.id;
  const date = request.body.date;
  response.send(insert.add_work(conn, id, date))
});

// เพิ่มข้อมูล Time Attendance
app.post("/add_time", (request, response) => {
  const time = request.body.time;
  const date = request.body.date;
  const employee = request.body.employee;
  response.send(insert.add_work(conn, time, date, employee))
});

// เพิ่มข้อมูล Leave Day
app.post("/add_leave", (request, response) => {
  const type = request.body.type;
  const date = request.body.date;
  const description = request.body.description;
  const status = request.body.status;
  const employee = request.body.id;
  response.send(insert.add_leave(conn, type, date, description, status, employee))
});

// เพิ่มข้อมูล Holiday
app.post("/add_holiday", (request, response) => {
  const name = request.body.name;
  const date = request.body.date;
  response.send(insert.add_holiday(conn, name, date))
});


// -------------------- แก้ไขข้อมูล --------------------

// ลบข้อมูล Holiday
app.post("/cancel_holiday", (request, response) => {
  const date = request.body.date;
  response.send(update.cancel_holiday(conn, date))
});

// ลบข้อมูล Leave Day
app.post("/cancel_leave", (request, response) => {
  const id = request.body.id;
  const date = request.body.date;
  response.send(update.cancel_leave(conn, id, date))
});

// แก้ไขข้อมูลวันทำงาน
app.put("/update_work", (request, response) => {
  const state = request.body.state;
  const date = request.body.date;
  response.send(update.update_work(conn, state, date))
});

// แก้ไขข้อมูล Employee
app.put("/update_employee", (request, response) => {
  const id = request.body.id;
  const name = request.body.name;
  const surname = request.body.surname;
  const gender = request.body.gender;
  const birthdate = request.body.birth;
  const mac = request.body.mac;
  const dept = request.body.dept;
  response.send(update.update_employee(conn, name, surname, gender, birthdate, mac, dept, id))
});

app.put("/update_user", (request, response) => {
  const id = request.body.id;
  const username = request.body.username;
  const password = request.body.password;
  const type = request.body.type;
  response.send(auth.update_user(conn, username, password, type, id))
});

// แก้ไขข้อมูลเวลาออกงาน
app.put("/update_timeout", (request, response) => {
  const time = request.body.time;
  const date = request.body.date;
  const employee = request.body.employee;
  response.send(update.update_timeout(conn, time, date, employee))
});

// แก้ไขข้อมูลเวลาเข้าออกงาน
app.put("/update_time", (request, response) => {
  const timeIn = request.body.in;
  const timeOut = request.body.out;
  const work_id = request.body.date;
  const emp_id = request.body.id;
  response.send(update.update_time(conn, timeIn, timeOut, work_id, emp_id))
});

// แก้ไขข้อมูลใบลา
app.put("/update_leave", (request, response) => {
  const appove = request.body.state;
  const date = request.body.date;
  const employee = request.body.id;
  response.send(update.update_leave(conn, appove, date, employee))
});


// -------------------- ข้อมูลพอร์ต --------------------

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
