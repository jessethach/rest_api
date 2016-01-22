const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/jedis_app_dev');

const jediRouter = require(__dirname + '/routes/jedis_routes');
const sithRouter = require(__dirname + '/routes/sith_lords_routes');
// const duelRouter = require(__dirname + '/routes/duels_routes');

app.use('/api', jediRouter, sithRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));

// var db = mongoose.connection;
// db.on('error', console.error();)
