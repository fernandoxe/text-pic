const expect = require('chai').expect;
const path = require('path');
const { createCanvas, registerFont } = require('canvas');
const { getFitLines, getImageDataUrl, postTweet } = require('../src/tweet');

describe('Tweet test', () => {
  const width = 1080;
  const height = 1440;
  const horizontalMargin = 60;
  const maxTextWidth = width - horizontalMargin;
  const fontSize = 80;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px 'Glory'`;
  ctx.textAlign = 'center';

  before(() => {
    registerFont(path.join(__dirname, '../src/fonts/CormorantGaramond-Bold.ttf'), {family: 'Glory'});
  });

  it('Should return lines that fit in canvas', () => {
    const tweet = 'Show me all the things that I shouldn\'t know\nAnd there\'s a blue moon on the rise';
    const linesMock = [
      'Show me all the things that I',
      'shouldn\'t know',
      'And there\'s a blue moon on the',
      'rise',
    ];

    const lines = getFitLines(tweet, ctx, maxTextWidth);

    expect(lines).to.be.eql(linesMock);
  });

  it('Should post the tweet', async () => {
    const data = {
      name: 'tpr',
      tweets: [
        'Somebody mixed my medicine',
        'Well, you hurt where you sleep and you sleep where you lie',
        'And now you\'re in deep and now you\'re gonna cry',
        'You start to sweat so hold me tight',
      ],
      images: [
        'taylor1',
        'taylor2',
      ]
    };
    
    const response = await postTweet(data, null);

    expect(response).to.be.a('string');
  });

  it('Should return the url of generated image', async () => {
    const data = {
      name: 'tpr',
      tweets: [
        'Somebody mixed my medicine',
        'Well, you hurt where you sleep and you sleep where you lie',
        'And now you\'re in deep and now you\'re gonna cry',
        'You start to sweat so hold me tight',
      ],
      images: [
        'taylor1',
        'taylor2',
      ]
    };

    const url = await getImageDataUrl(data);

    expect(url).to.satisfy(image => image.startsWith('data:image/jpeg;base64,'));
  });
});