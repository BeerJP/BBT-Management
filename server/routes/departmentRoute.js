const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');


router.post('/create', async (req, res) => {
    const departmentData = req.body;
    try {
        const department = await departmentController.createDepartment(departmentData);
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const department = await departmentController.getAllDepartment();
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/:deptId', async (req, res) => {
    const { deptId } = req.params;
    try {
        const department = await departmentController.getDepartmentById(deptId);
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;