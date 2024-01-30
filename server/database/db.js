const { Sequelize } = require('sequelize');


const conn = new Sequelize({
  dialect: '',
  host: '',
  username: '',
  password: '',
  database: '',
  port: 8000,
  logging: false,
});

conn.sync();

module.exports = conn;