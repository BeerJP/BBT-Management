export function add_employee (db, id, name, surname, gender, birthdate, mac, startdate, department) {
    db.query(
        `INSERT INTO EMPLOYEE (emp_id, emp_name, emp_surname, emp_gender, emp_birthdate, emp_startdate, emp_mac, dept_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, surname, gender, birthdate, startdate, mac, department], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function add_work (db, id, date) {
    db.query(
        "INSERT INTO WORKDAY (work_id, work_date) VALUES (?, ?)",
        [id, date], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function add_time (db, time, date, employee) {
    db.query(
        "INSERT INTO TIME_ATTENDANCE (time_in, work_id, emp_id) VALUES (?, ?, ?)",
        [time, date, employee], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function add_leave (db, type, date, description, status, employee) {
    db.query(
        "INSERT INTO LEAVE_DAY (leave_type, leave_date, leave_description, leave_status, emp_id) VALUES (?, ?, ?, ?, ?)",
        [type, date, description, status, employee], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function add_holiday (db, name, date) {
    db.query(
        "INSERT INTO HOLIDAY (holi_name, work_id) VALUES (?, ?)",
        [name, date], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}