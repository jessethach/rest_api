const mongoose = require('mongoose');

var jediSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lightsaberColor: String,
  world: String,
  master: {type: String, default: 'Unknown'},
  status: {type: String, default: 'Unknown'},
  power: Number,
  forceID: String
});

module.exports = exports = mongoose.model('Jedi', jediSchema);
