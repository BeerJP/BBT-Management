const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require("mysql");
const cors = require("cors");


const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "rsw_management",
  timezone: 'Z'
});

const app = express();

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));

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
              WHERE USER.user_name = ? AND USER.user_password = ?`, [username, password],  
  (err, result) => {
    response.send(result);
  });
});

// app.post('/login', function(request, response) {
// 	const username = request.body.username;
// 	const password = request.body.password;
// 	if (username && password) {
// 		connection.query(`SELECT * FROM EMPLOYEE FULL OUTER JOIN USER ON EMPLOYEE.emp_id = USER.emp_id
//     WHERE username = ? AND password = ?`,
//     [username, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				request.session.loggedin = true;
// 				request.session.username = results['emp_name'] + ' ' + results['emp_surname'];
// 				response.redirect('/');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });

// -------------------- ตรวจสอบสถานะการเข้าสู่ระบบ --------------------

// app.get('/session', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });


// -------------------- แสดงข้อมูล --------------------

// แสดงข้อมูลสรุป
app.get('/overview', (request, response) => {
  conn.query(`SELECT COUNT(*) AS emp,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE ) AS ta,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE time_in <= '08:45:00') AS nta,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE time_in > '08:45:00') AS lta,
              ( SELECT COUNT(*) FROM LEAVE_DAY ) AS ld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'กิจ' ) AS bld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'พักร้อน' ) AS hld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'ป่วย' ) AS sld,
              ( SELECT COUNT(*) FROM WORKDAY WHERE work_status = '1' AND work_date <= CURDATE()) AS wd,
              ( SELECT COUNT(*) FROM HOLIDAY ) AS hd
              FROM EMPLOYEE`, 
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Department
app.get('/department', (request, response) => {
  conn.query("SELECT * FROM DEPARTMENT", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Employee
app.get('/employee', (request, response) => {
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
              ORDER BY EMPLOYEE.emp_id`, 
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

// แสดงข้อมูล User Type
app.get('/type', (request, response) => {
  conn.query("SELECT * FROM TYPE", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day สรุปแบบเจาะจง
app.post('/leave_emp_sum', (request, response) => {
  const id = request.body.id;

  conn.query(`SELECT COUNT(*) AS ld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'กิจ' ) AS bld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'พักร้อน' ) AS hld,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE leave_type = 'ป่วย' ) AS sld
              FROM LEAVE_DAY
              WHERE emp_id = ?`,
  [id],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day แบบเจาะจง
app.post('/leave_emp', (request, response) => {
  const id = request.body.id;

  conn.query(`SELECT *,
                DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%Y-%m-%d') as leave_date,
              CASE
                WHEN leave_appove = '1' THEN 'อนุมัติ'
                ELSE 'ไม่อนุมัติ'
              END AS leave_appove
              FROM LEAVE_DAY WHERE emp_id = ?`, [id],
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day ยังไม่อนุมัติ
app.get('/leavepending', (request, response) => {
  conn.query("SELECT *, DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%Y-%m-%d') as leave_date FROM LEAVE_DAY WHERE leave_appove = '0'", 
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Leave Day อนุมัติแล้ว
app.get('/leaveapprove', (request, response) => {
  conn.query("SELECT *, DATE_FORMAT(DATE_ADD(leave_date, INTERVAL 543 YEAR), '%Y-%m-%d') as leave_date FROM LEAVE_DAY WHERE leave_appove = '1'", 
  (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Work Day
app.get('/workday', (request, response) => {
  conn.query(`SELECT *, DATE_FORMAT(work_date, '%Y-%m-%d') as work_date FROM WORKDAY 
              WHERE work_date > DATE_FORMAT(CURDATE(), '%Y-%m-%d') 
              AND work_status = '1'`, (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Holiday
app.get('/holiday', (request, response) => {
  conn.query(`SELECT *, DATE_FORMAT(WORKDAY.work_date, '%Y-%m-%d') as work_date
              FROM HOLIDAY
              INNER JOIN WORKDAY 
              ON HOLIDAY.work_id = WORKDAY.work_id
              WHERE work_date >= DATE_FORMAT(CURDATE(), '%Y-%m-%d') `, 
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
  conn.query(`SELECT EMPLOYEE.emp_id, 
              EMPLOYEE.emp_name, 
              EMPLOYEE.emp_surname, 
              DATE_FORMAT(DATE_ADD(EMPLOYEE.emp_startdate, INTERVAL 543 YEAR), '%Y-%m-%d') as emp_startdate,
              ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE TIME_ATTENDANCE.emp_id = EMPLOYEE.emp_id ) AS ta,
              ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.emp_id = EMPLOYEE.emp_id ) AS ld
              FROM EMPLOYEE GROUP BY EMPLOYEE.emp_id`,
  (err, result) => {
    response.send(result);
  });
});


// แสดงข้อมูล Time Attendance แบบเจาะจง
app.post('/timesheet', (request, response) => {
  const empId = request.body.id;
  conn.query(`SELECT *, DATE_FORMAT(WORKDAY.work_date, '%Y-%m-%d') as work_date
              FROM TIME_ATTENDANCE 
              INNER JOIN WORKDAY 
              ON TIME_ATTENDANCE.work_id = WORKDAY.work_id 
              WHERE emp_id = ?`,
  [empId], (err, result) => {
    response.send(result);
  });
});


// -------------------- เพิ่มข้อมูล --------------------

// เพิ่มข้อมูล Employee
app.post("/add_employee", (request, response) => {
  const id = request.body.id;
  const name = request.body.name;
  const surname = request.body.surname;
  const department = request.body.dept;
  const gender = request.body.gender;
  const birthdate = request.body.birth;
  const idcard = request.body.idcard;
  const mac1 = request.body.mac1;
  const mac2 = request.body.mac2;
  const startdate = request.body.start;
  const address = request.body.address;

  conn.query(
    `INSERT INTO EMPLOYEE (emp_id, emp_name, emp_surname, emp_idcard, emp_gender, emp_birthdate, emp_address, 
    emp_startdate, emp_mac1, emp_mac2, dept_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, surname, idcard, gender, birthdate, address, startdate, mac1, mac2, department], 
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

  conn.query(
    "INSERT INTO USER (user_name, user_password, type_id, emp_id) VALUES (?, ?, ?, ?)",
    [user, password, type, id], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
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
  const employee = request.body.employee;

  conn.query(
    "INSERT INTO LEAVE_DAY (leave_type, leave_date, leave_description, emp_id) VALUES (?, ?, ?, ?)",
    [type, date, description, employee], 
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
  const idcard = request.body.idcard;
  const gender = request.body.gender;
  const birthdate = request.body.birth;
  const address = request.body.address;
  const mac1 = request.body.mac1;
  const mac2 = request.body.mac2;
  const end = request.body.end;
  const department = request.body.dept;

  conn.query(`UPDATE EMPLOYEE SET 
                emp_name = ?, 
                emp_surname = ?, 
                emp_idcard = ?, 
                emp_gender = ?,
                emp_birthdate = ?, 
                emp_address = ?, 
                emp_mac1 = ?, 
                emp_mac2 = ?,
                emp_enddate = ?,
                dept_id = ? 
              WHERE emp_id = ?`,
    [name, surname, idcard, gender, birthdate, address, mac1, mac2, end, department, id], 
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

  conn.query(`UPDATE USER SET 
                user_name = ?,
                user_password = ?,
                type_id = ?
              WHERE emp_id = ?`,
    [username, password, type, id], 
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );
});

// แก้ไขข้อมูลเวลาออกงาน
app.put("/update_time", (request, response) => {
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

// แก้ไขข้อมูลใบลา
app.put("/update_leave", (request, response) => {
  const appove = request.body.state;
  const date = request.body.date;
  const employee = request.body.id;

  conn.query(
    "UPDATE LEAVE_DAY SET leave_appove = ? WHERE leave_date = DATE_SUB(?, INTERVAL 543 YEAR) AND emp_id = ?",
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
