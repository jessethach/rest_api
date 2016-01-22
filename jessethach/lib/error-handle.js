module.exports = exports = function(err, res) {
  console.log(err);
  es.status(500).json({msg: 'Server error'});
};
