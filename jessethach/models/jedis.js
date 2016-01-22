const mongoose = require('mongoose');

var jediSchema = new mongoose.Schema({
  name: String,
  lightsaberColor: String,
  world: String,
  master: Boolean,
  power: Number
});

module.exports = exports = mongoose.model('Jedi', jediSchema);
