const express = require('express');
const jsonParser = require('body-parser').json();
const Jedi = require(__dirname + '/../models/jedis');
const errorHandle = require(__dirname + '/../lib/error-handle.js');

var jediRouter = module.exports = exports = express.Router();

jediRouter.get('/jedis', (req, res) => {
  Jedi.find({}, (err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

jediRouter.post('/jedis', jsonParser, (req, res) => {
  var newJedi = new Jedi(req.body);
  newJedi.save((err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

jediRouter.put('jedis/:id', (req, res) => {
  var jediData = req.body;
  delete jediData._id;
  Jedi.update({_id: req.params.id}, jediData, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});

jediRouter.delete('/jedis/:id', (req, res) => {
  Jedi.remove({_id: req.params.id}, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});
