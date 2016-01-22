const mongoose = require('mongoose');

var sithLordSchema = new mongoose.Schema({
  name: String,
  lightsaberColor: String,
  world: String,
  master: Boolean,
  powers: Number
});

module.exports = exports = mongoose.model('Sith', sithLordSchema);
