const { Sequelize, DataTypes } = require('sequelize');
const { dbconn } = require('../config/config');
const sequelize = new Sequelize(dbconn);

module.exports = {
  sequelize,
  DataTypes,
};
