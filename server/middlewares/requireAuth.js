const { jwtSecret } = require('config/keys');
const jwt = require('jsonwebtoken');
const User = require(`models/User`);

function requireAuth(req, res, next) {
  if (!req.cookies.token) {
    return res.status(401).end();
  }

  jwt.verify(req.cookies.token, jwtSecret, (err, decoded) => {
    if (err) {
      console.error(err.name, err.message);
      return res.status(401).end();
    }

    User
      .findById(decoded.id)
      .then((user) => {
        if (!user) throw new Error('Cannot find user with id extracted from JWT token');
        // success
        next();
      })
      .catch(({ name, message }) => {
        console.error(name, message);
        return res.status(401).end();
      })
  });

}

module.exports = requireAuth;
