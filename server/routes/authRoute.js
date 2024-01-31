const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/login', async (req, res) => {
    const userData = req.body;
    try {
        const user = await authController.loginByUser(userData);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/session', async (req, res) => {
    const tokenData = req.body;
    try {
        const user = await authController.sessionCheck(tokenData);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/create', async (req, res) => {
    const userData = req.body;
    try {
        const user = await authController.createUser(userData);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/update/:empId', async (req, res) => {
    const { empId } = req.params;
    const userData = {
        emp_id: empId,
        ...req.body
    };
    try {
        const user = await authController.updateUser(userData);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;