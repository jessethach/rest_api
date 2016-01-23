// var jediPromise = Jedi.find{}.exec()

const express = require('express');
const Jedi = require(__dirname + '/../models/jedis');
const SithLords = require(__dirname + '/../models/sith_lords');
const errorHandle = require(__dirname + '/../lib/error-handle');

const duelRouter = module.exports = exports = express.Router();

duelRouter.get('/duel', (req, res) => {
  Promise.all([Jedi.find({}), SithLords.find({})])
    .then(data => {
      res.status(200).json({ 'duel': data[0].length / data[1].length });
    })
    .catch(err => errorHandle(err, res));
});
