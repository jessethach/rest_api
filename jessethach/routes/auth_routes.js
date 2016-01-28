const express = require('express');
const User = require(__dirname + '/../models/users');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/db_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res) => {
  var newUser = new User();
  if (!((req.body.email || '').length && (req.body.password || '').length > 7)) {
    return res.status(400).json({msg: 'invalid username or password'});
  }

  newUser.username = req.body.username || req.body.email;
  newUser.authentication.email = req.body.email;
  newUser.hashPassword(req.body.password);

  newUser.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: data.generateToken()});
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({'authentication.email': req.auth.email}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).json({msg: 'Could not authenticate' + req.auth.email});
    }

    if (!user) return res.status(401).json({msg: 'Could not authenticate' + req.auth.email});

    if (!user.comparePassword(req.auth.password)) return res.status(401).json({msg: 'Could not authenticate' + req.auth.email});

    res.json({token: user.generateToken()});
  });
});
