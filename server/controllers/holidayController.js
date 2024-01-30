const Holiday = require('../models/holiday');


const createHoliday = async (holidayData) => {
    try {
        const holiday = await Holiday.create(holidayData);
        return "Holiday was created";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to create holiday.');
    }
};

const updateHoliday = async (holidayData) => {
    try {
        const holiday = await Holiday.update({ 
            holi_name: holidayData.holi_name,
            }, {
            where: {
                work_id: holidayData.work_id,
            },
        });
        return "Holiday was updated";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update holiday.');
    }
};

const getAllHoliday = async () => {
    try {
        const holidays = await Holiday.findAll();
        return holidays;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch holidays.');
    }
};

const getHolidayByWork = async (workId) => {
    try {
        const holidays = await Holiday.findAll({
            where: {
                work_id: workId,
            }
        });
        return holidays;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch holiday.');
    }
};

module.exports = { createHoliday, updateHoliday, getAllHoliday, getHolidayByWork };