'use strict';
const { sequelize } = require('../models');
const kidModel = sequelize.models.Kid;

async function KidsList(req, res) {
  try {
    const kids = await kidModel.findAll();

    res.status(200).send(kids);
  } catch (error) {
    console.log('ERROR');
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = { KidsList };
