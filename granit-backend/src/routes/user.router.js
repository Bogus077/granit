'use strict';

const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { verifyJWT } = require('../middlewares');

//TODO: need to refactoring all to this format
router.use([jsonParser]);

router.post('/registration', userController.signUp);

router.post('/signin', userController.signIn);

// router.get('/:id(\\d+)', [verifyJWT], userController.getUserDetail);
router.get('/:id(\\d+)', userController.getUserDetail);

router.post('/confirm', userController.confirmRegistrationCode);

router.post('/resetPassword/send', userController.sendResetPasswordCode);

router.post('/resetPassword/confirm', userController.confirmResetPasswordCode);

router.post('/updateProfile', [verifyJWT], userController.updateUserProfile);

router.get('/getUserData', [verifyJWT], userController.getAuthedUserDetail);

router.post('/sendEmail', userController.sendTestEmail);

router.post('/repeatSendEmail', userController.repeatConfirmationEmail);

module.exports = router;
