const express = require('express');
const User = require(__dirname + '/../models/users');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/db_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const uniqHTTP = require(__dirname + '/../lib/uniq_http');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, uniqHTTP, (req, res) => {
  var newUser = new User();

  newUser.username = req.body.username || req.body.email;
  newUser.authentication.email = req.body.email;
  newUser.hashPassword(req.body.password);
  newUser.save((err, data) => {

    if (err) return handleDBError(err, res);
    res.status(200).json({token: data.generateToken()}); //to be replaced with an auth token
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({'authentication.email': req.basicHTTP.email}, (err, user) => {
    if (err) {
      console.log(err);//eslint-disable-line
      return res.status(401).json({msg: 'Could not authenticate'});
    }

    if (!user) return res.status(401).json({msg: 'could not authenticate'});

    if (!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({msg: 'Could not autheticate'});

    res.json({token: user.generateToken()});
  });
});
