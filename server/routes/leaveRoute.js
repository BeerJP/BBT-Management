const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');


router.post('/create/:empId', async (req, res) => {
    const { empId } = req.params;
    const leaveData = {
        emp_id: empId,
        ...req.body
    };
    try {
        const leave = await leaveController.createLeave(leaveData);
        res.json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/update', async (req, res) => {
    const leaveData = req.body;
    try {
        const leave = await leaveController.updateLeave(leaveData);
        res.json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const leave = await leaveController.getAllLeave();
        res.json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/emp/:empId', async (req, res) => {
    const { empId } = req.params;
    try {
        const leave = await leaveController.getLeaveByEmp(empId);
        res.json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/work/:empId', async (req, res) => {
    const { empId } = req.params;
    try {
        const leave = await leaveController.getLeaveByWork(empId);
        res.json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;