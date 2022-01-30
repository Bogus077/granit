'use strict';

const express = require('express');
const router = express.Router();
const { kidsController } = require('../controllers');

router.get('/list', kidsController.KidsList);

module.exports = router;
