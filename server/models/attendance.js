const { DataTypes } = require('sequelize');
const conn = require('../database/db')


const Attendace = conn.define('attendance', {
    time_in : {
        type: DataTypes.TIME,
        allowNull: false,
    },
    time_out : {
        type: DataTypes.TIME,
        allowNull: true,
    },
    work_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'workdays',
            key: 'work_id',
        }, 
    },
    emp_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'emp_id',
        }, 
    },
},{ timestamps: false, });

module.exports = Attendace;