module.exports = exports = function(err, res) {
  console.log(err);//eslint-disable-line
  res.status(500).json({msg: 'Server error'});
};
