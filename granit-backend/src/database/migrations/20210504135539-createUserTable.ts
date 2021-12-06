'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      lastName: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(200), allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'pending'],
        default: 'pending',
      },
      description: { type: DataTypes.STRING(1000), allowNull: true }, // TODO: How many symbols ?
      telegram: { type: DataTypes.STRING, allowNull: true },
      isLinkShared: { type: DataTypes.BOOLEAN, allowNull: true },
      isTelegramShared: { type: DataTypes.BOOLEAN, allowNull: true },
      isNameShared: { type: DataTypes.BOOLEAN, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  },
};
