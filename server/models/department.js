const { DataTypes } = require('sequelize');
const conn = require('../database/db')


const Department = conn.define('departments', {
    dept_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    dept_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{ timestamps: false, });

module.exports = Department;