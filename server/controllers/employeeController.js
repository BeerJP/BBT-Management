const Employee = require('../models/employee');


const createEmployee = async (employeeData) => {
    try {
        const employee = await Employee.create(employeeData);
        return "Employee was created";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to create employee.');
    }
};

const updateEmployee = async (employeeData) => {
    try {
        const employee = await Employee.update(employeeData, {
            where: {
                emp_id: employeeData.emp_id,
            },
        });
        return "Employee was updated";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update employee.');
    }
};

const getAllEmployee = async () => {
    try {
        const employee = await Employee.findAll();
        return employee;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch employee.');
    }
};

const getEmployeeById = async (empId) => {
    try {
        const employee = await Employee.findAll({
            where: {
                emp_id: empId,
            },
        });
        return employee;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch employee.');
    }
};


module.exports = { createEmployee, updateEmployee, getAllEmployee, getEmployeeById };