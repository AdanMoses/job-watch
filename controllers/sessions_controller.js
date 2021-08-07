const express = require('express')
const bcryptjs = require('bcryptjs')
const router = express.Router()
const User = require('../models/user');
const validateUser = require('../middlewares/users/validate_user');

// Login
router.post('/', validateUser, (req, res) => {

  User.findByEmail(req.body.email)
    .then(user => {
      if (user && bcryptjs.compareSync(req.body.password, user.password_digest)) {
        req.session.userId = user.id;
        console.log(req.session);
        res.json(req.session);
      } else {
        // Error, user not found or wrong password
        res.status(422).json({ error: "Incorrect username or password" });
      }
    })
});

router.get('/', (req, res) => {
  User.findByName(req.session.userId)
    .then(user => {
      if (user == undefined) {
        res.json({ error: "Please login or sign up" })
      }
      res.json({ userName: user.name })
    })
});

// Logout
router.delete('/', (req, res) => {
  req.session.destroy(); // Remove/reset the session
  res.json({});
})

module.exports = router;