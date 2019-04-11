const privateRoutes = 'config/privateRoutes';
const { jwtSecret } = require('config/keys');
const jwt = require('jsonwebtoken');
const User = require(`models/User`);

function requireAuth(req, res, next) {
  if (!privateRoutes.includes(req.url)) next();
  if (!req.cookies.appToken) {
    res.status(401).end();
    return;
  }

  jwt.verify(req.cookies.appToken, jwtSecret, (err, decoded) => {
    if (err) {
      console.error(err.name, err.message);
      res.status(401).end();
      return;
    }

    User
      .findById(decoded.id)
      .then((user) => {
        if (!user) throw new Error('Cannot find user with id extracted from JWT token');
        // if there is user with id from token, everyhting is OK 
        next();
      })
      .catch((err) => {
        console.error(err.name, err.message);
        res.status(401).end();
      })
  });

}

module.exports = requireAuth;
