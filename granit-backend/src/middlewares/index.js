const { verifyJWT } = require('./authJwt');
const { isAdmin } = require('./checkRole');
module.exports = {
  verifyJWT,
  isAdmin,
};
