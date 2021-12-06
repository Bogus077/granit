const { User, Role } = require('../models');

async function isAdmin(req, res, next) {
  const userId = req.jwtUserId;

  await User.findOne({ where: { id: userId }, attributes: [], include: { model: Role, attributes: ['code'] } }).then(
    (foundUser) => {
      for (let role of foundUser.dataValues.Roles) {
        if (role.code !== 'admin') {
          res.status(403).send({ errorMessage: `You are not the administrator. Change my mind` });
        }
      }
    }
  );

  next();
}

module.exports = {
  isAdmin,
};
