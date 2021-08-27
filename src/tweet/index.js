const getRandomTweet = (tweets) => {
  return tweets[Math.floor(Math.random() * tweets.length)];
}

module.exports = (tweets, Twit, res) => {
  const tweet = getRandomTweet(tweets);
  Twit.post('statuses/update', { status: tweet })
  .then((result) => {
    res.status(200).send(`Post ok: ${result.data.text}`);
  })
  .catch(err => {
    res.status(500).send(`Error: ${err.message} (${err.code})`);
  });
};