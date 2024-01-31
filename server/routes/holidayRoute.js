const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holidayController');


router.post('/create', async (req, res) => {
    const holidayData = req.body;
    try {
        const holiday = await holidayController.createHoliday(holidayData);
        res.json(holiday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/update/:workId', async (req, res) => {
    const { workId } = req.params;
    const holidayData = {
        work_id: workId,
        ...req.body
    };
    try {
        const holiday = await holidayController.updateHoliday(holidayData);
        res.json(holiday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const holiday = await holidayController.getAllHoliday();
        res.json(holiday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/:workId', async (req, res) => {
    const { workId } = req.params;
    try {
        const holiday = await holidayController.getHolidayByWork(workId);
        res.json(holiday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;