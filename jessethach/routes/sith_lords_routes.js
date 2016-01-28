const express = require('express');
const jsonParser = require('body-parser').json();
const Sith = require(__dirname + '/../models/sith_lords');
const errorHandle = require(__dirname + '/../lib/error-handle.js');
const handleDBError = require(__dirname + '/../lib/db_error');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var sithRouter = module.exports = exports = express.Router();

sithRouter.get('/sith-lords', (req, res) => {
  Sith.find({}, (err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

sithRouter.get('/mysith-lords', jwtAuth, (req, res) => {
  Sith.find({forceID: req.user._id}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

sithRouter.post('/sith-lords', jsonParser, (req, res) => {
  var newSith = new Sith(req.body);
  // newSith.forceID = req.user._id;
  newSith.save((err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

sithRouter.put('/sith-lords/:id', jsonParser, (req, res) => {
  var sithData = req.body;
  delete sithData._id;
  Sith.update({_id: req.params.id}, sithData, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});

sithRouter.delete('/sith-lords/:id', (req, res) => {
  Sith.remove({_id: req.params.id}, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});
