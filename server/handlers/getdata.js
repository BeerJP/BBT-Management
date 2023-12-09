export function overview (db) {
    db.query(`SELECT COUNT(*) AS emp,
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
        return result;
    });
}

export function overview_user (db, id) {
    db.query(`SELECT *,
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
        return result;
    });
}

export function department (db) {
    db.query("SELECT dept_name as label, dept_id as id FROM DEPARTMENT GROUP BY dept_id", (err, result) => {
        return result;
    });
}


export function type (db) {
    db.query("SELECT type_name as label, type_id as id  FROM TYPE GROUP BY type_id", (err, result) => {
        return result;
    });
}

export function employee_info (db, id) {
    db.query(`SELECT *,
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
        return result;
    });
}

export function employee_table (db) {
    db.query(`SELECT
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
        return result;
    });
}

export function employee_table_by_dept (db, dept) {
    db.query(`SELECT
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
        return result;
    });
}

export function user (db) {
    db.query("SELECT * FROM USER", (err, result) => {
        return result;
    });
}

export function emp_id (db) {
    db.query("SELECT MAX(emp_id) AS emp_id FROM EMPLOYEE", (err, result) => {
        return result;
    });
}

export function leave (db) {
    db.query(`SELECT
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
        return result;
    });
}

export function leave_by_dept (db, dept) {
    db.query(`SELECT
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
        return result;
    });
}

export function leavepending (db) {
    db.query(`SELECT
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
        return result;
    });
}

export function leavepending_by_dept (db, dept) {
    db.query(`SELECT
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
        return result;
    });
}

export function leaveapprove (db) {
    db.query(`SELECT
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
        return result;
    });
}

export function leaveapprove_by_dept (db, dept) {
    db.query(`SELECT
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
        return result;
    });
}

export function leave_emp (db, id) {
    db.query(`SELECT
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
        return result;
    });
}

export function leavepending_emp (db, id) {
    db.query(`SELECT
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
        return result;
    });
}

export function leaveapprove_emp (db, id) {
    db.query(`SELECT
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
        return result;
    });
}

export function leave_date (db, date, dept) {
    db.query(`SELECT COUNT(*) AS SD,
                ( SELECT COUNT(*) FROM LEAVE_DAY INNER JOIN EMPLOYEE 
                ON EMPLOYEE.emp_id = LEAVE_DAY.emp_id AND EMPLOYEE.dept_id != ?
                WHERE LEAVE_DAY.leave_date = ? AND LEAVE_DAY.leave_approve > '0'
                ) AS AD
                FROM LEAVE_DAY INNER JOIN EMPLOYEE ON EMPLOYEE.emp_id = LEAVE_DAY.emp_id AND EMPLOYEE.dept_id = ?
                WHERE LEAVE_DAY.leave_date = ? AND LEAVE_DAY.leave_approve > '0'`, 
            [dept, date, dept, date],
    (err, result) => {
        return result;
    });
}

export function leave_year (db, id) {
    db.query(`SELECT COUNT(*) AS LE,
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
        return result;
    });
}

export function workday (db) {
    db.query(`SELECT *, DATE_FORMAT(work_date, '%Y-%m-%d') as work_date,
                DATE_FORMAT(DATE_ADD(work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date
                FROM WORKDAY
                WHERE work_date > DATE_FORMAT(CURDATE(), '%Y-%m-%d')
                AND work_status = '1'
                LIMIT 60`, 
    (err, result) => {
        return result;
    });
}

export function workday_emp (db, id) {
    db.query(`SELECT *, 
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
        return result;
    });
}

export function holiday (db) {
    db.query(`SELECT *,
                WORKDAY.work_id as id,
                DATE_FORMAT(WORKDAY.work_date, '%Y-%m-%d') as work_date,
                DATE_FORMAT(DATE_ADD(work_date, INTERVAL 543 YEAR), '%d-%m-%Y') as th_date
                FROM HOLIDAY
                INNER JOIN WORKDAY 
                ON HOLIDAY.work_id = WORKDAY.work_id`, 
    (err, result) => {
        return result;
    });
}

export function time (db) {
    db.query("SELECT * FROM TIME_ATTENDANCE",
    (err, result) => {
        return result;
    });
}

export function timecount (db) {
    db.query(`SELECT EMPLOYEE.emp_id AS id, 
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
        return result;
    });
}

export function timesheet (db, id) {
    db.query(`SELECT *,
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
    [id], (err, result) => {
        return result;
    });
}

export function timesheet_current (db, id) {
    db.query(`SELECT *,
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
    [id], (err, result) => {
        return result;
    });
}

export function report_date (db) {
    db.query(`SELECT work_id as id, DATE_FORMAT(work_date, '%Y-%m-%d') as work_date,
                    ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE TIME_ATTENDANCE.work_id = WORKDAY.work_id ) AS ta,
                    ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE TIME_ATTENDANCE.work_id = WORKDAY.work_id AND time_in <= '08:45:00' ) AS nta,
                    ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE TIME_ATTENDANCE.work_id = WORKDAY.work_id AND time_in > '08:45:00' ) AS lta,
                    ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.leave_date = WORKDAY.work_date ) AS ld,
                    ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.leave_date = WORKDAY.work_date AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลากิจ' ) AS bld,
                    ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.leave_date = WORKDAY.work_date AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลาพักร้อน' ) AS hld,
                    ( SELECT COUNT(*) FROM LEAVE_DAY WHERE LEAVE_DAY.leave_date = WORKDAY.work_date AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลาป่วย' ) AS sld
                FROM WORKDAY WHERE work_status = '1' AND work_date <= CURDATE()
                GROUP BY WORKDAY.work_id
                ORDER BY WORKDAY.work_id DESC`,
    (err, result) => {
        return result;
    });
}

export function report_emp (db, id, date) {
    db.query(`SELECT EMPLOYEE.emp_id as id, CONCAT(EMPLOYEE.emp_name, ' ', EMPLOYEE.emp_surname) as name, 
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
        return result;
    });
}

export function report_year (db) {
    db.query(`SELECT SUBSTRING(WORKDAY.work_id, 1, 4) AS id, DATE_FORMAT(work_date, '%Y') AS cid,
                ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE SUBSTRING(TIME_ATTENDANCE.work_id, 1, 4) = SUBSTRING(WORKDAY.work_id, 1, 4) ) AS ta,
                ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE SUBSTRING(TIME_ATTENDANCE.work_id, 1, 4) = SUBSTRING(WORKDAY.work_id, 1, 4) AND time_in <= '08:45:00' ) AS nta,
                ( SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE SUBSTRING(TIME_ATTENDANCE.work_id, 1, 4) = SUBSTRING(WORKDAY.work_id, 1, 4) AND time_in > '08:45:00' ) AS lta,
                ( SELECT COUNT(*) FROM LEAVE_DAY WHERE DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = DATE_FORMAT(WORKDAY.work_date, '%Y') ) AS ld,
                ( SELECT COUNT(*) FROM LEAVE_DAY WHERE DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = DATE_FORMAT(WORKDAY.work_date, '%Y') AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลากิจ' ) AS bld,
                ( SELECT COUNT(*) FROM LEAVE_DAY WHERE DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = DATE_FORMAT(WORKDAY.work_date, '%Y') AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลาพักร้อน' ) AS hld,
                ( SELECT COUNT(*) FROM LEAVE_DAY WHERE DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = DATE_FORMAT(WORKDAY.work_date, '%Y') AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลาป่วย' ) AS sld
            FROM WORKDAY WHERE work_status = '1' AND work_date <= CURDATE()
            GROUP BY id
            ORDER BY id DESC`,
    (err, result) => {
        return result;
    });
}

export function report_year_emp (db, id, cid) {
    db.query(`SELECT EMPLOYEE.emp_id AS id, CONCAT(EMPLOYEE.emp_name, ' ', EMPLOYEE.emp_surname) AS name, 
                    (SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE SUBSTRING(TIME_ATTENDANCE.work_id, 1, 4) = ? AND time_in <= '08:45:00' AND id = TIME_ATTENDANCE.emp_id ) AS nta,
                    (SELECT COUNT(*) FROM TIME_ATTENDANCE WHERE SUBSTRING(TIME_ATTENDANCE.work_id, 1, 4) = ? AND time_in > '08:45:00' AND id = TIME_ATTENDANCE.emp_id ) AS lta,
                    (SELECT COUNT(*) FROM LEAVE_DAY WHERE DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = ? AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลากิจ' AND id = LEAVE_DAY.emp_id ) AS bld,
                    (SELECT COUNT(*) FROM LEAVE_DAY WHERE DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = ? AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลาพักร้อน' AND id = LEAVE_DAY.emp_id ) AS hld,
                    (SELECT COUNT(*) FROM LEAVE_DAY WHERE DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = ? AND LEAVE_DAY.leave_approve > '0' AND leave_type = 'ลาป่วย' AND id = LEAVE_DAY.emp_id ) AS sld
                FROM EMPLOYEE
                LEFT JOIN TIME_ATTENDANCE ON EMPLOYEE.emp_id = TIME_ATTENDANCE.emp_id AND SUBSTRING(TIME_ATTENDANCE.work_id, 1, 4) = ?
                LEFT JOIN LEAVE_DAY ON EMPLOYEE.emp_id = LEAVE_DAY.emp_id AND DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = ?
                WHERE (TIME_ATTENDANCE.work_id IS NULL OR SUBSTRING(TIME_ATTENDANCE.work_id, 1, 4) = ?)
                    AND (LEAVE_DAY.leave_date IS NULL OR DATE_FORMAT(LEAVE_DAY.leave_date, '%Y') = ?)
                    AND EMPLOYEE.emp_id > '1000'
                GROUP BY id`, 
    [id, id, cid, cid, cid, id, cid, id, cid], (err, result) => {
        return result;
    });
}

export function report (db) {
    db.query(`SELECT WORKDAY.work_id,
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
        return result;
    });
}