const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');


router.post('/create', async (req, res) => {
    const typeData = req.body;
    try {
        const type = await typeController.createType(typeData);
        res.json(type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const type = await typeController.getAllType();
        res.json(type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/find/:typeId', async (req, res) => {
    const { typeId } = req.params;
    try {
        const type = await typeController.getTypeById(typeId);
        res.json(type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;