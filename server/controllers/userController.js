const User = require('../models/user');


const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return "User was created";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to create user.');
    }
};

const updateUser = async (userData) => {
    try {
        const user = await User.update(userData, {
            where: {
                emp_id: userData.emp_id,
            },
        });
        return "User was updated";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update user.');
    }
};

const getAllUser = async () => {
    try {
        const user = await User.findAll();
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch user.');
    }
};

const getUserByEmp = async (empId) => {
    try {
        const user = await User.findAll({
            where: {
                emp_id: empId,
            },
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch user.');
    }
};

module.exports = { createUser, updateUser, getAllUser, getUserByEmp };