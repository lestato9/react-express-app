const express = require('express');
const bcrypt = require('bcrypt');
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
                .catch(() => {
                  res.status(500).end();
                  console.error('Failed to save new user');
                })
            })
            .catch(() => {
              res.status(500).end();
              console.error('Failed to create hash from password');
            })
        })
        .catch(() => {
          res.status(500).end();
          console.error('Failed to generate salt');
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
            res.json({ loggedIn: true });
          } else {
            res.status(401).json({ msg: 'Invalid credentials' })
          }
        })
        .catch((() => {
          res.status(500).end();
          console.error('Failed to generate hash');
        }))
    })
});


module.exports = router;
