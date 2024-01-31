const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');


router.post('/create/:empId', async (req, res) => {
    const { empId } = req.params;
    const attendanceData = {
        emp_id: empId,
        ...req.body
    };
    try {
        const attendance = await attendanceController.createAttendance(attendanceData);
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/update/:empId', async (req, res) => {
    const { empId } = req.params;
    const attendanceData = {
        emp_id: empId,
        ...req.body
    };
    try {
        const attendance = await attendanceController.updateAttendance(attendanceData);
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const attendance = await attendanceController.getAllAttendance();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/:empId', async (req, res) => {
    const { empId } = req.params;
    try {
        const attendance = await attendanceController.getAttendanceByEmp(empId);
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;