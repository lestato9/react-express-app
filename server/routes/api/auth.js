const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('config/keys');
const User = require(`models/User`);

const router = express.Router();

// @route   POST api/auth/signup
// @desc    create new user
// @access  Public
router.post('/signup', (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ msg: 'Fill all the fields' });
  }

  User.findOne({ name })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: `User with name ${name} already exists` });
      }

      bcrypt.genSalt(10)
        .then((salt) => {
          bcrypt.hash(password, salt)
            .then((hash) => {
              const newUser = new User({
                name,
                salt,
                password: hash
              });

              newUser.save()
                .then((user) => {
                  res.json(user);
                })
                .catch((err) => {
                  res.status(500).end();
                  console.error(err.name, err.message);
                })
            })
            .catch((err) => {
              res.status(500).end();
              console.error(err.name, err.message);
            })
        })
        .catch((err) => {
          res.status(500).end();
          console.error(err.name, err.message);
        });

    })
});

// @route   POST api/auth/login
// @desc    log in
// @access  Public
router.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ msg: 'Fill all the fields' });
  }

  User.findOne({ name })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: `There is no user with name ${name}` });
      }

      bcrypt.hash(password, user.salt)
        .then((hash) => {
          if (hash === user.password) {
            jwt.sign(
              { id: user.id },
              keys.jwtSecret,
              { expiresIn: 7200 },
              (err, token) => {
                if (err) {
                  console.error(err.name, err.message);
                  res.status(500).end();
                } else {
                  res
                    .cookie('token', token)
                    .json(user);
                }
              }
            )
          } else {
            res.status(400).json({ msg: 'Invalid password' });
          }
        })
        .catch(((err) => {
          console.log(err.name, err.message);
          res.status(500).end();
        }))
    })
});


module.exports = router;
