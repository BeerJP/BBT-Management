const { DataTypes } = require('sequelize');
const conn = require('../database/db')


const Workday = conn.define('workdays', {
    work_id   : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    work_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    work_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{ timestamps: false, });

module.exports = Workday;