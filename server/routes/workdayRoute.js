const express = require('express');
const router = express.Router();
const workdayController = require('../controllers/workdayController');


router.post('/create', async (req, res) => {
    const workdayData = req.body;
    try {
        const workday = await workdayController.createWork(workdayData);
        res.json(workday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const workday = await workdayController.getAllWork();
        res.json(workday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/:workdayId', async (req, res) => {
    const { workdayId } = req.params;
    try {
        const workday = await workdayController.getWorkById(workdayId);
        res.json(workday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;