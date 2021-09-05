const tpr = require('../../../data/tpr');
const config = require('../../../.config');
const Twit = require('twit');
const { postTweet } = require('../../../src/tweet');

const T = new Twit({
  consumer_key: config.tpr.consumer_key,
  consumer_secret: config.tpr.consumer_secret,
  access_token: config.tpr.access_token,
  access_token_secret: config.tpr.access_token_secret,
});

module.exports = async (req, res) => {
  try {
    const response = await postTweet(tpr, T);
    res.status(200).send(response);
  } catch(error) {
    res.status(500).send(`Error: ${error.message} (${error.code})`);
  }
};