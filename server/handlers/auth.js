const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var secret = 'BBTM-login';

export function login (db, username, password) {
    db.query(`SELECT *,
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
        if (results[0] === undefined) {
            response.send(['Incorrect Username and/or Password!'])
        } else {
            bcrypt.compare(password, results[0].user_password, function(err, result) {
                if (result) {
                    var token = jwt.sign({
                    user_id: results[0].emp_id,
                    type_id: results[0].type_id,
                    user_name: results[0].emp_name + ' ' + results[0].emp_surname,
                    user_type: results[0].type_name,
                    department: results[0].dept_id}, secret, { expiresIn: '2h' });
                    return [results, {token: token}]
                } else {
                    return ['Incorrect Username and/or Password!']
                };
            });
        }
    });
}

export function session (token) {
    var decoded = jwt.verify(token, secret);
    return decoded
}

export function add_user (db, id, user, password, type) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.query(
            "INSERT INTO USER (user_name, user_password, type_id, emp_id) VALUES (?, ?, ?, ?)",
            [user, hash, type, id], 
            (err, result) => {
                if (err) {
                response.send(err);
                }
            }
        );
    });
}

export function update_user (db, username, password, type, id) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.query(
            "UPDATE USER SET user_name = ?, user_password = ?, type_id = ? WHERE emp_id = ?",
            [username, hash, type, id], 
            (err, result) => {
                if (err) {
                response.send(err);
                }
            }
        );
    });
}