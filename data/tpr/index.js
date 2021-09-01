const images = require('./images');
const lmu = require('./lmu');

const tweets = [
  ...lmu,
];

module.exports = {
  name: 'tpr',
  tweets,
  images,
};