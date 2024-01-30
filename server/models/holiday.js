const { DataTypes } = require('sequelize');
const conn = require('../database/db')


const Holiday = conn.define('holidays', {
    holi_name : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    work_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'workdays',
            key: 'work_id',
        }, 
    },
},{ timestamps: false, });

module.exports = Holiday;