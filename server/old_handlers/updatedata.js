export function cancel_holiday (db, date) {
    db.query(
        "DELETE FROM HOLIDAY WHERE work_id = ?",
        [date], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function cancel_leave (db, id, date) {
    db.query(
        "DELETE FROM LEAVE_DAY WHERE emp_id = ? AND leave_date = ?",
        [id, date], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function update_work (db, state, date) {
    db.query(
        "UPDATE WORKDAY SET work_status = ? WHERE work_id = ?",
        [state, date], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function update_employee (db, name, surname, gender, birthdate, mac, dept, id) {
    db.query(
        "UPDATE EMPLOYEE SET emp_name = ?, emp_surname = ?, emp_gender = ?, emp_birthdate = ?, emp_mac = ?, dept_id = ? WHERE emp_id = ?",
        [name, surname, gender, birthdate, mac, dept, id], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function update_timeout (db, time, date, employee) {
    db.query(
        "UPDATE TIME_ATTENDANCE SET time_out = ? WHERE work_id = ? AND emp_id = ?",
        [time, date, employee], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function update_time (db, timeIn, timeOut, work_id, emp_id) {
    db.query(
        "UPDATE TIME_ATTENDANCE SET time_in = ?, time_out = ? WHERE work_id = ? AND emp_id = ?",
        [timeIn, timeOut, work_id, emp_id], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}

export function update_leave (db, appove, date, employee) {
    db.query(
        "UPDATE LEAVE_DAY SET leave_appove = ? WHERE leave_date = ? AND emp_id = ?",
        [appove, date, employee], 
        (err, result) => {
            if (err) {
                return err;
            }
        }
    );
}