const Leave = require('../models/leave');
const Work = require('../models/work');


const createLeave = async (leaveData) => {
    try {
        const leave = await Leave.create(leaveData);
        return "Leave was created";
    } catch (error) {
        console.error(error);
        throw new Error("Unable to create leave.");
    }
};

const updateLeave = async (leaveData) => {
    try {
        const leave = await Leave.update(leaveData, {
            where: {
                work_id: leaveData.work_id,
                emp_id: leaveData.emp_id,
            },
        });
        return "Leave was updated";
    } catch (error) {
        console.error(error);
        throw new Error("Unable to update leave.");
    }
};

const getAllLeave = async () => {
    try {
        const leave = await Leave.findAll({include: Work});
        return leave;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch leave.");
    }
};

const getLeaveByWork = async (workId) => {
    try {
        const leave = await Leave.findAll({
            where: {
                work_id: workId,
            },
            include: Work,
        });
        return leave;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch leave.");
    }
};

const getLeaveByEmp = async (empId) => {
    try {
        const leave = await Leave.findAll({
            where: {
                emp_id: empId,
            },
            include: Work,
        });
        return leave;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch leave.");
    }
};

module.exports = { createLeave, updateLeave, getAllLeave, getLeaveByWork, getLeaveByEmp };