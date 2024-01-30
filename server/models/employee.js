const { DataTypes } = require('sequelize');
const conn = require('../database/db')


const Employee = conn.define('employees', {
    emp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    emp_name: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    emp_surname: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    emp_gender: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    emp_birthdate: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    emp_status: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
    },
    emp_startdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    emp_enddate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    emp_mac: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dept_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{ timestamps: false, });

module.exports = Employee;