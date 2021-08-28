const tpr = require('../../../data/tpr');
const config = require('../../../.config');
const Twit = require('twit');
const tweet = require('../../../src/tweet');

const T = new Twit({
  consumer_key: config.tpr.consumer_key,
  consumer_secret: config.tpr.consumer_secret,
  access_token: config.tpr.access_token,
  access_token_secret: config.tpr.access_token_secret,
});

module.exports = (req, res) => {
  tweet(tpr, T, res);
};