const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

function verifyJWT(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) res.status(403).send({ message: `Token required!` });

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  jwt.verify(bearerToken, jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: `Invalid token!`, error: err });
      return;
    }
    req.jwtUserId = decoded?.id;
    next();
  });
}

module.exports = {
  verifyJWT,
};
