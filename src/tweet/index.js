const { createCanvas } = require('canvas');

const getRandomTweet = (tweets) => {
  return tweets[Math.floor(Math.random() * tweets.length)];
}

module.exports = (tweets, Twit, res) => {
  const tweet = getRandomTweet(tweets);
  const lines = tweet.split('\n');
  console.log(lines);
  
  const canvas = createCanvas(720, 720);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '30px Impact';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  let positionY = 200;
  const lineHeight = 40;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    ctx.fillText(line, canvas.width / 2, positionY);
    positionY += lineHeight;
  }

  const url = canvas.toDataURL();
  res.status(200).send(`<img src="${url}" />`);
  
  // T.post('media/upload', { media_data: b64content }, function (err, data, response) {

  // })
  // .then(result => {

  // })
  // .catch(err => {

  // });
};

// module.exports = (tweets, Twit, res) => {
//   const tweet = getRandomTweet(tweets);
//   Twit.post('statuses/update', { status: tweet })
//   .then((result) => {
//     res.status(200).send(`Post ok: ${result.data.text}`);
//   })
//   .catch(err => {
//     res.status(500).send(`Error: ${err.message} (${err.code})`);
//   });
// };