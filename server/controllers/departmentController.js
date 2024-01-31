const Department = require('../models/department');


const createDepartment = async (departmentData) => {
    try {
        const department = await Department.create(departmentData);
        return "Department was created";
    } catch (error) {
        console.error(error);
        throw new Error("Unable to create department.");
    }
};

const getAllDepartment = async () => {
    try {
        const departments = await Department.findAll();
        return departments;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch departments.");
    }
};

const getDepartmentById = async (departmentId) => {
    try {
        const department = await Department.findByPk(departmentId);
        return department;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch department.");
    }
};

module.exports = { createDepartment, getAllDepartment, getDepartmentById };