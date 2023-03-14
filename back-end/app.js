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
app.use(cors());


// -------------------- เข้าสู่ระบบ --------------------
app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
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
  conn.query("SELECT * FROM EMPLOYEE", (err, result) => {
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


// -------------------- เพิ่มข้อมูล --------------------

// app.post("/create", (request, response) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   const country = req.body.country;
//   const position = req.body.position;
//   const wage = req.body.wage;

//   conn.query(
//     "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//     [name, age, country, position, wage],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         response.send("Values Inserted");
//       }
//     }
//   );
// });


// -------------------- แก้ไขข้อมูล --------------------

// app.put("/update", (request, response) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   conn.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         response.send(result);
//       }
//     }
//   );
// });


app.listen(5000, () => {
  console.log("Yey, your server is running on port 5000");
});