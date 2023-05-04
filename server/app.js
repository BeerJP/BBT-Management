const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
// const path = require('path');
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;
var secret = 'BBTM-login';

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
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

  conn.query(`SELECT *,
                DATE_FORMAT(emp_birthdate, '%Y-%m-%d') as emp_birthdate,
                DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), emp_birthdate)), '%Y') + 0 as emp_age,
                DATE_FORMAT(emp_startdate, '%Y-%m-%d') as emp_startdate
              FROM EMPLOYEE
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              INNER JOIN USER
                ON EMPLOYEE.emp_id = USER.emp_id
              INNER JOIN TYPE
                ON USER.type_id = TYPE.type_id
              WHERE USER.user_name = ?
              GROUP BY EMPLOYEE.emp_id`, [username], 
    function(error, results, fields) {
      if (error) { response.send(error) }
      bcrypt.compare(password, results[0].user_password, function(err, result) {
        if (result) {
          var token = jwt.sign({ 
            user_id: results[0].emp_id, 
            type_id: results[0].type_id,
            user_name: results[0].emp_name + ' ' + results[0].emp_surname,
            user_type: results[0].type_name,
            department: results[0].dept_id}, secret, { expiresIn: '2h' });
          response.send([results, {token: token}])
        } else {
          response.send(['Incorrect Username and/or Password!'])
        };
      });
    });
});

// -------------------- ตรวจสอบสถานะการเข้าสู่ระบบ --------------------

app.post('/session', function(request, response) {
 
  try {
    const token = request.body.token;
    var decoded = jwt.verify(token, secret);
    response.send(decoded);
  } catch(error) {
    response.send(error);
  }
});


// -------------------- แสดงข้อมูล --------------------

// แสดงข้อมูลสรุป
app.get('/overview', (request, response) => {
  conn.query(`SELECT COUNT(*) AS emp,
                ( SELECT COUNT(*) FROM TIME_ATTENDANCE ) AS ta,
                ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE time_in <= '08:45:00') AS nta,
                ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE time_in > '08:45:00') AS lta,
                ( SELECT COUNT(*) FROM LEAVE_DAY ) AS ld,
                ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'ลากิจ' ) AS bld,
                ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'ลาพักร้อน' ) AS hld,
                ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'ลาป่วย' ) AS sld,
                ( SELECT COUNT(*) FROM WORKDAY WHERE work_status = '1' AND work_date <= CURDATE()) AS wd,
                ( SELECT COUNT(*) FROM HOLIDAY ) AS hd
              FROM EMPLOYEE
              WHERE emp_status > '0'`, 
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูลสรุปสำหรับพนักงงาน
app.post('/overview_user', (request, response) => {
  const id = request.body.id;

  conn.query(`SELECT *,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE emp_id = ? ) AS ta,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE emp_id = ? AND time_in <= '08:45:00' ) AS nta,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE emp_id = ? AND time_in > '08:45:00' ) AS lta,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE emp_id = ? ) AS ld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE emp_id = ? AND leave_type = 'ลากิจ' ) AS bld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE emp_id = ? AND leave_type = 'ลาพักร้อน' ) AS hld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE emp_id = ? AND leave_type = 'ลาป่วย' ) AS sld,
              ( SELECT COUNT(*) FROM WORKDAY WHERE work_status = '1' AND work_date <= CURDATE()) AS wd,
              ( SELECT COUNT(*) FROM HOLIDAY ) AS hd
              FROM EMPLOYEE WHERE EMPLOYEE.emp_id = ?`, [id, id, id, id, id, id, id, id],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Department
app.get('/department', (request, response) => {
  conn.query("SELECT dept_name as label, dept_id as id FROM DEPARTMENT GROUP BY dept_id", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล User Type
app.get('/type', (request, response) => {
  conn.query("SELECT type_name as label, type_id as id  FROM TYPE GROUP BY type_id", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Employee info
app.post('/employee_info', (request, response) => {
  const id = request.body.id;

  conn.query(`SELECT *,
                DATE_FORMAT(emp_birthdate, '%Y-%m-%d') as emp_birthdate,
                DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), emp_birthdate)), '%Y') + 0 as emp_age,
                DATE_FORMAT(EMPLOYEE.emp_startdate, '%Y-%m-%d') as emp_startdate,
              CASE
                WHEN emp_status = '1' THEN 'ปกติ'
                ELSE 'พ้นสภาพ'
              END AS emp_status
              FROM EMPLOYEE
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              INNER JOIN USER
                ON EMPLOYEE.emp_id = USER.emp_id
              INNER JOIN TYPE
                ON USER.type_id = TYPE.type_id
              WHERE emp_status > '0' AND EMPLOYEE.emp_id = ?`, [id], 
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Employee table
app.get('/employee_table', (request, response) => {
  conn.query(`SELECT
                EMPLOYEE.emp_id as id,
                EMPLOYEE.emp_name,
                EMPLOYEE.emp_surname,
                DEPARTMENT.dept_name
              FROM EMPLOYEE
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE emp_status > '0'
              GROUP BY EMPLOYEE.emp_id
              ORDER BY EMPLOYEE.emp_id`, 
  (err, result) => {
    response.send(result);
  });
});

app.post('/employee_table_by_dept', (request, response) => {
  const dept = request.body.dept;

  conn.query(`SELECT
                EMPLOYEE.emp_id as id,
                EMPLOYEE.emp_name,
                EMPLOYEE.emp_surname,
                DEPARTMENT.dept_name
              FROM EMPLOYEE
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE emp_status > '0' AND DEPARTMENT.dept_id = ?
              GROUP BY EMPLOYEE.emp_id
              ORDER BY EMPLOYEE.emp_id`, [dept],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล User
app.get('/user', (request, response) => {
  conn.query("SELECT * FROM USER", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล User ID
app.get('/emp_id', (request, response) => {
  conn.query("SELECT MAX(emp_id) AS emp_id FROM EMPLOYEE", (err, result) => {
    response.send(result);
  });
});


// แสดงข้อมูล Leave Day สรุปแบบเจาะจง
// app.post('/leave_emp_sum', (request, response) => {
//   const id = request.body.id;

//   conn.query(`SELECT COUNT(*) AS ld,
//               ( SELECT COUNT(*) FROM LEAVE_DAY WHERE WHERE emp_id = ? AND leave_type = 'ลากิจ' ) AS bld,
//               ( SELECT COUNT(*) FROM LEAVE_DAY WHERE WHERE emp_id = ? AND leave_type = 'ลาพักร้อน' ) AS hld,
//               ( SELECT COUNT(*) FROM LEAVE_DAY WHERE WHERE emp_id = ? AND leave_type = 'ลาป่วย' ) AS sld
//               FROM LEAVE_DAY
//               WHERE emp_id = ?`,
//   [id, id, id, id],
//   (err, result) => {
//     response.send(result);
//   });
// });

// แสดงข้อมูล Leave Day แบบเจาะจง
// app.post('/leave_emp', (request, response) => {

//   const id = request.body.id;

//   conn.query(`SELECT *, leave_appove,
//               DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
//               DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
//               CASE
//                 WHEN leave_appove = '0' THEN 'รอการอนุมัติ'
//                 WHEN leave_appove = '1' THEN 'อนุมัติ'
//                 ELSE 'ไม่อนุมัติ'
//               END AS leave_appove
//               FROM LEAVE_DAY WHERE emp_id = ?
//               ORDER BY leave_date`, [id],
//   (err, result) => {
//     response.send(result);
//   });
// });


// แสดงข้อมูล Leave Day ทั้งหมด
app.get('/leave', (request, response) => {
  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '0' THEN 'รอตรวจสอบ'
                WHEN leave_approve = '1' THEN 'อนุมัติ'
                ELSE 'ไม่อนุมัติ'
              END AS leave_approve,
              CASE
                WHEN leave_status = '1' THEN 'ปกติ'
                ELSE 'หักเงิน'
              END AS leave_status
              FROM LEAVE_DAY 
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              GROUP BY id
              ORDER BY leave_date`, 
  (err, result) => {
    response.send(result);
  });
});

app.post('/leave_by_dept', (request, response) => {
  const dept = request.body.dept;

  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '0' THEN 'รอตรวจสอบ'
                WHEN leave_approve = '1' THEN 'อนุมัติ'
                ELSE 'ไม่อนุมัติ'
              END AS leave_approve,
              CASE
                WHEN leave_status = '1' THEN 'ปกติ'
                ELSE 'หักเงิน'
              END AS leave_status
              FROM LEAVE_DAY 
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              GROUP BY id
              ORDER BY leave_date`, [dept],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day ยังไม่อนุมัติ
app.get('/leavepending', (request, response) => {
  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '0' THEN 'รอตรวจสอบ'
              END AS leave_approve,
              CASE
                WHEN leave_status = '1' THEN 'ปกติ'
                ELSE 'หักเงิน'
              END AS leave_status
              FROM LEAVE_DAY
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE leave_approve = '0'
              GROUP BY id
              ORDER BY leave_date`, 
  (err, result) => {
    response.send(result);
  });
});

app.post('/leavepending_by_dept', (request, response) => {
  const dept = request.body.dept;

  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '0' THEN 'รอตรวจสอบ'
              END AS leave_approve,
              CASE
                WHEN leave_status = '1' THEN 'ปกติ'
                ELSE 'หักเงิน'
              END AS leave_status
              FROM LEAVE_DAY
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE leave_approve = '0'
              GROUP BY id
              ORDER BY leave_date`, [dept],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day อนุมัติแล้ว
app.get('/leaveapprove', (request, response) => {
  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '1' THEN 'อนุมัติ'
                ELSE 'ไม่อนุมัติ'
              END AS leave_approve,
              CASE
                WHEN leave_status = '1' THEN 'ปกติ'
                ELSE 'หักเงิน'
              END AS leave_status
              FROM LEAVE_DAY 
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE leave_approve > '0'
              GROUP BY id
              ORDER BY leave_date`, 
  (err, result) => {
    response.send(result);
  });
});

app.post('/leaveapprove_by_dept', (request, response) => {
  const dept = request.body.dept;

  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '1' THEN 'อนุมัติ'
                ELSE 'ไม่อนุมัติ'
              END AS leave_approve,
              CASE
                WHEN leave_status = '1' THEN 'ปกติ'
                ELSE 'หักเงิน'
              END AS leave_status
              FROM LEAVE_DAY 
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE leave_approve > '0'
              GROUP BY id
              ORDER BY leave_date`, [dept],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day ทั้งหมดแบบเจาะจง
app.post('/leave_emp', (request, response) => {
  const id = request.body.id;
  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '0' THEN 'รอตรวจสอบ'
                WHEN leave_approve = '1' THEN 'อนุมัติ'
                ELSE 'ไม่อนุมัติ'
              END AS leave_approve,
              CASE
                WHEN leave_status = '1' THEN 'ปกติ'
                ELSE 'หักเงิน'
              END AS leave_status
              FROM LEAVE_DAY
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE LEAVE_DAY.emp_id = ?
              GROUP BY id
              ORDER BY leave_date`, [id],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day ยังไม่อนุมัติแบบเจาะจง
app.post('/leavepending_emp', (request, response) => {
  const id = request.body.id;
  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '0' THEN 'รอตรวจสอบ'
              END AS leave_approve
              FROM LEAVE_DAY
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE leave_approve = '0' AND LEAVE_DAY.emp_id = ?
              GROUP BY id
              ORDER BY leave_date`, [id],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day อนุมัติแล้วแบบเจาะจง
app.post('/leaveapprove_emp', (request, response) => {
  const id = request.body.id;
  conn.query(`SELECT
              CONCAT(LEAVE_DAY.emp_id, '-', leave_date) as id,
              DATE_FORMAT(leave_date, '%Y-%m-%d') as leave_date,
              DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
              LEAVE_DAY.leave_type, LEAVE_DAY.leave_description, LEAVE_DAY.leave_approve, LEAVE_DAY.emp_id,
              EMPLOYEE.dept_id, DEPARTMENT.dept_name,
              CASE
                WHEN leave_approve = '1' THEN 'อนุมัติ'
                ELSE 'ไม่อนุมัติ'
              END AS leave_approve
              FROM LEAVE_DAY
              INNER JOIN EMPLOYEE
                ON LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE leave_approve > '0' AND LEAVE_DAY.emp_id = ?
              GROUP BY id
              ORDER BY leave_date`, [id],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day สรุปประจำวัน
app.post('/leave_date', (request, response) => {
  const date = request.body.date;
  const dept = request.body.dept;
  conn.query(`SELECT COUNT(*) AS SD,
                ( SELECT COUNT(*) FROM LEAVE_DAY INNER JOIN EMPLOYEE 
                  ON EMPLOYEE.emp_id = LEAVE_DAY.emp_id AND EMPLOYEE.dept_id != ?
                  WHERE LEAVE_DAY.leave_date = ? AND LEAVE_DAY.leave_approve > '0'
                ) AS AD
              FROM LEAVE_DAY INNER JOIN EMPLOYEE ON EMPLOYEE.emp_id = LEAVE_DAY.emp_id AND EMPLOYEE.dept_id = ?
              WHERE LEAVE_DAY.leave_date = ? AND LEAVE_DAY.leave_approve > '0'`, 
              [dept, date, dept, date],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day สรุปของพนักงานประจำปี
app.post('/leave_year', (request, response) => {
  const id = request.body.id;
  conn.query(`SELECT COUNT(*) AS LE,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE emp_id = ? 
                AND YEAR(CURDATE()) = YEAR(leave_date) 
                AND leave_type = 'ลากิจ'
                AND leave_approve > '0' ) AS bld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE emp_id = ? 
                AND YEAR(CURDATE()) = YEAR(leave_date) 
                AND leave_type = 'ลาพักร้อน'
                AND leave_approve > '0' ) AS hld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE emp_id = ? 
                AND YEAR(CURDATE()) = YEAR(leave_date) 
                AND leave_type = 'ลาป่วย'
                AND leave_approve > '0' ) AS sld
            FROM LEAVE_DAY
            WHERE emp_id = ?`, 
              [id, id, id, id],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Work Day สำหรับปฏิทิน
app.get('/workday', (request, response) => {
  conn.query(`SELECT *, DATE_FORMAT(work_date, '%Y-%m-%d') as work_date,
              DATE_FORMAT(DATE_ADD(work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date
              FROM WORKDAY
              WHERE work_date > DATE_FORMAT(CURDATE(), '%Y-%m-%d')
              AND work_status = '1'
              LIMIT 60`, (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Work Day สำหรับพนักงาน
app.post('/workday_emp', (request, response) => {

  const id = request.body.id;

  conn.query(`SELECT *, 
                DATE_FORMAT(work_date, '%Y-%m-%d') as work_date, 
                DATE_FORMAT(DATE_ADD(work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date
              FROM workday
              WHERE NOT EXISTS (
                SELECT *, employee.emp_id
                FROM leave_day
                INNER JOIN employee
                ON employee.emp_id = leave_day.emp_id
                WHERE workday.work_date = leave_day.leave_date
                AND employee.emp_id = ?
              )
              AND work_status = '1'`, [id],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Holiday
app.get('/holiday', (request, response) => {
  conn.query(`SELECT *,
              WORKDAY.work_id as id,
              DATE_FORMAT(WORKDAY.work_date, '%Y-%m-%d') as work_date,
              DATE_FORMAT(DATE_ADD(work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date
              FROM HOLIDAY
              INNER JOIN WORKDAY 
              ON HOLIDAY.work_id = WORKDAY.work_id`, 
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Time Attendance
app.get('/time', (request, response) => {
  conn.query("SELECT * FROM TIME_ATTENDANCE", (err, result) => {
    response.send(result);
  });
});

// แสดงจำนวน Time Attendance & Leave Day
app.get('/timecount', (request, response) => {
  conn.query(`SELECT EMPLOYEE.emp_id AS id, 
                DEPARTMENT.dept_name,
                EMPLOYEE.emp_name, 
                EMPLOYEE.emp_surname, 
                DATE_FORMAT(DATE_ADD(EMPLOYEE.emp_startdate, INTERVAL 543 YEAR), '%Y-%m-%d') AS emp_startdate,
                ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE TIME_ATTENDANCE.emp_id = EMPLOYEE.emp_id ) AS ta,
                ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.emp_id = EMPLOYEE.emp_id AND LEAVE_DAY.leave_approve > '0' ) AS ld
                FROM EMPLOYEE 
              INNER JOIN DEPARTMENT
                ON EMPLOYEE.dept_id = DEPARTMENT.dept_id
              WHERE EMPLOYEE.emp_status > '0'
              GROUP BY EMPLOYEE.emp_id`,
  (err, result) => {
    response.send(result);
  });
});


// แสดงข้อมูล Time Attendance แบบเจาะจง
app.post('/timesheet', (request, response) => {
  const empId = request.body.id;
  conn.query(`SELECT *,
                WORKDAY.work_id as id,
                DATE_FORMAT(WORKDAY.work_date, '%Y-%m-%d') as work_date,
                DATE_FORMAT(DATE_ADD(work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
                TIME_FORMAT(TIME_ATTENDANCE.time_in, '%H:%i') as time_in,
                TIME_FORMAT(TIME_ATTENDANCE.time_out, '%H:%i') as time_out,
              CASE
                WHEN time_in > '08:45:00' THEN 'สาย'
                ELSE 'ปกติ'
              END AS time_state
              FROM TIME_ATTENDANCE 
              INNER JOIN WORKDAY 
              ON TIME_ATTENDANCE.work_id = WORKDAY.work_id 
              WHERE emp_id = ?
              ORDER BY work_date`,
  [empId], (err, result) => {
    response.send(result);
  });
});

app.post('/timesheet_current', (request, response) => {
  const empId = request.body.id;
  conn.query(`SELECT *,
                WORKDAY.work_id as id,
                DATE_FORMAT(WORKDAY.work_date, '%Y-%m-%d') as work_date,
                DATE_FORMAT(DATE_ADD(work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
                TIME_FORMAT(TIME_ATTENDANCE.time_in, '%H:%i') as time_in,
                TIME_FORMAT(TIME_ATTENDANCE.time_out, '%H:%i') as time_out,
              CASE
                WHEN time_in > '08:45:00' THEN 'สาย'
                ELSE 'ปกติ'
              END AS time_state
              FROM TIME_ATTENDANCE 
              INNER JOIN WORKDAY 
                ON TIME_ATTENDANCE.work_id = WORKDAY.work_id 
              WHERE emp_id = ? AND MONTH(CURDATE()) = MONTH(WORKDAY.work_date)
              ORDER BY work_date`,
  [empId], (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Report
app.get('/report_date', (request, response) => {
  conn.query(`SELECT work_id, DATE_FORMAT(work_date, '%Y-%m-%d') as work_date, DATE_FORMAT(DATE_ADD(work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as id,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE TIME_ATTENDANCE.work_id = WORKDAY.work_id ) AS ta,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE TIME_ATTENDANCE.work_id = WORKDAY.work_id AND time_in <= '08:45:00' ) AS nta,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE TIME_ATTENDANCE.work_id = WORKDAY.work_id AND time_in > '08:45:00' ) AS lta,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.leave_date = WORKDAY.work_date ) AS ld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.leave_date = WORKDAY.work_date AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลากิจ' ) AS bld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.leave_date = WORKDAY.work_date AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลาพักร้อน' ) AS hld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.leave_date = WORKDAY.work_date AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลาป่วย' ) AS sld
            FROM WORKDAY WHERE work_status = '1' AND work_date <= CURDATE()
            GROUP BY WORKDAY.work_id`,
  (err, result) => {
    response.send(result);
  });
});

app.post('/report_emp', (request, response) => {
  const id = request.body.id;
  const date = request.body.date;
  conn.query(`SELECT EMPLOYEE.emp_id as id, CONCAT(EMPLOYEE.emp_name, ' ', EMPLOYEE.emp_surname) as name, 
              TIME_FORMAT(TIME_ATTENDANCE.time_in, '%H:%i') as time_in, 
              TIME_FORMAT(TIME_ATTENDANCE.time_out, '%H:%i') as time_out, 
              CASE 
                  WHEN TIME_ATTENDANCE.time_in > '08:45:00' THEN 'สาย' 
                  WHEN LEAVE_DAY.leave_type = 'ลากิจ' THEN 'ลากิจ' 
                  WHEN LEAVE_DAY.leave_type = 'ลาพักร้อน' THEN 'ลาพักร้อน' 
                  WHEN LEAVE_DAY.leave_type = 'ลาป่วย' THEN 'ลาป่วย' 
                  ELSE 'ปกติ'
              END AS time_state
              FROM EMPLOYEE
              LEFT JOIN TIME_ATTENDANCE ON EMPLOYEE.emp_id = TIME_ATTENDANCE.emp_id AND TIME_ATTENDANCE.work_id = ?
              LEFT JOIN LEAVE_DAY ON EMPLOYEE.emp_id = LEAVE_DAY.emp_id AND LEAVE_DAY.leave_date = ?
              WHERE (TIME_ATTENDANCE.work_id IS NULL OR TIME_ATTENDANCE.work_id = ?) AND (LEAVE_DAY.leave_date IS NULL OR LEAVE_DAY.leave_date = ?)
              AND EMPLOYEE.emp_id > '1000'`, 
  [id, date, id, date], (err, result) => {
    response.send(result);
  });
});

app.get('/report', (request, response) => {
  conn.query(`SELECT WORKDAY.work_id,
                DATE_FORMAT(WORKDAY.work_date, '%Y-%m-%d') as work_date,
                DATE_FORMAT(DATE_ADD(WORKDAY.work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date,
                COUNT(TIME_ATTENDANCE.work_id) AS ta,
                COUNT(CASE WHEN TIME_ATTENDANCE.time_in <= '08:45:00' THEN 1 END) AS nta,
                COUNT(CASE WHEN TIME_ATTENDANCE.time_in > '08:45:00' THEN 1 END) AS lta,
                COUNT(LEAVE_DAY.leave_date) AS ld,
                COUNT(CASE WHEN LEAVE_DAY.leave_approve > '0' AND LEAVE_DAY.leave_type = 'ลากิจ' THEN 1 END) AS bld,
                COUNT(CASE WHEN LEAVE_DAY.leave_approve > '0' AND LEAVE_DAY.leave_type = 'ลาพักร้อน' THEN 1 END) AS hld,
                COUNT(CASE WHEN LEAVE_DAY.leave_approve > '0' AND LEAVE_DAY.leave_type = 'ลาป่วย' THEN 1 END) AS sld,
              GROUP_CONCAT(
                JSON_OBJECT(
                  'emp_id', EMPLOYEE.emp_id,
                  'name', CONCAT(EMPLOYEE.emp_name, ' ', EMPLOYEE.emp_surname),
                  'time_in', TIME_FORMAT(TIME_ATTENDANCE.time_in, '%H:%i'),
                  'time_out', TIME_FORMAT(TIME_ATTENDANCE.time_out, '%H:%i'),
                  'time_state',
                  CASE
                    WHEN TIME_ATTENDANCE.time_in > '08:45:00' THEN 'สาย'
                    WHEN LEAVE_DAY.leave_type = 'ลากิจ' THEN 'ลากิจ'
                    WHEN LEAVE_DAY.leave_type = 'ลาพักร้อน' THEN 'ลาพักร้อน'
                    WHEN LEAVE_DAY.leave_type = 'ลาป่วย' THEN 'ลาป่วย'
                    ELSE 'ปกติ'
                  END
                ) SEPARATOR '-'
              ) as employee
              FROM
              WORKDAY
              LEFT JOIN TIME_ATTENDANCE ON WORKDAY.work_id = TIME_ATTENDANCE.work_id
              LEFT JOIN LEAVE_DAY ON WORKDAY.work_date = LEAVE_DAY.leave_date
              LEFT JOIN EMPLOYEE ON TIME_ATTENDANCE.emp_id = EMPLOYEE.emp_id OR LEAVE_DAY.emp_id = EMPLOYEE.emp_id
              WHERE WORKDAY.work_status = '1'
                AND WORKDAY.work_date <= CURDATE()
                AND EMPLOYEE.emp_id > '1000'
              GROUP BY WORKDAY.work_id`,
  (err, result) => {
    response.send(result);
  });
});


// -------------------- เพิ่มข้อมูล --------------------

// เพิ่มข้อมูล Employee
app.post("/add_employee", (request, response) => {
  const id = request.body.id;
  const name = request.body.name;
  const surname = request.body.surname;
  const gender = request.body.gender;
  const birthdate = request.body.birth;
  const mac1 = request.body.mac1;
  const mac2 = request.body.mac2;
  const startdate = request.body.start;
  const department = request.body.dept;

  conn.query(
    `INSERT INTO EMPLOYEE (emp_id, emp_name, emp_surname, emp_gender, emp_birthdate, emp_startdate, emp_mac1, emp_mac2, dept_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, surname, gender, birthdate, startdate, mac1, mac2, department], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// เพิ่มข้อมูล User
app.post("/add_user", (request, response) => {
  const id = request.body.id;
  const user = request.body.username;
  const password = request.body.password;
  const type = request.body.type;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    conn.query(
      "INSERT INTO USER (user_name, user_password, type_id, emp_id) VALUES (?, ?, ?, ?)",
      [user, hash, type, id], 
      (err, result) => {
        if (err) {
          response.send(err);
        }
      }
    );
});
});

// เพิ่มข้อมูล Workday
app.post("/add_work", (request, response) => {
  const id = request.body.id;
  const date = request.body.date;

  conn.query(
    "INSERT INTO WORKDAY (work_id, work_date) VALUES (?, ?)",
    [id, date], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// เพิ่มข้อมูล Time Attendance
app.post("/add_time", (request, response) => {
  const time = request.body.time;
  const date = request.body.date;
  const employee = request.body.employee;

  conn.query(
    "INSERT INTO TIME_ATTENDANCE (time_in, work_id, emp_id) VALUES (?, ?, ?)",
    [time, date, employee], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// เพิ่มข้อมูล Leave Day
app.post("/add_leave", (request, response) => {
  const type = request.body.type;
  const date = request.body.date;
  const description = request.body.description;
  const status = request.body.status;
  const employee = request.body.id;

  conn.query(
    "INSERT INTO LEAVE_DAY (leave_type, leave_date, leave_description, leave_status, emp_id) VALUES (?, ?, ?, ?, ?)",
    [type, date, description, status, employee], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// เพิ่มข้อมูล Holiday
app.post("/add_holiday", (request, response) => {
  const name = request.body.name;
  const date = request.body.date;

  conn.query("INSERT INTO HOLIDAY (holi_name, work_id) VALUES (?, ?)",
    [name, date],
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});


// -------------------- แก้ไขข้อมูล --------------------

// ลบข้อมูล Holiday
app.post("/cancel_holiday", (request, response) => {
  const date = request.body.date;

  conn.query("DELETE FROM HOLIDAY WHERE work_id = ?",
    [date],
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// ลบข้อมูล Leave Day
app.post("/cancel_leave", (request, response) => {
  const id = request.body.id;
  const date = request.body.date;

  conn.query("DELETE FROM LEAVE_DAY WHERE emp_id = ? AND leave_date = ?",
    [id, date],
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// แก้ไขข้อมูลวันทำงาน
app.put("/update_work", (request, response) => {
  const state = request.body.state;
  const date = request.body.date;

  conn.query(
    "UPDATE WORKDAY SET work_status = ? WHERE work_id = ?",
    [state, date], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// แก้ไขข้อมูล Employee
app.put("/update_employee", (request, response) => {
  const id = request.body.id;
  const name = request.body.name;
  const surname = request.body.surname;
  const gender = request.body.gender;
  const birthdate = request.body.birth;
  const mac1 = request.body.mac1;
  const mac2 = request.body.mac2;
  const department = request.body.dept;

  conn.query(`UPDATE EMPLOYEE SET 
                emp_name = ?, 
                emp_surname = ?, 
                emp_gender = ?,
                emp_birthdate = ?, 
                emp_mac1 = ?, 
                emp_mac2 = ?,
                dept_id = ?,
              WHERE emp_id = ?`,
    [name, surname, gender, birthdate, mac1, mac2, department, id], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

app.put("/update_user", (request, response) => {
  const id = request.body.id;
  const username = request.body.username;
  const password = request.body.password;
  const type = request.body.type;
  
  bcrypt.hash(password, saltRounds, function(err, hash) {
    conn.query(`UPDATE USER SET 
                  user_name = ?,
                  user_password = ?,
                  type_id = ?
                WHERE emp_id = ?`,
        [username, hash, type, id], 
        (err, result) => {
          if (err) {
            response.send(err);
        }
      }
    );
  });
});

// แก้ไขข้อมูลเวลาออกงาน
app.put("/update_timeout", (request, response) => {
  const time = request.body.time;
  const date = request.body.date;
  const employee = request.body.employee;

  conn.query(
    "UPDATE TIME_ATTENDANCE SET time_out = ? WHERE work_id = ? AND emp_id = ?",
    [time, date, employee], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// แก้ไขข้อมูลเวลาเข้าออกงาน
app.put("/update_time", (request, response) => {
  const timeIn = request.body.in;
  const timeOut = request.body.out;
  const work_id = request.body.date;
  const emp_id = request.body.id;

  conn.query(`UPDATE TIME_ATTENDANCE 
              SET time_in = ?, time_out = ? 
              WHERE work_id = ? AND emp_id = ?`,
    [timeIn, timeOut, work_id, emp_id], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// แก้ไขข้อมูลใบลา
app.put("/update_leave", (request, response) => {
  const appove = request.body.state;
  const date = request.body.date;
  const employee = request.body.id;

  conn.query(
    "UPDATE LEAVE_DAY SET leave_appove = ? WHERE leave_date = ? AND emp_id = ?",
    [appove, date, employee], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});


// -------------------- ข้อมูลพอร์ต --------------------

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
