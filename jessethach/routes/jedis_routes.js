const express = require('express');
const jsonParser = require('body-parser').json();
const Jedi = require(__dirname + '/../models/jedis');
const errorHandle = require(__dirname + '/../lib/error-handle.js');
const handleDBError = require(__dirname + '/../lib/db_error');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var jediRouter = module.exports = exports = express.Router();

jediRouter.get('/jedis', (req, res) => {
  Jedi.find({}, (err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

jediRouter.get('/myjedis', jwtAuth, (req, res) => {
  Jedi.find({forceID: req.user._id}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

jediRouter.post('/jedis', jwtAuth, jsonParser, (req, res) => {
  var newJedi = new Jedi(req.body);
  newJedi.forceID = req.user._id;
  newJedi.save((err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

jediRouter.put('/jedis/:id', jwtAuth, jsonParser, (req, res) => {
  var jediData = req.body;
  delete jediData._id;
  Jedi.update({_id: req.params.id}, jediData, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});

jediRouter.delete('/jedis/:id', jwtAuth, (req, res) => {
  Jedi.remove({_id: req.params.id}, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});
