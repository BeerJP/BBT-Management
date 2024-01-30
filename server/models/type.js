const { DataTypes } = require('sequelize');
const conn = require('../database/db')


const Type = conn.define('types', {
    type_id  : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    type_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{ timestamps: false, });

module.exports = Type;