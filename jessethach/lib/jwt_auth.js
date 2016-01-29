const User = require(__dirname + '/../models/users');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'changethis');
  } catch(e) {
    return res.status(401).json({msg: 'Could not authenticate'});
  }
  User.findOne({_id: decoded.id}, (err, user) => {
    if (err) {
      console.log(err);//eslint-disable-line
      return res.status(401).json({msg: 'Could not authenticate'});
    }

    if (!user) return res.status(401).json({msg: 'Could not authenticate'});

    req.user = user;
    next();
  });
};
