const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


router.post('/create', async (req, res) => {
    const employeeData = req.body;
    try {
        const employee = await employeeController.createEmployee(employeeData);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/update/:empId', async (req, res) => {
    const { empId } = req.params;
    const employeeData = {
        emp_id: empId,
        ...req.body
    };
    try {
        const employee = await employeeController.updateEmployee(employeeData);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const employee = await employeeController.getAllEmployee();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/:empId', async (req, res) => {
    const { empId } = req.params;
    try {
        const employee = await employeeController.getEmployeeById(empId);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;