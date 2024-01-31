const User = require('../models/user');


const getAllUser = async () => {
    try {
        const user = await User.findAll();
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch user.");
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
        throw new Error("Unable to fetch user.");
    }
};

module.exports = { getAllUser, getUserByEmp };