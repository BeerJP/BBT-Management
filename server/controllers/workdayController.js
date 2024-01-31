const Work = require('../models/work');


const createWork = async (workData) => {
    try {
        const work = await Work.create(workData);
        return "work was created";
    } catch (error) {
        console.error(error);
        throw new Error("Unable to create work.");
    }
};

const getAllWork= async () => {
    try {
        const works = await Work.findAll();
        return works;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch works.");
    }
};

const getWorkById = async (workId) => {
    try {
        const work = await Work.findByPk(workId);
        return work;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch work.");
    }
};

module.exports = { createWork, getAllWork, getWorkById };