const nodemailer = require('nodemailer');
const { mailConfig } = require('../config/config');
const { createRegistrationLetter } = require('./templates/registrationLetter');
const { createResetPasswordLetter } = require('./templates/passwordResetLetter');

const user = mailConfig.user;
const pass = mailConfig.pass;

const transport = nodemailer.createTransport(
  {
    service: 'yandex',
    auth: {
      user,
      pass,
    },
  },
  {
    // default message fields
    from: user,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
);

async function sendConfirmationEmail(name, email, confirmationCode) {
  try {
    console.log('User is ' + user);

    await transport.sendMail({
      to: email,
      subject: 'Skillmaps - Регистрация',
      html: createRegistrationLetter(name, confirmationCode),
    });
  } catch (error) {
    throw error;
  }
}

async function sendResetPasswordEmail(email, resetPasswordCode) {
  try {
    console.log('User is ' + user);

    await transport.sendMail({
      to: email,
      subject: 'Skillmaps - Восстановление пароля',
      html: createResetPasswordLetter(resetPasswordCode),
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  sendConfirmationEmail,
  sendResetPasswordEmail,
};
