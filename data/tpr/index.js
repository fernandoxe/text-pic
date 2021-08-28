const tprep = require('./tpr');
const lmu = require('./lmu');

const tweets = [
  ...tprep,
  ...lmu,
];

module.exports = tweets;