const { DataTypes } = require('sequelize');
const conn = require('../database/db')


const Leave = conn.define('leave', {
    leave_type : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    leave_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    leave_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    leave_approve: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    work_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'workdays',
            key: 'work_id',
        }, 
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

module.exports = Leave;