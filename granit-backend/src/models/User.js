const { sequelize, DataTypes } = require('../database/database.config');

const User = sequelize.define(
  'User',
  {
    name: { type: DataTypes.STRING(100), allowNull: false },
    lastName: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(200), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'pending'],
      default: 'pending',
    },
    description: { type: DataTypes.STRING(1000), allowNull: true },
    telegram: { type: DataTypes.STRING, allowNull: true },
    isLinkShared: { type: DataTypes.BOOLEAN, allowNull: true },
    isTelegramShared: { type: DataTypes.BOOLEAN, allowNull: true },
    isNameShared: { type: DataTypes.BOOLEAN, allowNull: true },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = User;
