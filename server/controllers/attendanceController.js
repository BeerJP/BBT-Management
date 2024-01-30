const Attendance = require('../models/attendance');


const createAttendance = async (attendanceData) => {
    try {
        const attendance = await Attendance.create(attendanceData);
        return "Attendance was created";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to create attendance.');
    }
};

const updateAttendance = async (attendanceData) => {
    try {
        const attendance = await Attendance.update({ 
            time_in: attendanceData.time_in ,
            time_out: attendanceData.time_out,
            }, {
            where: {
                work_id: attendanceData.work_id,
                emp_id: attendanceData.emp_id,
            },
        });
        return "Attendance was updated";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update attendance.');
    }
};

const getAllAttendance = async () => {
    try {
        const attendances = await Attendance.findAll();
        return attendances;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch attendances.');
    }
};

const getAttendanceByEmp = async (empId) => {
    try {
        const attendances = await Attendance.findAll({
            where: {
                emp_id: empId,
            }
        });
        return attendances;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch attendance.');
    }
};

module.exports = { createAttendance, updateAttendance, getAllAttendance, getAttendanceByEmp };