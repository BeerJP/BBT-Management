const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Employee = require('../models/employee');
const secret = 'BBTM-login';


const loginByUser = async (userData) => {
    try {
        const user = await User.findOne({ where: { user_name: userData.user_name, }, include: Employee });
        if (user === null) {
            return "Incorrect Username and/or Password !";
        } else {
            bcrypt.compare(userData.user_password, user.user_password, function(err, result) {
                if (result) {
                    const token = jwt.sign({
                        user_id: user.Employee.emp_id,
                        type_id: user.type_id,
                        user_name: user.Employee.emp_name + ' ' + user.Employee.emp_surname,
                        department: user.dept_id
                    }, secret, { expiresIn: '2h' });
                    return [user.user_name, {token: token}];
                } else {
                    return "Incorrect Username and/or Password !";
                };
            });
        }
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch user.");
    }
};

const sessionCheck = async (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded
    } catch {
        console.error(error);
        throw new Error("Unable to fetch token.");
    }
};

const createUser = async (userData) => {
    try {
        const hash = bcrypt.hash(userData.user_password, saltRounds);
        const [user, created] = await User.findOrCreate({ where: { user_name: userData.user_name },
            defaults: {
                user_name: userData.user_name,
                user_password: hash,
                type_id: userData.type_id,
                emp_id: userData.emp_id,
            },
        });
        if (created) {
            return "User was created";
        } else {
            return "Unable to create user.";
        }
    } catch (error) {
        console.error(error);
        throw new Error("Unable to create user.");
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
        throw new Error("Unable to update user.");
    }
};

module.exports = { loginByUser, sessionCheck, createUser, updateUser };