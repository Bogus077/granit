'use strict';

const {
  User,
  Map,
  Skill,
  Role,
  ActivationCode,
  ResetPassword,
  Question,
  Material,
} = require('../models');
const Validator = require('validatorjs');
const { rules } = require('../utils/index');
const { jwtSecret, jwtExpiryTime, minutesToResetPassword } = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mailsender } = require('../mail');

async function sendTestEmail(req, res) {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const code = req.body.code;

    if (!email || !name || !code) {
      throw error('Empty field');
    }

    console.log(`Send ${email} ${name} ${code}`);
    await mailsender.sendConfirmationEmail(name, email, code);
    const result = 'OK';

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function repeatConfirmationEmail(req, res) {
  try {
    const requestData = req.body;

    validateData(requestData, rules.userRepeatEmailConfirmation);
    const email = requestData.email;

    const user = await User.findOne({ where: { email: email } });
    if (!user || user.status === 'active') throw { errorMessage: 'User not found!' };

    const confirmationCode = await ActivationCode.findOne({ where: { user_id: user.id } });
    if (!confirmationCode) throw { errorMessage: 'Code not found!' };

    await mailsender.sendConfirmationEmail(user.name, user.email, confirmationCode.code);

    const result = { id: user.id };

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function signUp(req, res) {
  try {
    const requestData = req.body;

    validateData(requestData, rules.userRegistartionRules);

    await checkAlreadyExistEmail(requestData.email);

    requestData.password = await bcrypt.hash(requestData.password, 8);

    const confirmationCode = jwt.sign({ email: requestData.email }, jwtSecret);

    const createdUser = await User.create({ ...requestData, status: 'pending' });

    await createdUser.createActivationCode({ code: confirmationCode });

    //TODO: uncomment mailsender when email templates is done

    await mailsender.sendConfirmationEmail(createdUser.name, createdUser.email, confirmationCode);

    await createdUser.createMap();

    const result = { id: createdUser.id };

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function confirmRegistrationCode(req, res) {
  try {
    const confirmationCode = req.body.code;

    const activation_code_data = await ActivationCode.findOne({
      where: { code: confirmationCode },
    });

    if (!activation_code_data) throw { errorMessage: 'Link is invalid!' };

    const user = await User.findOne({ where: { id: activation_code_data.user_id } });

    if (!user || user.status === 'active') throw { errorMessage: 'Link is invalid!' };

    await user.update({ status: 'active' });

    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: jwtExpiryTime,
    });

    res.status(200).send({ message: 'User succesfully activated!', accessToken: token });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function sendResetPasswordCode(req, res) {
  try {
    const now = Date.now();

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || user.status !== 'active') {
      throw { errorMessage: 'User not found or not activated!' };
    }

    const resetPasswordRow = await ResetPassword.findOne({
      where: {
        user_id: user.id,
      },
      order: [['createdAt', 'DESC']],
    });

    const resetPasswordCode = jwt.sign({ email: email }, jwtSecret);

    if (resetPasswordRow !== null && resetPasswordRow.status !== 'used') {
      if ((now - Number(resetPasswordRow.date_from)) / 60000 < minutesToResetPassword) {
        console.log((now - Number(resetPasswordRow.date_from)) / 60000);
        throw { errorMessage: 'Reset password already send' };
      }

      resetPasswordRow.update({ status: 'used' });
    }

    await ResetPassword.create({
      user_id: user.id,
      date_from: now,
      code: resetPasswordCode,
      status: 'active',
    });

    //TODO: fix mailer and don't return code !!!

    await mailsender.sendResetPasswordEmail(email, resetPasswordCode);

    // res.status(200).send('Reset Password Code succesfully sended!');
    res.status(200).send('Code sent');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function confirmResetPasswordCode(req, res) {
  try {
    const { resetPasswordCode, newPassword } = req.body;

    const resetPassword = await ResetPassword.findOne({
      where: {
        code: resetPasswordCode,
      },
    });

    if (!resetPassword || resetPassword?.status === 'used') {
      throw { errorMessage: 'Link is deprecated' };
    }

    const { user_id } = resetPassword;

    if (!user_id) throw { errorMessage: 'User not found!' };

    const password = await bcrypt.hash(newPassword, 8);

    await User.update(
      { password },
      {
        where: {
          id: user_id,
        },
      }
    );

    await resetPassword.update({ status: 'used' });

    res.status(200).send('Password succesfully updated!');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function signIn(req, res) {
  try {
    const requestData = req.body;

    validateData(requestData, rules.userLoginRules);

    const user = await User.findOne({ where: { email: requestData.email } });

    if (!user || user.status !== 'active') {
      throw { errorMessage: 'User not found or not activated!' };
    }

    const isPasswordValid = await bcrypt.compare(requestData.password, user.password);

    if (!isPasswordValid) throw { errorMessage: `Invalid password` };

    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: jwtExpiryTime,
    });

    const result = {
      accessToken: token,
    };

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getUserDetail(req, res) {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        'id',
        'email',
        'name',
        'lastName',
        'status',
        'description',
        'telegram',
        'isLinkShared',
        'isTelegramShared',
        'isNameShared',
      ],
      include: [
        {
          model: Role,
          attributes: ['code'],
          raw: true,
          through: { attributes: [] },
        },
        {
          model: ActivationCode,
          attributes: ['code'],
          raw: true,
        },
        {
          model: Question,
          raw: true,
          attributes: ['label'],
          through: { attributes: ['answer'] },
        },
        {
          model: Map,
          attributes: ['id'],
          include: {
            model: Skill,
            attributes: ['code'],
            through: { attributes: [] },
          },
        },
      ],
    });

    if (!user) res.sendStatus(404);
    let userInfo = JSON.parse(JSON.stringify(user));
    userInfo.name = userInfo.isNameShared ? userInfo.name : '';
    userInfo.lastName = userInfo.isNameShared ? userInfo.lastName : '';
    userInfo.telegram = userInfo.isTelegramShared ? userInfo.telegram : '';
    if (!userInfo.isLinkShared) {
      userInfo = {
        isLinkShared: false,
      };
    }
    // if (!user.isLinkShared) throw { errorMessage: `User is not public` };

    res.status(200).send(userInfo);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getAuthedUserDetail(req, res) {
  try {
    const userId = parseInt(req.jwtUserId);
    const newToken = jwt.sign({ id: userId }, jwtSecret, {
      expiresIn: jwtExpiryTime,
    });

    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        'id',
        'email',
        'name',
        'lastName',
        'description',
        'telegram',
        'isLinkShared',
        'isTelegramShared',
        'isNameShared',
      ],
      include: [
        {
          model: Role,
          attributes: ['code'],
          raw: true,
          through: { attributes: [] },
        },
        {
          model: Question,
          raw: true,
          attributes: ['label'],
          through: { attributes: ['answer'] },
        },
        {
          model: Map,
          attributes: ['id'],
          include: [
            {
              model: Skill,
              attributes: ['code'],
              through: { attributes: [] },
            },
            {
              model: Material,
              attributes: ['id'],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!user) res.sendStatus(404);
    // if (!user.Map.is_public) throw { errorMessage: `User is not public` };

    res.status(200).send({ user, accessToken: newToken });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateUserProfile(req, res) {
  try {
    const requestData = req;
    const user_id = req.jwtUserId;
    const description = req.body.description;
    const telegram = req.body.telegram;
    const isLinkShared = req.body.isLinkShared;
    const isTelegramShared = req.body.isTelegramShared;
    const isNameShared = req.body.isNameShared;

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) throw { errorMessage: 'User does not exist' };

    if (description || description === '') {
      await user.update({ description: description });
    }
    if (telegram || telegram === '') {
      await user.update({ telegram: telegram });
    }
    if (isLinkShared === true || isLinkShared === false) {
      await user.update({ isLinkShared: isLinkShared });
    }
    if (isTelegramShared === true || isTelegramShared === false) {
      await user.update({ isTelegramShared: isTelegramShared });
    }
    if (isNameShared === true || isNameShared === false) {
      await user.update({ isNameShared: isNameShared });
    }

    res.status(200).send({ message: 'Status successfuly updated' });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getUsersAnswers(req, res) {
  const result = User.res.status(200).send(result);
}

async function checkAlreadyExistEmail(email) {
  const alreadyExistUser = await User.findOne({ where: { email } });

  if (alreadyExistUser) throw { errorMessage: 'email must be unique' };
}

async function isExistUser(id) {
  const user = await User.findOne({ where: { id } });

  if (!user) throw { errorMessage: 'user not found' };
}

function validateData(data, rules) {
  const validation = new Validator(data, rules);

  if (validation.fails()) throw { errorMessage: validation.errors.all() };
}

module.exports = {
  signUp,
  signIn,
  getUserDetail,
  confirmRegistrationCode,
  sendResetPasswordCode,
  confirmResetPasswordCode,
  updateUserProfile,
  getAuthedUserDetail,
  sendTestEmail,
  repeatConfirmationEmail,
};
