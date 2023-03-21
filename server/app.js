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
  database: "rsw_management"
});

const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


// -------------------- เข้าสู่ระบบ --------------------

app.post('/login', function(request, response) {
	const username = request.body.username;
	const password = request.body.password;
	if (username && password) {
		connection.query(`SELECT * FROM EMPLOYEE FULL OUTER JOIN USER ON EMPLOYEE.emp_id = USER.emp_id
    WHERE username = ? AND password = ?`,
    [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = results['emp_name'] + ' ' + results['emp_surname'];
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// -------------------- ตรวจสอบสถานะการเข้าสู่ระบบ --------------------

app.get('/session', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


// -------------------- แสดงข้อมูล --------------------

// แสดงข้อมูล Department
app.get('/department', (request, response) => {
  conn.query("SELECT * FROM DEPARTMENT", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Employee
app.get('/employee', (request, response) => {
  conn.query("SELECT * FROM EMPLOYEE INNER JOIN DEPARTMENT ON EMPLOYEE.dept_id = DEPARTMENT.dept_id", (err, result) => {
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

// แสดงข้อมูล Leave Day
app.get('/leave', (request, response) => {
  conn.query("SELECT * FROM LEAVE_DAY", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Workday
app.get('/workday', (request, response) => {
  conn.query("SELECT * FROM WORKDAY", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Holiday
app.get('/holiday', (request, response) => {
  conn.query("SELECT * FROM HOLIDAY", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Time Attendance
app.get('/time', (request, response) => {
  conn.query("SELECT * FROM TIME_ATTENDANCE", (err, result) => {
    response.send(result);
  });
});

// แสดงข้อมูล Time Attendance แบบเจาะจง
app.post('/timesheet', (request, response) => {
  const empId = request.body.id;
  conn.query("SELECT * FROM TIME_ATTENDANCE INNER JOIN WORKDAY ON TIME_ATTENDANCE.work_id = WORKDAY.work_id WHERE emp_id = ? ", [empId], (err, result) => {
    response.send(result);
  });
});


// -------------------- เพิ่มข้อมูล --------------------

// เพิ่มข้อมูล Employee & User
app.post("/add_employee", (request, response) => {
  const id = req.body.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const idcard = req.body.idcard;
  const gender = req.body.gender;
  const birthdate = req.body.birthdate;
  const address = req.body.address;
  const startdate = req.body.startdate;
  const mac1 = req.body.mac1;
  const mac2 = req.body.mac2;
  const department = req.body.department;

  const user = req.body.user;
  const password = req.body.password;
  const type = req.body.type;

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
  const id = req.body.id;
  const date = req.body.date;

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
  const time = req.body.time;
  const date = req.body.date;
  const employee = req.body.employee;

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
  const type = req.body.type;
  const date = req.body.date;
  const description = req.body.description;
  const employee = req.body.employee;

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
  const name = req.body.name;
  const date = req.body.date;

  conn.query(
    "INSERT INTO HOLIDAY (holi_name, work_id) VALUES (?, ?)",
    [name, date],
    (err, result) => {
      if (err) {
        response.send(err);
      }
    }
  );

  conn.query(
    "UPDATE WORKDAY SET work_status = ? WHERE work_id = ?", 
    [0, date], 
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});


// -------------------- แก้ไขข้อมูล --------------------

// แก้ไขข้อมูล Employee
app.put("/update_employee", (request, response) => {
  const id = req.body.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const idcard = req.body.idcard;
  const gender = req.body.gender;
  const birthdate = req.body.birthdate;
  const address = req.body.address;
  const mac1 = req.body.mac1;
  const mac2 = req.body.mac2;
  const department = req.body.department;

  const user = req.body.user;
  const password = req.body.password;
  const type = req.body.type;

  conn.query(
    `UPDATE EMPLOYEE SET emp_name = ?, emp_surname = ?, emp_idcard = ?, emp_gender = ?,
    emp_birthdate = ?, emp_address = ?, emp_mac1 = ?, emp_mac2 = ?, dept_id = ? WHERE emp_id = ?`,
    [name, surname, idcard, gender, birthdate, address, mac1, mac2, department, id], 
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

// แก้ไขข้อมูลเวลาออกงาน
app.put("/update_time", (request, response) => {
  const time = req.body.time;
  const date = req.body.date;
  const employee = req.body.employee;

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
  const appove = req.body.appove;
  const date = req.body.date;
  const employee = req.body.employee;

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
