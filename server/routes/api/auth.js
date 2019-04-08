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
                  console.error('Failed to save new user');
                  throw err;
                })
            })
            .catch((err) => {
              res.status(500).end();
              console.error('Failed to create hash from password');
              throw err;
            })
        })
        .catch((err) => {
          res.status(500).end();
          console.error('Failed to generate salt');
          throw err;
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
              { expiresIn: 3600 },
              (err, token) => {
                if (err) {
                  console.error('Failed to generate hash');
                  res.status(500).end();
                  throw err;
                } else {
                  res
                    .cookie('token', token, { httpOnly: true })
                    .json({ success: true });
                }
              }
            )
          } else {
            res.status(400).json({ msg: 'Invalid password' });
          }
        })
        .catch(((err) => {
          console.log('Failed to generate hash');
          throw err;
        }))
    })
});


module.exports = router;
