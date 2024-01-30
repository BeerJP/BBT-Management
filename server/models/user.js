const { DataTypes } = require('sequelize');
const conn = require('../database/db')


const User = conn.define('users', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'emp_id',
        }, 
    },
},{ timestamps: false, });

module.exports = User;