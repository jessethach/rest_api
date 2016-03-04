const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/jedis_app_dev');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const jediRouter = require(__dirname + '/routes/jedis_routes');
const sithRouter = require(__dirname + '/routes/sith_lords_routes');
const duelRouter = require(__dirname + '/routes/duel_routes');
const authRouter = require(__dirname + '/routes/auth_routes');
const userRouter = require(__dirname + '/routes/user_routes');

app.use('/api', jediRouter);
app.use('/api', sithRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
