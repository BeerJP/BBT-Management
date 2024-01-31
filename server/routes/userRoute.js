const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/all', async (req, res) => {
    try {
        const user = await userController.getAllUser();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/:empId', async (req, res) => {
    const { empId } = req.params;
    try {
        const user = await userController.getUserByEmp(empId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;